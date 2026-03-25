import { createClient } from "@/lib/supabase/server";

export async function getDecisions(orgId: string, options?: {
  status?: string;
  limit?: number;
  offset?: number;
  search?: string;
}) {
  const supabase = await createClient();
  let query = supabase
    .from("decisions")
    .select("*, assumptions(count)", { count: "exact" })
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });

  if (options?.status) query = query.eq("status", options.status);
  if (options?.search) query = query.ilike("title", `%${options.search}%`);
  if (options?.limit) query = query.limit(options.limit);
  if (options?.offset) query = query.range(options.offset, options.offset + (options.limit ?? 20) - 1);

  const { data, error, count } = await query;
  if (error) throw new Error(error.message);
  return { decisions: data ?? [], total: count ?? 0 };
}

export async function getDecision(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decisions")
    .select("*, assumptions(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function getDecisionStats(orgId: string) {
  const supabase = await createClient();

  const [decisionsResult, assumptionsResult] = await Promise.all([
    supabase.from("decisions").select("id, dqs, status, strategic_intent").eq("org_id", orgId),
    supabase.from("assumptions").select("id, status").eq("org_id", orgId),
  ]);

  const decisions = decisionsResult.data ?? [];
  const assumptions = assumptionsResult.data ?? [];

  const activeDecisions = decisions.filter(d => d.status === "active").length;
  const avgDqs = decisions.length > 0
    ? Math.round(decisions.reduce((sum, d) => sum + (d.dqs ?? 0), 0) / decisions.length)
    : 0;

  const validatedAssumptions = assumptions.filter(a => a.status === "validated").length;
  const assumptionAccuracy = assumptions.length > 0
    ? Math.round((validatedAssumptions / assumptions.length) * 100)
    : 0;

  const strategicConfidence = Math.min(100, Math.round((avgDqs * 0.4 + assumptionAccuracy * 0.6)));

  return {
    activeDecisions,
    totalDecisions: decisions.length,
    avgDqs,
    assumptionAccuracy,
    strategicConfidence,
    totalAssumptions: assumptions.length,
    validatedAssumptions,
  };
}
