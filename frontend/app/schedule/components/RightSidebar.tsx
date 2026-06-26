"use client";

import { Brain, CheckSquare, Clock, TrendingUp } from "lucide-react";

export default function RightSidebar() {
  return (
    <div className="space-y-6">

      {/* Day Progress */}
      <div className="rounded-3xl border border-slate-800 bg-[#182133] p-6">

        <div className="flex items-center gap-2 text-slate-300">
          <TrendingUp size={18} />
          <span className="font-medium">Day Progress</span>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="h-32 w-32 rounded-full border-[10px] border-violet-500 flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-white">72%</p>
              <p className="text-xs text-slate-400 mt-1">
                Complete
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Upcoming */}
      <div className="rounded-3xl border border-slate-800 bg-[#182133] p-6">

        <div className="flex items-center gap-2 text-slate-300">
          <Clock size={18} />
          <span className="font-medium">Upcoming</span>
        </div>

        <div className="mt-5 rounded-2xl bg-[#0B1120] p-4">

          <p className="text-white font-semibold">
            Hackathon Work
          </p>

          <p className="text-sm text-slate-400 mt-1">
            10:00 AM - 12:00 PM
          </p>

          <span className="inline-block mt-4 rounded-full bg-green-600 px-3 py-1 text-xs font-medium">
            AI Planned
          </span>

        </div>

      </div>

      {/* Quick Tasks */}
      <div className="rounded-3xl border border-slate-800 bg-[#182133] p-6">

        <div className="flex items-center gap-2 text-slate-300">
          <CheckSquare size={18} />
          <span className="font-medium">
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
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                type="checkbox"
                className="h-5 w-5 accent-violet-500"
              />

              <span className="text-slate-300">
                {task}
              </span>
            </label>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="rounded-3xl border border-violet-700/40 bg-gradient-to-br from-violet-600/20 to-[#182133] p-6">

        <div className="flex items-center gap-2 text-violet-300">
          <Brain size={20} />
          <span className="font-semibold">
            Yumee Insight
          </span>
        </div>

        <p className="mt-5 leading-7 text-slate-300">
          Your focus window today is between
          <span className="text-white font-semibold">
            {" "}9 AM and 12 PM.
          </span>
          {" "}Try to complete your most important work before lunch.
        </p>

      </div>

    </div>
  );
}