"use client";

import { useState } from "react";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (task: any) => void;
};

export default function TaskModal({
  open,
  onClose,
  onCreate,
}: TaskModalProps) {
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Study");
  const [date, setDate] = useState("");
  const [autoSchedule, setAutoSchedule] = useState(false);

  if (!open) return null;

  function handleCreate() {
    if (!taskName.trim()) return;

    onCreate({
      taskName,
      duration: Number(duration),
      category,
      date,
      autoSchedule,
    });

    setTaskName("");
    setDuration("");
    setCategory("Study");
    setDate("");
    setAutoSchedule(false);

    onClose();
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/35
        backdrop-blur-lg
        p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-xl
          rounded-[32px]
          border
          border-violet-100
          bg-white
          p-8
          shadow-[0_30px_80px_rgba(109,93,246,0.18)]
        "
      >
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Create Task
            </h2>

            <p className="mt-1 text-slate-500">
              Add a new task or let Yumee schedule it automatically.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-slate-400
              transition
              hover:bg-violet-50
              hover:text-violet-600
            "
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">

          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:border-violet-400
            "
          />

          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            placeholder="Duration (minutes)"
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:border-violet-400
            "
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          >
            <option>Study</option>
            <option>Fitness</option>
            <option>Career</option>
            <option>Personal</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-5
            "
          >
            <div>
              <p className="font-semibold text-slate-900">
                Let Yumee Schedule It ✨
              </p>

              <p className="mt-1 text-sm text-slate-500">
                AI finds the best free slot based on your calendar.
              </p>
            </div>

            <input
              type="checkbox"
              checked={autoSchedule}
              onChange={(e) => setAutoSchedule(e.target.checked)}
              className="h-5 w-5 accent-violet-600"
            />
          </div>

          <button
            onClick={handleCreate}
            className="
              w-full
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
            Create Task
          </button>

        </div>
      </div>
    </div>
  );
}