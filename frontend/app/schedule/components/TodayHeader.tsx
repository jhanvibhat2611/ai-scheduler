"use client";

type Props = {
  selectedDay: string;
  taskCount: number;
  selectedDate: Date;
};

export default function TodayHeader({
  selectedDay,
  taskCount,
  selectedDate,
}: Props) {
  const month = selectedDate.toLocaleDateString("en-US", {
    month: "long",
  });

  const date = selectedDate.getDate();

  return (
    <div className="px-10 pt-10 pb-8">
      <div className="flex items-start justify-between">

        {/* Left */}

        <div>

          <p className="text-sm font-bold uppercase tracking-[0.28em] text-violet-500">
            Today's Schedule
          </p>

          <h1 className="mt-3 text-5xl font-bold tracking-tight text-gray-900">
            {selectedDay}, {date} {month}
          </h1>

          <p className="mt-4 text-lg text-gray-500">
          </p>

        </div>

        {/* Productivity Card */}

        <div
          className="
            rounded-[32px]
            border border-violet-100
            bg-white/90
            backdrop-blur-xl
            px-8
            py-7
            shadow-[0_20px_50px_rgba(139,92,246,0.12)]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-[0_25px_60px_rgba(139,92,246,0.18)]
          "
        >

          <p className="text-sm font-semibold text-gray-500">
            Productivity Score
          </p>

          <h2 className="mt-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-6xl font-bold text-transparent">
            92%
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Based on today's schedule
          </p>

        </div>

      </div>
    </div>
  );
}