"use client";

import { useState } from "react";

import TopDateBar from "./components/TopDateBar";
import TodayHeader from "./components/TodayHeader";
import Timeline from "./components/Timeline";
import RightSidebar from "./components/RightSidebar";

export default function SchedulePage() {

  const [selectedDay, setSelectedDay] = useState("Saturday");

  return (
    <main className="min-h-screen bg-[#0B1120] text-white">

      <TopDateBar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />

      <TodayHeader
        selectedDay={selectedDay}
      />

      <div className="px-8 pb-12">

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-10">
            <Timeline
              selectedDay={selectedDay}
            />
          </div>

          <div className="col-span-2">
            <RightSidebar />
          </div>

        </div>

      </div>

    </main>
  );
}
