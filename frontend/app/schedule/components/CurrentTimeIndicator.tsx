"use client";

import { useEffect, useState } from "react";

const START_HOUR = 6;
const PIXELS_PER_HOUR = 96;

export default function CurrentTimeIndicator() {

  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {

    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(timer);

  }, []);

  if (!now) return null;

  const hour = now.getHours();
  const minute = now.getMinutes();

  const position =
    (hour + minute / 60 - START_HOUR) *
    PIXELS_PER_HOUR;

  if (position < 0) return null;

  return (
    <div
      className="absolute left-0 right-0 z-30 pointer-events-none"
      style={{
          top: `${position + 24}px`,
        }}
    >
      <div className="flex items-center">

        <div className="w-20 pr-3 text-right text-xs font-semibold text-red-400">
          {now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div className="h-3 w-3 rounded-full bg-red-500 shadow-lg shadow-red-500/70" />

        <div className="h-[2px] flex-1 bg-red-500 shadow-lg shadow-red-500/60" />

      </div>
    </div>
  );
}