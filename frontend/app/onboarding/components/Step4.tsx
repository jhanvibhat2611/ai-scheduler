"use client";

import { useState } from "react";
import {
  Briefcase,
  Plus,
  ArrowRight,
} from "lucide-react";

type Props = {
  next: (commitments: string[]) => void;
};

const defaultCommitments = [
  "College",
  "Internship",
  "Gym",
  "Work",
  "Coaching",
  "Classes",
  "Sports",
  "Clubs",
];

export default function Step4({ next }: Props) {

  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState("");

  function toggleCommitment(item: string) {

    if (selected.includes(item)) {

      setSelected(
        selected.filter((c) => c !== item)
      );

    } else {

      setSelected([
        ...selected,
        item,
      ]);

    }

  }

  function addCustomCommitments() {

    const custom = other
      .split(",")
      .map((item) => item.trim())
      .filter(
        (item) =>
          item.length > 0 &&
          !selected.includes(item)
      );

    setSelected([
      ...selected,
      ...custom,
    ]);

    setOther("");

  }

  return (

    <div className="text-center">

      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">

        <Briefcase
          size={30}
          className="text-violet-600"
        />

      </div>

      <h2 className="text-4xl font-bold text-slate-900">
        What fills your week?
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-500">
        Select all of your recurring commitments.
        Yumee will protect these in your schedule.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">

        {defaultCommitments.map((item) => {

          const active = selected.includes(item);

          return (

            <button
              key={item}
              onClick={() => toggleCommitment(item)}
              className={`
                rounded-full
                px-6
                py-3
                font-medium
                transition-all
                duration-300
                ${
                  active
                    ? "bg-[#6D5DF6] text-white shadow-lg"
                    : "border border-violet-100 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50"
                }
              `}
            >
              {item}
            </button>

          );

        })}

        {selected
          .filter((item) => !defaultCommitments.includes(item))
          .map((item) => (

            <button
              key={item}
              onClick={() => toggleCommitment(item)}
              className="
                rounded-full
                bg-[#6D5DF6]
                px-6
                py-3
                font-medium
                text-white
                shadow-lg
              "
            >
              {item}
            </button>

          ))}

      </div>

      <div className="mt-10">

        <label className="mb-3 block text-left font-semibold text-slate-700">
          Anything else?
        </label>

        <div className="flex gap-3">

          <input
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Dance, Therapy, Volunteering..."
            className="
              flex-1
              rounded-2xl
              border
              border-violet-100
              bg-white
              p-4
              text-slate-700
              placeholder:text-slate-400
              focus:border-violet-400
              focus:outline-none
              focus:ring-4
              focus:ring-violet-100
            "
          />

          <button
            onClick={addCustomCommitments}
            disabled={!other.trim()}
            className={`
              flex
              items-center
              justify-center
              rounded-2xl
              px-6
              transition-all
              ${
                other.trim()
                  ? "bg-[#6D5DF6] text-white hover:bg-[#5F4EEB]"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }
            `}
          >

            <Plus size={20} />

          </button>

        </div>

        <p className="mt-2 text-left text-sm text-slate-400">
          Separate multiple commitments with commas.
        </p>

      </div>

      <button
        disabled={selected.length === 0}
        onClick={() => next(selected)}
        className={`
          mt-12
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          py-4
          text-lg
          font-semibold
          transition-all
          duration-300
          ${
            selected.length
              ? "bg-[#6D5DF6] text-white shadow-[0_12px_30px_rgba(109,93,246,0.28)] hover:bg-[#5F4EEB] hover:-translate-y-1"
              : "cursor-not-allowed bg-slate-200 text-slate-400"
          }
        `}
      >

        Continue

        <ArrowRight
          size={18}
          strokeWidth={2.5}
        />

      </button>

    </div>

  );

}