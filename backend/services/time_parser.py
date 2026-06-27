from dateutil import parser


def normalize_time(time_str: str) -> str:
    dt = parser.parse(time_str)
    return dt.strftime("%H:%M")