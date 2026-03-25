"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

interface SubRow {
  id: string;
  org_id: string;
  plan: string;
  status: string;
  created_at: string;
  updated_at: string;
  organizations: { name: string } | null;
}

export default function AdminSubscriptionsPage() {
  const [subs, setSubs] = useState<SubRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetch() {
      const { data } = await supabase
        .from("subscriptions")
        .select("*, organizations(name)")
        .order("created_at", { ascending: false });
      setSubs((data ?? []) as SubRow[]);
      setLoading(false);
    }
    fetch();
  }, []);

  const updatePlan = async (id: string, plan: string) => {
    const supabase = createClient();
    await supabase.from("subscriptions").update({ plan }).eq("id", id);
    setSubs(prev => prev.map(s => s.id === id ? { ...s, plan } : s));
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Manage Subscriptions</h1>
        <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Manage Subscriptions</h1>
      <p className="text-sm text-muted-foreground mb-6">{subs.length} subscriptions</p>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Organization</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Plan</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Created</th>
              <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((sub) => (
              <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-4 py-3 font-medium text-foreground">
                  {(sub.organizations as { name: string } | null)?.name || sub.org_id.slice(0, 8)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={sub.plan === "pro" ? "success" : sub.plan === "enterprise" ? "info" : "neutral"}>
                    {sub.plan}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant={sub.status === "active" ? "success" : "warning"}>{sub.status}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  {sub.plan !== "pro" && (
                    <button onClick={() => updatePlan(sub.id, "pro")} className="text-xs text-accent hover:underline">
                      Upgrade to Pro
                    </button>
                  )}
                  {sub.plan !== "enterprise" && (
                    <button onClick={() => updatePlan(sub.id, "enterprise")} className="text-xs text-accent hover:underline">
                      Set Enterprise
                    </button>
                  )}
                  {sub.plan !== "free" && (
                    <button onClick={() => updatePlan(sub.id, "free")} className="text-xs text-danger hover:underline">
                      Downgrade
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
