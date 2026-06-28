"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

type Props = {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
};

export default function TopDateBar({
  selectedDay,
  setSelectedDay,
}: Props) {

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
        day: date.toLocaleDateString("en-US", {
          weekday: "long",
        }),
        shortDay: date
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

  return (

    <div className="sticky top-0 z-30 border-b border-violet-100 bg-white/75 backdrop-blur-3xl">

      <div className="mx-auto flex max-w-7xl items-center gap-6 px-10 py-6">

        {/* Left */}

        <button
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          border border-violet-100
          bg-white
          shadow-lg shadow-violet-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
        >
          <ChevronLeft
            size={20}
            className="text-violet-700"
          />
        </button>

        {/* Week */}

        <div className="flex flex-1 justify-center gap-4 overflow-hidden">

          {week.map((item) => (

            <button
              key={item.day + item.date}
              onClick={() => setSelectedDay(item.day)}
              className={`
                min-w-[98px]
                rounded-[28px]
                border
                transition-all
                duration-300
                px-5
                py-5
                hover:-translate-y-1
                ${
                  selectedDay === item.day
                    ? "border-transparent bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-2xl shadow-violet-300 scale-105"
                    : "border-violet-100 bg-white text-gray-900 shadow-md hover:shadow-xl hover:border-violet-200"
                }
              `}
            >

              <p
                className={`text-xs font-bold tracking-[0.22em] ${
                  selectedDay === item.day
                    ? "text-violet-100"
                    : "text-gray-500"
                }`}
              >
                {item.shortDay}
              </p>

              <p className="mt-2 text-4xl font-bold">
                {item.date}
              </p>

              <p
                className={`mt-1 text-xs tracking-[0.25em] ${
                  selectedDay === item.day
                    ? "text-violet-100"
                    : "text-gray-400"
                }`}
              >
                {item.month}
              </p>

            </button>

          ))}

        </div>

        {/* Today */}

        <button
          onClick={() => {

            setWeekOffset(0);

            setSelectedDay(
              today.toLocaleDateString("en-US", {
                weekday: "long",
              })
            );

          }}
          className="
          flex items-center gap-2
          rounded-2xl
          border border-violet-100
          bg-white
          px-6
          py-3
          font-semibold
          text-violet-700
          shadow-lg shadow-violet-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
        >
          <CalendarDays size={18} />
          Today
        </button>

        {/* Right */}

        <button
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          border border-violet-100
          bg-white
          shadow-lg shadow-violet-100
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
        >
          <ChevronRight
            size={20}
            className="text-violet-700"
          />
        </button>

      </div>

    </div>

  );

}