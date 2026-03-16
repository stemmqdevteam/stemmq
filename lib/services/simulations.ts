import type { Simulation } from "@/lib/types";
import { mockSimulations } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getSimulations(): Promise<Simulation[]> {
  await delay(400);
  return [...mockSimulations];
}

export async function getSimulation(id: string): Promise<Simulation | null> {
  await delay(300);
  return mockSimulations.find(s => s.id === id) ?? null;
}

export async function runSimulation(id: string): Promise<Simulation> {
  await delay(2000);
  const sim = mockSimulations.find(s => s.id === id);
  if (!sim) throw new Error("Simulation not found");
  return { ...sim, status: "running", updatedAt: new Date().toISOString() };
}

export async function createSimulation(data: Partial<Simulation>): Promise<Simulation> {
  await delay(600);
  return {
    id: `sim-${String(mockSimulations.length + 1).padStart(3, "0")}`,
    title: data.title ?? "Untitled Simulation",
    description: data.description ?? "",
    probability: 0,
    status: "draft",
    outcomeCount: 0,
    linkedDecisions: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
