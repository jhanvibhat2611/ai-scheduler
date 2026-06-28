"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TaskModal from "./TaskModal";

export default function QuickActions() {
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <>
      <div className="flex gap-5">

        {/* + Task */}
        <button
          onClick={() => setTaskOpen(true)}
          className="
            flex items-center gap-2
            rounded-full
            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500
            px-7
            py-4
            text-white
            font-semibold
            shadow-lg
            shadow-violet-300/50
            transition-all
            duration-300
            hover:scale-105
            hover:-translate-y-1
            hover:shadow-2xl
            hover:shadow-violet-300/60
          "
        >
          <Plus size={18} />
          Task
        </button>

        {/* + Event */}
        <button
          className="
            flex items-center gap-2
            rounded-full
            border
            border-violet-200
            bg-white/90
            backdrop-blur-xl
            px-7
            py-4
            text-violet-700
            font-semibold
            shadow-md
            transition-all
            duration-300
            hover:scale-105
            hover:-translate-y-1
            hover:bg-violet-50
            hover:shadow-xl
            hover:shadow-violet-200
          "
        >
          <Plus size={18} />
          Event
        </button>

      </div>

      <TaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
      />
    </>
  );
}