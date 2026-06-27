from firebase_db import db


from firebase_db import db


def analyze_patterns():

    docs = (
        db.collection("memory")
        .document("history")
        .collection("events")
        .stream()
    )

    tasks = {}

    total_completed = 0
    total_skipped = 0

    for doc in docs:

        event = doc.to_dict()

        task = event["task"]

        if task not in tasks:

            tasks[task] = {
                "completed": 0,
                "skipped": 0,
                "durations": [],
            }

        if event.get("completed"):

            tasks[task]["completed"] += 1
            total_completed += 1

            if event.get("actual_duration"):

                tasks[task]["durations"].append(
                    event["actual_duration"]
                )

        else:

            tasks[task]["skipped"] += 1
            total_skipped += 1

    insights = []

    for task, stats in tasks.items():

        total = stats["completed"] + stats["skipped"]

        completion_rate = (
            round(stats["completed"] / total * 100, 1)
            if total > 0
            else 100
        )

        average_duration = None

        if stats["durations"]:

            average_duration = round(
                sum(stats["durations"])
                /
                len(stats["durations"]),
                1
            )

        recommendation = "Keep current schedule."

        if completion_rate < 40:

            recommendation = (
                "Move this task to evenings and shorten the duration."
            )

        elif completion_rate < 70:

            recommendation = (
                "Try breaking this into smaller sessions."
            )

        elif completion_rate > 90:

            recommendation = (
                "Great consistency! Consider increasing the challenge."
            )

        insights.append(
            {
                "task": task,
                "completion_rate": completion_rate,
                "average_duration": average_duration,
                "recommendation": recommendation,
            }
        )

    overall_total = total_completed + total_skipped

    overall_completion = (
        round(total_completed / overall_total * 100, 1)
        if overall_total > 0
        else 0
    )

    best_task = (
        max(insights, key=lambda x: x["completion_rate"])["task"]
        if insights
        else "None"
    )

    worst_task = (
        min(insights, key=lambda x: x["completion_rate"])["task"]
        if insights
        else "None"
    )

    return {
        "overall_completion": overall_completion,
        "best_task": best_task,
        "worst_task": worst_task,
        "insights": insights,
    }