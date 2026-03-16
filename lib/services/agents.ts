import type { Agent, AgentProposal } from "@/lib/types";
import { mockAgents, mockAgentProposals } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAgents(): Promise<Agent[]> {
  await delay(400);
  return [...mockAgents];
}

export async function getProposals(agentId?: string): Promise<AgentProposal[]> {
  await delay(400);
  if (agentId) return mockAgentProposals.filter(p => p.agentId === agentId);
  return [...mockAgentProposals];
}

export async function approveProposal(id: string): Promise<void> {
  await delay(600);
}

export async function rejectProposal(id: string): Promise<void> {
  await delay(600);
}

export async function toggleAgentStatus(id: string): Promise<Agent> {
  await delay(400);
  const agent = mockAgents.find(a => a.id === id);
  if (!agent) throw new Error("Agent not found");
  return { ...agent, status: agent.status === "active" ? "paused" : "active" };
}
