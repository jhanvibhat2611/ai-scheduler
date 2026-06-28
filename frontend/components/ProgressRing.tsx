export default function ProgressRing() {
  return (
    <div className="relative h-32 w-32">

      {/* Background Ring */}
      <div className="absolute inset-0 rounded-full border-[10px] border-white/10" />

      {/* Progress Ring */}
      <div className="absolute inset-0 rotate-45 rounded-full border-[10px] border-violet-400 border-t-transparent shadow-[0_0_25px_rgba(124,92,252,0.45)]" />

      {/* Center */}
      <div className="absolute inset-[14px] flex items-center justify-center rounded-full bg-[#131B2F] backdrop-blur-xl">

        <span className="text-3xl font-bold tracking-tight text-white">
          72%
        </span>

      </div>

    </div>
  );
}