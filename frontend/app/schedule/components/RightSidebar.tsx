"use client";

import {
  Brain,
  CheckSquare,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="space-y-6">
      {/* Day Progress */}

      <div className="rounded-[30px] border border-violet-100 bg-white/85 backdrop-blur-xl p-6 shadow-xl shadow-violet-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <div className="flex items-center gap-2 text-slate-700">
          <TrendingUp size={18} className="text-violet-500" />
          <span className="font-semibold">
            Day Progress
          </span>
        </div>

        <div className="mt-6 flex justify-center">

          <div className="relative flex h-36 w-36 items-center justify-center">

            <div className="absolute inset-0 rounded-full border-[10px] border-violet-200" />

            <div
              className="absolute inset-0 rounded-full border-[10px] border-violet-500"
              style={{
                clipPath: "inset(0 28% 0 0)",
              }}
            />

            <div className="text-center">

              <p className="text-4xl font-bold text-slate-900">
                72%
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Complete
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Upcoming */}

      <div className="rounded-[30px] border border-violet-100 bg-white/85 backdrop-blur-xl p-6 shadow-xl shadow-violet-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <div className="flex items-center gap-2 text-slate-700">
          <Clock size={18} className="text-violet-500" />
          <span className="font-semibold">
            Upcoming
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-violet-100 bg-[#FAF7FF] p-5">

          <p className="text-lg font-bold text-slate-900">
            Hackathon Work
          </p>

          <p className="mt-1 text-sm text-slate-500">
            10:00 AM – 12:00 PM
          </p>

          <span className="mt-4 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            AI Planned
          </span>

        </div>

      </div>

      {/* Quick Tasks */}

      <div className="rounded-[30px] border border-violet-100 bg-white/85 backdrop-blur-xl p-6 shadow-xl shadow-violet-100/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

        <div className="flex items-center gap-2 text-slate-700">
          <CheckSquare size={18} className="text-violet-500" />
          <span className="font-semibold">
            Quick Tasks
          </span>
        </div>

        <div className="mt-5 space-y-4">

          {[
            "Drink Water 💧",
            "Protein Shake 🥤",
            "Evening Walk 🚶",
            "Read 10 Pages 📚",
          ].map((task) => (

            <label
              key={task}
              className="group flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-violet-50"
            >

              <input
                type="checkbox"
                className="h-5 w-5 accent-violet-500"
              />

              <span className="text-slate-700 group-hover:text-violet-700">
                {task}
              </span>

            </label>

          ))}

        </div>

      </div>

      {/* Yumee Insight */}

      <div className="rounded-[30px] bg-gradient-to-br from-violet-500 via-violet-400 to-fuchsia-400 p-[1px] shadow-xl shadow-violet-300/40">

        <div className="rounded-[29px] bg-white/90 backdrop-blur-xl p-6">

          <div className="flex items-center gap-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">

              <Brain
                size={18}
                className="text-violet-600"
              />

            </div>

            <div>

              <p className="font-semibold text-slate-900">
                Yumee Insight
              </p>

              <p className="text-xs text-slate-500">
                Personalized Recommendation
              </p>

            </div>

          </div>

          <p className="mt-5 leading-7 text-slate-600">

            Your focus window today is between

            <span className="font-semibold text-violet-700">
              {" "}9 AM – 12 PM
            </span>.

            Complete your most demanding work before lunch for maximum productivity.

          </p>

        </div>

      </div>

    </div>
  );
}