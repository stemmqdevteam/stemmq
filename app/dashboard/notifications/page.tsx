"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, CheckCheck, Filter } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { EmptyState } from "@/components/ui/empty-state";
import { cn, formatRelativeTime } from "@/lib/utils";
import { mockNotifications } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  info: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-danger/10 text-danger",
  mention: "bg-accent-secondary/10 text-accent-secondary",
  update: "bg-accent/10 text-accent",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = filter === "all" ? notifications : filter === "unread" ? notifications.filter(n => !n.read) : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

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
                    <div className={cn("flex h-8 w-8 items-center justify-center rounded-full", typeColors[notif.type])}>
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
