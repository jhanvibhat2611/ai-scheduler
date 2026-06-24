import GoalJourney from "../../components/GoalJourney";

export default function GoalsPage() {
  return (
    <main className="min-h-screen bg-[#0F172A] text-white p-6 pb-24">
      <h1 className="text-3xl font-bold mb-8">
        Goals Journey
      </h1>

      <div className="space-y-6">

        <GoalJourney
          title="Morgan Stanley Internship"
          currentStep={3}
          steps={[
            "Aptitude",
            "Arrays",
            "Binary Search",
            "Graphs",
            "Dynamic Programming",
            "System Design",
            "Interview Ready",
          ]}
        />

        <GoalJourney
          title="Fitness Journey"
          currentStep={2}
          steps={[
            "Consistency",
            "2kg Lost",
            "5kg Lost",
            "10kg Lost",
            "Goal Weight",
          ]}
        />

      </div>
    </main>
  );
}