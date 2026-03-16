"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InsightPanel } from "@/components/dashboard/insight-panel";
import { PageTransition } from "@/components/animations/page-transition";
import { mockAgents, mockAgentProposals } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";

const statusColors = {
  active: "bg-success",
  paused: "bg-muted-foreground",
  reviewing: "bg-warning",
};

const priorityVariant = {
  high: "danger" as const,
  medium: "warning" as const,
  low: "neutral" as const,
};

export default function AgentsPage() {
  return (
    <PageTransition>
      <PageContainer
        title="Agents"
        description="AI agents operating under governance and oversight frameworks."
      >
        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {mockAgents.map((agent) => (
            <Card key={agent.id} hoverable>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", statusColors[agent.status])} />
                    <CardTitle className="text-sm">{agent.name}</CardTitle>
                  </div>
                  <Badge variant={agent.status === "active" ? "success" : agent.status === "reviewing" ? "warning" : "neutral"}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">{agent.objective}</p>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-semibold text-card-foreground">{agent.accuracyScore}%</p>
                    <p className="text-[10px] text-muted-foreground">Accuracy</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-card-foreground">{agent.decisionsProcessed}</p>
                    <p className="text-[10px] text-muted-foreground">Processed</p>
                  </div>
                  <div>
                    <p className={cn(
                      "text-lg font-semibold",
                      agent.pendingProposals > 0 ? "text-warning" : "text-card-foreground"
                    )}>
                      {agent.pendingProposals}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Pending</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Last active {formatRelativeTime(agent.lastActive)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Approval Queue */}
        <InsightPanel title="Approval Queue" actions={<Badge variant="warning">{mockAgentProposals.length} pending</Badge>}>
          <div className="space-y-3">
            {mockAgentProposals.map((proposal) => (
              <div key={proposal.id} className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{proposal.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      by {proposal.agentName} &middot; {formatRelativeTime(proposal.createdAt)}
                    </p>
                  </div>
                  <Badge variant={priorityVariant[proposal.priority]}>
                    {proposal.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{proposal.description}</p>
                <div className="flex items-center gap-2">
                  <Button variant="accent" size="sm">Approve</Button>
                  <Button variant="outline" size="sm">Modify</Button>
                  <Button variant="ghost" size="sm" className="text-danger">Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </InsightPanel>
      </PageContainer>
    </PageTransition>
  );
}
