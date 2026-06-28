"use client";

import { useState } from "react";

type InsightCardProps = {
  title: string;
  emoji: string;
  color: string;
  value: string;
  description: string;
};

export default function InsightCard({
  title,
  emoji,
  color,
  value,
  description,
}: InsightCardProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleOpen = () => {
    setSelected(true);

    setTimeout(() => {
      setOpen(true);
      setSelected(false);
    }, 150);
  };

  return (
    <>
      {/* Card */}

      <div
        onClick={handleOpen}
        className={`
          cursor-pointer
          rounded-[32px]
          border
          ${color}
          bg-white/90
          backdrop-blur-xl
          p-7
          transition-all
          duration-300
          hover:-translate-y-2
          hover:scale-[1.02]
          hover:shadow-2xl
          hover:shadow-violet-200/50
          ${selected ? "scale-105" : ""}
        `}
      >
        <div className="flex h-[260px] flex-col items-center justify-center">

          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-violet-50 text-5xl shadow-inner">
            {emoji}
          </div>

          <h2 className="text-center text-3xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-4 text-center text-slate-500">
            Tap to reveal ✨
          </p>

        </div>
      </div>

      {/* Popup */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-md
            p-6
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              relative
              w-full
              max-w-2xl
              rounded-[36px]
              border
              ${color}
              bg-white
              p-10
              shadow-[0_30px_80px_rgba(124,58,237,0.18)]
              animate-in
              zoom-in-95
              fade-in
              duration-300
            `}
          >
            {/* Close */}

            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                right-6
                top-6
                h-10
                w-10
                rounded-full
                bg-slate-100
                text-slate-500
                transition
                hover:bg-violet-100
                hover:text-violet-600
              "
            >
              ✕
            </button>

            {/* Emoji */}

            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-violet-50 text-6xl">
              {emoji}
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
              Productivity Insight
            </p>

            <h2 className="mt-3 text-4xl font-bold text-slate-900">
              {title}
            </h2>

            <h3 className="mt-5 text-6xl font-bold text-violet-600">
              {value}
            </h3>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              {description}
            </p>

            <div className="mt-10 rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-6">

              <p className="font-semibold text-violet-700">
                ✨ Yumee Recommendation
              </p>

              <p className="mt-3 leading-7 text-slate-600">
                This recommendation was generated automatically from
                your productivity history. Keep following your routine
                and Yumee will continuously personalize future insights.
              </p>

            </div>

          </div>
        </div>
      )}
    </>
  );
}