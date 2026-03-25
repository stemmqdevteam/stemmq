"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { formatRelativeTime } from "@/lib/utils";

interface AuditRow {
  id: string;
  action: string;
  resource: string | null;
  resource_type: string | null;
  ip_address: string | null;
  created_at: string;
  details: Record<string, unknown>;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function fetch() {
      const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);
      setLogs((data ?? []) as AuditRow[]);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-6">System Audit Logs</h1>
        <div className="space-y-2">{[1, 2, 3, 4, 5].map(i => <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />)}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">System Audit Logs</h1>
      <p className="text-sm text-muted-foreground mb-6">System-wide activity across all organizations.</p>

      {logs.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-sm text-muted-foreground">No audit logs recorded yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Action</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Resource</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{log.action}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {log.resource_type ? `${log.resource_type}` : "—"}
                    {log.resource ? ` (${log.resource.slice(0, 8)}...)` : ""}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatRelativeTime(log.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
