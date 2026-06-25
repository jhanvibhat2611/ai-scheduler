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


class UserData(BaseModel):
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

class CalendarEvent(BaseModel):
    name: str
    start_time: str
    end_time: str


class AIScheduleRequest(BaseModel):
    preferences: dict
    calendar: list[CalendarEvent]
    tasks: list

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
2. Decide the best part of the day
   (Morning / Afternoon / Evening / Night).
3. Explain your reasoning.
4. Respect existing calendar events.
5. Minimize context switching.
6. Keep the schedule realistic.

User Preferences:

{json.dumps(data.preferences, indent=2)}

Existing Calendar:

{json.dumps([event.model_dump() for event in data.calendar], indent=2)}

Tasks:

{json.dumps(data.tasks, indent=2)}

Return ONLY valid JSON.

Format:

{{
  "plan": [
    {{
      "task": "DSA Practice",
      "priority": 1,
      "preferred_time": "Evening",
      "reason": "The user has peak focus after college."
    }},
    {{
      "task": "Workout",
      "priority": 2,
      "preferred_time": "Morning",
      "reason": "Exercise improves concentration for later study."
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

    return json.loads(text)