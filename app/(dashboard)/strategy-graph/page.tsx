"use client";

import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/dashboard/search-bar";
import { PageTransition } from "@/components/animations/page-transition";
import { mockDecisions } from "@/lib/mock-data";

export default function StrategyGraphPage() {
  return (
    <PageTransition>
      <PageContainer title="Strategy Graph" description="Visualize relationships between decisions, assumptions, and outcomes.">
        <div className="flex gap-4 h-[calc(100vh-200px)]">
          {/* Main graph area */}
          <div className="flex-1 rounded-xl border border-border bg-card overflow-hidden relative">
            {/* Controls */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Layout toggle */}
            <div className="absolute top-4 right-4 z-10 flex gap-1">
              {["Force", "Radial", "Tree"].map((layout) => (
                <Button
                  key={layout}
                  variant={layout === "Force" ? "accent" : "outline"}
                  size="sm"
                  className="text-xs"
                >
                  {layout}
                </Button>
              ))}
            </div>

            {/* Placeholder graph */}
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Network className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
                <p className="text-lg font-medium text-muted-foreground">Decision Graph Visualization</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Interactive graph powered by force-directed layout
                </p>
                <p className="text-xs text-muted-foreground/50 mt-4">
                  {mockDecisions.length} decisions &middot; 24 assumptions &middot; 6 simulations
                </p>

                {/* Decorative nodes */}
                <div className="relative mt-8 h-32 w-64 mx-auto">
                  {[
                    { x: 30, y: 20, size: 12, color: "bg-accent" },
                    { x: 80, y: 50, size: 10, color: "bg-success" },
                    { x: 140, y: 15, size: 8, color: "bg-warning" },
                    { x: 180, y: 60, size: 14, color: "bg-accent-secondary" },
                    { x: 60, y: 80, size: 9, color: "bg-purple-500" },
                    { x: 120, y: 90, size: 11, color: "bg-accent" },
                    { x: 200, y: 30, size: 7, color: "bg-success" },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className={`absolute rounded-full ${node.color} opacity-30`}
                      style={{
                        left: node.x,
                        top: node.y,
                        width: node.size,
                        height: node.size,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 rounded-xl border border-border bg-card p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-card-foreground mb-3">Nodes</h3>
            <SearchBar placeholder="Filter nodes..." className="mb-3" />

            <div className="space-y-1 mb-4">
              {[
                { label: "Decisions", count: 12, color: "bg-accent" },
                { label: "Assumptions", count: 24, color: "bg-warning" },
                { label: "Simulations", count: 6, color: "bg-purple-500" },
                { label: "Agents", count: 5, color: "bg-success" },
              ].map((type) => (
                <div
                  key={type.label}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${type.color}`} />
                    <span className="text-sm text-card-foreground">{type.label}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{type.count}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-3">
              <h4 className="text-xs font-medium text-muted-foreground mb-2">Recent Decisions</h4>
              <div className="space-y-1">
                {mockDecisions.slice(0, 6).map((d) => (
                  <div
                    key={d.id}
                    className="px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <p className="text-xs text-card-foreground truncate">{d.title}</p>
                    <Badge intent={d.strategicIntent} className="text-[9px] mt-0.5">
                      {d.strategicIntent}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
