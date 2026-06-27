from langchain_ollama import ChatOllama

llm = ChatOllama(
    model="llama3",
    temperature=0,
)


def extract_intent(message: str):

    prompt = f"""
You are Yumee, an AI productivity assistant.

Your job is to understand the user's message.

Return ONLY valid JSON.

Possible intents:
- schedule_change
- new_commitment
- task_completed
- general_chat

Extract:
- intent
- activity
- day
- time

User:
{message}
"""

    response = llm.invoke(prompt)

    return response.content