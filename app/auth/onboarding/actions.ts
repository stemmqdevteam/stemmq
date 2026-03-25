"use server";

import { createClient } from "@/lib/supabase/server";
import { getPlanCookie, clearPlanCookie } from "@/app/auth/actions";
import { redirect } from "next/navigation";
import type { Json } from "@/lib/supabase/database.types";

/**
 * Step 1: Create organization, org_member, and subscription.
 */
export async function createOrganization(data: {
  name: string;
  industry: string;
  size: string;
  stage: string;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Use RPC function (SECURITY DEFINER) to bypass RLS for onboarding
  const plan = await getPlanCookie();
  const { data: orgId, error } = await supabase.rpc("setup_organization", {
    p_user_id: user.id,
    p_org_name: data.name,
    p_industry: data.industry || undefined,
    p_size: data.size || undefined,
    p_stage: data.stage || undefined,
    p_plan: plan === "pro" ? "pro" : "free",
  });

  if (error || !orgId) throw new Error(error?.message ?? "Failed to create organization");

  return { orgId: orgId as string };
}

/**
 * Step 2 & 3: Update organization config (strategic focus, decision culture).
 */
export async function updateOrganizationConfig(
  orgId: string,
  configPatch: Record<string, unknown>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.rpc("update_org_config", {
    p_org_id: orgId,
    p_config_patch: configPatch as Json,
  });

  if (error) throw new Error(error.message);
}

/**
 * Step 4: Create the first decision with assumptions.
 */
export async function createFirstDecision(data: {
  orgId: string;
  title: string;
  strategicIntent: string;
  expectedOutcome: string;
  assumptions: string[];
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: decisionId, error } = await supabase.rpc("create_first_decision", {
    p_org_id: data.orgId,
    p_user_id: user.id,
    p_title: data.title,
    p_strategic_intent: data.strategicIntent,
    p_expected_outcome: data.expectedOutcome || "",
    p_assumptions: data.assumptions.filter(a => a.trim()),
  });

  if (error) throw new Error(error.message);
  return { decisionId: decisionId as string };
}

/**
 * Step 5: Complete onboarding — mark user as onboarded, handle plan.
 */
export async function completeOnboarding(orgId: string, paymentSuccess?: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const plan = await getPlanCookie();

  const { error } = await supabase.rpc("complete_onboarding", {
    p_user_id: user.id,
    p_org_id: orgId,
    p_plan: plan,
    p_payment_success: paymentSuccess ?? false,
  });

  if (error) throw new Error(error.message);

  // Clear plan cookie
  await clearPlanCookie();

  // Redirect to dashboard
  redirect("/dashboard");
}
