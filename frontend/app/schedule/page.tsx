import Card from "../../components/Card";

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Today's Schedule
        </h1>

        <button className="bg-blue-600 px-4 py-2 rounded-xl">
          + Add Task
        </button>
      </div>

      <div className="relative ml-6">

        {/* Vertical Line */}
        <div className="absolute left-[34px] top-0 bottom-0 w-[2px] bg-slate-700" />

        {/* Task 1 */}
        <div className="flex gap-6 mb-8 relative">
          <div className="w-16">
            <p className="font-semibold">18:30</p>
            <p className="text-xs text-slate-400">
              Upcoming
            </p>
          </div>

          <div className="absolute left-[28px] top-2 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#0F172A]" />

          <div className="flex-1">
            <Card>
              <h2 className="font-semibold text-lg">
                DSA Practice
              </h2>

              <p className="text-slate-400 mt-1">
                90 min
              </p>

              <span className="inline-block mt-3 bg-blue-500 px-3 py-1 rounded-full text-sm">
                Focus
              </span>
            </Card>
          </div>
        </div>

        {/* Task 2 */}
        <div className="flex gap-6 mb-8 relative">
          <div className="w-16">
            <p className="font-semibold">20:00</p>
            <p className="text-xs text-slate-400">
              Upcoming
            </p>
          </div>

          <div className="absolute left-[28px] top-2 w-4 h-4 rounded-full bg-violet-500 border-4 border-[#0F172A]" />

          <div className="flex-1">
            <Card>
              <h2 className="font-semibold text-lg">
                Hackathon Work
              </h2>

              <p className="text-slate-400 mt-1">
                120 min
              </p>

              <span className="inline-block mt-3 bg-violet-500 px-3 py-1 rounded-full text-sm">
                AI Planned
              </span>
            </Card>
          </div>
        </div>

        {/* Task 3 */}
        <div className="flex gap-6 relative">
          <div className="w-16">
            <p className="font-semibold">22:00</p>
            <p className="text-xs text-slate-400">
              Planned
            </p>
          </div>

          <div className="absolute left-[28px] top-2 w-4 h-4 rounded-full bg-green-500 border-4 border-[#0F172A]" />

          <div className="flex-1">
            <Card>
              <h2 className="font-semibold text-lg">
                Evening Walk
              </h2>

              <p className="text-slate-400 mt-1">
                30 min
              </p>

              <span className="inline-block mt-3 bg-green-500 px-3 py-1 rounded-full text-sm">
                Wellness
              </span>
            </Card>
          </div>
        </div>

      </div>
    </main>
  );
}