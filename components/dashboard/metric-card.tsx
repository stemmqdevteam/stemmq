"use client";

import * as LucideIcons from "lucide-react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MetricCardData } from "@/lib/types";

function MetricCard({ label, value, change, trend, icon }: MetricCardData) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[icon];
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
          {Icon && <Icon className="h-4 w-4 text-accent" />}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-xs font-medium",
            trend === "up" && "text-success",
            trend === "down" && "text-danger",
            trend === "flat" && "text-muted-foreground"
          )}
        >
          <TrendIcon className="h-3 w-3" />
          {change > 0 ? "+" : ""}
          {change}%
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold text-card-foreground">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export { MetricCard };
