"use client";

import { useState, useEffect } from "react";
import { Users, Building2, Brain, CreditCard, UserPlus, Activity } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface SystemStats {
  totalUsers: number;
  totalOrgs: number;
  totalDecisions: number;
  activeSubscriptions: number;
  enterpriseLeads: number;
  recentSignups: number;
}

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: number; icon: React.ElementType; color: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetchStats() {
      const [users, orgs, decisions, subs, leads] = await Promise.all([
        supabase.from("users").select("id", { count: "exact", head: true }),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
        supabase.from("decisions").select("id", { count: "exact", head: true }),
        supabase.from("subscriptions").select("id", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("enterprise_leads").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        totalUsers: users.count ?? 0,
        totalOrgs: orgs.count ?? 0,
        totalDecisions: decisions.count ?? 0,
        activeSubscriptions: subs.count ?? 0,
        enterpriseLeads: leads.count ?? 0,
        recentSignups: 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">System Overview</h1>
        <p className="text-sm text-muted-foreground mb-8">Platform-wide metrics and health.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-28 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">System Overview</h1>
      <p className="text-sm text-muted-foreground mb-8">Platform-wide metrics and health.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Users" value={stats?.totalUsers ?? 0} icon={Users} color="#6366f1" />
        <StatCard label="Organizations" value={stats?.totalOrgs ?? 0} icon={Building2} color="#a855f7" />
        <StatCard label="Total Decisions" value={stats?.totalDecisions ?? 0} icon={Brain} color="#3b82f6" />
        <StatCard label="Active Subscriptions" value={stats?.activeSubscriptions ?? 0} icon={CreditCard} color="#10b981" />
        <StatCard label="Enterprise Leads" value={stats?.enterpriseLeads ?? 0} icon={UserPlus} color="#f59e0b" />
        <StatCard label="Recent Signups (7d)" value={stats?.recentSignups ?? 0} icon={Activity} color="#06b6d4" />
      </div>
    </div>
  );
}
