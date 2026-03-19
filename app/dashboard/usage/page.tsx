"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { mockUsageMetrics } from "@/lib/mock-data";
import { staggerContainer, staggerItem } from "@/components/animations/motion-presets";

export default function UsagePage() {
  return (
    <PageTransition>
      <PageContainer title="Usage Analytics" description="Track your organization's usage patterns">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {mockUsageMetrics.map(metric => {
            const isPositive = metric.change >= 0;
            const maxValue = Math.max(...metric.data.map(d => d.value));

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
                      <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-success" : "text-danger")}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {isPositive ? "+" : ""}{metric.change}%
                      </div>
                    </div>

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
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </PageContainer>
    </PageTransition>
  );
}
