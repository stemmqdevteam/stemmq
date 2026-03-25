"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserOrg, logAudit } from "@/lib/supabase/helpers";
import { revalidatePath } from "next/cache";
import type { Json } from "@/lib/supabase/database.types";

export async function createAgent(data: {
  name: string;
  role?: string;
  department?: string;
  objective?: string;
  capabilities?: string[];
  decisionScope?: string[];
  riskBoundaries?: Record<string, unknown>;
  instructionLayer?: string;
}) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { data: agent, error } = await supabase
    .from("agents")
    .insert({
      org_id: ctx.orgId,
      name: data.name,
      role: data.role || null,
      department: data.department || null,
      objective: data.objective || null,
      capabilities: (data.capabilities || []) as unknown as Json,
      decision_scope: data.decisionScope || [],
      risk_boundaries: (data.riskBoundaries || {}) as Json,
      instruction_layer: data.instructionLayer || "",
      status: "active",
    })
    .select("id")
    .single();

  if (error || !agent) throw new Error(error?.message ?? "Failed to create agent");

  await logAudit({
    orgId: ctx.orgId,
    action: "agent.created",
    actorId: ctx.userId,
    resource: agent.id,
    resourceType: "agent",
  });

  revalidatePath("/dashboard/agents");
  return { id: agent.id };
}

export async function updateAgentStatus(id: string, status: string) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { error } = await supabase
    .from("agents")
    .update({ status })
    .eq("id", id)
    .eq("org_id", ctx.orgId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/agents");
}

export async function deleteAgent(id: string) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { error } = await supabase
    .from("agents")
    .delete()
    .eq("id", id)
    .eq("org_id", ctx.orgId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/agents");
}
