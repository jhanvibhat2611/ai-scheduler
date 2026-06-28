"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bug } from "lucide-react";
import { Sparkles } from "lucide-react";

import { allura } from "@/app/fonts";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";
import Step7 from "./components/Step7";
import Step8 from "./components/Step8";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  generateGoalPlan,
  generateSchedule,
} from "@/lib/api";

export default function OnboardingPage() {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");

  const [commitments, setCommitments] = useState<string[]>([]);
  const [currentCommitment, setCurrentCommitment] = useState(0);

  const [commitmentSchedule, setCommitmentSchedule] = useState<any[]>([]);

  const [goals, setGoals] = useState<any[]>([]);
  const [goalPlans, setGoalPlans] = useState<any[]>([]);

  return (

    <main
      className="
      min-h-screen
      flex
      items-center
      justify-center
      px-6
      py-16
      bg-gradient-to-br
      from-white
      via-violet-50
      to-purple-100
      relative
      overflow-hidden
    "
    >

      {/* Decorative blobs */}

      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-200/30 blur-3xl" />

      <div className="absolute top-40 right-24 text-violet-200 text-6xl">
        ✦
      </div>

      <div className="absolute bottom-32 left-20 text-pink-200 text-5xl">
        ✧
      </div>

      <div className="w-full max-w-2xl relative z-10">

        {/* Logo */}

<div className="mb-14 flex flex-col items-center">

  <div className="relative w-[360px] flex justify-center">

    {/* Flight Path */}

    <svg
      className="absolute -top-8 left-4 w-[300px] h-14 pointer-events-none"
      viewBox="0 0 300 60"
      fill="none"
    >
      <path
        d="
          M10 35
          C60 0 120 0 170 35
          S250 55 285 18
        "
        stroke="#8B5CF6"
        strokeWidth="2"
        strokeDasharray="6 6"
        strokeLinecap="round"
      />
    </svg>

    {/* Bee */}

    <Bug
      size={22}
      strokeWidth={2}
      className="
        absolute
        -top-7
        right-7
        text-yellow-500
        rotate-12
        drop-shadow-sm
      "
    />

    {/* Brand */}

    <h1
      className={`
        ${allura.className}
        text-7xl
        md:text-8xl
        text-violet-700
        leading-none
      `}
    >
      Honestli
    </h1>

  </div>

  <p className="mt-5 text-lg font-medium text-slate-600">
    Powered by
    <span className="ml-1 text-violet-600 font-semibold">
      Yumee ✨
    </span>
  </p>

  <p className="mt-3 max-w-lg text-center text-slate-500 leading-8">
    Your AI productivity companion that learns your habits,
    builds your schedule, and helps you achieve your goals.
  </p>

</div>

        {/* Progress */}

        <div className="mb-8">

          <div className="flex justify-between text-sm text-slate-500 mb-3">

            <span>
              ✨ Step {step} of 8
            </span>

            <span>
              {Math.round((step / 8) * 100)}%
            </span>

          </div>

          <div className="h-2 rounded-full bg-violet-100 overflow-hidden">

            <div
              className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-violet-500
              to-fuchsia-500
              transition-all
              duration-500
              "
              style={{
                width: `${(step / 8) * 100}%`,
              }}
            />

          </div>

        </div>

        {/* Main Card */}

        <div
          className="
          rounded-[36px]
          border
          border-violet-100
          bg-white/90
          backdrop-blur-xl
          shadow-[0_20px_60px_rgba(109,40,217,0.08)]
          p-12
        "
        >

          {step === 1 && (
            <Step1 next={() => setStep(2)} />
          )}

          {step === 2 && (
            <Step2
              next={(time) => {
                setWakeTime(time);
                setStep(3);
              }}
            />
          )}

          {step === 3 && (
            <Step3
              next={(time) => {
                setSleepTime(time);
                setStep(4);
              }}
            />
          )}

          {step === 4 && (
            <Step4
              next={(items) => {
                setCommitments(items);
                setCurrentCommitment(0);
                setCommitmentSchedule([]);
                setStep(5);
              }}
            />
          )}

          {step === 5 && (
            <Step5
              key={currentCommitment}
              commitment={commitments[currentCommitment]}
              onSave={(data: any) => {

                const updated = [...commitmentSchedule];

                updated[currentCommitment] = data;

                setCommitmentSchedule(updated);

                setStep(6);

              }}
            />
          )}

          {step === 6 && (
            <Step6
              key={currentCommitment}
              commitment={commitments[currentCommitment]}
              days={
                commitmentSchedule[currentCommitment]?.days ?? []
              }
              sameTime={
                commitmentSchedule[currentCommitment]?.sameTime ??
                true
              }
              onSave={(timeData: any) => {

                const updated = [...commitmentSchedule];

                updated[currentCommitment] = {
                  ...updated[currentCommitment],
                  ...timeData,
                };

                setCommitmentSchedule(updated);

                if (
                  currentCommitment ===
                  commitments.length - 1
                ) {

                  setStep(7);

                } else {

                  setCurrentCommitment((prev) => prev + 1);

                  setStep(5);

                }

              }}
            />
          )}

          {step === 7 && (
            <Step7
              next={async (goalData) => {

                setGoals(goalData);

                const generatedPlans = [];

                for (const goal of goalData) {

                  try {

                    const response =
                      await generateGoalPlan(
                        goal.title,
                        goal.deadline
                      );

                    generatedPlans.push({
                      goal: goal.title,
                      deadline: goal.deadline,
                      tasks: response.tasks,
                    });

                  } catch (error) {

                    console.error(error);

                    alert(
                      `Failed to generate plan for "${goal.title}".`
                    );

                    return;

                  }

                }

                setGoalPlans(generatedPlans);

                setStep(8);

              }}
            />
          )}

          {step === 8 && (

            <Step8
              goalPlans={goalPlans}
              next={async (editedPlans) => {

                try {

                  const response =
                    await generateSchedule({

                      wake_time: wakeTime,

                      sleep_time: sleepTime,

                      hard_constraints:
                        commitmentSchedule.flatMap(
                          (item: any) =>
                            item.days.map((d: any) => ({
                              day: d.day,
                              name: item.commitment,
                              start_time: d.start,
                              end_time: d.end,
                            }))
                        ),

                      soft_constraints: [],

                      goals: editedPlans.map((goal) => ({
                        name: goal.goal,
                        tasks: goal.tasks,
                      })),

                    });

                  const tasksRef =
                    collection(db, "tasks");

                  const snapshot =
                    await getDocs(tasksRef);

                  for (const document of snapshot.docs) {

                    await deleteDoc(
                      doc(db, "tasks", document.id)
                    );

                  }

                  for (const task of response.tasks) {

                    await addDoc(tasksRef, task);

                  }



                  router.push("/schedule");

                } catch (error) {

                  console.error(error);

                  alert("Failed to generate schedule.");

                }

              }}
            />

          )}

        </div>

      </div>

    </main>

  );

}
