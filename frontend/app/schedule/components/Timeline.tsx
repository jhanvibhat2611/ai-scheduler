"use client";

import { useEffect, useState } from "react";

import ScheduleCard from "./ScheduleCard";
import CurrentTimeIndicator from "./CurrentTimeIndicator";
import TaskDrawer from "./TaskDrawer";

import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";

const PIXELS_PER_HOUR = 96;
const START_HOUR = 6;

const hours = Array.from({ length: 18 }, (_, i) => i + START_HOUR);

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${suffix}`;
}

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

type Props = {
  selectedDay: string;
};

export default function Timeline({
  selectedDay,
}: Props) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
  async function loadSchedule() {
    try {
      const snapshot = await getDocs(
        collection(db, "tasks")
      );

      const firebaseTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(firebaseTasks);

    } catch (error) {
      console.error(error);
    }
  }

  loadSchedule();
}, []);

  function openTask(task: any) {
    setSelectedTask(task);
    setDrawerOpen(true);
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setTimeout(() => setSelectedTask(null), 300);
  }

  return (
    <>
      <div className="relative px-8 py-6">

        <CurrentTimeIndicator />

        {/* Timeline */}
        {hours.map((hour) => (
          <div
            key={hour}
            className="relative flex h-24 border-b border-slate-800"
          >
            <div className="w-24 flex-shrink-0 pt-1 text-sm text-slate-400">
              {formatHour(hour)}
            </div>

            <div className="relative flex w-8 justify-center">
              <div className="absolute top-0 bottom-0 w-px bg-slate-700" />

              <div className="absolute top-3 h-3 w-3 rounded-full border-2 border-[#0B1120] bg-slate-500" />
            </div>

            <div className="flex-1" />
          </div>
        ))}

        {/* Schedule Cards */}
        <div
          className="absolute"
          style={{
            left: 130,
            right: 10,
            top: 24,
          }}
          >
          {tasks
              .filter((task) => task.day === selectedDay)
              .map((task: any,index) => {
            let startMinutes =
              timeToMinutes(task.start);

            let endMinutes =
              timeToMinutes(task.end);

            // Clip anything before 6 AM
            startMinutes = Math.max(
              startMinutes,
              START_HOUR * 60
            );

            // Ignore tasks that finish before 6 AM
            if (endMinutes <= START_HOUR * 60) {
              return null;
            }

            startMinutes -= START_HOUR * 60;
            endMinutes -= START_HOUR * 60;
            const top =
              (startMinutes / 60) * PIXELS_PER_HOUR;

            const height =
              ((endMinutes - startMinutes) / 60) *
              PIXELS_PER_HOUR;

            console.log(task.title);
            console.log(task.start, task.end);
            console.log(startMinutes, endMinutes);
            console.log(height);

            return (
              <div
                key={`${task.day}-${task.title}-${task.start}-${task.end}`}
                className="absolute left-0 right-0"
                style={{
                  top,
                  height,
                  minHeight: "42px",
                  left: "0px",
                  right: "0px",
                  zIndex: task.title === "Sleep" ? 0 : 10,

                }}
              >
                <ScheduleCard
                  {...task}
                  onClick={() => openTask(task)}
                />
              </div>
            );
          })}
        </div>

      </div>

      <TaskDrawer
        task={selectedTask}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}