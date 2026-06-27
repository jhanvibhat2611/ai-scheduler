"use client";

import { useState } from "react";

type Props = {
  next: (time: string) => void;
};

export default function Step3({ next }: Props) {

  const [custom, setCustom] = useState(false);
  const [customTime, setCustomTime] = useState("");

  const options = [
  "9-10 PM",
  "10-11 PM",
  "11-12 AM",
  "12-1 AM",
  "Custom",
];

  return (
    <>

      <h2 className="text-4xl font-bold text-white text-center">
        When do you usually go to sleep?
      </h2>

      <p className="text-slate-400 text-center mt-3">
        Yumee uses this to avoid scheduling work too late.
      </p>

      <div className="mt-10 space-y-4">

        {options.map((item) => (

          <button
            key={item}
            onClick={() => {

              if (item === "Custom") {
                setCustom(true);
              }

              else {
                next(item);
              }

            }}
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-slate-700
              bg-[#0F172A]
              hover:border-violet-500
              hover:bg-slate-800
              transition
              text-left
              text-white
            "
          >
            {item}
          </button>

        ))}

        {custom && (

          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Example: 12:30 AM"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="
                w-full
                p-4
                rounded-2xl
                bg-[#0F172A]
                border
                border-slate-700
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:border-violet-500
              "
            />

            <button
              disabled={!customTime.trim()}
              onClick={() => next(customTime)}
              className={`
                w-full
                py-4
                rounded-2xl
                font-semibold
                transition
                ${
                  customTime.trim()
                    ? "bg-violet-600 hover:bg-violet-500 text-white"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }
              `}
            >
              Continue
            </button>

          </div>

        )}

      </div>

    </>
  );

}