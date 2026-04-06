"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { SearchBar } from "@/components/dashboard/search-bar";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { formatDate, cn } from "@/lib/utils";
interface Decision {
  id: string;
  title: string;
  description: string;
  category: string;
  strategicIntent: string;
  owner: { name: string; avatar: string };
  dqs: number;
  status: string;
  updatedAt: string;
  createdAt: string;
}

const statusVariant: Record<string, "success" | "info" | "warning" | "neutral"> = {
  active: "success",
  completed: "info",
  draft: "warning",
  archived: "neutral",
};

const columns: Column<Decision>[] = [
  {
    key: "title",
    label: "Decision",
    render: (d) => (
      <div className="max-w-xs">
        <p className="text-sm font-medium text-card-foreground truncate">{d.title}</p>
        <p className="text-xs text-muted-foreground">{d.category}</p>
      </div>
    ),
  },
  {
    key: "intent",
    label: "Intent",
    render: (d) => <Badge intent={d.strategicIntent as import("@/lib/types").StrategicIntent}>{d.strategicIntent}</Badge>,
  },
  {
    key: "owner",
    label: "Owner",
    render: (d) => (
      <div className="flex items-center gap-2">
        <Avatar initials={d.owner?.avatar || d.owner?.name?.charAt(0) || "?"} size="xs" />
        <span className="text-sm">{d.owner?.name || "Unknown"}</span>
      </div>
    ),
  },
  {
    key: "dqs",
    label: "DQS",
    render: (d) => (
      <span
        className={cn(
          "text-sm font-semibold",
          d.dqs >= 80 ? "text-success" : d.dqs >= 60 ? "text-warning" : "text-danger"
        )}
      >
        {d.dqs}
      </span>
    ),
    className: "text-center",
  },
  {
    key: "status",
    label: "Status",
    render: (d) => (
      <Badge variant={statusVariant[d.status]}>
        {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: "updated",
    label: "Updated",
    render: (d) => <span className="text-sm text-muted-foreground">{formatDate(d.updatedAt)}</span>,
  },
];

export default function DecisionsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [search, setSearch] = useState("");
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchDecisions() {
      setLoading(true);
      const { data } = await supabase
        .from("decisions")
        .select("*")
        .eq("org_id", orgId!)
        .order("updated_at", { ascending: false });

      if (data) {
        setDecisions(
          data.map((d: any) => ({
            id: d.id,
            title: d.title,
            description: d.description,
            category: d.strategic_intent || "General",
            strategicIntent: d.strategic_intent || "growth",
            owner: { name: d.owner_type === "ai" ? "AI Agent" : "Team Member", avatar: "" },
            dqs: d.dqs ?? 0,
            status: d.status || "draft",
            updatedAt: d.updated_at,
            createdAt: d.created_at,
          }))
        );
      }
      setLoading(false);
    }

    fetchDecisions();
  }, [orgId]);

  const filtered = decisions.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Decisions" description="All strategic decisions across your organization.">
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer
        title="Decisions"
        description="All strategic decisions across your organization."
        actions={
          <Button variant="accent" size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            New Decision
          </Button>
        }
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <SearchBar
            placeholder="Search decisions..."
            value={search}
            onChange={setSearch}
            className="w-full sm:w-72"
          />
          <FilterBar
            filters={[
              {
                label: "Status",
                options: [
                  { label: "Active", value: "active" },
                  { label: "Draft", value: "draft" },
                  { label: "Completed", value: "completed" },
                ],
              },
              {
                label: "Intent",
                options: [
                  { label: "Growth", value: "growth" },
                  { label: "Defense", value: "defense" },
                  { label: "Efficiency", value: "efficiency" },
                  { label: "Experiment", value: "experiment" },
                  { label: "Risk Mitigation", value: "risk" },
                ],
              },
            ]}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          keyExtractor={(d) => d.id}
          emptyMessage="No decisions found"
        />

        <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
          <span>Showing {filtered.length} of {decisions.length} decisions</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
