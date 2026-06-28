import {
  CalendarDays,
  RefreshCcw,
  Brain,
  ArrowRight,
} from "lucide-react";

type Props = {
  next: () => void;
};

export default function Step1({ next }: Props) {
  return (
    <div className="text-center">

      <p className="uppercase tracking-[0.35em] text-violet-500 text-sm font-semibold">
        Meet Yumee
      </p>

      <h2 className="mt-5 text-5xl font-bold leading-tight text-slate-900">
        Your Personal
        <br />
        <span className="bg-gradient-to-r from-[#6D5DF6] to-[#7C6CF2] bg-clip-text text-transparent">
          AI Executive Assistant
        </span>
      </h2>

      <p className="mt-7 max-w-xl mx-auto text-lg leading-8 text-slate-500">
        Yumee understands your routine, plans your week intelligently,
        adapts when life changes, and helps you stay consistent with
        your goals.
      </p>

      <div className="mt-10 space-y-4">

        <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-5 transition-all hover:shadow-lg">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6D5DF6] text-white">
            <CalendarDays size={22} />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-slate-900">
              Intelligent Scheduling
            </h3>

            <p className="mt-1 text-slate-500">
              Builds your week around your routine and priorities.
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-white p-5 transition-all hover:shadow-lg">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#7C6CF2] text-white">
            <RefreshCcw size={22} />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-slate-900">
              Automatic Rescheduling
            </h3>

            <p className="mt-1 text-slate-500">
              Miss a task? Yumee intelligently reorganizes your schedule.
            </p>
          </div>

        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-violet-100 bg-violet-50/70 p-5 transition-all hover:shadow-lg">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5B4CE6] text-white">
            <Brain size={22} />
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-slate-900">
              Learns Your Habits
            </h3>

            <p className="mt-1 text-slate-500">
              Gets smarter every week by understanding your productivity
              patterns.
            </p>
          </div>

        </div>

      </div>

      <button
        onClick={next}
        className="
          mt-12
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          bg-gradient-to-r
          from-[#7C6CF2]
          via-[#6D5DF6]
          to-[#5B4CE6]
          py-4
          text-lg
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
        "
      >
        Let's Begin

        <ArrowRight
          size={20}
          strokeWidth={2.5}
        />
      </button>

    </div>
  );
}