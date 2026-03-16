import type { TeamMember } from "@/lib/types";
import { mockTeamMembers } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getTeamMembers(): Promise<TeamMember[]> {
  await delay(400);
  return [...mockTeamMembers];
}

export async function inviteTeamMember(email: string, role: string): Promise<TeamMember> {
  await delay(600);
  const initials = email.split("@")[0].slice(0, 2).toUpperCase();
  return {
    id: `tm-${String(mockTeamMembers.length + 1).padStart(3, "0")}`,
    name: email.split("@")[0],
    email,
    role,
    avatar: initials,
    forecastReliability: 0,
    lastActive: new Date().toISOString(),
  };
}

export async function removeTeamMember(id: string): Promise<void> {
  await delay(400);
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
  await delay(400);
  const member = mockTeamMembers.find(m => m.id === id);
  if (!member) throw new Error("Team member not found");
  return { ...member, ...data };
}
