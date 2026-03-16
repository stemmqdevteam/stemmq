import type { Notification } from "@/lib/types";
import { mockNotifications } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export async function getNotifications(): Promise<Notification[]> {
  await delay(400);
  return [...mockNotifications];
}

export async function markAsRead(id: string): Promise<void> {
  await delay(300);
}

export async function markAllAsRead(): Promise<void> {
  await delay(300);
}

export async function getUnreadCount(): Promise<number> {
  await delay(200);
  return mockNotifications.filter(n => !n.read).length;
}
