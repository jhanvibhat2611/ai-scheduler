import Card from "../../components/Card";

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        Productivity Insights
      </h1>

      <div className="space-y-4">

        <Card>
          <h2 className="text-xl font-semibold">
            Completion Rate
          </h2>

          <p className="text-5xl font-bold text-blue-400 mt-4">
            78%
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">
            Best Productivity Window
          </h2>

          <p className="text-slate-300 mt-3">
            4 PM - 7 PM
          </p>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">
            Yumee Observation
          </h2>

          <p className="text-slate-300 mt-3">
            You tend to complete deep work tasks
            more consistently after physical activity.
          </p>
        </Card>

      </div>
    </main>
  );
}