"use client";

import { useState } from "react";

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
    }

    else {
      setSelectedDays([
        ...selectedDays,
        day,
      ]);
    }

  }

  return (
    <div>

      <h2 className="text-4xl font-bold text-center text-white">
        {commitment}
      </h2>

      <p className="text-center text-slate-400 mt-3">
        Tell Yumee when this commitment usually happens.
      </p>

      {/* Days */}

      <div className="mt-10">

        <p className="text-white font-semibold mb-4">
          Which days?
        </p>

        <div className="flex flex-wrap gap-3">

          {weekDays.map((day) => (

            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={`px-5 py-3 rounded-full border transition
              ${
                selectedDays.includes(day)
                  ? "bg-violet-600 border-violet-600 text-white"
                  : "bg-[#0F172A] border-slate-700 text-slate-300 hover:border-violet-500"
              }`}
            >
              {day}
            </button>

          ))}

        </div>

      </div>

      {/* Same Timings */}

      <div className="mt-10">

        <p className="text-white font-semibold mb-4">
          Is the timing the same every selected day?
        </p>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => setSameTime(true)}
            className={`rounded-xl py-4 border transition font-medium
            ${
              sameTime
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-[#0F172A] border-slate-700 text-slate-300 hover:border-violet-500"
            }`}
          >
            Yes
          </button>

          <button
            onClick={() => setSameTime(false)}
            className={`rounded-xl py-4 border transition font-medium
            ${
              !sameTime
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-[#0F172A] border-slate-700 text-slate-300 hover:border-violet-500"
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
        className={`w-full mt-12 py-4 rounded-2xl text-lg font-semibold transition
        ${
          selectedDays.length === 0
            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-500 text-white"
        }`}
      >
        Continue
      </button>

    </div>
  );
}