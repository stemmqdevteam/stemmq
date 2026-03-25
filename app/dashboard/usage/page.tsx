"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useOrg } from "@/lib/hooks/use-org";
import { createClient } from "@/lib/supabase/client";
import { staggerContainer, staggerItem } from "@/components/animations/motion-presets";

interface UsageMetric {
  label: string;
  total: number;
  change: number;
  data: { date: string; value: number }[];
}

export default function UsagePage() {
  const { orgId, isLoading: orgLoading } = useOrg();
  const [metrics, setMetrics] = useState<UsageMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const supabase = createClient();

    async function fetchUsage() {
      setLoading(true);

      // Fetch counts from real tables
      const [
        { count: decisionsCount },
        { count: assumptionsCount },
        { count: agentsCount },
        { count: simulationsCount },
      ] = await Promise.all([
        supabase.from("decisions").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
        supabase.from("assumptions").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
        supabase.from("agents").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
        supabase.from("simulations").select("id", { count: "exact", head: true }).eq("org_id", orgId!),
      ]);

      setMetrics([
        {
          label: "Decisions",
          total: decisionsCount ?? 0,
          change: 0,
          data: [],
        },
        {
          label: "Assumptions",
          total: assumptionsCount ?? 0,
          change: 0,
          data: [],
        },
        {
          label: "Agents",
          total: agentsCount ?? 0,
          change: 0,
          data: [],
        },
        {
          label: "Simulations",
          total: simulationsCount ?? 0,
          change: 0,
          data: [],
        },
      ]);

      setLoading(false);
    }

    fetchUsage();
  }, [orgId]);

  if (orgLoading || loading) {
    return (
      <PageTransition>
        <PageContainer title="Usage Analytics" description="Track your organization's usage patterns">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-40 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        </PageContainer>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <PageContainer title="Usage Analytics" description="Track your organization's usage patterns">
        {metrics.length === 0 ? (
          <div className="text-center py-12">
            <BarChart3 className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No usage data available yet.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {metrics.map(metric => {
              const isPositive = metric.change >= 0;
              const maxValue = metric.data.length > 0 ? Math.max(...metric.data.map(d => d.value)) : 1;

              return (
                <motion.div key={metric.label} variants={staggerItem}>
                  <Card>
                    <CardContent className="pt-5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{metric.label}</p>
                          <p className="text-2xl font-bold text-foreground mt-1">
                            {metric.total.toLocaleString()}
                          </p>
                        </div>
                        {metric.change !== 0 && (
                          <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-success" : "text-danger")}>
                            {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {isPositive ? "+" : ""}{metric.change}%
                          </div>
                        )}
                      </div>

                      {metric.data.length > 0 && (
                        <>
                          {/* Mini bar chart */}
                          <div className="flex items-end gap-1 h-20">
                            {metric.data.map((d, i) => (
                              <motion.div
                                key={i}
                                className="flex-1 rounded-sm bg-accent/20 hover:bg-accent/30 transition-colors"
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.value / maxValue) * 100}%` }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                              />
                            ))}
                          </div>
                          <div className="flex justify-between mt-2">
                            <span className="text-[10px] text-muted-foreground">{metric.data[0]?.date.slice(5)}</span>
                            <span className="text-[10px] text-muted-foreground">{metric.data[metric.data.length - 1]?.date.slice(5)}</span>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </PageContainer>
    </PageTransition>
  );
}
