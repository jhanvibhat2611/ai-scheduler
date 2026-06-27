from datetime import datetime


def to_minutes(time_str: str):
    t = datetime.strptime(time_str, "%H:%M")
    return t.hour * 60 + t.minute


def find_conflicts(tasks, day, start_time, end_time):

    start = to_minutes(start_time)
    end = to_minutes(end_time)

    conflicts = []

    for task in tasks:

        if task["day"] != day:
            continue

        task_start = to_minutes(task["start"])
        task_end = to_minutes(task["end"])

        overlap = (
            start < task_end and
            end > task_start
        )

        if overlap:
            conflicts.append(task)

    return conflicts