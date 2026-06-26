"use client";

export default function TodayHeader() {
  const today = new Date();

  const weekday = today.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const month = today.toLocaleDateString("en-US", {
    month: "long",
  });

  const date = today.getDate();

  return (
    <div className="px-8 pt-8 pb-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Today's Schedule
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            {weekday}, {date} {month}
          </h1>

          <p className="mt-3 text-slate-400">
            You have <span className="text-white font-semibold">8 tasks</span> planned today.
          </p>

        </div>

        <div className="rounded-3xl bg-[#182133] border border-slate-700 px-6 py-5 text-center min-w-[180px]">

          <p className="text-slate-400 text-sm">
            Productivity Score
          </p>

          <h2 className="mt-2 text-5xl font-bold text-violet-400">
            92%
          </h2>

          <p className="mt-2 text-xs text-slate-500">
            Based on today's plan
          </p>

        </div>

      </div>

    </div>
  );
}