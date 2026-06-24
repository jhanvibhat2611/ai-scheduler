export default function GoalsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Goal Journey
      </h1>

      <div className="space-y-4">

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">
              Morgan Stanley Internship
            </h2>

            <span className="text-blue-400">
              70%
            </span>
          </div>

          <div className="w-full bg-[#334155] h-3 rounded-full">
            <div className="bg-blue-500 h-3 rounded-full w-[70%]" />
          </div>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">
              Fitness Journey
            </h2>

            <span className="text-blue-400">
              55%
            </span>
          </div>

          <div className="w-full bg-[#334155] h-3 rounded-full">
            <div className="bg-blue-500 h-3 rounded-full w-[55%]" />
          </div>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <div className="flex justify-between mb-2">
            <h2 className="font-semibold">
              Hackathon Project
            </h2>

            <span className="text-blue-400">
              40%
            </span>
          </div>

          <div className="w-full bg-[#334155] h-3 rounded-full">
            <div className="bg-blue-500 h-3 rounded-full w-[40%]" />
          </div>
        </div>

      </div>

    </main>
  );
}