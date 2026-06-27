from datetime import datetime
from datetime import timedelta

def parse_time(value):

    value = value.replace("–", "-").strip()

    mapping = {
        "5-6 AM": "05:00",
        "6-7 AM": "06:00",
        "7-8 AM": "07:00",
        "8-9 AM": "08:00",
        "9-10 AM": "09:00",
        "10-11 AM": "10:00",
        "11-12 AM": "11:00",
        "12-1 PM": "12:00",
        "1-2 PM": "13:00",
        "2-3 PM": "14:00",
        "3-4 PM": "15:00",
        "4-5 PM": "16:00",
        "5-6 PM": "17:00",
        "6-7 PM": "18:00",
        "7-8 PM": "19:00",
        "8-9 PM": "20:00",
        "9-10 PM": "21:00",
        "10-11 PM": "22:00",
        "11-12 PM": "23:00",
        "12-1 AM": "00:00",
    }

    if value not in mapping:
        raise ValueError(f"Unknown time format: '{value}'")

    return mapping[value]



def get_free_slots(
    wake_time,
    sleep_time,
    hard_constraints,
):
    # print("WAKE:", wake_time)
    # print("PARSED:", parse_time(wake_time))
    wake = datetime.strptime(parse_time
                             (wake_time),
        "%H:%M",
    )

    sleep = datetime.strptime(parse_time
                              (sleep_time),
        "%H:%M",
    )

    events = sorted(
        hard_constraints,
        key=lambda x: x.start_time,
    )

    free_slots = []

    current = wake

    for event in events:

        start = datetime.strptime(
            event.start_time,
            "%H:%M",
        )

        end = datetime.strptime(
            event.end_time,
            "%H:%M",
        )

        if current < start:

            free_slots.append(
                {
                    "start": current,
                    "end": start,
                }
            )

        current = max(
            current,
            end,
        )

    if current < sleep:

        free_slots.append(
            {
                "start": current,
                "end": sleep,
            }
        )

    return free_slots

def find_slot(
    free_slots,
    duration,
):

    for slot in free_slots:

        available = (
            slot["end"] - slot["start"]
        ).total_seconds() / 60

        if available >= duration:

            start = slot["start"]
            end = start + timedelta(
                minutes=duration
            )

            slot["start"] = end

            return (
                start.strftime("%H:%M"),
                end.strftime("%H:%M"),
            )

    return None