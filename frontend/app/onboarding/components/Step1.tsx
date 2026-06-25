type Props = {
  next: () => void;
};

export default function Step1({ next }: Props) {
  return (
    <div className="text-center">
      <p className="uppercase tracking-[0.3em] text-violet-400 text-sm font-semibold">
        Meet Yumee
      </p>

      <h2 className="text-5xl font-bold text-white mt-5 leading-tight">
        Your Personal
        <br />
        AI Executive Assistant
      </h2>

      <p className="mt-8 text-lg text-slate-300 leading-8 max-w-xl mx-auto">
        Yumee understands your routine, plans your week intelligently,
        adapts when life changes, and helps you stay consistent with your
        goals.
      </p>

      <div className="mt-10 space-y-4">
        <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-5 text-left">
          <h3 className="font-semibold text-white">
            Intelligent Scheduling
          </h3>

          <p className="text-slate-400 mt-1">
            Builds your week around your routine and priorities.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-5 text-left">
          <h3 className="font-semibold text-white">
            Automatic Rescheduling
          </h3>

          <p className="text-slate-400 mt-1">
            Miss a task? Yumee reorganizes your schedule automatically.
          </p>
        </div>

        <div className="bg-[#0F172A] border border-slate-700 rounded-2xl p-5 text-left">
          <h3 className="font-semibold text-white">
            Learns Your Habits
          </h3>

          <p className="text-slate-400 mt-1">
            Gets smarter every week by understanding your productivity
            patterns.
          </p>
        </div>
      </div>

      <button
        onClick={next}
        className="
          mt-12
          w-full
          bg-violet-600
          hover:bg-violet-500
          transition
          py-4
          rounded-2xl
          text-lg
          font-semibold
        "
      >
        Let's Begin
      </button>
    </div>
  );
}