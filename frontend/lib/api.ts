const API_URL = "http://127.0.0.1:8000";

export async function generateGoalPlan(
  goal: string,
  deadline: string | null
) {
  const response = await fetch(`${API_URL}/generate-goal-plan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal,
      deadline,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate goal plan.");
  }

  return await response.json();
}

export async function generateSchedule(data: any) {
  const response = await fetch(`${API_URL}/generate-schedule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate schedule.");
  }

  return await response.json();
}

export async function getSchedule() {
  const response = await fetch(`${API_URL}/schedule`);

  if (!response.ok) {
    throw new Error("Failed to fetch schedule.");
  }

  return await response.json();
}

export async function completeTask(data: any) {
  const response = await fetch(`${API_URL}/complete-task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to complete task.");
  }

  return await response.json();
}

export async function askYumee(data: {
  task: string;
  goal: string;
  question: string;
}) {

  const response = await fetch(
    `${API_URL}/ask-yumee`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to contact Yumee.");
  }

  return await response.json();
}