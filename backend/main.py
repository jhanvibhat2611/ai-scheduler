from google import genai
from dotenv import load_dotenv
import os
import json
from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta

app = FastAPI()
load_dotenv()

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

def get_free_slots(
    wake_time,
    sleep_time,
    calendar_events
):

    free_slots = []

    wake = datetime.strptime(wake_time, "%H:%M")
    sleep = datetime.strptime(sleep_time, "%H:%M")

    constraints = sorted(
        calendar_events,
        key=lambda x: x.start_time
    )

    current = wake

    for constraint in constraints:

        start = datetime.strptime(
            constraint.start_time,
            "%H:%M"
        )

        end = datetime.strptime(
            constraint.end_time,
            "%H:%M"
        )

        if current < start:

            free_slots.append({
                "label": label_slot(current),
                "start": current,
                "end": start
            })

        current = max(current, end)

    if current < sleep:

        free_slots.append({
            "label": label_slot(current),
            "start": current,
            "end": sleep
        })

    return free_slots

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

@app.post("/generate-schedule")
def generate_schedule(data: UserData):

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
        "Sunday": datetime.strptime(start_time_str, "%H:%M")
    }

    for goal in data.goals:

        for task in goal.tasks:

            selected_days = get_days(task.times_per_week)

            for day in selected_days:

                start_time = day_times[day]

                end_time = start_time + timedelta(
                    minutes=task.duration
                )

                schedule.append(
                    {
                        "day": day,
                        "task": task.name,
                        "start_time": start_time.strftime("%H:%M"),
                        "end_time": end_time.strftime("%H:%M")
                    }
                )

                day_times[day] = end_time

    return {
        "schedule": schedule
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