"use client";

import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { DataTable, type Column } from "@/components/dashboard/data-table";
import { StatWidget } from "@/components/dashboard/stat-widget";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { PageTransition } from "@/components/animations/page-transition";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

const columns: Column<TeamMember>[] = [
  {
    key: "name",
    label: "Member",
    render: (m) => (
      <div className="flex items-center gap-3">
        <Avatar initials={m.avatar || m.name?.charAt(0) || "?"} size="sm" />
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
];

export default function TeamPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchTeam() {
      setLoading(true);
      const { data } = await supabase
        .from("org_members")
        .select("id, role, user_id, users(email, full_name)")
        .eq("org_id", orgId!);

      if (data) {
        setMembers(
          data.map((m: any) => ({
            id: m.id,
            name: m.users?.full_name || "Team Member",
            email: m.users?.email || "",
            avatar: (m.users?.full_name || "T").charAt(0),
            role: m.role || "member",
            forecastReliability: 0,
            lastActive: "",
          }))
        );
      }
      setLoading(false);
    }

    fetchTeam();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Team" description="Manage team members and track forecast reliability.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-14 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  const avgReliability = members.length > 0
    ? (members.reduce((sum, m) => sum + m.forecastReliability, 0) / members.length).toFixed(0)
    : "0";

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
          <StatWidget label="Total Members" value={members.length} />
          <StatWidget label="Avg Forecast Reliability" value={`${avgReliability}%`} />
        </div>

        <DataTable
          columns={columns}
          data={members}
          keyExtractor={(m) => m.id}
          emptyMessage="No team members found"
        />
      </PageContainer>
    </PageTransition>
  );
}
