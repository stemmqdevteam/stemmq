"use server";

import { cookies } from "next/headers";

const PLAN_COOKIE = "stemmq_selected_plan";

/**
 * Store the selected plan in an HTTP-only cookie.
 * Called when user arrives at /auth?plan=free|pro
 */
export async function setPlanCookie(plan: string) {
  const validPlans = ["free", "pro"];
  if (!validPlans.includes(plan)) return;

  const cookieStore = await cookies();
  cookieStore.set(PLAN_COOKIE, plan, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

/**
 * Read the selected plan from the cookie.
 */
export async function getPlanCookie(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore.get(PLAN_COOKIE)?.value ?? "free";
}

/**
 * Clear the plan cookie after onboarding.
 */
export async function clearPlanCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(PLAN_COOKIE);
}
