"use client";

import { Plus, Play, Clock, CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { PageTransition } from "@/components/animations/page-transition";
import { mockSimulations } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mockSimulations.map((sim) => {
            const Icon = statusIcon[sim.status];
            return (
              <Card key={sim.id} hoverable>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-sm">{sim.title}</CardTitle>
                    <Badge variant={statusVariant[sim.status]} className="shrink-0">
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
          title="Pricing Restructure Impact — Outcome Distribution"
          subtitle="Monte Carlo simulation with 10,000 iterations"
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
      </PageContainer>
    </PageTransition>
  );
}
