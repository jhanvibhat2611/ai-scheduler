"use client";

import { useState } from "react";
import {
  CalendarDays,
  ArrowRight,
} from "lucide-react";

type Props = {
  commitment: string;
  onSave: (data: any) => void;
};

const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

export default function Step5({
  commitment,
  onSave,
}: Props) {

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [sameTime, setSameTime] = useState(true);

  function toggleDay(day: string) {

    if (selectedDays.includes(day)) {

      setSelectedDays(
        selectedDays.filter((d) => d !== day)
      );

    } else {

      setSelectedDays([
        ...selectedDays,
        day,
      ]);

    }

  }

  return (

    <div className="text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">

        <CalendarDays
          size={30}
          className="text-violet-600"
        />

      </div>

      <span className="inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">

        {commitment}

      </span>

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        When does this happen?
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-lg leading-8 text-slate-500">
        Select the days when this commitment usually happens.
      </p>

      {/* Days */}

      <div className="mt-10">

        <p className="mb-4 text-left font-semibold text-slate-700">
          Days of the week
        </p>

        <div className="flex flex-wrap justify-center gap-3">

          {weekDays.map((day) => {

            const active = selectedDays.includes(day);

            return (

              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`
                  rounded-full
                  px-6
                  py-3
                  font-medium
                  transition-all
                  duration-300
                  ${
                    active
                      ? "bg-[#6D5DF6] text-white shadow-lg"
                      : "border border-violet-100 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50"
                  }
                `}
              >
                {day}
              </button>

            );

          })}

        </div>

      </div>

      {/* Same Time */}

{/* Same Time */}

<div className="mt-12">

  <p className="mb-4 text-left font-semibold text-slate-700">
    Is it at the same time every day?
  </p>

  <div className="grid grid-cols-2 gap-4">

    <button
      onClick={() => setSameTime(true)}
      className={`rounded-2xl py-4 font-semibold transition-all duration-300 ${
        sameTime
          ? "bg-[#6D5DF6] text-white shadow-lg"
          : "bg-white border border-violet-100 text-slate-700 hover:bg-violet-50"
      }`}
    >
      Yes
    </button>

    <button
      onClick={() => setSameTime(false)}
      className={`rounded-2xl py-4 font-semibold transition-all duration-300 ${
        !sameTime
          ? "bg-[#6D5DF6] text-white shadow-lg"
          : "bg-white border border-violet-100 text-slate-700 hover:bg-violet-50"
      }`}
    >
      No
    </button>

  </div>

</div>

{/* Continue */}

<button
  onClick={() =>
    onSave({
      commitment,
      days: selectedDays,
      sameTime,
    })
  }
  disabled={selectedDays.length === 0}
  className={`mt-12 flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-semibold transition-all duration-300 ${
    selectedDays.length > 0
      ? "bg-[#6D5DF6] hover:bg-[#5B4CE3] text-white shadow-[0_12px_30px_rgba(109,93,246,0.25)]"
      : "bg-slate-200 text-slate-400 cursor-not-allowed"
  }`}
>
  Continue
  <ArrowRight size={18} />
</button>
    </div>
  );
}
