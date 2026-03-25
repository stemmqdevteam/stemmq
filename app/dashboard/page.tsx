"use client";

import { PageContainer } from "@/components/layout/page-container";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { InsightPanel } from "@/components/dashboard/insight-panel";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardData } from "@/lib/hooks/use-dashboard-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { StrategicIntent } from "@/lib/types";

export default function DashboardOverview() {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <PageTransition>
        <PageContainer title="Strategic Overview" description="Real-time intelligence across your decision landscape.">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28" />)}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  const metrics = data?.metrics ?? { activeDecisions: 0, avgDqs: 0, assumptionAccuracy: 0, strategicConfidence: 0 };
  const recentDecisions = (data?.recentDecisions ?? []) as Array<{
    id: string; title: string; strategic_intent: string; dqs: number;
    status: string; updated_at: string; owner_type: string;
  }>;
  const activityFeed = (data?.activityFeed ?? []) as Array<{
    id: string; action: string; resource_type: string; created_at: string;
  }>;

  const metricCards = [
    { label: "Active Decisions", value: String(metrics.activeDecisions), change: 0, trend: "flat" as const, icon: "brain" },
    { label: "Avg Decision Quality", value: String(metrics.avgDqs), change: 0, trend: "flat" as const, icon: "target" },
    { label: "Assumption Accuracy", value: `${metrics.assumptionAccuracy}%`, change: 0, trend: "flat" as const, icon: "check-circle" },
    { label: "Strategic Confidence", value: `${metrics.strategicConfidence}%`, change: 0, trend: "flat" as const, icon: "shield" },
  ];

  return (
    <PageTransition>
      <PageContainer title="Strategic Overview" description="Real-time intelligence across your decision landscape.">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metricCards.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ChartContainer title="Decision Quality Trend" subtitle="Based on actual decisions">
            {recentDecisions.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Create decisions to see quality trends
              </div>
            ) : (
              <div className="flex items-end gap-1.5 h-full px-2 pb-2">
                {recentDecisions.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end">
                    <div
                      className="rounded-sm bg-accent/70 hover:bg-accent transition-colors"
                      style={{ height: `${Math.max(5, d.dqs)}%` }}
                    />
                  </div>
                ))}
              </div>
            )}
          </ChartContainer>

          <ChartContainer title="Strategic Health Index" subtitle="Composite score">
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5"
                    strokeDasharray={`${metrics.strategicConfidence} 100`} className="text-accent" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">{metrics.strategicConfidence}</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Recent Decisions + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InsightPanel title="Recent Decisions">
            {recentDecisions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground mb-1">No decisions yet</p>
                <p className="text-xs text-muted-foreground">Create your first decision to get started</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentDecisions.map((d) => (
                  <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <Avatar initials={d.owner_type === "agent" ? "AI" : "U"} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground truncate">{d.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {d.strategic_intent && (
                          <Badge intent={d.strategic_intent as StrategicIntent} className="text-[10px]">
                            {d.strategic_intent}
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{formatRelativeTime(d.updated_at)}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={cn("text-sm font-semibold",
                        d.dqs >= 80 ? "text-success" : d.dqs >= 60 ? "text-warning" : "text-danger")}>
                        {d.dqs}
                      </span>
                      <p className="text-[10px] text-muted-foreground">DQS</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </InsightPanel>

          <InsightPanel title="Activity Feed">
            {activityFeed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className="text-sm text-muted-foreground mb-1">No activity yet</p>
                <p className="text-xs text-muted-foreground">Actions you take will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activityFeed.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2">
                    <div className="h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-card-foreground truncate">{item.action}</p>
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(item.created_at)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </InsightPanel>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
