"use client";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function TaskModal({
  open,
  onClose,
}: TaskModalProps) {
  if (!open) return null;

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
              Create Task
            </h2>

            <p className="mt-1 text-slate-500">
              Add a new task or let Yumee schedule it automatically.
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
            placeholder="Task Name"
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
            placeholder="Duration (minutes)"
            type="number"
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

          <select
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          >
            <option>Study</option>
            <option>Fitness</option>
            <option>Career</option>
            <option>Personal</option>
          </select>

          <select
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          >
            <option>Low Energy</option>
            <option>Medium Energy</option>
            <option>High Energy</option>
          </select>

          <select
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          >
            <option>Low Priority</option>
            <option>Medium Priority</option>
            <option>High Priority</option>
          </select>

          <input
            type="date"
            className="
              w-full
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-4
              text-slate-800
              outline-none
              focus:border-violet-400
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-violet-100
              bg-violet-50
              p-5
            "
          >
            <div>

              <p className="font-semibold text-slate-900">
                Let Yumee Schedule It ✨
              </p>

              <p className="mt-1 text-sm text-slate-500">
                AI finds the best free slot based on your calendar.
              </p>

            </div>

            <input
              type="checkbox"
              className="
                h-5
                w-5
                accent-violet-600
              "
            />
          </div>

          <button
            className="
              mt-2
              flex
              w-full
              items-center
              justify-center
              rounded-2xl
              bg-[#6D5DF6]
              py-4
              text-lg
              font-semibold
              text-white
              shadow-[0_12px_30px_rgba(109,93,246,0.25)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#5B4CE3]
            "
          >
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
}