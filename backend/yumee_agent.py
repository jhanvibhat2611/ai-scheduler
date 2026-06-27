from pydantic import BaseModel
from intent_parser import extract_intent


class AgentResponse(BaseModel):
    reply: str
    action: str
    data: dict


def yumee_agent(message: str):

    result = extract_intent(message)

    return AgentResponse(
        reply=result,
        action="intent_detected",
        data={},
    )