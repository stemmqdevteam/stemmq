"use client";

import { PageContainer } from "@/components/layout/page-container";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { InsightPanel } from "@/components/dashboard/insight-panel";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { mockMetrics, mockDecisions, mockActivityFeed } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function DashboardOverview() {
  const recentDecisions = mockDecisions.slice(0, 5);

  return (
    <PageTransition>
      <PageContainer title="Strategic Overview" description="Real-time intelligence across your decision landscape.">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {mockMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <ChartContainer title="Decision Quality Trend" subtitle="Last 12 months">
            <div className="flex items-end gap-1.5 h-full px-2 pb-2">
              {[40, 55, 45, 60, 52, 68, 72, 65, 78, 75, 82, 78].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end">
                  <div
                    className="rounded-sm bg-accent/70 hover:bg-accent transition-colors"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
          </ChartContainer>

          <ChartContainer title="Strategic Health Index" subtitle="Composite score">
            <div className="flex items-center justify-center h-full">
              <div className="relative">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="91 100" className="text-accent" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground">91</span>
                  <span className="text-xs text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Recent Decisions + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InsightPanel title="Recent Decisions">
            <div className="space-y-3">
              {recentDecisions.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Avatar
                    initials={d.owner.avatar || d.owner.name.charAt(0)}
                    size="sm"
                    status={d.owner.type === "agent" ? "away" : undefined}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{d.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge intent={d.strategicIntent} className="text-[10px]">
                        {d.strategicIntent}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(d.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        d.dqs >= 80 ? "text-success" : d.dqs >= 60 ? "text-warning" : "text-danger"
                      )}
                    >
                      {d.dqs}
                    </span>
                    <p className="text-[10px] text-muted-foreground">DQS</p>
                  </div>
                </div>
              ))}
            </div>
          </InsightPanel>

          <InsightPanel title="Activity Feed">
            <ActivityFeed items={mockActivityFeed} maxItems={8} />
          </InsightPanel>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
