# 🌸 Honestli

# AI-powered planning that adapts to your life, not the other way around.
> Built for the Google Vibe2Ship Hackathon | Powered by Google Gemini & Google Cloud
# 🌸 Honestli

**Honestli** is an AI-powered productivity app designed for people whose lives don't always go according to plan.
Most productivity apps expect users to follow the perfect schedule they created on Sunday. Honestli takes a different approach. It understands that priorities shift, unexpected plans come up, and life happens. Instead of forcing users to start over, Honestli adapts their schedule while keeping them in control.
At the heart of Honestli is **Yumee**, an AI planning companion that helps users organize their day, reschedule tasks intelligently, and stay productive without the guilt of falling behind.

# ✨ Why Honestli?
Honestli isn't just another planner or to-do list.
It combines AI planning, conversational interactions, and intelligent scheduling into one experience that adapts to real life rather than expecting users to adapt to the app.

# 🚀 Features

## 🤖 Meet Yumee

Yumee is your personal AI productivity companion inside Honestli.
It helps you plan your day, keeps track of your priorities, and adjusts your schedule whenever life changes.
Instead of manually moving tasks around, you simply talk to Yumee.

## 🧠 AI Schedule Generation
Based on your goals, priorities, daily routine, working hours, and non-negotiable commitments, Honestli creates a personalized schedule that is realistic—not overly optimistic.
The goal isn't to fill every minute of your day. It's to create a plan you're actually likely to follow.

## 💬 Conversational Planning

Need to change your schedule?
Just tell Yumee naturally.
Examples:
> "I have a dentist appointment at 4 PM today."
> "I'm going out this evening."
> "I can't study after 7 PM."
> "Move tomorrow's workout to Friday."
Yumee understands your request, checks for conflicts, reschedules flexible tasks where possible, and presents the updated schedule for your approval before making major changes.

## 📅 Smart Rescheduling
Unexpected plans shouldn't ruin your entire day.
If something overlaps with an existing task, Honestli automatically reorganizes your remaining schedule instead of asking you to manually fix everything.


## 📊 Productivity Insights
Honestli helps users understand how they're spending their time by providing insights such as:
- Overall completion rate
- Most and least completed activities
- Time spent on different tasks
- Personalized productivity suggestions

## 👤 Human-in-the-Loop AI

While Yumee handles the planning, the user always stays in control.
Major scheduling decisions are suggested—not forced—allowing users to review and approve important changes.

# 🛠 Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS

### Backend
- FastAPI
- Python

### Database
- Firebase Firestore

### AI
- Google Gemini API

### Deployment
- Google Cloud Run
- Docker


# ☁ Google Technologies Used

- Google Gemini API
- Google Cloud Run
- Google Cloud Build
- Artifact Registry


---

# ⚙️ Running Locally

Clone the repository

```bash
git clone <repository-url>
```

Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

# 🔐 Environment Variables

Create a `.env` file inside the backend directory.

```env
GEMINI_API_KEY=your_api_key

FIREBASE_PROJECT_ID=...

FIREBASE_CLIENT_EMAIL=...

FIREBASE_PRIVATE_KEY=...
```


## 🚀 Live Demo

🌐 **Deployed Application:**  
https://ai-scheduler-1078662668232.us-central1.run.app/onboarding


# 🔮 Future Scope

Honestli has been built as a scalable foundation for an AI-first productivity assistant. Future enhancements include:

- 📱 **Native Android Application** to provide a seamless mobile-first experience.
- 🔔 **Smart Notifications & Reminders** that proactively notify users about upcoming tasks, schedule changes, and deadlines.
- 📅 **Google Calendar Integration** to automatically sync events, detect scheduling conflicts, and keep both calendars up to date.
- 🗣️ **Voice Conversations with Yumee** for hands-free task management and schedule updates.
- 🧠 **Long-Term Personalization**, enabling Yumee to learn user preferences over time and generate increasingly personalized schedules.
- ⌚ **Wearable Device Support** for quick reminders and schedule updates on smartwatches.

---

# 👥 Team

Built during the **Google Vibe2Ship Hackathon**.

### Our Vision

Our vision for Honestli is simple:
> Productivity shouldn't depend on having a perfect day. With Yumee handling the planning and the user making the final decisions, Honestli helps people stay organized even when life doesn't go according to schedule.
 
