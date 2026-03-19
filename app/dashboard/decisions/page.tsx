"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { SearchBar } from "@/components/dashboard/search-bar";
import { FilterBar } from "@/components/dashboard/filter-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { mockDecisions } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import type { Decision } from "@/lib/types";

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
    render: (d) => <Badge intent={d.strategicIntent}>{d.strategicIntent}</Badge>,
  },
  {
    key: "owner",
    label: "Owner",
    render: (d) => (
      <div className="flex items-center gap-2">
        <Avatar initials={d.owner.avatar || d.owner.name.charAt(0)} size="xs" />
        <span className="text-sm">{d.owner.name}</span>
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
  const [search, setSearch] = useState("");

  const filtered = mockDecisions.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

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
          <span>Showing {filtered.length} of {mockDecisions.length} decisions</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
