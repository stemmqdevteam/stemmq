"use client";

import { useState, useEffect } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InsightPanel } from "@/components/dashboard/insight-panel";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  objective: string;
  status: "active" | "paused" | "reviewing";
  forecastAccuracy: number;
  dqsScore: number;
  successRate: number;
  failureRate: number;
}

const statusColors: Record<string, string> = {
  active: "bg-success",
  paused: "bg-muted-foreground",
  reviewing: "bg-warning",
};

export default function AgentsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchAgents() {
      setLoading(true);
      const { data } = await supabase
        .from("agents")
        .select("*")
        .eq("org_id", orgId!)
        .order("created_at", { ascending: false });

      if (data) {
        setAgents(
          data.map((a: any) => ({
            id: a.id,
            name: a.name,
            role: a.role || "Agent",
            department: a.department || "General",
            objective: a.objective || "",
            status: a.status || "active",
            forecastAccuracy: a.forecast_accuracy ?? 0,
            dqsScore: a.dqs_score ?? 0,
            successRate: a.success_rate ?? 0,
            failureRate: a.failure_rate ?? 0,
          }))
        );
      }
      setLoading(false);
    }

    fetchAgents();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Agents" description="AI agents operating as decision-making systems under StemmQ governance.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
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
        title="Agents"
        description="AI agents operating as decision-making systems under StemmQ governance."
      >
        {agents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No agents configured yet. Create your first AI agent to get started.</p>
          </div>
        ) : (
          <>
            {/* Agent cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {agents.map((agent) => (
                <Card key={agent.id} hoverable>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn("h-2 w-2 rounded-full", statusColors[agent.status] || "bg-muted-foreground")} />
                        <CardTitle className="text-sm">{agent.name}</CardTitle>
                      </div>
                      <Badge variant={agent.status === "active" ? "success" : agent.status === "reviewing" ? "warning" : "neutral"}>
                        {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-accent font-medium mb-1">{agent.role} · {agent.department}</p>
                    <p className="text-xs text-muted-foreground mb-4">{agent.objective}</p>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-lg font-semibold text-card-foreground">{agent.forecastAccuracy}%</p>
                        <p className="text-[10px] text-muted-foreground">Forecast</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-card-foreground">{agent.dqsScore}</p>
                        <p className="text-[10px] text-muted-foreground">DQS</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-card-foreground">{agent.successRate}%</p>
                        <p className="text-[10px] text-muted-foreground">Success</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </PageContainer>
    </PageTransition>
  );
}
