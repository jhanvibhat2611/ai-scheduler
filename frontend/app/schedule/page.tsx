"use client";

import { useState } from "react";

import TopDateBar from "./components/TopDateBar";
import TodayHeader from "./components/TodayHeader";
import Timeline from "./components/Timeline";
import RightSidebar from "./components/RightSidebar";

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Saturday");

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8FF]">

      {/* Background Glow */}

      <div className="absolute left-[-250px] top-[-180px] h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-[180px]" />

      <div className="absolute right-[-220px] top-[160px] h-[450px] w-[450px] rounded-full bg-fuchsia-100/50 blur-[170px]" />

      <div className="absolute bottom-[-220px] left-[25%] h-[520px] w-[520px] rounded-full bg-purple-100/60 blur-[180px]" />

      <div className="relative z-10">

        <TopDateBar
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <TodayHeader
          selectedDay={selectedDay}
        />

        <div className="px-10 pb-16">

          <div className="grid grid-cols-12 gap-8">

            {/* Timeline */}

            <div className="col-span-9">
              <Timeline
                selectedDay={selectedDay}
              />
            </div>

            {/* Right Sidebar */}

            <div className="col-span-3">
              <RightSidebar />
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
