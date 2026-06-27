type Props = {
  title: string;
  start: string;
  end: string;
  tag: string;
  color?: string;
  onClick?: () => void;
};

export default function ScheduleCard({
  title,
  start,
  end,
  tag,
  color,
  onClick,
}: Props) {
  const colors = {
    violet: {
      bg: "bg-violet-600/20",
      border: "border-violet-500",
      badge: "bg-violet-600",
    },
    green: {
      bg: "bg-emerald-600/20",
      border: "border-emerald-500",
      badge: "bg-emerald-600",
    },
    orange: {
      bg: "bg-orange-600/20",
      border: "border-orange-500",
      badge: "bg-orange-600",
    },
    blue: {
      bg: "bg-sky-600/20",
      border: "border-sky-500",
      badge: "bg-sky-600",
    },
  };

  const theme =
    colors[color as keyof typeof colors] ?? colors.violet;

  return (
    <button
      onClick={onClick}
      className={`
        w-full
        h-full
        text-left
        rounded-2xl
        border-l-4
        ${theme.border}
        ${theme.bg}
        p-3
        shadow-lg
        backdrop-blur-sm
        hover:scale-[1.02]
        hover:shadow-xl
        active:scale-[0.99]
        transition-all
        duration-300
        cursor-pointer
        overflow-hidden
        flex
        flex-col
        justify-between
      `}
    >
      <div>
        <h3 className="text-base font-semibold text-white">
          {title}
        </h3>

        {title !== "Sleep" && (
          <p className="mt-1 text-sm text-slate-300">
            {start} – {end}
          </p>
        )}
      </div>

      <div className="mt-2 inline-flex">
        <span
          className={`
            ${theme.badge}
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            text-white
          `}
        >
          {tag}
        </span>
      </div>
    </button>
  );
}