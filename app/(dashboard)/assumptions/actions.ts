"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserOrg, logAudit } from "@/lib/supabase/helpers";
import { revalidatePath } from "next/cache";

export async function createAssumption(data: {
  decisionId: string;
  text: string;
  impactWeight?: number;
}) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { data: assumption, error } = await supabase
    .from("assumptions")
    .insert({
      decision_id: data.decisionId,
      org_id: ctx.orgId,
      text: data.text,
      impact_weight: data.impactWeight ?? 3,
      status: "pending",
      owner_id: ctx.userId,
    })
    .select("id")
    .single();

  if (error || !assumption) throw new Error(error?.message ?? "Failed to create assumption");

  await logAudit({
    orgId: ctx.orgId,
    action: "assumption.created",
    actorId: ctx.userId,
    resource: assumption.id,
    resourceType: "assumption",
  });

  revalidatePath("/dashboard/assumptions");
  revalidatePath("/dashboard/decisions");
  return { id: assumption.id };
}

export async function updateAssumptionStatus(id: string, status: string) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { error } = await supabase
    .from("assumptions")
    .update({ status })
    .eq("id", id)
    .eq("org_id", ctx.orgId);

  if (error) throw new Error(error.message);

  await logAudit({
    orgId: ctx.orgId,
    action: "assumption.status_changed",
    actorId: ctx.userId,
    resource: id,
    resourceType: "assumption",
    details: { status },
  });

  revalidatePath("/dashboard/assumptions");
}

export async function deleteAssumption(id: string) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { error } = await supabase
    .from("assumptions")
    .delete()
    .eq("id", id)
    .eq("org_id", ctx.orgId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/assumptions");
}
