import Header from "../components/Header";
import ProgressRing from "../components/ProgressRing";
import Card from "../components/Card";
import QuickActions from "../components/QuickActions";
import YumeePanel from "../components/YumeePanel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8FF] pb-36">

      {/* Background Glow */}

      <div className="absolute left-[-220px] top-[-180px] h-[520px] w-[520px] rounded-full bg-violet-200/40 blur-[180px]" />

      <div className="absolute right-[-180px] top-[180px] h-[450px] w-[450px] rounded-full bg-fuchsia-100/50 blur-[170px]" />

      <div className="absolute bottom-[-240px] left-[25%] h-[520px] w-[520px] rounded-full bg-purple-100/60 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-10 py-10">

        <Header />

        <div className="mt-8">
          <QuickActions />
        </div>

        <div className="mt-10 grid grid-cols-12 gap-8">

          {/* LEFT */}

          <div className="col-span-8 space-y-8">

            {/* Progress Card */}

            <Card>

              <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-violet-200/30 blur-3xl"></div>

              <div className="relative flex items-center justify-between">

                <div className="flex-1">

                  <p className="text-violet-600 font-semibold text-sm">
                    Today's Progress
                  </p>

                  <h2 className="mt-4 text-5xl font-bold text-gray-900">
                    72%
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Keep it up! You're doing great today.
                  </p>

                </div>

                <div className="mx-10 h-36 w-px bg-violet-100"></div>

                <div className="flex items-center gap-10">

                  <ProgressRing />

                  <div className="space-y-6">

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 shadow-sm">
                        ✓
                      </div>

                      <div>

                        <p className="text-2xl font-bold text-gray-900">
                          3
                        </p>

                        <p className="text-gray-500">
                          Completed
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-sm">
                        🕒
                      </div>

                      <div>

                        <p className="text-2xl font-bold text-gray-900">
                          1
                        </p>

                        <p className="text-gray-500">
                          In Progress
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 shadow-sm">
                        ○
                      </div>

                      <div>

                        <p className="text-2xl font-bold text-gray-900">
                          1
                        </p>

                        <p className="text-gray-500">
                          Remaining
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </Card>

            {/* Today's Schedule */}

            <Card>

              <div className="mb-8 flex items-center justify-between">

                <div>

                  <p className="text-sm font-semibold text-violet-600">
                    Today's Schedule
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Upcoming Tasks
                  </h2>

                </div>

                <button className="rounded-full bg-violet-50 px-5 py-3 font-semibold text-violet-600 transition hover:bg-violet-100">
                  View Day →
                </button>

              </div>

              <div className="space-y-8">

                {/* DSA */}

                <div className="group flex gap-6">

                  <div className="w-20 text-right">

                    <p className="font-semibold text-violet-600">
                      18:30
                    </p>

                    <p className="text-xs text-gray-400">
                      Today
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="h-4 w-4 rounded-full bg-violet-500 shadow-lg shadow-violet-300"></div>

                    <div className="mt-2 h-full w-px bg-violet-200"></div>

                  </div>

                  <div
                    className="
                    flex-1
                    rounded-3xl
                    border
                    border-violet-100
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                    hover:shadow-violet-200/60
                  "
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-3xl">
                          📖
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-gray-900">
                            DSA Practice
                          </h3>

                          <p className="mt-1 text-gray-500">
                            90 minutes
                          </p>

                        </div>

                      </div>

                      <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-600">
                        Focus
                      </span>

                    </div>

                  </div>

                </div>

                {/* Workout */}

                <div className="group flex gap-6">

                  <div className="w-20 text-right">

                    <p className="font-semibold text-violet-600">
                      20:00
                    </p>

                    <p className="text-xs text-gray-400">
                      Today
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="h-4 w-4 rounded-full bg-pink-400 shadow-lg shadow-pink-200"></div>

                    <div className="mt-2 h-full w-px bg-pink-200"></div>

                  </div>

                  <div
                    className="
                    flex-1
                    rounded-3xl
                    border
                    border-pink-100
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                    hover:shadow-pink-200/60
                  "
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-50 text-3xl">
                          🏋️
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-gray-900">
                            Workout
                          </h3>

                          <p className="mt-1 text-gray-500">
                            60 minutes
                          </p>

                        </div>

                      </div>

                      <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
                        Health
                      </span>

                    </div>

                  </div>

                </div>

                {/* Review */}

                <div className="group flex gap-6">

                  <div className="w-20 text-right">

                    <p className="font-semibold text-gray-500">
                      21:30
                    </p>

                    <p className="text-xs text-gray-400">
                      Planned
                    </p>

                  </div>

                  <div className="flex flex-col items-center">

                    <div className="h-4 w-4 rounded-full bg-sky-400 shadow-lg shadow-sky-200"></div>

                  </div>

                  <div
                    className="
                    flex-1
                    rounded-3xl
                    border
                    border-sky-100
                    bg-white
                    p-6
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-2xl
                    hover:shadow-sky-200/60
                  "
                  >

                    <div className="flex items-center justify-between">

                      <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-3xl">
                          ✏️
                        </div>

                        <div>

                          <h3 className="text-lg font-semibold text-gray-900">
                            Review & Planning
                          </h3>

                          <p className="mt-1 text-gray-500">
                            30 minutes
                          </p>

                        </div>

                      </div>

                      <span className="rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-600">
                        Review
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              <button
                className="
                mt-8
                w-full
                rounded-2xl
                border-2
                border-dashed
                border-violet-200
                bg-violet-50
                py-4
                text-lg
                font-semibold
                text-violet-600
                transition-all
                duration-300
                hover:bg-violet-100
                hover:shadow-lg
                hover:shadow-violet-200
              "
              >
                + Add Task
              </button>

            </Card>

            <div className="grid grid-cols-2 gap-8">

              {/* AI Insight */}

              <Card>

                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-violet-200/40 blur-3xl"></div>

                <div className="relative">

                  <p className="text-sm font-semibold text-violet-600">
                    AI Insight
                  </p>

                  <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-900">
                    You perform your
                    <br />
                    <span className="text-violet-600">
                      best between
                    </span>
                    <br />
                    6 PM — 8 PM
                  </h2>

                  <p className="mt-5 leading-7 text-gray-500">
                    Based on your productivity history,
                    analytical tasks consistently have the
                    highest completion rate during this
                    time window.
                  </p>

                  <div className="mt-8 flex items-center gap-3">

                    <div className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-600">
                      89% Confidence
                    </div>

                    <div className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                      Learning
                    </div>

                  </div>

                </div>

              </Card>

              {/* Patterns */}

              <Card>

                <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-purple-100/40 blur-3xl"></div>

                <div className="relative">

                  <p className="text-sm font-semibold text-violet-600">
                    Patterns I've Learned
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-gray-900">
                    Personalized Insights
                  </h2>

                  <div className="mt-8 space-y-5">

                    <div className="flex items-start gap-4 rounded-2xl bg-violet-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        🧠
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          Deep Work
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                          You finish analytical tasks
                          significantly faster in the evening.
                        </p>

                      </div>

                    </div>

                    <div className="flex items-start gap-4 rounded-2xl bg-violet-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        ⚡
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          Momentum
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                          Completing one task increases your
                          likelihood of finishing the next.
                        </p>

                      </div>

                    </div>

                    <div className="flex items-start gap-4 rounded-2xl bg-violet-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        📈
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          Consistency
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                          Your completion rate has improved
                          steadily over the past week.
                        </p>

                      </div>

                    </div>

                    <div className="flex items-start gap-4 rounded-2xl bg-violet-50 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-200">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                        🌙
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          Habit
                        </p>

                        <p className="text-sm leading-6 text-gray-500">
                          Evening study sessions are your
                          most reliable habit.
                        </p>

                      </div>

                    </div>

                  </div>

                  <button className="mt-8 font-semibold text-violet-600 transition hover:translate-x-1">
                    View All Patterns →
                  </button>

                </div>

              </Card>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-span-4">

            <YumeePanel />

          </div>

        </div>

      </div>

    </main>

  );

}