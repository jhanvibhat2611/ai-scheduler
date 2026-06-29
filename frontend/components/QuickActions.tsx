"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import TaskModal from "./TaskModal";
import EventModal from "./EventModal";

import {
  addDoc,
  collection,
  getDocs,
  Timestamp,
} from "firebase/firestore";

import { db } from "../lib/firebase";

export default function QuickActions() {
  const [taskOpen, setTaskOpen] = useState(false);
  const [eventOpen, setEventOpen] = useState(false);

  function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

    function minutesToTime(minutes: number) {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;

      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

async function handleCreateTask(task: any) {

  try {

    const day = new Date(task.date).toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    const snapshot = await getDocs(
      collection(db, "tasks")
    );

    const dayTasks = snapshot.docs
      .map((doc) => doc.data())
      .filter((t: any) => t.day === day)
      .sort(
        (a: any, b: any) =>
          timeToMinutes(a.start) -
          timeToMinutes(b.start)
      );

    const duration = Number(task.duration);

    let current = 6 * 60; // 6 AM

    for (const existing of dayTasks) {

      const existingStart = timeToMinutes(
        existing.start
      );

      const existingEnd = timeToMinutes(
        existing.end
      );

      if (
        current + duration <=
        existingStart
      ) {
        break;
      }

      current = Math.max(
        current,
        existingEnd
      );

    }

    const start = minutesToTime(current);

    const end = minutesToTime(
      current + duration
    );

    await addDoc(
      collection(db, "tasks"),
      {

        title: task.taskName,

        category: task.category,

        duration,

        day,

        start,

        end,

        completed: false,

        autoSchedule:
          task.autoSchedule,

        createdAt:
          Timestamp.now(),

      }
    );

    setTaskOpen(false);

  }

  catch (err) {

    console.error(err);

  }

}

async function handleCreateEvent(event: any) {
  try {
    const snapshot = await getDocs(collection(db, "tasks"));

    for (const day of event.days) {

      const dayTasks = snapshot.docs
        .map((doc) => doc.data())
        .filter((t: any) => t.day === day)
        .sort(
          (a: any, b: any) =>
            timeToMinutes(a.start) -
            timeToMinutes(b.start)
        );

      const duration = Number(event.duration);

      let current = 6 * 60;

      for (const existing of dayTasks) {
        const existingStart = timeToMinutes(existing.start);
        const existingEnd = timeToMinutes(existing.end);

        if (current + duration <= existingStart) {
          break;
        }

        current = Math.max(current, existingEnd);
      }

      await addDoc(collection(db, "tasks"), {
        title: event.title,
        duration,
        day,
        start: minutesToTime(current),
        end: minutesToTime(current + duration),

        recurring: true,
        completed: false,

        createdAt: Timestamp.now(),
      });
    }

    setEventOpen(false);

  } catch (err) {
    console.error(err);
  }
}

  return (
    <>
      <div className="flex gap-5">

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
          "
        >
          <Plus size={18} />
          Task
        </button>


        <button
            onClick={() => setEventOpen(true)}
          className="
            flex items-center gap-2
            rounded-full
            border
            border-violet-200
            bg-white/90
            px-7
            py-4
            text-violet-700
            font-semibold
          "
        >
          <Plus size={18} />
          Event

        </button>

      </div>

      <TaskModal
        open={taskOpen}
        onClose={() => setTaskOpen(false)}
        onCreate={handleCreateTask}
      />
      <EventModal
      open={eventOpen}
      onClose={() => setEventOpen(false)}
      onCreate={handleCreateEvent}
    />
    </>
  );
}