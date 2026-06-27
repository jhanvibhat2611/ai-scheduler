"use client";

import { useEffect, useState } from "react";

import InsightCard from "../../components/InsightCard";

const API_URL = "http://127.0.0.1:8000";

export default function InsightsPage() {

  const [insights, setInsights] = useState<any[]>([]);

  useEffect(() => {

    async function loadInsights() {

      try {

        const response = await fetch(
          `${API_URL}/insights`
        );

        const data = await response.json();

        setInsights(data.insights);

      } catch (error) {

        console.error(error);

      }

    }

    loadInsights();

  }, []);

  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">

      <h1 className="mb-2 text-4xl font-bold">
        Your Productivity DNA 🧠
      </h1>

      <p className="mb-8 text-slate-400">
        Yumee has been quietly learning how you work.
      </p>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {insights.length === 0 ? (

          <InsightCard
            title="No Insights Yet"
            emoji="🌱"
            value="Start Completing Tasks"
            description="Yumee will begin learning your habits after you complete a few tasks."
            color="border-violet-500 bg-violet-950/20"
          />

        ) : (

          insights.map((item, index) => (

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
                  ? "border-violet-500 bg-violet-950/20"
                  : index % 4 === 1
                  ? "border-green-500 bg-green-950/20"
                  : index % 4 === 2
                  ? "border-blue-500 bg-blue-950/20"
                  : "border-yellow-500 bg-yellow-950/20"
              }
            />

          ))

        )}

      </div>

    </main>
  );

}