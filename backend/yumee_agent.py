from pydantic import BaseModel

from services.time_parser import normalize_time
from services.llm import extract_intent
from services.conversation_state import conversation_state


class AgentResponse(BaseModel):
    reply: str
    action: str
    data: dict


def yumee_agent(message: str):

    print("--------------------------------")
    print("Incoming message:", message)
    print("Current stage:", conversation_state["stage"])

    # ---------------------------------
    # User is replying with the time
    # ---------------------------------
    if conversation_state["stage"] == "waiting_for_time":

        conversation_state["stage"] = "idle"
        conversation_state["time"] = normalize_time(message)

        return AgentResponse(
            reply="TIME_RECEIVED",
            action="check_conflicts",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # User replied to reschedule prompt
    # ---------------------------------
    if conversation_state["stage"] == "waiting_for_reschedule":

        if message.lower() in [
            "yes",
            "yeah",
            "yup",
            "sure",
            "ok",
            "okay",
        ]:

            conversation_state["stage"] = "idle"

            return AgentResponse(
                reply="RESCHEDULE_TASKS",
                action="reschedule_tasks",
                data=conversation_state.copy(),
            )

        conversation_state["stage"] = "idle"

        return AgentResponse(
            reply="Okay! I won't reschedule anything.",
            action="none",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # Fresh message
    # ---------------------------------

    intent = extract_intent(message)

    print(intent)

    # ---------------------------------
    # Schedule change detected
    # ---------------------------------

    if intent["intent"] == "schedule_change":

        conversation_state["intent"] = intent["intent"]
        conversation_state["activity"] = intent["activity"]
        conversation_state["day"] = intent["day"]

        # Ask for time if missing
        if intent["needs_time"]:

            conversation_state["stage"] = "waiting_for_time"

            return AgentResponse(
                reply="Sure! What time are you going?",
                action="ask_time",
                data=conversation_state.copy(),
            )

        # Time already provided
        conversation_state["time"] = normalize_time(intent["time"])
        conversation_state["stage"] = "idle"

        return AgentResponse(
            reply="TIME_RECEIVED",
            action="check_conflicts",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # Everything else
    # ---------------------------------

    return AgentResponse(
        reply="I'm still learning 😊",
        action="none",
        data=intent,
    )