from datetime import datetime
from firebase_db import db

MEMORY_FILE = "memory.json"


def load_memory():

    if not os.path.exists(MEMORY_FILE):
        return {
            "history": []
        }

    with open(MEMORY_FILE, "r") as f:
        return json.load(f)


def save_memory(memory):

    with open(MEMORY_FILE, "w") as f:
        json.dump(
            memory,
            f,
            indent=4
        )


def save_task_result(
    task_name,
    planned_start,
    planned_end,
    completed,
    actual_duration=None,
):

    db.collection("memory").document("history").collection("events").add(
        {
            "task": task_name,
            "planned_start": planned_start,
            "planned_end": planned_end,
            "completed": completed,
            "actual_duration": actual_duration,
            "timestamp": datetime.now(),
        }
    )


def get_user_patterns():

    memory = load_memory()

    patterns = {}

    for item in memory["history"]:

        task = item["task"]

        if task not in patterns:

            patterns[task] = {
                "completed": 0,
                "skipped": 0,
                "durations": [],
            }

        if item["completed"]:

            patterns[task]["completed"] += 1

            if item["actual_duration"]:

                patterns[task]["durations"].append(
                    item["actual_duration"]
                )

        else:

            patterns[task]["skipped"] += 1

    summary = []

    for task, stats in patterns.items():

        average_duration = None

        if stats["durations"]:

            average_duration = round(
                sum(stats["durations"])
                /
                len(stats["durations"]),
                1
            )

        summary.append(
            {
                "task": task,
                "times_completed": stats["completed"],
                "times_skipped": stats["skipped"],
                "average_duration": average_duration,
            }
        )

    return summary


def build_ai_context():

    docs = (
        db.collection("memory")
        .document("history")
        .collection("events")
        .stream()
    )

    patterns = {}

    for doc in docs:

        item = doc.to_dict()

        task = item["task"]

        if task not in patterns:

            patterns[task] = {
                "completed": 0,
                "skipped": 0,
                "durations": [],
            }

        if item.get("completed"):

            patterns[task]["completed"] += 1

            if item.get("actual_duration"):

                patterns[task]["durations"].append(
                    item["actual_duration"]
                )

        else:

            patterns[task]["skipped"] += 1

    if not patterns:

        return "No previous history."

    text = "User Behaviour History:\n\n"

    for task, stats in patterns.items():

        average_duration = None

        if stats["durations"]:

            average_duration = round(
                sum(stats["durations"])
                /
                len(stats["durations"]),
                1
            )

        text += (
            f"- {task}: "
            f"Completed {stats['completed']} times, "
            f"Skipped {stats['skipped']} times, "
            f"Average Duration = {average_duration} minutes.\n"
        )

    return text