"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Search, Filter } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn, formatRelativeTime } from "@/lib/utils";
import { mockActivityFeed } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  decision: "bg-accent/10 text-accent",
  assumption: "bg-warning/10 text-warning",
  simulation: "bg-success/10 text-success",
  agent: "bg-accent-secondary/10 text-accent-secondary",
  document: "bg-muted text-muted-foreground",
  team: "bg-success/10 text-success",
};

export default function ActivityPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const types = ["all", ...new Set(mockActivityFeed.map(a => a.targetType))];

  const filtered = mockActivityFeed.filter(a => {
    const matchesSearch = !search || a.target.toLowerCase().includes(search.toLowerCase()) || a.user.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || a.targetType === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <PageTransition>
      <PageContainer title="Activity History" description="Complete timeline of all actions">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map(type => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                  typeFilter === type ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Activity timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-1">
            {filtered.map((activity, i) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative flex items-start gap-4 pl-10 py-3 hover:bg-muted/30 rounded-lg transition-colors"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-5 h-2.5 w-2.5 rounded-full border-2 border-background bg-border" />

                <Avatar initials={activity.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="neutral" className="text-[10px] capitalize">{activity.targetType}</Badge>
                    <span className="text-[10px] text-muted-foreground">{formatRelativeTime(activity.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageContainer>
    </PageTransition>
  );
}
