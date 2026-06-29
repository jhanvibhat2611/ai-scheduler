"use client";

import { useState } from "react";

type EventModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (event: any) => void;
};

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function EventModal({
  open,
  onClose,
  onCreate,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  if (!open) return null;

  function toggleDay(day: string) {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((d) => d !== day)
      );
    } else {
      setSelectedDays([
        ...selectedDays,
        day,
      ]);
    }
  }

  function handleSubmit() {
    if (
      !title.trim() ||
      !duration ||
      selectedDays.length === 0
    )
      return;

    onCreate({
      title,
      duration: Number(duration),
      days: selectedDays,
    });

    setTitle("");
    setDuration("");
    setSelectedDays([]);

    onClose();
  }

  return (
    <div
      onClick={onClose}
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/35
        backdrop-blur-lg
        p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-xl
          rounded-[32px]
          border
          border-violet-100
          bg-white
          p-8
          shadow-[0_30px_80px_rgba(109,93,246,0.18)]
        "
      >
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-900">
              Create Event
            </h2>

            <p className="mt-1 text-slate-500">
              Create a recurring event for your weekly schedule.
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-slate-400
              transition
              hover:bg-violet-50
              hover:text-violet-600
            "
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Event Name"
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:border-violet-400
            "
          />

          <input
            type="number"
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value)
            }
            placeholder="Duration (minutes)"
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:border-violet-400
            "
          />

          <div>

            <p className="mb-3 font-semibold text-slate-700">
              Repeat On
            </p>

            <div className="flex flex-wrap gap-3">

              {weekDays.map((day) => {

                const active =
                  selectedDays.includes(day);

                return (

                  <button
                    key={day}
                    type="button"
                    onClick={() =>
                      toggleDay(day)
                    }
                    className={`
                      rounded-full
                      px-5
                      py-3
                      transition-all
                      duration-300
                      ${
                        active
                          ? "bg-[#6D5DF6] text-white shadow-md"
                          : "border border-violet-100 bg-violet-50 text-slate-700 hover:bg-violet-100"
                      }
                    `}
                  >
                    {day.slice(0, 3)}
                  </button>

                );

              })}

            </div>

          </div>

          <button
            onClick={handleSubmit}
            disabled={
              !title.trim() ||
              !duration ||
              selectedDays.length === 0
            }
            className={`
              mt-2
              flex
              w-full
              items-center
              justify-center
              rounded-2xl
              py-4
              text-lg
              font-semibold
              transition-all
              duration-300
              ${
                title.trim() &&
                duration &&
                selectedDays.length > 0
                  ? "bg-[#6D5DF6] text-white shadow-[0_12px_30px_rgba(109,93,246,0.25)] hover:-translate-y-1 hover:bg-[#5B4CE3]"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            Create Event
          </button>

        </div>

      </div>
    </div>
  );
}