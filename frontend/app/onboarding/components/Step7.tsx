"use client";

import { useState } from "react";

type Goal = {
  title: string;
  deadline: string | null;
};

type Props = {
  next: (goals: Goal[]) => void;
};

const exampleGoals = [
  "Dream Job",
  "Health Goal",
  "Learn a New Skill",
  "Financial Goal",
  "Academic Goal",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Step7({ next }: Props) {
  const [goal, setGoal] = useState("");

  const [hasDeadline, setHasDeadline] = useState(false);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [goals, setGoals] = useState<Goal[]>([]);

  function addGoal() {
    if (!goal.trim()) return;

    if (
      goals.some(
        (g) =>
          g.title.toLowerCase() === goal.trim().toLowerCase()
      )
    ) {
      return;
    }

    const deadline =
      hasDeadline && month && year
        ? `${month} ${year}`
        : null;

    setGoals([
      ...goals,
      {
        title: goal.trim(),
        deadline,
      },
    ]);

    setGoal("");
    setHasDeadline(false);
    setMonth("");
    setYear("");
  }

  function removeGoal(index: number) {
    setGoals(goals.filter((_, i) => i !== index));
  }

  return (
    <>
      <h2 className="text-4xl font-bold text-center text-white">
        What are you working towards?
      </h2>

      <p className="text-center text-slate-400 mt-3">
        Yumee will break every goal into actionable tasks.
      </p>

      {/* Examples */}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {exampleGoals.map((item) => (
          <button
            key={item}
            onClick={() => setGoal(item)}
            className="
              px-4
              py-2
              rounded-full
              bg-[#0F172A]
              border
              border-slate-700
              text-slate-300
              hover:border-violet-500
              transition
            "
          >
            {item}
          </button>
        ))}
      </div>

      {/* Goal Input */}

      <div className="mt-10 space-y-5">
        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter a goal..."
          className="
            w-full
            bg-[#0F172A]
            border
            border-slate-700
            rounded-xl
            p-4
            text-white
            placeholder:text-slate-500
            focus:outline-none
            focus:border-violet-500
          "
        />

        {/* Deadline */}

        <div>
          <p className="text-white mb-3 font-medium">
            Deadline
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setHasDeadline(false)}
              className={`flex-1 rounded-xl p-4 border transition ${
                !hasDeadline
                  ? "bg-violet-600 border-violet-600"
                  : "bg-[#0F172A] border-slate-700"
              }`}
            >
              No Deadline
            </button>

            <button
              onClick={() => setHasDeadline(true)}
              className={`flex-1 rounded-xl p-4 border transition ${
                hasDeadline
                  ? "bg-violet-600 border-violet-600"
                  : "bg-[#0F172A] border-slate-700"
              }`}
            >
              Set Deadline
            </button>
          </div>
        </div>

        {hasDeadline && (
          <div className="grid grid-cols-2 gap-4">
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="
                bg-[#0F172A]
                border
                border-slate-700
                rounded-xl
                p-4
                text-white
              "
            >
              <option value="">Month</option>

              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="2026"
              max="2100"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Year"
              className="
                bg-[#0F172A]
                border
                border-slate-700
                rounded-xl
                p-4
                text-white
                placeholder:text-slate-500
              "
            />
          </div>
        )}

        <button
          onClick={addGoal}
          className="
            w-full
            bg-violet-600
            hover:bg-violet-500
            transition
            py-4
            rounded-xl
            font-semibold
          "
        >
          Add Goal
        </button>
      </div>

      {/* Goals */}

      {goals.length > 0 && (
        <div className="mt-10 space-y-4">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="
                bg-[#0F172A]
                border
                border-slate-700
                rounded-xl
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <p className="font-semibold text-white">
                  🎯 {goal.title}
                </p>

                <p className="text-slate-400 text-sm mt-1">
                  {goal.deadline ?? "No Deadline"}
                </p>
              </div>

              <button
                onClick={() => removeGoal(index)}
                className="
                  text-red-400
                  hover:text-red-300
                  transition
                  text-sm
                "
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        disabled={goals.length === 0}
        onClick={() => next(goals)}
        className={`
          w-full
          mt-10
          py-4
          rounded-2xl
          font-semibold
          transition

          ${
            goals.length > 0
              ? "bg-violet-600 hover:bg-violet-500 text-white"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }
        `}
      >
        Continue
      </button>
    </>
  );
}