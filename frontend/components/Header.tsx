"use client";

import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-10 flex items-start justify-between">

      <div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
          Today
        </p>

        <h1 className="text-5xl font-bold leading-tight text-slate-900">
          Good Evening,
          <span className="block text-violet-600">
            Jhanvi
          </span>
        </h1>

        <p className="mt-4 text-lg text-slate-500">
          Here's what's happening with your day.
        </p>

      </div>

      <button
        className="
          flex h-14 w-14 items-center justify-center
          rounded-2xl
          bg-white
          border border-violet-100
          shadow-[0_10px_30px_rgba(139,92,246,0.12)]
          transition
          hover:scale-105
        "
      >
        <Bell
          size={22}
          className="text-slate-700"
        />
      </button>

    </header>
  );
}