"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/badge";

interface LeadRow {
  id: string;
  name: string;
  email: string;
  company: string;
  size: string | null;
  role: string | null;
  use_case: string | null;
  status: string;
  created_at: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetch() {
      const { data } = await supabase
        .from("enterprise_leads")
        .select("*")
        .order("created_at", { ascending: false });
      setLeads(data ?? []);
      setLoading(false);
    }
    fetch();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient();
    await supabase.from("enterprise_leads").update({ status }).eq("id", id);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">Enterprise Leads</h1>
        <div className="space-y-2">{[1, 2, 3].map(i => <div key={i} className="h-16 rounded-lg bg-muted animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Enterprise Leads</h1>
      <p className="text-sm text-muted-foreground mb-6">{leads.length} leads</p>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No enterprise leads yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Company</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Size</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Use Case</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-foreground">{lead.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.size || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{lead.use_case || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={lead.status === "new" ? "warning" : lead.status === "contacted" ? "info" : "success"}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {lead.status === "new" && (
                      <button onClick={() => updateStatus(lead.id, "contacted")} className="text-xs text-accent hover:underline">
                        Mark Contacted
                      </button>
                    )}
                    {lead.status !== "closed" && (
                      <button onClick={() => updateStatus(lead.id, "closed")} className="text-xs text-muted-foreground hover:underline">
                        Close
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
