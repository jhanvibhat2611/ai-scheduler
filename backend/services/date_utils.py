from datetime import datetime, timedelta


def normalize_day(day: str):

    day = day.lower().strip()

    today = datetime.now()

    if day == "today":
        return today.strftime("%A")

    if day == "tomorrow":
        return (today + timedelta(days=1)).strftime("%A")

    weekdays = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ]

    if day in weekdays:
        return day.capitalize()

    return today.strftime("%A")



def normalize_date(day: str):

    day = day.lower().strip()

    today = datetime.now()

    if day == "today":
        return today.strftime("%Y-%m-%d")

    if day == "tomorrow":
        return (today + timedelta(days=1)).strftime("%Y-%m-%d")

    return today.strftime("%Y-%m-%d")