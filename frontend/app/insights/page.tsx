export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Patterns I've Learned
      </h1>

      <div className="space-y-4">

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          You focus best between 6 PM and 9 PM.
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          Workouts increase task completion by 80%.
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          DSA is your most consistent habit.
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          You tend to postpone tasks scheduled before 10 AM.
        </div>

      </div>

    </main>
  );
}