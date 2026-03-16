import type { User, Workspace } from "@/lib/types";
import { mockUser, mockWorkspaces } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCurrentUser(): Promise<User> {
  await delay(300);
  return { ...mockUser };
}

export async function updateProfile(data: Partial<User>): Promise<User> {
  await delay(500);
  return { ...mockUser, ...data };
}

export async function getWorkspaces(): Promise<Workspace[]> {
  await delay(300);
  return [...mockWorkspaces];
}

export async function switchWorkspace(workspaceId: string): Promise<Workspace> {
  await delay(400);
  const ws = mockWorkspaces.find(w => w.id === workspaceId);
  if (!ws) throw new Error("Workspace not found");
  return ws;
}
