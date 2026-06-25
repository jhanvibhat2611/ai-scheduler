"use client";

import { useState } from "react";

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

    }

    else {

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

  function handleContinue() {

    next(selected);

  }

  return (
    <>

      <h2 className="text-4xl font-bold text-white text-center">
        What commitments do you have every week?
      </h2>

      <p className="text-slate-400 text-center mt-3">
        Select everything that applies.
      </p>

      <div className="flex flex-wrap gap-3 justify-center mt-10">

        {selected.map((item) => (

          <button
            key={item}
            onClick={() => toggleCommitment(item)}
            className="
              px-5
              py-3
              rounded-full
              border
              bg-violet-600
              border-violet-600
              text-white
              transition
            "
          >
            {item}
          </button>

        ))}

        {defaultCommitments
          .filter((item) => !selected.includes(item))
          .map((item) => (

            <button
              key={item}
              onClick={() => toggleCommitment(item)}
              className="
                px-5
                py-3
                rounded-full
                border
                border-slate-700
                bg-[#0F172A]
                text-slate-300
                hover:border-violet-500
                transition
              "
            >
              {item}
            </button>

        ))}

      </div>

      <div className="mt-10">

        <label className="block text-white mb-3 font-medium">
          Any others?
        </label>

        <div className="flex gap-3">

          <input
            value={other}
            onChange={(e) => setOther(e.target.value)}
            placeholder="Dance, Therapy, Volunteering..."
            className="
              flex-1
              bg-[#0F172A]
              border
              border-slate-700
              rounded-xl
              p-4
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-violet-500
            "
          />

          <button
            onClick={addCustomCommitments}
            disabled={!other.trim()}
            className={`
              px-6
              rounded-xl
              font-semibold
              transition
              ${
                other.trim()
                  ? "bg-violet-600 hover:bg-violet-500 text-white"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            Add
          </button>

        </div>

        <p className="text-slate-500 text-sm mt-2">
          Separate multiple commitments with commas.
        </p>

      </div>

      <button
        onClick={handleContinue}
        disabled={selected.length === 0}
        className={`
          mt-10
          w-full
          py-4
          rounded-2xl
          text-lg
          font-semibold
          transition
          ${
            selected.length > 0
              ? "bg-violet-600 hover:bg-violet-500 text-white"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"
          }
        `}
      >
        Continue
      </button>

    </>
  );

}