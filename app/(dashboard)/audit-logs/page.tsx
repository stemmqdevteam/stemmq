"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollText, Filter, Download } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { cn, formatDate, formatRelativeTime } from "@/lib/utils";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceType: string;
  actor: string;
  actorAvatar: string;
  ipAddress: string;
  details: string;
  timestamp: string;
}

const actionColors: Record<string, string> = {
  "decision": "success",
  "assumption": "warning",
  "agent": "info",
  "document": "default",
  "team": "info",
  "simulation": "warning",
  "settings": "neutral",
  "auth": "default",
};

export default function AuditLogsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchLogs() {
      setLoading(true);
      const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .eq("org_id", orgId!)
        .order("created_at", { ascending: false })
        .limit(100);

      if (data) {
        setLogs(
          data.map((l: any) => ({
            id: l.id,
            action: l.action || "",
            resource: l.resource || "",
            resourceType: l.resource_type || "decision",
            actor: l.actor_id || "System",
            actorAvatar: (l.actor_id || "S").charAt(0).toUpperCase(),
            ipAddress: l.ip_address || "Unknown",
            details: l.details || "",
            timestamp: l.created_at,
          }))
        );
      }
      setLoading(false);
    }

    fetchLogs();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Audit Logs" description="Complete record of all system activity">
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer
        title="Audit Logs"
        description="Complete record of all system activity"
        actions={
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        }
      >
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No audit logs recorded yet.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 border-b border-border bg-muted/50 text-xs font-medium text-muted-foreground">
              <div className="col-span-5 sm:col-span-4">Event</div>
              <div className="col-span-3 sm:col-span-3 hidden sm:block">Resource</div>
              <div className="col-span-4 sm:col-span-2">Actor</div>
              <div className="col-span-3 sm:col-span-2 hidden sm:block">IP Address</div>
              <div className="col-span-3 sm:col-span-1 text-right">Time</div>
            </div>

            {/* Rows */}
            {logs.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                  className="w-full grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 border-b border-border text-sm hover:bg-muted/30 transition-colors text-left"
                >
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-2 min-w-0">
                    <Badge variant={actionColors[log.resourceType] as "success" | "warning" | "info" | "default" | "neutral"} className="shrink-0 text-[10px]">
                      {log.action.split(".")[0]}
                    </Badge>
                    <span className="truncate text-xs text-foreground">{log.action.split(".")[1]?.replace(/_/g, " ") || log.action}</span>
                  </div>
                  <div className="col-span-3 hidden sm:block truncate text-xs text-muted-foreground">{log.resource}</div>
                  <div className="col-span-4 sm:col-span-2 flex items-center gap-2 min-w-0">
                    <Avatar initials={log.actorAvatar} size="xs" />
                    <span className="truncate text-xs">{log.actor}</span>
                  </div>
                  <div className="col-span-3 sm:col-span-2 hidden sm:block text-xs text-muted-foreground font-mono">{log.ipAddress}</div>
                  <div className="col-span-3 sm:col-span-1 text-right text-[10px] text-muted-foreground">{formatRelativeTime(log.timestamp)}</div>
                </button>
                {expanded === log.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 sm:px-6 py-3 border-b border-border bg-muted/20 text-xs text-muted-foreground overflow-hidden"
                  >
                    <p><strong className="text-foreground">Details:</strong> {log.details}</p>
                    <p className="mt-1"><strong className="text-foreground">Timestamp:</strong> {formatDate(log.timestamp)}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </PageContainer>
    </PageTransition>
  );
}
