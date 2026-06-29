from firebase_db import db


def analyze_patterns():

    docs = db.collection("tasks").stream()

    tasks = {}

    total_completed = 0
    total_tasks = 0

    for doc in docs:

        task = doc.to_dict()

        title = task["title"]

        if title not in tasks:
            tasks[title] = {
                "completed": 0,
                "total": 0,
                "durations": [],
            }

        tasks[title]["total"] += 1
        total_tasks += 1

        if task.get("completed", False):
            tasks[title]["completed"] += 1
            total_completed += 1

        if task.get("start") and task.get("end"):

            start_h, start_m = map(int, task["start"].split(":"))
            end_h, end_m = map(int, task["end"].split(":"))

            duration = (
                (end_h * 60 + end_m)
                -
                (start_h * 60 + start_m)
            )

            tasks[title]["durations"].append(duration)

    insights = []

    for title, stats in tasks.items():

        completion_rate = round(
            (stats["completed"] / stats["total"]) * 100,
            1,
        )

        average_duration = None

        if stats["durations"]:
            average_duration = round(
                sum(stats["durations"])
                /
                len(stats["durations"]),
                1,
            )

        recommendation = "Keep your current schedule."

        if completion_rate < 40:
            recommendation = (
                "Try scheduling this earlier in the day."
            )

        elif completion_rate < 70:
            recommendation = (
                "Break this into shorter sessions."
            )

        elif completion_rate > 90:
            recommendation = (
                "Great consistency! Consider increasing the challenge."
            )

        insights.append(
            {
                "task": title,
                "completion_rate": completion_rate,
                "average_duration": average_duration,
                "recommendation": recommendation,
            }
        )

    overall_completion = (
        round((total_completed / total_tasks) * 100, 1)
        if total_tasks > 0
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