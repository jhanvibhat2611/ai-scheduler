"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  Search,
  Clock3,
  Wand2,
} from "lucide-react";

export default function ScheduleLoading() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2500),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#10091F]/85 backdrop-blur-xl">

      {/* Aurora Background */}

      <div className="absolute h-[700px] w-[700px] rounded-full bg-violet-500/20 blur-[180px] animate-pulse" />

      <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-[140px] animate-pulse" />

      <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-indigo-400/10 blur-[140px] animate-pulse" />

      {/* Floating Stars */}

      {[...Array(45)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-violet-300 animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: "4s",
          }}
        />
      ))}

      <div className="relative w-[650px]">

        {/* Magic Circle */}

        <div className="flex justify-center">

          <div className="relative h-44 w-44">

            <div className="absolute inset-0 rounded-full border border-violet-400/30 animate-spin" />

            <div className="absolute inset-3 rounded-full border border-violet-400/20 animate-spin [animation-direction:reverse] [animation-duration:8s]" />

            <div className="absolute inset-6 rounded-full border border-violet-300/30 animate-spin [animation-duration:5s]" />

            <div className="absolute inset-0 flex items-center justify-center">

              <Sparkles
                size={60}
                className="text-violet-300 animate-pulse"
              />

            </div>

          </div>

        </div>

        <h1 className="mt-10 text-center text-5xl font-black text-white">
          Crafting your perfect week
        </h1>

        <p className="mt-4 text-center text-lg text-violet-200">
          Yumee is designing a schedule around your life.
        </p>

        <div className="mt-12 space-y-5">

          {step >= 1 && (
            <StatusCard
              icon={<Search size={22} />}
              title="Analyzing your goals"
              subtitle="Understanding priorities and deadlines..."
            />
          )}

          {step >= 2 && (
            <StatusCard
              icon={<Clock3 size={22} />}
              title="Finding available time slots"
              subtitle="Scanning your weekly commitments..."
            />
          )}

          {step >= 3 && (
            <StatusCard
              icon={<Wand2 size={22} />}
              title="Building your personalized schedule"
              subtitle="Balancing focus, rest and consistency..."
            />
          )}

        </div>

        <p className="mt-8 text-center text-violet-300 animate-pulse">
          ✨ This usually takes just a few seconds...
        </p>

      </div>

    </div>
  );
}

function StatusCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="animate-[fadeIn_.5s_ease] flex items-center gap-5 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20 text-violet-300">
        {icon}
      </div>

      <div className="flex-1">

        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-violet-200">
          {subtitle}
        </p>

      </div>

      <div className="flex gap-2">

        <span className="h-2.5 w-2.5 rounded-full bg-violet-400 animate-bounce" />

        <span
          className="h-2.5 w-2.5 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />

        <span
          className="h-2.5 w-2.5 rounded-full bg-violet-400 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        />

      </div>

    </div>
  );
}