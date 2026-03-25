"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, Filter } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, formatRelativeTime } from "@/lib/utils";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  actor?: { name: string; avatar: string };
  actionUrl?: string;
  createdAt: string;
}

const typeColors: Record<string, string> = {
  info: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-danger/10 text-danger",
  mention: "bg-accent-secondary/10 text-accent-secondary",
  update: "bg-accent/10 text-accent",
};

export default function NotificationsPage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchNotifications() {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) { setLoading(false); return; }

      const { data } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setNotifications(
          data.map((n: any) => ({
            id: n.id,
            title: n.title,
            message: n.message || "",
            type: n.type || "info",
            read: n.read ?? false,
            actor: n.actor_name ? { name: n.actor_name, avatar: n.actor_name.charAt(0) } : undefined,
            actionUrl: n.action_url,
            createdAt: n.created_at,
          }))
        );
      }
      setLoading(false);
    }

    fetchNotifications();
  }, [orgId]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  const markAllRead = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    await supabase
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userData.user.id);

    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = async (id: string) => {
    const notif = notifications.find(n => n.id === id);
    if (!notif) return;

    const supabase = createClient();
    await supabase
      .from("notifications")
      .update({ read: !notif.read })
      .eq("id", id);

    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Notifications" description="Loading...">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer
        title="Notifications"
        description={`${unreadCount} unread notification${unreadCount !== 1 ? "s" : ""}`}
        actions={
          <Button variant="ghost" size="sm" onClick={markAllRead} className="gap-1.5">
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </Button>
        }
      >
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["all", "unread", "mention", "update", "warning", "error"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                filter === f ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications list */}
        <div className="space-y-1">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Bell className="h-5 w-5 text-muted-foreground" />}
              title="No notifications"
              description="You're all caught up!"
            />
          ) : (
            filtered.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className={cn(
                  "flex items-start gap-4 rounded-xl border p-4 transition-colors cursor-pointer hover:bg-muted/50",
                  notif.read ? "border-transparent bg-transparent" : "border-accent/10 bg-accent/[0.02]"
                )}
                onClick={() => toggleRead(notif.id)}
              >
                <div className="shrink-0 mt-0.5">
                  {notif.actor ? (
                    <Avatar initials={notif.actor.avatar} size="sm" />
                  ) : (
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", typeColors[notif.type] || typeColors.info)}>
                      <Bell className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-sm", notif.read ? "text-muted-foreground" : "text-foreground font-medium")}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{formatRelativeTime(notif.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                </div>
                {!notif.read && (
                  <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-2" />
                )}
              </motion.div>
            ))
          )}
        </div>
      </PageContainer>
    </PageTransition>
  );
}
