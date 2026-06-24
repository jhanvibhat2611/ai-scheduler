export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="text-4xl font-bold mb-6">
        Good Evening, Jhanvi 👋
      </h1>

      <div className="bg-[#1E293B] rounded-3xl p-6 mb-4">
        <p className="text-slate-400">Today's Progress</p>
        <h2 className="text-5xl font-bold mt-2 text-blue-400">
          72%
        </h2>
      </div>

      <div className="bg-[#1E293B] rounded-3xl p-6 mb-4">
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
      </div>

      <div className="bg-[#1E293B] rounded-3xl p-6 mb-4">
        <h2 className="text-xl font-semibold mb-3">
          Active Goals
        </h2>

        <div className="space-y-3">
          <div className="bg-[#334155] p-3 rounded-xl">
            🎯 Morgan Stanley Internship
          </div>

          <div className="bg-[#334155] p-3 rounded-xl">
            🎯 Fitness Journey
          </div>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-3xl p-6">
        <h2 className="text-xl font-semibold mb-3">
          Yumee Insight
        </h2>

        <p className="text-slate-300">
          You complete 80% more tasks after workouts.
        </p>
      </div>

    </main>
  );
}