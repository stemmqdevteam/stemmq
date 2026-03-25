import { createClient } from "@/lib/supabase/server";

export async function getAssumptions(orgId: string, options?: {
  status?: string;
  decisionId?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("assumptions")
    .select("*, decisions(title)")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.decisionId) query = query.eq("decision_id", options.decisionId);

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getAssumptionsByStatus(orgId: string) {
  const all = await getAssumptions(orgId);
  return {
    validated: all.filter(a => a.status === "validated"),
    pending: all.filter(a => a.status === "pending"),
    challenged: all.filter(a => a.status === "challenged"),
    invalidated: all.filter(a => a.status === "invalidated"),
  };
}
