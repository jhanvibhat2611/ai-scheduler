export default function ProgressRing() {
  return (
    <div className="relative h-32 w-32">

      <div className="absolute inset-0 rounded-full border-8 border-slate-700"></div>

      <div className="absolute inset-0 rounded-full border-8 border-blue-500 border-t-transparent rotate-45"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">
          72%
        </span>
      </div>

    </div>
  );
}