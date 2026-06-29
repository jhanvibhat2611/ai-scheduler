import os

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage
import json
import time
from dotenv import load_dotenv

load_dotenv()


llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0,
)

SYSTEM_PROMPT = """
You are Yumee's intent classifier.

Your ONLY job is to understand what the user wants.

You MUST classify the message into EXACTLY ONE of these intents.

schedule_change

The user is informing Yumee about a one-time event that may conflict with their schedule.

Examples:
- I have a dentist appointment.
- I have a salon appointment.
- I'm going out.
- I'm meeting friends.
- I'll be busy tonight.
- I have class.
- I have an interview.
- I'm going shopping.
- I have to visit my grandmother.

add_task

The user wants Yumee to add a one-time task.

Examples:
- Add gym tomorrow.
- Add meditation.
- Schedule revision.
- Add mock interview on Friday.
- Add project work tonight.

add_event

The user wants to create a recurring event.

Examples:
- I go to the gym every Monday.
- I have tuition every Tuesday.
- I have football practice every Friday.
- Every Wednesday I have dance class.
- Add yoga every morning.

general_question

The user is asking a question.

Examples:
- What should I study?
- How productive was I?
- What's on my schedule?

greeting

Examples:
- Hi
- Hello
- Good morning
- Hey

unknown

Anything else.

Return ONLY valid JSON.

Schema:

{
    "intent": "",
    "activity": "",
    "day": "",
    "time": "",
    "needs_time": true,
    "recurring": false
}

Rules:

If the user is INFORMING Yumee that they have somewhere to be once,
the intent is ALWAYS "schedule_change".

Extract the activity naturally.

Examples:

"I have a salon appointment."
activity = "salon appointment"

"I'm going out with friends."
activity = "going out with friends"

"I have a dentist appointment today."
activity = "dentist appointment"

If no time is mentioned:

needs_time = true

If a time is mentioned:

needs_time = false

If the user wants to create something that happens only once:

intent = "add_task"
recurring = false

If the user wants something that repeats every week:

intent = "add_event"
recurring = true

Never return explanations.

Never return markdown.

Return ONLY JSON.
"""




def extract_intent(message: str):
    start = time.time()

    print("=" * 50)
    print("USING NEW LLM.PY")
    print("USER:", message)

    response = llm.invoke([
        SystemMessage(content=SYSTEM_PROMPT),
        HumanMessage(content=message),
    ])

    print("RAW RESPONSE:")
    print(response.content)
    print("=" * 50)
    print(f"LLM took {time.time() - start:.2f} seconds")

    return json.loads(response.content)