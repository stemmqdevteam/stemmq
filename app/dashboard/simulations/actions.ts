"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserOrg, logAudit } from "@/lib/supabase/helpers";
import { revalidatePath } from "next/cache";
import type { Json } from "@/lib/supabase/database.types";

export async function createSimulation(data: {
  title: string;
  description?: string;
  config?: Record<string, unknown>;
}) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { data: simulation, error } = await supabase
    .from("simulations")
    .insert({
      org_id: ctx.orgId,
      title: data.title,
      description: data.description || "",
      config: (data.config || {}) as Json,
      status: "draft",
    })
    .select("id")
    .single();

  if (error || !simulation) throw new Error(error?.message ?? "Failed to create simulation");

  await logAudit({
    orgId: ctx.orgId,
    action: "simulation.created",
    actorId: ctx.userId,
    resource: simulation.id,
    resourceType: "simulation",
  });

  revalidatePath("/dashboard/simulations");
  return { id: simulation.id };
}

export async function deleteSimulation(id: string) {
  const ctx = await getCurrentUserOrg();
  if (!ctx) throw new Error("Not authenticated");
  const supabase = await createClient();

  const { error } = await supabase
    .from("simulations")
    .delete()
    .eq("id", id)
    .eq("org_id", ctx.orgId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/simulations");
}
