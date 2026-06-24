from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta

app = FastAPI()


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