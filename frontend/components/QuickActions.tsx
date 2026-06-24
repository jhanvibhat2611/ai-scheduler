"use client";

import { useState } from "react";
import QuickActionButton from "./QuickActionButton";
import TaskModal from "./TaskModal";

export default function QuickActions() {
  const [taskOpen, setTaskOpen] = useState(false);

  return (
    <>
      <div className="flex gap-3">
        <div onClick={() => setTaskOpen(true)}>
          <QuickActionButton title="+ Task" />
        </div>

        <QuickActionButton title="⚡ Schedule" />

        <QuickActionButton title="💬 Yumee" />
      </div>

      <TaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
      />
    </>
  );
}