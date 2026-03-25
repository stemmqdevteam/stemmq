"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { StatWidget } from "@/components/dashboard/stat-widget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Assumption {
  id: string;
  text: string;
  status: "validated" | "pending" | "challenged" | "invalidated";
  impactWeight: number;
  decisionTitle: string;
}

const statusConfig = {
  validated: { label: "Validated", variant: "success" as const, color: "border-success/30" },
  pending: { label: "Pending", variant: "warning" as const, color: "border-warning/30" },
  challenged: { label: "Challenged", variant: "danger" as const, color: "border-danger/30" },
  invalidated: { label: "Invalidated", variant: "neutral" as const, color: "border-muted-foreground/30" },
};

export default function AssumptionsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [assumptions, setAssumptions] = useState<Assumption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchAssumptions() {
      setLoading(true);
      const { data } = await supabase
        .from("assumptions")
        .select("*, decisions(title)")
        .eq("org_id", orgId!)
        .order("created_at", { ascending: false });

      if (data) {
        setAssumptions(
          data.map((a: any) => ({
            id: a.id,
            text: a.text,
            status: a.status || "pending",
            impactWeight: a.impact_weight ?? 1,
            decisionTitle: a.decisions?.title || "Unlinked",
          }))
        );
      }
      setLoading(false);
    }

    fetchAssumptions();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Assumptions" description="Track, validate, and challenge the beliefs behind every decision.">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-24 rounded-lg bg-muted animate-pulse" />
                ))}
              </div>
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  const validated = assumptions.filter((a) => a.status === "validated");
  const pending = assumptions.filter((a) => a.status === "pending");
  const challenged = assumptions.filter((a) => a.status === "challenged" || a.status === "invalidated");
  const validatedPct = assumptions.length > 0 ? ((validated.length / assumptions.length) * 100).toFixed(0) : "0";

  return (
    <PageTransition>
      <PageContainer title="Assumptions" description="Track, validate, and challenge the beliefs behind every decision.">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatWidget label="Total Assumptions" value={assumptions.length} />
          <StatWidget label="Validated" value={`${validatedPct}%`} />
          <StatWidget label="Challenged" value={challenged.length} />
        </div>

        {assumptions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No assumptions recorded yet. Assumptions are created alongside decisions.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Validated */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="success">Validated</Badge>
                <span className="text-xs text-muted-foreground">{validated.length}</span>
              </div>
              <div className="space-y-3">
                {validated.map((a) => (
                  <AssumptionCard key={a.id} assumption={a} />
                ))}
              </div>
            </div>

            {/* Pending */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="warning">Pending</Badge>
                <span className="text-xs text-muted-foreground">{pending.length}</span>
              </div>
              <div className="space-y-3">
                {pending.map((a) => (
                  <AssumptionCard key={a.id} assumption={a} />
                ))}
              </div>
            </div>

            {/* Challenged */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="danger">Challenged</Badge>
                <span className="text-xs text-muted-foreground">{challenged.length}</span>
              </div>
              <div className="space-y-3">
                {challenged.map((a) => (
                  <AssumptionCard key={a.id} assumption={a} />
                ))}
              </div>
            </div>
          </div>
        )}
      </PageContainer>
    </PageTransition>
  );
}

function AssumptionCard({ assumption }: { assumption: Assumption }) {
  const config = statusConfig[assumption.status];
  return (
    <Card className={cn("border-l-2", config.color)} hoverable>
      <CardContent className="p-4">
        <p className="text-sm text-card-foreground">{assumption.text}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  i < assumption.impactWeight ? "bg-accent" : "bg-muted"
                )}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{assumption.decisionTitle}</span>
        </div>
      </CardContent>
    </Card>
  );
}
