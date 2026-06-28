from datetime import datetime


def to_minutes(time_str: str):
    t = datetime.strptime(time_str, "%H:%M")
    return t.hour * 60 + t.minute


def to_time(minutes: int):
    hour = minutes // 60
    minute = minutes % 60
    return f"{hour:02}:{minute:02}"


def find_next_available_slot(
    tasks,
    day,
    after_time,
    duration_minutes,
):
    current = to_minutes(after_time)

    # Search until 11 PM
    while current + duration_minutes <= 23 * 60:

        end = current + duration_minutes

        overlap = False

        for task in tasks:

            if task["day"] != day:
                continue

            task_start = to_minutes(task["start"])
            task_end = to_minutes(task["end"])

            if current < task_end and end > task_start:
                overlap = True
                break

        if not overlap:

            return {
                "day": day,
                "start": to_time(current),
                "end": to_time(end),
            }

        current += 30

    return None