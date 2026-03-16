"use client";

import { PageContainer } from "@/components/layout/page-container";
import { StatWidget } from "@/components/dashboard/stat-widget";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/animations/page-transition";
import { mockAssumptions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig = {
  validated: { label: "Validated", variant: "success" as const, color: "border-success/30" },
  pending: { label: "Pending", variant: "warning" as const, color: "border-warning/30" },
  challenged: { label: "Challenged", variant: "danger" as const, color: "border-danger/30" },
  invalidated: { label: "Invalidated", variant: "neutral" as const, color: "border-muted-foreground/30" },
};

export default function AssumptionsPage() {
  const validated = mockAssumptions.filter((a) => a.status === "validated");
  const pending = mockAssumptions.filter((a) => a.status === "pending");
  const challenged = mockAssumptions.filter((a) => a.status === "challenged" || a.status === "invalidated");

  const validatedPct = ((validated.length / mockAssumptions.length) * 100).toFixed(0);

  return (
    <PageTransition>
      <PageContainer title="Assumptions" description="Track, validate, and challenge the beliefs behind every decision.">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <StatWidget label="Total Assumptions" value={mockAssumptions.length} />
          <StatWidget label="Validated" value={`${validatedPct}%`} />
          <StatWidget label="Challenged" value={challenged.length} />
        </div>

        {/* Three columns */}
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
      </PageContainer>
    </PageTransition>
  );
}

function AssumptionCard({ assumption }: { assumption: typeof mockAssumptions[0] }) {
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
