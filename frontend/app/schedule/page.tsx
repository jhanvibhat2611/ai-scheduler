export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Weekly Schedule
      </h1>

      <div className="space-y-4">

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <h2 className="font-bold text-blue-400 mb-2">
            Monday
          </h2>

          <p>DSA Practice • 6 PM - 7 PM</p>
          <p>Gym • 7:30 PM - 8:30 PM</p>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <h2 className="font-bold text-blue-400 mb-2">
            Tuesday
          </h2>

          <p>Hackathon • 5 PM - 8 PM</p>
        </div>

        <div className="bg-[#1E293B] p-5 rounded-3xl">
          <h2 className="font-bold text-blue-400 mb-2">
            Wednesday
          </h2>

          <p>Project Work • 6 PM - 8 PM</p>
        </div>

      </div>

    </main>
  );
}