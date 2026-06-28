"use client";

import { useEffect, useState } from "react";

import InsightCard from "../../components/InsightCard";

const API_URL = "http://127.0.0.1:8000";

export default function InsightsPage() {
  const [analysis, setAnalysis] = useState<any>(null);

  useEffect(() => {
    async function loadInsights() {
      try {
        const response = await fetch(`${API_URL}/insights`);
        const data = await response.json();
        setAnalysis(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadInsights();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fcfbff] via-[#faf7ff] to-[#f5f1ff] pb-24">

      {/* Header */}

      <section className="mx-auto max-w-7xl px-8 pt-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-500">
              Insights
            </p>

            <h1 className="mt-2 text-6xl font-bold text-slate-900">
              Productivity Analytics
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-500">
              Yumee continuously learns from your habits to uncover
              patterns, celebrate wins, and recommend smarter ways
              to plan your day.
            </p>

          </div>

        </div>

      </section>

      {/* Overview Cards */}

      {analysis && (

        <section className="mx-auto mt-10 grid max-w-7xl gap-6 px-8 md:grid-cols-3">

          <div className="rounded-[30px] border border-violet-100 bg-white/90 p-7 shadow-xl shadow-violet-100/40 backdrop-blur-xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Overall Completion
            </p>

            <h2 className="mt-4 text-5xl font-bold text-violet-600">
              {analysis.overall_completion}%
            </h2>

            <p className="mt-2 text-slate-500">
              Tasks completed successfully
            </p>

          </div>

          <div className="rounded-[30px] border border-emerald-100 bg-white/90 p-7 shadow-xl shadow-emerald-100/40 backdrop-blur-xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Best Habit
            </p>

            <h2 className="mt-4 text-3xl font-bold text-emerald-600">
              {analysis.best_task}
            </h2>

            <p className="mt-2 text-slate-500">
              Your most consistent activity
            </p>

          </div>

          <div className="rounded-[30px] border border-amber-100 bg-white/90 p-7 shadow-xl shadow-amber-100/40 backdrop-blur-xl">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Needs Improvement
            </p>

            <h2 className="mt-4 text-3xl font-bold text-amber-600">
              {analysis.worst_task}
            </h2>

            <p className="mt-2 text-slate-500">
              Focus here for the biggest gains
            </p>

          </div>

        </section>

      )}

      {/* Insight Cards */}

      <section className="mx-auto mt-10 max-w-7xl px-8">

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {!analysis || analysis.insights.length === 0 ? (

            <InsightCard
              title="No Insights Yet"
              emoji="🌱"
              value="Start Completing Tasks"
              description="Yumee will begin learning your habits after you complete a few tasks."
              color="border-violet-200 bg-white"
            />

          ) : (

            analysis.insights.map((item: any, index: number) => (

              <InsightCard
                key={item.task}
                title={item.task}
                emoji={
                  index % 4 === 0
                    ? "🔥"
                    : index % 4 === 1
                    ? "🎯"
                    : index % 4 === 2
                    ? "⚡"
                    : "🧠"
                }
                value={`${item.completion_rate}%`}
                description={item.recommendation}
                color={
                  index % 4 === 0
                    ? "border-violet-200 bg-white"
                    : index % 4 === 1
                    ? "border-emerald-200 bg-white"
                    : index % 4 === 2
                    ? "border-sky-200 bg-white"
                    : "border-amber-200 bg-white"
                }
              />

            ))

          )}

        </div>

      </section>

    </main>
  );
}