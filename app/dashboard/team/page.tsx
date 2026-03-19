"use client";

import { UserPlus } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatWidget } from "@/components/dashboard/stat-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { mockTeamMembers } from "@/lib/mock-data";
import { formatRelativeTime, cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

const avgReliability = (
  mockTeamMembers.reduce((sum, m) => sum + m.forecastReliability, 0) / mockTeamMembers.length
).toFixed(0);

const columns: Column<TeamMember>[] = [
  {
    key: "name",
    label: "Member",
    render: (m) => (
      <div className="flex items-center gap-3">
        <Avatar initials={m.avatar} size="sm" />
        <div>
          <p className="text-sm font-medium text-card-foreground">{m.name}</p>
          <p className="text-xs text-muted-foreground">{m.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: (m) => <Badge variant="neutral">{m.role}</Badge>,
  },
  {
    key: "reliability",
    label: "Forecast Reliability",
    render: (m) => (
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-16 rounded-full bg-muted">
          <div
            className={cn(
              "h-1.5 rounded-full",
              m.forecastReliability >= 85 ? "bg-success" : m.forecastReliability >= 70 ? "bg-warning" : "bg-danger"
            )}
            style={{ width: `${m.forecastReliability}%` }}
          />
        </div>
        <span className="text-sm font-medium text-card-foreground">{m.forecastReliability}%</span>
      </div>
    ),
  },
  {
    key: "lastActive",
    label: "Last Active",
    render: (m) => <span className="text-sm text-muted-foreground">{formatRelativeTime(m.lastActive)}</span>,
  },
];

export default function TeamPage() {
  return (
    <PageTransition>
      <PageContainer
        title="Team"
        description="Manage team members and track forecast reliability."
        actions={
          <Button variant="accent" size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            Invite Member
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatWidget label="Total Members" value={mockTeamMembers.length} />
          <StatWidget label="Avg Forecast Reliability" value={`${avgReliability}%`} />
        </div>

        <DataTable
          columns={columns}
          data={mockTeamMembers}
          keyExtractor={(m) => m.id}
        />
      </PageContainer>
    </PageTransition>
  );
}
