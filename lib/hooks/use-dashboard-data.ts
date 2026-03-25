"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useOrg } from "./use-org";

export function useDashboardData() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [data, setData] = useState<{
    metrics: { activeDecisions: number; avgDqs: number; assumptionAccuracy: number; strategicConfidence: number };
    recentDecisions: Array<Record<string, unknown>>;
    activityFeed: Array<Record<string, unknown>>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!orgId) return;
    const supabase = createClient();

    const [decisionsRes, assumptionsRes, activityRes] = await Promise.all([
      supabase.from("decisions").select("*").eq("org_id", orgId).order("created_at", { ascending: false }),
      supabase.from("assumptions").select("id, status").eq("org_id", orgId),
      supabase.from("audit_logs").select("*").eq("org_id", orgId).order("created_at", { ascending: false }).limit(10),
    ]);

    const decisions = decisionsRes.data ?? [];
    const assumptions = assumptionsRes.data ?? [];
    const activity = activityRes.data ?? [];

    const activeDecisions = decisions.filter(d => d.status === "active").length;
    const avgDqs = decisions.length > 0
      ? Math.round(decisions.reduce((sum, d) => sum + (d.dqs ?? 0), 0) / decisions.length)
      : 0;
    const validatedAssumptions = assumptions.filter(a => a.status === "validated").length;
    const assumptionAccuracy = assumptions.length > 0
      ? Math.round((validatedAssumptions / assumptions.length) * 100)
      : 0;
    const strategicConfidence = Math.min(100, Math.round((avgDqs * 0.4 + assumptionAccuracy * 0.6)));

    setData({
      metrics: { activeDecisions, avgDqs, assumptionAccuracy, strategicConfidence },
      recentDecisions: decisions.slice(0, 5),
      activityFeed: activity,
    });
    setIsLoading(false);
  }, [orgId]);

  useEffect(() => {
    if (!orgLoading && orgId) fetchData();
    if (!orgLoading && !orgId) setIsLoading(false);
  }, [orgLoading, orgId, fetchData]);

  return { data, isLoading: isLoading || orgLoading, refetch: fetchData };
}
