"use client";

import { Download, Calendar } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { ChartContainer } from "@/components/dashboard/chart-container";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/animations/page-transition";

export default function AnalyticsPage() {
  return (
    <PageTransition>
      <PageContainer
        title="Analytics"
        description="Track decision quality, assumption accuracy, and organizational learning."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ChartContainer title="Decision Quality Trend" subtitle="Average DQS over time">
            <div className="flex items-end gap-1 h-full px-2 pb-2">
              {[58, 62, 60, 65, 68, 72, 69, 74, 76, 73, 78, 78].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-accent/60 hover:bg-accent transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </ChartContainer>

          <ChartContainer title="Assumption Accuracy Over Time" subtitle="Percentage of validated assumptions">
            <div className="flex items-end gap-1 h-full px-2 pb-2">
              {[70, 72, 75, 73, 78, 80, 77, 82, 84, 81, 85, 84].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-success/60 hover:bg-success transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </ChartContainer>

          <ChartContainer title="Strategic Intent Distribution" subtitle="Breakdown by category">
            <div className="flex items-center justify-center h-full">
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {[
                  { label: "Growth", pct: 42, color: "bg-success" },
                  { label: "Defense", pct: 18, color: "bg-accent-secondary" },
                  { label: "Efficiency", pct: 22, color: "bg-accent" },
                  { label: "Experiment", pct: 10, color: "bg-purple-500" },
                  { label: "Risk Mitigation", pct: 8, color: "bg-warning" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-sm ${item.color}`} />
                    <div>
                      <p className="text-xs text-card-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-card-foreground">{item.pct}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ChartContainer>

          <ChartContainer title="Risk Concentration" subtitle="Heat map by category and severity">
            <div className="grid grid-cols-5 gap-1 h-full p-2">
              {Array.from({ length: 25 }).map((_, i) => {
                const opacity = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.25][i % 10] || 0.2;
                return (
                  <div
                    key={i}
                    className="rounded-sm bg-danger"
                    style={{ opacity }}
                  />
                );
              })}
            </div>
          </ChartContainer>

          <ChartContainer title="Forecast Deviation" subtitle="Predicted vs actual outcomes">
            <div className="flex items-end gap-2 h-full px-2 pb-2">
              {[
                { predicted: 65, actual: 72 },
                { predicted: 70, actual: 68 },
                { predicted: 55, actual: 60 },
                { predicted: 80, actual: 75 },
                { predicted: 60, actual: 62 },
                { predicted: 75, actual: 78 },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex items-end gap-0.5">
                  <div className="flex-1 rounded-sm bg-accent/40" style={{ height: `${item.predicted}%` }} />
                  <div className="flex-1 rounded-sm bg-accent" style={{ height: `${item.actual}%` }} />
                </div>
              ))}
            </div>
          </ChartContainer>

          <ChartContainer title="Organizational Learning Velocity" subtitle="Rate of assumption validation improvement">
            <div className="flex items-end gap-1 h-full px-2 pb-2">
              {[20, 25, 28, 32, 38, 42, 48, 52, 58, 62, 68, 72].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-accent-secondary/60 hover:bg-accent-secondary transition-colors"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </ChartContainer>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
