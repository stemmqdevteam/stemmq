"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Search, ExternalLink } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { PageTransition } from "@/components/animations/page-transition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { mockIntegrations } from "@/lib/mock-data";
import { staggerContainer, staggerItem } from "@/components/animations/motion-presets";

const statusConfig = {
  connected: { label: "Connected", variant: "success" as const },
  available: { label: "Available", variant: "default" as const },
  coming_soon: { label: "Coming Soon", variant: "neutral" as const },
};

export default function IntegrationsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filtered = mockIntegrations.filter(i => {
    const matchesSearch = !search || i.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || i.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(mockIntegrations.map(i => i.category))];

  return (
    <PageTransition>
      <PageContainer
        title="Integrations"
        description="Connect StemmQ with your existing tools"
      >
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors capitalize",
                  categoryFilter === cat ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map(integration => {
            const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[integration.icon];
            const status = statusConfig[integration.status];

            return (
              <motion.div
                key={integration.id}
                variants={staggerItem}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
                  </div>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{integration.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{integration.description}</p>
                <div className="mt-4">
                  {integration.status === "connected" ? (
                    <Button variant="outline" size="sm" className="w-full text-xs">Configure</Button>
                  ) : integration.status === "available" ? (
                    <Button variant="accent" size="sm" className="w-full text-xs">Connect</Button>
                  ) : (
                    <Button variant="ghost" size="sm" disabled className="w-full text-xs">Coming Soon</Button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </PageContainer>
    </PageTransition>
  );
}
