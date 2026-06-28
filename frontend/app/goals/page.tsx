import GoalJourney from "../../components/GoalJourney";

export default function GoalsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8FF] pb-32">

      {/* Background Glow */}
      <div className="absolute left-[-220px] top-[-160px] h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-[180px]" />
      <div className="absolute right-[-220px] top-[180px] h-[450px] w-[450px] rounded-full bg-fuchsia-100/60 blur-[170px]" />
      <div className="absolute bottom-[-240px] left-[28%] h-[500px] w-[500px] rounded-full bg-purple-100/60 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-10 py-10">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
              Goals
            </p>

            <h1 className="mt-2 text-5xl font-bold text-slate-900">
              Your Journey
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-slate-500">
              AI-generated roadmaps that help you stay consistent and achieve
              your biggest ambitions.
            </p>

          </div>

          <button className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-4 font-semibold text-white shadow-xl shadow-violet-300/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            + New Goal
          </button>

        </div>

        {/* Goal Cards */}
        <div className="mt-10 space-y-8">

          <GoalJourney
            title="Morgan Stanley Internship"
            currentStep={3}
            steps={[
              "Aptitude",
              "Arrays",
              "Binary Search",
              "Graphs",
              "Dynamic Programming",
              "System Design",
              "Interview Ready",
            ]}
          />

          <GoalJourney
            title="Fitness Journey"
            currentStep={2}
            steps={[
              "Consistency",
              "2kg Lost",
              "5kg Lost",
              "10kg Lost",
              "Goal Weight",
            ]}
          />

        </div>

      </div>

    </main>
  );
}