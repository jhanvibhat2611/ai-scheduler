"use client";
import ScheduleLoading from "./ScheduleLoading";
import { useState } from "react";
import {
  Sparkles,
  Clock3,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

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
  const [loading, setLoading] = useState(false);

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
async function handleGenerate() {
  setLoading(true);
  await next(plans);
}
  return (
    <>
      {loading && <ScheduleLoading />}
      {/* Header */}

      <div className="text-center">

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
          <Sparkles
            size={30}
            className="text-violet-600"
          />
        </div>

        <h2 className="text-5xl font-bold text-slate-900">
          Your AI Plan
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-500">
          Yumee has transformed your goals into
          recurring habits. Feel free to edit
          durations, frequency or task names
          before generating your schedule.
        </p>

      </div>

      {/* Goal Plans */}

      <div className="mt-12 space-y-8">

        {plans.map((goal, goalIndex) => (

          <div
            key={goal.goal}
            className="
              rounded-3xl
              border
              border-violet-100
              bg-white
              p-7
              shadow-sm
            "
          >

            {/* Goal Header */}

            <div className="mb-7">

              <h3 className="text-2xl font-bold text-slate-900">
                {goal.goal}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-slate-500">

                <CalendarDays size={16} />

                <span>
                  {goal.deadline ?? "No Deadline"}
                </span>

              </div>

            </div>

            {/* Tasks */}

            <div className="space-y-5">

              {goal.tasks.map((task, taskIndex) => (

                <div
                  key={taskIndex}
                  className="
                    rounded-2xl
                    border
                    border-violet-100
                    bg-violet-50
                    p-5
                  "
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
                      text-xl
                      font-semibold
                      text-slate-900
                      outline-none
                    "
                  />

                  <div className="mt-6 grid grid-cols-2 gap-5">

                    {/* Duration */}

                    <div>

                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">

                        <Clock3 size={15} />

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
                          w-full
                          rounded-xl
                          border
                          border-violet-100
                          bg-white
                          p-3
                          text-slate-800
                          outline-none
                          focus:border-violet-400
                        "
                      />

                    </div>

                    {/* Times */}

                    <div>

                      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">

                        <Sparkles size={15} />

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
                          w-full
                          rounded-xl
                          border
                          border-violet-100
                          bg-white
                          p-3
                          text-slate-800
                          outline-none
                          focus:border-violet-400
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

      {/* Button */}

      <button
        onClick={handleGenerate}
        className="
          mt-12
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-[#6D5DF6]
          py-4
          text-lg
          font-semibold
          text-white
          shadow-[0_12px_30px_rgba(109,93,246,0.25)]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-[#5B4CE3]
        "
      >
        Generate My Schedule

        <ArrowRight
          size={18}
          strokeWidth={2.5}
        />

      </button>
    </>
  );
}