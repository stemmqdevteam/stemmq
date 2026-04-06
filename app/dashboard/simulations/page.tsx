"use client";

import { useState, useEffect } from "react";
import { Plus, Play, Clock, CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { formatDate, cn } from "@/lib/utils";

interface Simulation {
  id: string;
  title: string;
  description: string;
  probability: number;
  status: "draft" | "running" | "completed";
  outcomeCount: number;
  linkedDecisions: number;
  updatedAt: string;
}

const statusIcon = {
  draft: Clock,
  running: Play,
  completed: CheckCircle2,
};

const statusVariant = {
  draft: "warning" as const,
  running: "info" as const,
  completed: "success" as const,
};

export default function SimulationsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [simulations, setSimulations] = useState<Simulation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchSimulations() {
      setLoading(true);
      const { data } = await supabase
        .from("simulations")
        .select("*")
        .eq("org_id", orgId!)
        .order("created_at", { ascending: false });

      if (data) {
        setSimulations(
          data.map((s: any) => ({
            id: s.id,
            title: s.title,
            description: s.description || "",
            probability: s.probability ?? 0,
            status: s.status || "draft",
            outcomeCount: s.outcome_count ?? 0,
            linkedDecisions: s.linked_decisions ?? 0,
            updatedAt: s.updated_at || s.created_at,
          }))
        );
      }
      setLoading(false);
    }

    fetchSimulations();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Simulations" description="Model probabilistic outcomes before committing to a direction.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer
        title="Simulations"
        description="Model probabilistic outcomes before committing to a direction."
        actions={
          <Button variant="accent" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Simulation
          </Button>
        }
      >
        {simulations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No simulations created yet. Run your first scenario simulation.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {simulations.map((sim) => {
                const Icon = statusIcon[sim.status] || Clock;
                return (
                  <Card key={sim.id} hoverable>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-sm">{sim.title}</CardTitle>
                        <Badge variant={statusVariant[sim.status] || "warning"} className="shrink-0">
                          <Icon className="h-3 w-3 mr-1" />
                          {sim.status.charAt(0).toUpperCase() + sim.status.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription className="text-xs">{sim.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Probability bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Probability</span>
                          <span className="font-medium text-card-foreground">{(sim.probability * 100).toFixed(0)}%</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-1.5 rounded-full",
                              sim.probability > 0.7 ? "bg-success" : sim.probability > 0.5 ? "bg-warning" : "bg-danger"
                            )}
                            style={{ width: `${sim.probability * 100}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{sim.outcomeCount} outcomes</span>
                        <span>{sim.linkedDecisions} linked decisions</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{formatDate(sim.updatedAt)}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Expanded simulation chart */}
            <ChartContainer
              title="Outcome Distribution"
              subtitle="Probabilistic simulation results"
              minHeight="h-48"
            >
              <div className="flex items-end gap-0.5 h-full px-4 pb-2">
                {[5, 8, 12, 18, 25, 35, 48, 62, 75, 82, 78, 65, 52, 38, 25, 15, 10, 6, 3, 2].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-accent/60 hover:bg-accent transition-colors"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </ChartContainer>
          </>
        )}
      </PageContainer>
    </PageTransition>
  );
}
