"use client";

import {
  X,
  Clock3,
  Target,
  BookOpen,
  Sparkles,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

import { completeTask } from "@/lib/api";

type Task = {
  title: string;
  start: string;
  end: string;
  tag: string;
};

type Props = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
};

export default function TaskDrawer({
  task,
  open,
  onClose,
}: Props) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-all
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* Drawer */}
      <div
        className={`
          fixed right-0 top-0 z-50 h-screen w-[430px]
          bg-[#111827]
          border-l border-slate-800
          transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {task && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 p-7">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {task.title}
                </h2>

                <p className="mt-2 text-slate-400">
                  {task.start} — {task.end}
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 transition hover:bg-slate-800"
              >
                <X />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-7 p-7">

              <div className="rounded-2xl bg-[#182133] p-5">
                <div className="flex items-center gap-3">
                  <Clock3 className="text-violet-400" />
                  <span className="text-slate-300">
                    Duration
                  </span>
                </div>

                <p className="mt-3 text-xl font-semibold text-white">
                  {task.start} - {task.end}
                </p>
              </div>

              <div className="rounded-2xl bg-[#182133] p-5">
                <div className="flex items-center gap-3">
                  <Target className="text-violet-400" />
                  <span className="text-slate-300">
                    Goal
                  </span>
                </div>

                <p className="mt-3 font-semibold text-white">
                  {task.tag}
                </p>
              </div>

              <div className="rounded-2xl bg-[#182133] p-5">
                <div className="flex items-center gap-3">
                  <BookOpen className="text-violet-400" />
                  <span className="text-slate-300">
                    Resources
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-slate-300">
                  <li>• Study Material</li>
                  <li>• YouTube Playlist</li>
                  <li>• Practice Problems</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-violet-700/40 bg-gradient-to-br from-violet-600/20 to-[#182133] p-5">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-violet-300" />

                  <span className="font-semibold text-violet-200">
                    Yumee Suggestion
                  </span>
                </div>

                <p className="mt-4 leading-7 text-slate-300">
                  Based on your previous productivity,
                  this task is best completed without
                  interruptions. Consider enabling Focus
                  Mode.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-[#111827] p-6">

              <div className="grid grid-cols-3 gap-3">

                <button
                  onClick={async () => {

                    try {

                      await completeTask({
                        task: task.title,
                        planned_start: task.start,
                        planned_end: task.end,
                        actual_duration: null,
                      });

                      alert("✅ Task Completed!");

                      onClose();

                    } catch (error) {

                      console.error(error);

                      alert("Failed to save task.");

                    }

                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-4 transition hover:bg-green-500"
                >
                  <CheckCircle2 size={18} />
                  Complete
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 transition hover:bg-amber-400">
                  <RotateCcw size={18} />
                  Move
                </button>

                <button className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 transition hover:bg-violet-500">
                  <Sparkles size={18} />
                  Ask AI
                </button>

              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}