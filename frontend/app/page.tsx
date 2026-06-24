import Header from "../components/Header";
import ProgressRing from "../components/ProgressRing";
import Card from "../components/Card";
import FloatingYumee from "../components/FloatingYumee";
import QuickActions from "../components/QuickActions";
import YumeePanel from "../components/YumeePanel";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
      <Header />

      <div className="mb-4">
        <QuickActions />
      </div>

      {/* Progress Card */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400">Today's Progress</p>

            <p className="text-slate-300 mt-2">
              5 tasks completed
            </p>

            <p className="text-slate-500">
              2 tasks pending
            </p>
          </div>

          <ProgressRing />
        </div>
      </Card>

      <div className="h-4" />

      {/* Yumee Recommendation */}
      <Card>
        <p className="text-blue-400 font-semibold">
          Yumee Recommendation
        </p>

        <h3 className="text-lg font-bold mt-2">
          Focus on DSA before Hackathon Work
        </h3>

        <p className="text-slate-400 mt-2">
          Based on your productivity patterns, you are
          most effective at analytical tasks before 7 PM.
        </p>

        <div className="mt-4 text-green-400 font-medium">
          Confidence: 89%
        </div>
      </Card>

      <div className="h-4" />

      {/* Upcoming Tasks */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">
          Upcoming Tasks
        </h2>

        <div className="space-y-3">
          <div className="bg-[#334155] p-3 rounded-xl">
            DSA Practice • 6 PM
          </div>

          <div className="bg-[#334155] p-3 rounded-xl">
            Hackathon • 8 PM
          </div>
        </div>
      </Card>

      <div className="h-4" />

      {/* Active Goals */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">
          Active Goals
        </h2>

        <div className="space-y-3">
          <div className="bg-[#334155] p-3 rounded-xl">
            Morgan Stanley Internship
          </div>

          <div className="bg-[#334155] p-3 rounded-xl">
            Fitness Journey
          </div>
        </div>
      </Card>

      <div className="h-4" />

      {/* Yumee Insight */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">
          Yumee Insight
        </h2>

        <p className="text-slate-300">
          You complete 80% more tasks after workouts.
        </p>
      </Card>

      <YumeePanel />
      <FloatingYumee />
    </main>
  );
}