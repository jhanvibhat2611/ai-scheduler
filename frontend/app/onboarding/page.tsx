"use client";

import { useState } from "react";

import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import Step6 from "./components/Step6";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  const [wakeTime, setWakeTime] = useState("");
  const [sleepTime, setSleepTime] = useState("");

  const [commitments, setCommitments] = useState<string[]>([]);
  const [currentCommitment, setCurrentCommitment] = useState(0);

  const [commitmentSchedule, setCommitmentSchedule] = useState<any[]>([]);

  return (
    <main className="min-h-screen bg-[#0F172A] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">

        {/* Brand */}

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white">
            Honestli
          </h1>

          <p className="text-slate-400 mt-2">
            Powered by Yumee
          </p>
        </div>

        {/* Progress */}

        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>
              Step {step} of 6
            </span>

            <span>
              {Math.round((step / 6) * 100)}%
            </span>
          </div>

          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all duration-500"
              style={{
                width: `${(step / 6) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-3xl border border-slate-700 p-12">

          {step === 1 && (
            <Step1
              next={() => setStep(2)}
            />
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
              days={commitmentSchedule[currentCommitment]?.days ?? []}
              sameTime={commitmentSchedule[currentCommitment]?.sameTime ?? true}
              onSave={(timeData: any) => {
                const updated = [...commitmentSchedule];

                updated[currentCommitment] = {
                  ...updated[currentCommitment],
                  timings: timeData.timings,
                };

                setCommitmentSchedule(updated);

                if (currentCommitment === commitments.length - 1) {
                  console.log("Finished onboarding!");
                  console.log(updated);

                  // TODO:
                  // setStep(7);
                } else {
                  setCurrentCommitment((prev) => prev + 1);
                  setStep(5);
                }
              }}
            />
          )}

        </div>
      </div>
    </main>
  );
}