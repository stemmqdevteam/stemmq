"use client";

import { useState, useEffect } from "react";
import { Network, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/dashboard/search-bar";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";

interface GraphDecision {
  id: string;
  title: string;
  strategicIntent: string;
}

interface GraphCounts {
  decisions: number;
  assumptions: number;
  simulations: number;
  agents: number;
}

export default function StrategyGraphPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [decisions, setDecisions] = useState<GraphDecision[]>([]);
  const [counts, setCounts] = useState<GraphCounts>({ decisions: 0, assumptions: 0, simulations: 0, agents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchGraphData() {
      setLoading(true);

      const [
        { data: decisionsData, count: dCount },
        { count: aCount },
        { count: sCount },
        { count: agCount },
      ] = await Promise.all([
        supabase.from("decisions").select("id, title, strategic_intent", { count: "exact" }).eq("org_id", orgId!).order("created_at", { ascending: false }).limit(6),
        supabase.from("assumptions").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
        supabase.from("simulations").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
        supabase.from("agents").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
      ]);

      if (decisionsData) {
        setDecisions(
          decisionsData.map((d: any) => ({
            id: d.id,
            title: d.title,
            strategicIntent: d.strategic_intent || "growth",
          }))
        );
      }

      setCounts({
        decisions: dCount ?? 0,
        assumptions: aCount ?? 0,
        simulations: sCount ?? 0,
        agents: agCount ?? 0,
      });

      setLoading(false);
    }

    fetchGraphData();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Strategy Graph" description="Visualize relationships between decisions, assumptions, and outcomes.">
          <div className="h-[calc(100vh-200px)] rounded-xl bg-muted animate-pulse" />
        </PageContainer>
      </PageTransition>
    );
  }

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
                  {counts.decisions} decisions &middot; {counts.assumptions} assumptions &middot; {counts.simulations} simulations
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
                { label: "Decisions", count: counts.decisions, color: "bg-accent" },
                { label: "Assumptions", count: counts.assumptions, color: "bg-warning" },
                { label: "Simulations", count: counts.simulations, color: "bg-purple-500" },
                { label: "Agents", count: counts.agents, color: "bg-success" },
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
              {decisions.length === 0 ? (
                <p className="text-xs text-muted-foreground">No decisions yet.</p>
              ) : (
                <div className="space-y-1">
                  {decisions.map((d) => (
                    <div
                      key={d.id}
                      className="px-2 py-1.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <p className="text-xs text-card-foreground truncate">{d.title}</p>
                      <Badge intent={d.strategicIntent as import("@/lib/types").StrategicIntent} className="text-[9px] mt-0.5">
                        {d.strategicIntent}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
