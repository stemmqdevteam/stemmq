import type { Decision } from "@/lib/types";
import { mockDecisions } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface DecisionFilters {
  status?: string;
  strategicIntent?: string;
  search?: string;
  owner?: string;
}

export async function getDecisions(filters?: DecisionFilters): Promise<Decision[]> {
  await delay(400);
  let results = [...mockDecisions];
  if (filters?.status && filters.status !== "all") {
    results = results.filter(d => d.status === filters.status);
  }
  if (filters?.strategicIntent && filters.strategicIntent !== "all") {
    results = results.filter(d => d.strategicIntent === filters.strategicIntent);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(d => d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
  }
  return results;
}

export async function getDecision(id: string): Promise<Decision | null> {
  await delay(300);
  return mockDecisions.find(d => d.id === id) ?? null;
}

export async function createDecision(data: Partial<Decision>): Promise<Decision> {
  await delay(600);
  const newDecision: Decision = {
    id: `dec-${String(mockDecisions.length + 1).padStart(3, "0")}`,
    title: data.title ?? "Untitled Decision",
    description: data.description ?? "",
    strategicIntent: data.strategicIntent ?? "Growth",
    category: data.category ?? "General",
    owner: data.owner ?? { name: "Sarah Chen", type: "human", avatar: "SC" },
    status: "draft",
    dqs: 0,
    diw: 0,
    assumptionCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  return newDecision;
}

export async function updateDecision(id: string, data: Partial<Decision>): Promise<Decision> {
  await delay(400);
  const existing = mockDecisions.find(d => d.id === id);
  if (!existing) throw new Error("Decision not found");
  return { ...existing, ...data, updatedAt: new Date().toISOString() };
}

export async function deleteDecision(id: string): Promise<void> {
  await delay(400);
}
