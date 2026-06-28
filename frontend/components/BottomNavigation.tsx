"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CalendarDays,
  Target,
  ChartColumn,
} from "lucide-react";

export default function BottomNavigation() {
  const pathname = usePathname();

  const tabs = [
    {
      href: "/",
      label: "Home",
      icon: House,
    },
    {
      href: "/schedule",
      label: "Schedule",
      icon: CalendarDays,
    },
    {
      href: "/goals",
      label: "Goals",
      icon: Target,
    },
    {
      href: "/insights",
      label: "Insights",
      icon: ChartColumn,
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div
        className="
          flex items-center gap-2
          rounded-full
          bg-white/90
          backdrop-blur-2xl
          border border-violet-100
          shadow-[0_12px_40px_rgba(139,92,246,0.12)]
          px-3 py-3
        "
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;

          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`
                flex items-center gap-2
                rounded-full
                px-5 py-3
                transition-all duration-300
                ${
                  active
                  ? "bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg"
                  : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"
                }
              `}
            >
              <Icon size={18} strokeWidth={2.2} />
              <span className="font-medium text-sm">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}