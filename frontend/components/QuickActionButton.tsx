// components/QuickActionButton.tsx

export default function QuickActionButton({
  title,
}: {
  title: string;
}) {
  return (
    <button
      className="
        w-full
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        px-5
        py-4
        text-sm
        font-semibold
        tracking-wide
        text-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-400/40
        hover:bg-violet-500/10
        hover:shadow-[0_8px_30px_rgba(124,92,252,0.25)]
      "
    >
      {title}
    </button>
  );
}