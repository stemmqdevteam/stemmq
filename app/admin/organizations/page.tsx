"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

interface OrgRow {
  id: string;
  name: string;
  industry: string | null;
  size: string | null;
  stage: string | null;
  created_at: string;
  subscriptions: { plan: string; status: string }[] | null;
}

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetch() {
      const { data } = await supabase
        .from("organizations")
        .select("*, subscriptions(plan, status)")
        .order("created_at", { ascending: false });
      setOrgs((data ?? []) as OrgRow[]);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Manage Organizations</h1>
        <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Manage Organizations</h1>
      <p className="text-sm text-muted-foreground mb-6">{orgs.length} organizations</p>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Organization</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Industry</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Size</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plan</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created</th>
            </tr>
          </thead>
          <tbody>
            {orgs.map((org) => {
              const sub = Array.isArray(org.subscriptions) ? org.subscriptions[0] : null;
              return (
                <tr key={org.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{org.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{org.industry || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{org.size || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={sub?.plan === "pro" ? "success" : sub?.plan === "enterprise" ? "info" : "neutral"}>
                      {sub?.plan ?? "none"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(org.created_at).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
