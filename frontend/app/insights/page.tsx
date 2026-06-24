import InsightCard from "../../components/InsightCard";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="text-4xl font-bold mb-2">
        Your Productivity DNA 🧠
      </h1>

      <p className="text-slate-400 mb-8">
        Tap a card to reveal your insights ✨
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <InsightCard
          title="Peak Focus Time"
          emoji="⚡"
          value="6 PM - 8 PM"
          description="You complete 83% more tasks during this time window."
          color="border-violet-500 bg-violet-950/20"
        />

        <InsightCard
          title="Best Streak"
          emoji="🔥"
          value="12 Days"
          description="Your longest consistency streak so far."
          color="border-blue-500 bg-blue-950/20"
        />

        <InsightCard
          title="Most Productive Goal"
          emoji="🎯"
          value="DSA"
          description="37 completed study sessions this month."
          color="border-green-500 bg-green-950/20"
        />

        <InsightCard
          title="Yumee Learned"
          emoji="🧠"
          value="+31%"
          description="You are more productive after workouts."
          color="border-yellow-500 bg-yellow-950/20"
        />

      </div>

    </main>
  );
}