// components/Card.tsx

export default function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`
        rounded-[30px]
        bg-white
        border border-[#F1EDFF]
        p-7
        shadow-[0_15px_40px_rgba(124,92,252,0.08)]
        transition-all
        duration-300
        hover:shadow-[0_18px_45px_rgba(124,92,252,0.12)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}