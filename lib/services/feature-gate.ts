/**
 * Feature Gating Service.
 * Defines plan limits and checks feature access.
 */

export type PlanName = "free" | "pro" | "enterprise";

export interface PlanLimits {
  maxDecisions: number;
  maxMembers: number;
  maxAiCalls: number;
  simulations: boolean;
  documents: boolean;
  agents: boolean;
  advancedAnalytics: boolean;
  auditLogs: boolean;
  strategyGraph: boolean;
}

const PLAN_LIMITS: Record<PlanName, PlanLimits> = {
  free: {
    maxDecisions: 30,
    maxMembers: 1,
    maxAiCalls: 10,
    simulations: false,
    documents: false,
    agents: false,
    advancedAnalytics: false,
    auditLogs: false,
    strategyGraph: false,
  },
  pro: {
    maxDecisions: Infinity,
    maxMembers: 50,
    maxAiCalls: Infinity,
    simulations: true,
    documents: true,
    agents: false,
    advancedAnalytics: true,
    auditLogs: true,
    strategyGraph: false,
  },
  enterprise: {
    maxDecisions: Infinity,
    maxMembers: Infinity,
    maxAiCalls: Infinity,
    simulations: true,
    documents: true,
    agents: true,
    advancedAnalytics: true,
    auditLogs: true,
    strategyGraph: true,
  },
};

export type Feature = keyof Omit<PlanLimits, "maxDecisions" | "maxMembers" | "maxAiCalls">;

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[(plan as PlanName)] ?? PLAN_LIMITS.free;
}

export function checkFeatureAccess(
  plan: string,
  feature: Feature
): { allowed: boolean; requiredPlan: PlanName } {
  const limits = getPlanLimits(plan);
  const allowed = limits[feature] === true;

  // Find the minimum plan that allows this feature
  let requiredPlan: PlanName = "enterprise";
  if (PLAN_LIMITS.pro[feature]) requiredPlan = "pro";
  if (PLAN_LIMITS.free[feature]) requiredPlan = "free";

  return { allowed, requiredPlan };
}

export function checkUsageLimit(
  plan: string,
  resource: "decisions" | "members" | "aiCalls",
  currentCount: number
): { allowed: boolean; limit: number; used: number } {
  const limits = getPlanLimits(plan);

  const limitMap = {
    decisions: limits.maxDecisions,
    members: limits.maxMembers,
    aiCalls: limits.maxAiCalls,
  };

  const limit = limitMap[resource];
  return {
    allowed: currentCount < limit,
    limit: limit === Infinity ? -1 : limit,
    used: currentCount,
  };
}
