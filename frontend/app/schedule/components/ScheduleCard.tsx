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
  const task = title.toLowerCase();

  let theme = {
    bg: "bg-[#F2E8FF]",
    border: "border-violet-500",
    badge: "bg-violet-600 text-white",
    hover: "hover:shadow-violet-200",
  };

  /* ---------- Smart Pastel Themes ---------- */

  if (task.includes("sleep")) {
    theme = {
      bg: "bg-[#DDF1FF]",
      border: "border-sky-500",
      badge: "bg-sky-500 text-white",
      hover: "hover:shadow-sky-200",
    };
  }

  else if (
    task.includes("college") ||
    task.includes("class") ||
    task.includes("lecture")
  ) {
    theme = {
      bg: "bg-[#EEE4FF]",
      border: "border-violet-500",
      badge: "bg-violet-600 text-white",
      hover: "hover:shadow-violet-200",
    };
  }

  else if (
    task.includes("problem") ||
    task.includes("practice")
  ) {
    theme = {
      bg: "bg-[#F3EBFF]",
      border: "border-purple-500",
      badge: "bg-purple-600 text-white",
      hover: "hover:shadow-purple-200",
    };
  }

  else if (
    task.includes("review") ||
    task.includes("revision")
  ) {
    theme = {
      bg: "bg-[#FAF5FF]",
      border: "border-fuchsia-400",
      badge: "bg-fuchsia-500 text-white",
      hover: "hover:shadow-fuchsia-200",
    };
  }

  else if (
    task.includes("workout") ||
    task.includes("gym")
  ) {
    theme = {
      bg: "bg-[#FFF0E6]",
      border: "border-orange-400",
      badge: "bg-orange-500 text-white",
      hover: "hover:shadow-orange-200",
    };
  }

  else if (
    task.includes("walk") ||
    task.includes("health")
  ) {
    theme = {
      bg: "bg-[#FFEAF1]",
      border: "border-pink-400",
      badge: "bg-pink-500 text-white",
      hover: "hover:shadow-pink-200",
    };
  }

  else if (
    task.includes("hackathon") ||
    task.includes("project")
  ) {
    theme = {
      bg: "bg-[#EAF8EF]",
      border: "border-emerald-500",
      badge: "bg-emerald-600 text-white",
      hover: "hover:shadow-emerald-200",
    };
  }

  else if (
    task.includes("meeting")
  ) {
    theme = {
      bg: "bg-[#FFF7E8]",
      border: "border-amber-400",
      badge: "bg-amber-500 text-white",
      hover: "hover:shadow-amber-200",
    };
  }

  else if (color === "blue") {
    theme = {
      bg: "bg-[#DDF1FF]",
      border: "border-sky-500",
      badge: "bg-sky-500 text-white",
      hover: "hover:shadow-sky-200",
    };
  }

  else if (color === "green") {
    theme = {
      bg: "bg-[#EAF8EF]",
      border: "border-emerald-500",
      badge: "bg-emerald-600 text-white",
      hover: "hover:shadow-emerald-200",
    };
  }

  else if (color === "orange") {
    theme = {
      bg: "bg-[#FFF0E6]",
      border: "border-orange-400",
      badge: "bg-orange-500 text-white",
      hover: "hover:shadow-orange-200",
    };
  }

  return (
    <button
      onClick={onClick}
      className={`
        group
        w-full
        h-full
        rounded-[24px]
        border
        border-l-4
        ${theme.border}
        ${theme.bg}
        p-4
        text-left
        overflow-hidden
        transition-all
        duration-300
        hover:-translate-y-1
        hover:scale-[1.015]
        hover:shadow-2xl
        ${theme.hover}
        active:scale-[0.99]
        flex
        flex-col
        justify-between
      `}
    >
      <div>
        <h3 className="text-[18px] font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
          {title}
        </h3>

        {title !== "Sleep" && (
          <p className="mt-1 text-sm font-medium text-slate-500">
            {start} – {end}
          </p>
        )}
      </div>

      <div className="mt-3">
        <span
          className={`
            inline-flex
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            shadow-sm
            ${theme.badge}
          `}
        >
          {tag}
        </span>
      </div>
    </button>
  );
}