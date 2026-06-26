"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

export default function TopDateBar() {
  const today = new Date();

  const [weekOffset, setWeekOffset] = useState(0);

  const week = useMemo(() => {
    const current = new Date(today);

    current.setDate(
      today.getDate() -
        today.getDay() +
        (today.getDay() === 0 ? -6 : 1) +
        weekOffset * 7
    );

    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date(current);

      date.setDate(current.getDate() + i);

      return {
        fullDate: date,
        day: date
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .toUpperCase(),
        date: date.getDate(),
        month: date
          .toLocaleDateString("en-US", {
            month: "short",
          })
          .toUpperCase(),
      };
    });
  }, [weekOffset]);

  const [selected, setSelected] = useState(
    week.findIndex(
      (d) =>
        d.date === today.getDate() &&
        d.month ===
          today
            .toLocaleDateString("en-US", {
              month: "short",
            })
            .toUpperCase()
    )
  );

  return (
    <div className="sticky top-0 z-20 bg-[#0B1120] border-b border-slate-800">
      <div className="flex items-center gap-5 px-8 py-5">
        <button
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="h-12 w-12 rounded-xl bg-[#182133] hover:bg-slate-700 transition flex items-center justify-center"
        >
          <ChevronLeft size={22} />
        </button>

        <div className="flex-1 flex justify-center gap-4 overflow-hidden">
          {week.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`
                min-w-[96px]
                rounded-3xl
                px-5
                py-4
                transition-all
                duration-300
                ${
                  selected === index
                    ? "bg-violet-600 shadow-xl shadow-violet-600/40 scale-105"
                    : "bg-[#182133] hover:bg-slate-700"
                }
              `}
            >
              <p
                className={`text-sm font-semibold tracking-wider ${
                  selected === index
                    ? "text-white"
                    : "text-slate-400"
                }`}
              >
                {item.day}
              </p>

              <p className="text-4xl font-bold mt-2 text-white">
                {item.date}
              </p>

              <p
                className={`mt-1 text-xs tracking-widest ${
                  selected === index
                    ? "text-violet-100"
                    : "text-slate-500"
                }`}
              >
                {item.month}
              </p>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            setWeekOffset(0);

            const jsDay = today.getDay();
            const mondayIndex = jsDay === 0 ? 6 : jsDay - 1;

            setSelected(mondayIndex);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#182133] hover:bg-slate-700 transition px-5 py-3"
        >
          <CalendarDays size={18} />
          Today
        </button>

        <button
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="h-12 w-12 rounded-xl bg-[#182133] hover:bg-slate-700 transition flex items-center justify-center"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}