import Card from "../../components/Card";

export default function GoalsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        Goals
      </h1>

      <div className="space-y-4">

        <Card>
          <h2 className="text-xl font-semibold">
            Morgan Stanley Internship
          </h2>

          <p className="text-slate-400 mt-2">
            Complete DSA and interview preparation.
          </p>

          <div className="mt-4">
            <div className="bg-slate-700 rounded-full h-3">
              <div className="bg-blue-500 h-3 rounded-full w-[65%]"></div>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              65% Complete
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-semibold">
            Fitness Journey
          </h2>

          <p className="text-slate-400 mt-2">
            Reach target weight and improve consistency.
          </p>

          <div className="mt-4">
            <div className="bg-slate-700 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full w-[40%]"></div>
            </div>

            <p className="mt-2 text-sm text-slate-400">
              40% Complete
            </p>
          </div>
        </Card>

      </div>
    </main>
  );
}