"use client";



import { useState } from "react";

import { ArrowRight, Sparkles } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

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
         <h2 className="text-4xl font-bold text-center text-slate-900">
          What are you working towards?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-center text-lg leading-8 text-slate-500">
          Yumee will break every goal into clear, actionable tasks and schedule them automatically.
        </p>

      {/* Examples */}

      <div className="mt-8 flex flex-wrap gap-3 justify-center">
        {exampleGoals.map((item) => (
          <button
            key={item}
            onClick={() => setGoal(item)}
            className="
            rounded-full
            border
            border-violet-100
            bg-white
            px-5
            py-3
            font-medium
            text-slate-700
            transition-all
            duration-300
            hover:border-violet-300
            hover:bg-violet-50
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
            rounded-2xl
            border
            border-violet-100
            bg-white
            p-4
            text-slate-900
            placeholder:text-slate-400
            focus:border-[#6D5DF6]
            focus:outline-none
            "
        />

{/* Deadline */}

<div>

  <p className="mb-3 font-semibold text-slate-700">
    Deadline
  </p>

  <div className="flex gap-4">

    <button
      onClick={() => setHasDeadline(false)}
      className={`flex-1 rounded-2xl border py-4 font-semibold transition-all duration-300 ${
        !hasDeadline
          ? "bg-[#6D5DF6] border-[#6D5DF6] text-white shadow-md"
          : "bg-white border-violet-100 text-slate-700 hover:bg-violet-50"
      }`}
    >
      No Deadline
    </button>

    <button
      onClick={() => setHasDeadline(true)}
      className={`flex-1 rounded-2xl border py-4 font-semibold transition-all duration-300 ${
        hasDeadline
          ? "bg-[#6D5DF6] border-[#6D5DF6] text-white shadow-md"
          : "bg-white border-violet-100 text-slate-700 hover:bg-violet-50"
      }`}
    >
      Set Deadline
    </button>

  </div>

</div>

{hasDeadline && (

  <div className="mt-5 grid grid-cols-2 gap-4">

    <select
      value={month}
      onChange={(e) => setMonth(e.target.value)}
      className="
        rounded-2xl
        border
        border-violet-100
        bg-white
        p-4
        text-slate-700
        focus:border-[#6D5DF6]
        focus:outline-none
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
        rounded-2xl
        border
        border-violet-100
        bg-white
        p-4
        text-slate-700
        placeholder:text-slate-400
        focus:border-[#6D5DF6]
        focus:outline-none
      "
    />

  </div>

)}

<button
  onClick={addGoal}
  className="
    mt-6
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    bg-[#6D5DF6]
    py-4
    font-semibold
    text-white
    shadow-[0_12px_30px_rgba(109,93,246,0.25)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:bg-[#5B4CE3]
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
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-violet-100
          bg-violet-50
          p-5
          shadow-sm
        "
      >

        <div className="flex items-center gap-4">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#6D5DF6]/10">
            🎯
          </div>

          <div>

            <p className="font-semibold text-slate-900">
              {goal.title}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {goal.deadline ?? "No deadline"}
            </p>

          </div>

        </div>

        <button
          onClick={() => removeGoal(index)}
          className="
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-red-500
            transition
            hover:bg-red-50
          "
        >
          Remove
        </button>

      </div>

    ))}

  </div>

)}
{loading && (
  <div
    className="
      fixed
      inset-0
      z-[999]
      flex
      items-center
      justify-center
      bg-white/35
      backdrop-blur-md
      animate-in
      fade-in
      duration-300
    "
  >
    <div
      className="
        w-[420px]
        rounded-[34px]
        bg-white/90
        backdrop-blur-xl
        shadow-2xl
        p-10
        text-center
        border
        border-violet-100
      "
    >
      {/* Magic Circle */}

      <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center">

        <div className="absolute inset-0 rounded-full border-2 border-violet-200 animate-spin duration-[7000ms]" />

        <div className="absolute h-20 w-20 rounded-full bg-violet-100/70 blur-xl" />

        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">

          <Sparkles
            className="text-violet-500 animate-pulse"
            size={34}
          />

        </div>

      </div>

      <h3 className="text-3xl font-bold text-slate-900">
        Breaking your goals
        <br />
        into tasks...
      </h3>

      <p className="mt-5 text-slate-500 leading-7">
        Yumee is understanding your goals,
        identifying milestones and creating
        your personalized roadmap.
      </p>

      <div className="mt-8 flex justify-center gap-2">
        <span className="h-3 w-3 rounded-full bg-violet-400 animate-bounce" />
        <span className="h-3 w-3 rounded-full bg-violet-300 animate-bounce [animation-delay:200ms]" />
        <span className="h-3 w-3 rounded-full bg-violet-200 animate-bounce [animation-delay:400ms]" />
      </div>

      <p className="mt-6 text-sm text-violet-500 font-medium">
        This usually takes a few seconds ✨
      </p>
    </div>
  </div>
)}
<button
  disabled={goals.length === 0 || loading}
  onClick={async () => {
  setLoading(true);
  await next(goals);
  setLoading(false);
}}
  className={`

    mt-10
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-2xl
    py-4
    text-lg
    font-semibold
    transition-all
    duration-300

    ${
      goals.length > 0
        ? "bg-[#6D5DF6] text-white shadow-[0_12px_30px_rgba(109,93,246,0.25)] hover:-translate-y-1 hover:bg-[#5B4CE3]"
        : "cursor-not-allowed bg-slate-200 text-slate-400"
    }

  `}
>
  Continue

  <ArrowRight
    size={18}
    strokeWidth={2.5}
  />

</button>
    </>
  );
}