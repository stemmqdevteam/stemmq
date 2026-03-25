"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserOrg, logAudit } from "@/lib/supabase/helpers";
import { revalidatePath } from "next/cache";
import type { Json } from "@/lib/supabase/database.types";

export async function createDecision(data: {
  title: string;
  description?: string;
  strategicIntent: string;
  category?: string;
  expectedOutcome?: string;
  riskLevel?: string;
  timeHorizon?: string;
  assumptions: string[];
}) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { data: decision, error } = await supabase
    .from("decisions")
    .insert({
      org_id: ctx.orgId,
      title: data.title,
      description: data.description || "",
      strategic_intent: data.strategicIntent,
      category: data.category || null,
      expected_outcome: data.expectedOutcome || null,
      risk_level: data.riskLevel || null,
      time_horizon: data.timeHorizon || null,
      owner_id: ctx.userId,
      owner_type: "human",
      status: "active",
    })
    .select("id")
    .single();

  if (error || !decision) throw new Error(error?.message ?? "Failed to create decision");

  // Create assumptions
  if (data.assumptions.length > 0) {
    const rows = data.assumptions.filter(t => t.trim()).map(text => ({
      decision_id: decision.id,
      org_id: ctx.orgId,
      text: text.trim(),
      impact_weight: 3,
      status: "pending" as const,
      owner_id: ctx.userId,
    }));
    if (rows.length > 0) {
      await supabase.from("assumptions").insert(rows);
    }
  }

  await logAudit({
    orgId: ctx.orgId,
    action: "decision.created",
    actorId: ctx.userId,
    resource: decision.id,
    resourceType: "decision",
    details: { title: data.title },
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/decisions");
  return { id: decision.id };
}

export async function updateDecision(id: string, data: {
  title?: string;
  description?: string;
  status?: string;
  strategicIntent?: string;
  riskLevel?: string;
}) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const updateData: Record<string, unknown> = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.strategicIntent !== undefined) updateData.strategic_intent = data.strategicIntent;
  if (data.riskLevel !== undefined) updateData.risk_level = data.riskLevel;

  const { error } = await supabase.from("decisions").update(updateData).eq("id", id).eq("org_id", ctx.orgId);
  if (error) throw new Error(error.message);

  await logAudit({
    orgId: ctx.orgId,
    action: "decision.updated",
    actorId: ctx.userId,
    resource: id,
    resourceType: "decision",
    details: updateData,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/decisions");
}

export async function archiveDecision(id: string) {
  return updateDecision(id, { status: "archived" });
}
