"use client";

import { useState } from "react";

type Task = {
  name: string;
  duration: number;
  times_per_week: number;
};

type GoalPlan = {
  goal: string;
  deadline: string | null;
  tasks: Task[];
};

type Props = {
  goalPlans: GoalPlan[];
  next: (plans: GoalPlan[]) => void;
};

export default function Step8({
  goalPlans,
  next,
}: Props) {

  const [plans, setPlans] = useState(goalPlans);

  function updateTask(
    goalIndex: number,
    taskIndex: number,
    field: keyof Task,
    value: string
  ) {

    const updated = [...plans];

    updated[goalIndex].tasks[taskIndex] = {
      ...updated[goalIndex].tasks[taskIndex],
      [field]:
        field === "name"
          ? value
          : Number(value),
    };

    setPlans(updated);

  }

  return (

    <>

      <h2 className="text-4xl font-bold text-center text-white">
        Your AI Plan
      </h2>

      <p className="text-center text-slate-400 mt-3">
        Yumee broke your goals into recurring habits.
        You can edit anything before continuing.
      </p>

      <div className="mt-10 space-y-10">

        {plans.map((goal, goalIndex) => (

          <div
            key={goal.goal}
            className="rounded-3xl border border-slate-700 bg-[#0F172A] p-6"
          >

            <h3 className="text-2xl font-bold text-white">
              {goal.goal}
            </h3>

            <p className="text-slate-400 mt-1">
              {goal.deadline ?? "No Deadline"}
            </p>

            <div className="space-y-5 mt-8">

              {goal.tasks.map((task, taskIndex) => (

                <div
                  key={taskIndex}
                  className="rounded-2xl bg-[#1E293B] border border-slate-700 p-5"
                >

                  <input
                    value={task.name}
                    onChange={(e) =>
                      updateTask(
                        goalIndex,
                        taskIndex,
                        "name",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      bg-transparent
                      text-white
                      text-lg
                      font-semibold
                      outline-none
                    "
                  />

                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div>

                      <label className="text-slate-400 text-sm">
                        Duration (mins)
                      </label>

                      <input
                        type="number"
                        value={task.duration}
                        onChange={(e) =>
                          updateTask(
                            goalIndex,
                            taskIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        className="
                          mt-2
                          w-full
                          bg-[#0F172A]
                          border
                          border-slate-700
                          rounded-xl
                          p-3
                          text-white
                        "
                      />

                    </div>

                    <div>

                      <label className="text-slate-400 text-sm">
                        Times / Week
                      </label>

                      <input
                        type="number"
                        value={task.times_per_week}
                        onChange={(e) =>
                          updateTask(
                            goalIndex,
                            taskIndex,
                            "times_per_week",
                            e.target.value
                          )
                        }
                        className="
                          mt-2
                          w-full
                          bg-[#0F172A]
                          border
                          border-slate-700
                          rounded-xl
                          p-3
                          text-white
                        "
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

      <button
        onClick={() => next(plans)}
        className="
          mt-12
          w-full
          bg-violet-600
          hover:bg-violet-500
          transition
          py-4
          rounded-2xl
          text-lg
          font-semibold
        "
      >
        Generate My Schedule
      </button>

    </>

  );

}