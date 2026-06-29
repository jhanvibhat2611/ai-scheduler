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

        if conversation_state["intent"] == "schedule_change":
            return AgentResponse(
                reply="TIME_RECEIVED",
                action="check_conflicts",
                data=conversation_state.copy(),
            )

        if conversation_state["intent"] == "add_task":
            return AgentResponse(
                reply="TIME_RECEIVED",
                action="add_task",
                data=conversation_state.copy(),
            )

        if conversation_state["intent"] == "add_event":
            return AgentResponse(
                reply="TIME_RECEIVED",
                action="add_event",
                data=conversation_state.copy(),
            )

    # ---------------------------------
    # User replied to reschedule prompt
    # ---------------------------------

    if conversation_state["stage"] == "waiting_for_reschedule":

        if message.lower().strip() in [
            "yes",
            "yeah",
            "yep",
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
    # User confirmed final update
    # ---------------------------------

    if conversation_state["stage"] == "waiting_for_update_confirmation":

        if message.lower().strip() in [
            "yes",
            "yeah",
            "yep",
            "yup",
            "sure",
            "ok",
            "okay",
        ]:

            return AgentResponse(
                reply="UPDATE_CONFIRMATION",
                action="update_schedule",
                data=conversation_state.copy(),
            )

        conversation_state["stage"] = "idle"

        return AgentResponse(
            reply="Okay! I won't update your schedule.",
            action="none",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # Fresh message
    # ---------------------------------

    intent = extract_intent(message)

    print(intent)

    conversation_state["intent"] = intent["intent"]
    conversation_state["activity"] = intent["activity"]
    conversation_state["day"] = intent["day"]

    # ---------------------------------
    # Schedule Change
    # ---------------------------------

    if intent["intent"] == "schedule_change":

        if intent["needs_time"]:

            conversation_state["stage"] = "waiting_for_time"

            return AgentResponse(
                reply="Sure! What time are you going?",
                action="ask_time",
                data=conversation_state.copy(),
            )

        conversation_state["time"] = normalize_time(intent["time"])

        return AgentResponse(
            reply="TIME_RECEIVED",
            action="check_conflicts",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # Add Task
    # ---------------------------------

    if intent["intent"] == "add_task":

        if intent["needs_time"]:

            conversation_state["stage"] = "waiting_for_time"

            return AgentResponse(
                reply="Sure! What time would you like to do it?",
                action="ask_time",
                data=conversation_state.copy(),
            )

        conversation_state["time"] = normalize_time(intent["time"])

        return AgentResponse(
            reply="TIME_RECEIVED",
            action="add_task",
            data=conversation_state.copy(),
        )

    # ---------------------------------
    # Add Event
    # ---------------------------------

    if intent["intent"] == "add_event":

        if intent["needs_time"]:

            conversation_state["stage"] = "waiting_for_time"

            return AgentResponse(
                reply="Sure! What time should I block every week?",
                action="ask_time",
                data=conversation_state.copy(),
            )

        conversation_state["time"] = normalize_time(intent["time"])

        return AgentResponse(
            reply="TIME_RECEIVED",
            action="add_event",
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