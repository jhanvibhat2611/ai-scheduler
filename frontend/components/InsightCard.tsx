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
      <div
        onClick={handleOpen}
        className={`
          cursor-pointer
          rounded-3xl
          p-6
          border
          transition-all
          duration-500
          hover:scale-105
          hover:rotate-1
          hover:-translate-y-3
          hover:shadow-[0_0_60px_rgba(139,92,246,0.45)]
          animate-[float_6s_ease-in-out_infinite]
          ${selected ? "scale-110 z-50" : ""}
          ${color}
        `}
      >
        <div className="h-[300px] flex flex-col items-center justify-center">
          <div className="text-6xl mb-6">
            {emoji}
          </div>

          <h2 className="text-2xl font-bold text-center">
            {title}
          </h2>

          <p className="text-slate-400 mt-4">
            Tap to reveal ✨
          </p>
        </div>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/70
            backdrop-blur-md
            z-50
            flex
            items-center
            justify-center
            p-6
          "
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`
              relative
              w-full
              max-w-xl
              rounded-3xl
              p-8
              border
              shadow-[0_0_150px_rgba(139,92,246,0.8)]
              animate-in
              zoom-in-95
              fade-in
              duration-500
              ${color}
            `}
          >
            {/* Particles */}

            <div className="absolute top-10 right-16 text-violet-400 text-3xl opacity-40 animate-pulse">
              ✦
            </div>

            <div className="absolute bottom-12 left-12 text-pink-400 text-2xl opacity-30 animate-bounce">
              ✧
            </div>

            <div className="absolute top-1/2 right-8 text-blue-400 opacity-20 animate-ping">
              ✦
            </div>

            {/* Close */}

            <button
              onClick={() => setOpen(false)}
              className="
                absolute
                top-4
                right-4
                text-slate-400
                hover:text-white
                transition
              "
            >
              ✕
            </button>

            <div className="text-7xl mb-6">
              {emoji}
            </div>

            <h2 className="text-4xl font-bold mb-4">
              {title}
            </h2>

            <p className="text-5xl font-bold mb-6">
              {value}
            </p>

            <p className="text-xl text-slate-300 leading-relaxed">
              {description}
            </p>

            <div className="mt-8">
              <div className="bg-white/10 rounded-xl p-4">
                <p className="text-violet-300 font-semibold">
                  Yumee Insight ✨
                </p>

                <p className="mt-2 text-slate-300">
                  This pattern was discovered automatically from your
                  productivity history.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}