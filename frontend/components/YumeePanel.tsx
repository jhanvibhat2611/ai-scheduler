export default function YumeePanel() {
  return (
    <div className="
      fixed
      right-6
      bottom-28
      w-80
      bg-[#1E293B]
      rounded-3xl
      p-5
      shadow-xl
      border
      border-slate-700
    ">
      <h2 className="text-xl font-bold text-white">
        Yumee ✨
      </h2>

      <p className="text-slate-400 mt-1">
        AI Productivity Companion
      </p>

      <div className="bg-[#0F172A] rounded-2xl p-4 mt-4">
        <p className="text-white">
          Hey Jhanvi 👋
        </p>

        <p className="text-slate-300 mt-3">
          You have 1 pending task from yesterday.
        </p>

        <p className="text-slate-300 mt-2">
          Want me to reschedule it?
        </p>
      </div>

      <button className="
        w-full
        mt-4
        bg-blue-600
        py-3
        rounded-xl
      ">
        Yes, Reschedule
      </button>

      <button className="
        w-full
        mt-2
        bg-slate-700
        py-3
        rounded-xl
      ">
        Maybe Later
      </button>
    </div>
  );
}