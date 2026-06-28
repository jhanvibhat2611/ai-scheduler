"use client";

import { useState } from "react";
import { Sunrise, ArrowRight } from "lucide-react";

type Props = {
  next: (time: string) => void;
};

export default function Step2({ next }: Props) {
  const [custom, setCustom] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const options = [
    "5–6 AM",
    "6–7 AM",
    "7–8 AM",
    "8–9 AM",
    "Custom",
  ];

  return (
    <div className="text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
        <Sunrise
          size={30}
          className="text-violet-600"
        />
      </div>

      <h2 className="text-4xl font-bold text-slate-900">
        When do you usually
        <br />
        wake up?
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-500">
        Choose the option that best matches
        your daily routine.
      </p>

      <div className="mt-10 space-y-4">

        {options.map((item) => (

          <button
            key={item}
            onClick={() => {

              if (item === "Custom") {

                setCustom(true);

              } else {

                next(item);

              }

            }}
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-white
              px-6
              py-5
              text-left
              font-medium
              text-slate-800
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-violet-300
              hover:bg-violet-50
              hover:shadow-lg
            "
          >
            {item}
          </button>

        ))}

      </div>

      {custom && (

        <div className="mt-8 space-y-4">

          <input
            type="text"
            placeholder="Example: 9:30 AM"
            value={customTime}
            onChange={(e) => setCustomTime(e.target.value)}
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-white
              p-5
              text-slate-700
              placeholder:text-slate-400
              focus:border-violet-400
              focus:outline-none
              focus:ring-4
              focus:ring-violet-100
            "
          />

          <button
            disabled={!customTime.trim()}
            onClick={() => next(customTime)}
            className={`
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              py-4
              font-semibold
              transition-all
              duration-300
              ${
                customTime.trim()
                  ? "bg-[#6D5DF6] text-white shadow-[0_12px_30px_rgba(109,93,246,0.28)] hover:bg-[#5F4EEB] hover:-translate-y-1"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }
            `}
          >
            Continue

            <ArrowRight
              size={18}
              strokeWidth={2.5}
            />

          </button>

        </div>

      )}

    </div>
  );
}