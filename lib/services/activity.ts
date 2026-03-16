import type { ActivityItem } from "@/lib/types";
import { mockActivityFeed } from "@/lib/mock-data";

const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

export interface ActivityFilters {
  targetType?: string;
  search?: string;
  limit?: number;
}

export async function getActivities(filters?: ActivityFilters): Promise<ActivityItem[]> {
  await delay(400);
  let results = [...mockActivityFeed];
  if (filters?.targetType && filters.targetType !== "all") {
    results = results.filter(a => a.targetType === filters.targetType);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(a => a.target.toLowerCase().includes(q) || a.user.toLowerCase().includes(q));
  }
  if (filters?.limit) {
    results = results.slice(0, filters.limit);
  }
  return results;
}
