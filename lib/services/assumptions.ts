import type { Assumption, AssumptionStatus } from "@/lib/types";
import { mockAssumptions } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface AssumptionFilters {
  status?: string;
  decisionId?: string;
  search?: string;
}

export async function getAssumptions(filters?: AssumptionFilters): Promise<Assumption[]> {
  await delay(400);
  let results = [...mockAssumptions];
  if (filters?.status && filters.status !== "all") {
    results = results.filter(a => a.status === filters.status);
  }
  if (filters?.decisionId) {
    results = results.filter(a => a.decisionId === filters.decisionId);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(a => a.text.toLowerCase().includes(q));
  }
  return results;
}

export async function updateAssumptionStatus(id: string, status: AssumptionStatus): Promise<Assumption> {
  await delay(400);
  const existing = mockAssumptions.find(a => a.id === id);
  if (!existing) throw new Error("Assumption not found");
  return { ...existing, status, updatedAt: new Date().toISOString() };
}

export async function createAssumption(data: Partial<Assumption>): Promise<Assumption> {
  await delay(600);
  return {
    id: `asm-${String(mockAssumptions.length + 1).padStart(3, "0")}`,
    text: data.text ?? "",
    impactWeight: data.impactWeight ?? 3,
    status: "pending",
    decisionId: data.decisionId ?? "",
    decisionTitle: data.decisionTitle ?? "",
    owner: data.owner ?? "Sarah Chen",
    updatedAt: new Date().toISOString(),
  };
}
