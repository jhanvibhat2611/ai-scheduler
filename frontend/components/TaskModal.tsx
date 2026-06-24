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
        bg-black/70
        backdrop-blur-md
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-lg
          bg-[#1E293B]
          rounded-3xl
          p-8
          border
          border-slate-700
          shadow-[0_0_60px_rgba(59,130,246,0.15)]
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Create Task
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          <input
            placeholder="Task Name"
            className="
              w-full
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
            "
          />

          <input
            placeholder="Duration (minutes)"
            className="
              w-full
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
            "
          />

          <select
            className="
              w-full
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
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
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
            "
          >
            <option>Low Energy</option>
            <option>Medium Energy</option>
            <option>High Energy</option>
          </select>

          <select
            className="
              w-full
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
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
              bg-[#0F172A]
              p-4
              rounded-xl
              text-white
            "
          />

          <div
            className="
              flex
              items-center
              justify-between
              bg-[#0F172A]
              rounded-xl
              p-4
            "
          >
            <div>
              <p className="font-medium text-white">
                Let Yumee Schedule It ✨
              </p>

              <p className="text-sm text-slate-400">
                AI chooses the best time automatically
              </p>
            </div>

            <input
              type="checkbox"
              className="
                w-5
                h-5
                accent-blue-500
              "
            />
          </div>

          <button
            className="
              w-full
              bg-blue-600
              hover:bg-blue-500
              transition
              py-4
              rounded-xl
              font-semibold
            "
          >
            Create Task
          </button>

        </div>
      </div>
    </div>
  );
}