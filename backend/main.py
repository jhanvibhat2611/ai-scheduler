# TODO:
# Replace demo_schedule with Firestore tasks before final submission.

from google import genai


from dotenv import load_dotenv
import os
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import timedelta
from fastapi.middleware.cors import CORSMiddleware
from memory import save_task_result, build_ai_context
from learning_engine import analyze_patterns
from scheduler import get_free_slots,find_slot,parse_time
import json
from yumee_agent import yumee_agent
from services.conflict_detector import find_conflicts
from typing import TypedDict, List
from services.conversation_state import conversation_state
from services.rescheduler import find_next_available_slot, to_minutes
from learning_engine import analyze_patterns

from firebase_db import db
from services.date_utils import normalize_day
from services.date_utils import normalize_date
from firebase_admin import firestore



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
load_dotenv()
print("API KEY:", os.getenv("GEMINI_API_KEY"))

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

class Task(BaseModel):
    name: str
    duration: int
    times_per_week: int


class ScheduleItem(BaseModel):
    day: str
    task: str
    start_time: str
    end_time: str


class Goal(BaseModel):
    name: str
    tasks: list[Task]


class HardConstraint(BaseModel):
    day: str
    name: str
    start_time: str
    end_time: str

class FreeSlot(BaseModel):
    label: str
    start_time: str
    end_time: str

class UserData(BaseModel):
    wake_time: str
    sleep_time: str
    hard_constraints: list[HardConstraint]
    soft_constraints: list
    goals: list[Goal]

class AskYumeeRequest(BaseModel):
    task: str
    goal: str
    question: str

class YumeeRequest(BaseModel):
    message: str

class YumeeResponse(BaseModel):
    reply: str

class YumeeState(TypedDict):
    user_message: str
    intent: str
    activity: str
    day: str
    time: str
    waiting_for_time: bool
    conflicts: list
    reply: str

def get_days(times_per_week):

    if times_per_week == 7:
        return [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ]

    elif times_per_week == 6:
        return [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ]

    elif times_per_week == 5:
        return [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
        ]

    elif times_per_week == 4:
        return [
            "Monday",
            "Tuesday",
            "Thursday",
            "Saturday"
        ]

    elif times_per_week == 3:
        return [
            "Monday",
            "Wednesday",
            "Friday"
        ]

    elif times_per_week == 2:
        return [
            "Tuesday",
            "Thursday"
        ]

    elif times_per_week == 1:
        return [
            "Wednesday"
        ]

    return []





def label_slot(start_time):

    hour = start_time.hour

    if 5 <= hour < 12:
        return "Morning"

    elif 12 <= hour < 17:
        return "Afternoon"

    elif 17 <= hour < 21:
        return "Evening"

    else:
        return "Night"

def schedule_ai_plan(ai_plan, free_slots):

    schedule = []

    for item in ai_plan["plan"]:

        placed = False

        for slot in free_slots:

            if slot["label"] != item["preferred_time"]:
                continue

            start = slot["start"]

            end = start + timedelta(
                minutes=item["duration"]
            )

            if end <= slot["end"]:

                schedule.append(
                    {
                        "task": item["task"],
                        "day": "Monday",
                        "start_time": start.strftime("%H:%M"),
                        "end_time": end.strftime("%H:%M")
                    }
                )

                slot["start"] = end

                placed = True

                break

        if not placed:

            for slot in free_slots:

                start = slot["start"]

                end = start + timedelta(
                    minutes=item["duration"]
                )

                if end <= slot["end"]:
                    schedule.append(
                        {
                            "task": item["task"],
                            "day": "Monday",
                            "start_time": start.strftime("%H:%M"),
                            "end_time": end.strftime("%H:%M")
                        }
                    )

                    slot["start"] = end

                    placed = True

                    break

            if not placed:
                schedule.append(
                    {
                        "task": item["task"],
                        "day": "Monday",
                        "start_time": "Not Scheduled",
                        "end_time": "-"
                    }
                )

    return schedule

class CalendarEvent(BaseModel):
    name: str
    start_time: str
    end_time: str


class PlannerTask(BaseModel):
    name: str
    duration: int


class AIScheduleRequest(BaseModel):
    preferences: dict
    calendar: list[CalendarEvent]
    tasks: list[PlannerTask]

class GoalPlanRequest(BaseModel):
    goal: str
    deadline: str | None = None


class GoalTask(BaseModel):
    name: str
    duration: int
    times_per_week: int


class GoalPlanResponse(BaseModel):
    tasks: list[GoalTask]

@app.post("/generate-schedule")
def generate_schedule(data: UserData):

    analysis = analyze_patterns()
    day_free_slots = {}

    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]


    for day in days:
        constraints = [
            c
            for c in data.hard_constraints
            if c.day == day
        ]

        day_free_slots[day] = get_free_slots(
            data.wake_time,
            data.sleep_time,
            constraints,
        )

    schedule = []

    if data.hard_constraints:
        start_time_str = data.hard_constraints[0].end_time
    else:
        start_time_str = "18:00"

    day_times = {
        "Monday": datetime.strptime(start_time_str, "%H:%M"),
        "Tuesday": datetime.strptime(start_time_str, "%H:%M"),
        "Wednesday": datetime.strptime(start_time_str, "%H:%M"),
        "Thursday": datetime.strptime(start_time_str, "%H:%M"),
        "Friday": datetime.strptime(start_time_str, "%H:%M"),
        "Saturday": datetime.strptime(start_time_str, "%H:%M"),
        "Sunday": datetime.strptime(start_time_str, "%H:%M"),
    }

    color_cycle = [
        "violet",
        "green",
        "orange",
        "blue",
    ]

    color_index = 0

    for event in data.hard_constraints:
        schedule.append(
            {
                "day": event.day,
                "title": event.name,
                "start": event.start_time,
                "end": event.end_time,
                "tag": "Commitment",
                "color": "slate",
                "completed": False,
                "locked": True,
            }
        )
    for goal in data.goals:

        for task in goal.tasks:

            task_insight = next(
                (
                    item
                    for item in analysis["insights"]
                    if item["task"] == task.name
                ),
                None,
            )

            duration = task.duration
            times_per_week = task.times_per_week

            if task_insight:

                rate = task_insight["completion_rate"]

                if rate < 40:

                    duration = max(
                        30,
                        duration - 15,
                    )

                    times_per_week = max(
                        1,
                        times_per_week - 1,
                    )

                elif rate > 90:

                    duration += 15

                    times_per_week = min(
                        7,
                        times_per_week + 1,
                    )

            selected_days = get_days(
                times_per_week
            )

            for day in selected_days:

                slot = find_slot(
                    day_free_slots[day],
                    duration,
                )

                if slot is None:
                    continue

                start_str, end_str = slot

                schedule.append(
                    {
                        "day": day,
                        "title": task.name,
                        "start": start_str,
                        "end": end_str,
                        "tag": goal.name,
                        "color": color_cycle[
                            color_index % len(color_cycle)
                        ],
                        "completed": False,
                    }
                )

                color_index += 1

    wake = parse_time(data.wake_time)
    sleep = parse_time(data.sleep_time)

    print("WAKE =", wake)
    print("SLEEP =", sleep)
    for day in days:
        # Midnight -> Wake
        schedule.append(
            {
                "day": day,
                "title": "Sleep",
                "start": "00:00",
                "end": wake,
                "tag": "Rest",
                "color": "blue",
                "completed": False,
                "locked": True,
            }
        )

        # Sleep -> Midnight
        schedule.append(
            {
                "day": day,
                "title": "Sleep",
                "start": sleep,
                "end": "23:59",
                "tag": "Rest",
                "color": "blue",
                "completed": False,
                "locked": True,
            }
        )

    print("========== GENERATED SCHEDULE ==========")
    print("TOTAL TASKS:", len(schedule))

    for task in schedule:
        print(task)

    with open("schedule.json", "w") as f:

        json.dump(
            {
                "tasks": schedule
            },
            f,
            indent=4,
        )

    return {
        "tasks": schedule
    }

@app.get("/test-gemini")
def test_gemini():

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Say hello to the Yumee productivity assistant in one sentence."
    )

    return {
        "response": response.text
    }

@app.post("/ai-plan")
def ai_plan(data: AIScheduleRequest):

    prompt = f"""
You are Yumee, an AI executive assistant for students.

Your goal is NOT to assign exact clock times.

Instead, think like a real personal assistant.

You know:

- the user's existing calendar
- today's tasks
- user preferences
- available time in the day

Your responsibilities are:

1. Prioritize the tasks.
2. Preserve the duration of every task.
3. Decide the best part of the day.
4. Explain your reasoning.
5. Respect existing calendar events.
6. Minimize context switching.
7. Keep the schedule realistic.

User Preferences:

{json.dumps(data.preferences, indent=2)}

Existing Calendar:

{json.dumps([event.model_dump() for event in data.calendar], indent=2)}

Tasks:

{json.dumps([task.model_dump() for task in data.tasks], indent=2)}

Return ONLY valid JSON.

Format:

{{
  "plan": [
    {{
      "task": "DSA Practice",
      "duration": 90,
      "priority": 1,
      "preferred_time": "Evening",
      "reason": "The user has peak focus after college."
    }},
    {{
      "task": "Workout",
      "duration": 45,
      "priority": 2,
      "preferred_time": "Morning",
      "reason": "Exercise improves concentration."
    }}
  ]
}}

Do NOT return markdown.

Do NOT wrap the JSON in ```.

Return JSON only.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    plan = json.loads(text)

    free_slots = get_free_slots(
        data.preferences["wake_time"],
        data.preferences["sleep_time"],
        data.calendar
    )

    schedule = schedule_ai_plan(
        plan,
        free_slots
    )

    return {
        "ai_plan": plan,
        "schedule": schedule
    }

@app.post("/generate-goal-plan")
def generate_goal_plan(data: GoalPlanRequest):

    memory_context = build_ai_context()

    prompt = f"""
    You are Yumee, an AI executive assistant.

    User Behaviour History:

    {memory_context}

    Use this history to personalize future schedules. Adapt task durations, weekly frequency, and recommendations based on the user's historical behaviour whenever possible.

    Adaptive Scheduling Rules:

    You have been given the user's historical productivity data.

    You MUST use it while generating the plan.

    For each task:

    - If the completion rate is below 40%, reduce the task duration by approximately 25% and break it into shorter sessions.

    - If the completion rate is between 40% and 90%, keep the duration unchanged.

    - If the completion rate is above 90%, you may increase the duration by around 10% or slightly increase the weekly frequency.

    - If the user has no previous history for a task, generate a normal recommendation.

    When you modify a task because of previous history, explain that decision in the "reason" field.

    Do not ignore the historical data.

    A user has the following goal.

    Goal:
    {data.goal}

    Deadline:
    {data.deadline if data.deadline else "No deadline"}

    Break this goal into recurring actionable tasks.

    For every task provide:

    - name
    - duration (minutes)
    - times_per_week
    - reason

    Rules:

    - Be realistic.
    - Keep the schedule sustainable.
    - Prefer recurring habits instead of one-time tasks.
    - Suggest only the most important tasks.
    - Return between 3 and 7 tasks.
    - Return ONLY valid JSON.

    Example:

    {{
        "tasks": [
            {{
                "name": "DSA Practice",
                "duration": 100,
                "times_per_week": 5,
                "reason": "Increased duration because the user consistently completes this task."
            }},
            {{
                "name": "Workout",
                "duration": 35,
                "times_per_week": 4,
                "reason": "Reduced duration because the user frequently skips longer workout sessions."
            }},
            {{
                "name": "Resume Building",
                "duration": 60,
                "times_per_week": 1,
                "reason": "New task with no previous history."
            }}
        ]
    }}

    Do NOT use markdown.

    Do NOT wrap the JSON in ```.

    Return JSON only.
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    print("\n========== GOAL PLAN ==========")
    print(text)
    print("===============================\n")
    return json.loads(text)

@app.post("/ask-yumee")
def ask_yumee(data: AskYumeeRequest):

    memory_context = build_ai_context()

    prompt = f"""
You are Yumee, an intelligent AI executive assistant.

The user is asking about one of their scheduled tasks.

Task:
{data.task}

Goal:
{data.goal}

User Behaviour History:
{memory_context}

User Question:
{data.question}

Answer like a supportive productivity coach.

Rules:

- Be concise.
- Be encouraging.
- Use the user's history if relevant.
- If the user often skips similar tasks,
  recommend a smaller session instead of skipping.
- If the user has no history,
  give general productivity advice.

Return only the answer.
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return {
        "answer": response.text.strip()
    }

@app.get("/schedule")
def get_schedule():

    with open("schedule.json", "r") as f:
        return json.load(f)

from datetime import datetime

@app.post("/complete-task")
def complete_task(data: dict):

    # Save to memory for analytics
    save_task_result(
        task_name=data["task"],
        planned_start=data["planned_start"],
        planned_end=data["planned_end"],
        completed=True,
        actual_duration=data.get("actual_duration"),
    )

    # Mark task completed in Firestore
    docs = (
        db.collection("tasks")
        .where("title", "==", data["task"])
        .where("start", "==", data["planned_start"])
        .where("end", "==", data["planned_end"])
        .stream()
    )

    for doc in docs:
        doc.reference.update({
            "completed": True
        })

    return {
        "message": "Task completed successfully."
    }

@app.get("/insights")
def get_insights():

    analysis = analyze_patterns()

    return analysis

def get_schedule_for_day(day):

    docs = db.collection("tasks") \
        .where("day", "==", day) \
        .stream()

    schedule = []

    for doc in docs:
        task = doc.to_dict()

        schedule.append({
            "title": task["title"],
            "day": task["day"],
            "start": task["start"],
            "end": task["end"],
        })

    return schedule

@app.post("/yumee-chat", response_model=YumeeResponse)
def yumee_chat(data: YumeeRequest):

    result = yumee_agent(data.message)

    print(result)
    print(result.data)

    # -------------------------------
    # Add one-time task
    # -------------------------------
    if result.action == "add_task":

        day = normalize_day(result.data["day"])
        date = normalize_date(result.data["day"])

        start = datetime.strptime(
            result.data["time"],
            "%H:%M"
        )

        end = start + timedelta(minutes=60)

        db.collection("tasks").add({

            "title": result.data["activity"],

            "day": day,
            "date": date,

            "start": start.strftime("%H:%M"),
            "end": end.strftime("%H:%M"),

            "duration": 60,

            "completed": False,

            "category": "Personal",

            "autoSchedule": True,

            "source": "yumee",

            "createdAt": firestore.SERVER_TIMESTAMP,

        })

        conversation_state["stage"] = None
        conversation_state["intent"] = None

        return YumeeResponse(
            reply=f"Done! I've added '{result.data['activity']}' to your schedule."
        )

    # -------------------------------
    # Add recurring event
    # -------------------------------
    if result.action == "add_event":

        day = normalize_day(result.data["day"])

        db.collection("events").add({

            "title": result.data["activity"],

            "day": day,
            "time": result.data["time"],

            "recurring": True,
            "source": "yumee",

        })

        conversation_state["stage"] = None
        conversation_state["intent"] = None

        return YumeeResponse(
            reply=f"Done! I'll remember '{result.data['activity']}' every {day}."
        )

    # -------------------------------
    # Check schedule conflicts
    # -------------------------------
    if result.action == "check_conflicts":

        start = result.data["time"]

        start_minutes = to_minutes(start)
        end = f"{(start_minutes + 60)//60:02d}:{(start_minutes + 60)%60:02d}"

        schedule = get_schedule_for_day(
            normalize_day(result.data["day"])
        )

        conflicts = find_conflicts(
            schedule,
            normalize_day(result.data["day"]),
            start,
            end,
        )

        if len(conflicts) == 0:

            return YumeeResponse(
                reply="You're free during that time."
            )

        conversation_state["conflicts"] = conflicts
        conversation_state["stage"] = "waiting_for_reschedule"

        names = ", ".join(
            task["title"] for task in conflicts
        )

        return YumeeResponse(
            reply=f"I found conflicts with: {names}. Would you like me to reschedule them?"
        )

    # -------------------------------
    # Find a new free slot
    # -------------------------------
    if result.action == "reschedule_tasks":

        conflicting_task = conversation_state["conflicts"][0]

        duration = (
            to_minutes(conflicting_task["end"])
            - to_minutes(conflicting_task["start"])
        )

        schedule = get_schedule_for_day(
            conflicting_task["day"]
        )

        slot = find_next_available_slot(
            schedule,
            conflicting_task["day"],
            result.data["time"],
            duration,
        )

        if slot is None:

            return YumeeResponse(
                reply="I couldn't find a free slot today."
            )

        conversation_state["pending_slot"] = slot
        conversation_state["stage"] = "waiting_for_update_confirmation"

        return YumeeResponse(
            reply=(
                f"I can move '{conflicting_task['title']}' "
                f"to {slot['start']} - {slot['end']}. "
                "Would you like me to update your schedule?"
            )
        )

    # -------------------------------
    # User approved update
    # -------------------------------
    if result.action == "update_schedule":

        task = conversation_state["conflicts"][0]
        slot = conversation_state["pending_slot"]

        docs = list(
            db.collection("tasks")
            .where("title", "==", task["title"])
            .where("day", "==", task["day"])
            .stream()
        )

        for doc in docs:
            doc.reference.update({
                "start": slot["start"],
                "end": slot["end"],
                "updatedBy": "Yumee",
            })

        conversation_state["stage"] = None
        conversation_state["conflicts"] = []
        conversation_state["pending_slot"] = None
        conversation_state["intent"] = None
        conversation_state["activity"] = None
        conversation_state["day"] = None
        conversation_state["time"] = None

        return YumeeResponse(
            reply=(
                f"Done! I moved '{task['title']}' "
                f"to {slot['start']} - {slot['end']}."
            )
        )

    return YumeeResponse(
        reply=result.reply
    )


