"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  label: string;
  options: FilterOption[];
  selected?: string;
  onSelect?: (value: string) => void;
}

interface FilterBarProps {
  filters: FilterGroup[];
  activeFilters?: { label: string; value: string }[];
  onClearAll?: () => void;
  className?: string;
}

function FilterBar({ filters, activeFilters = [], onClearAll, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {filters.map((group) => (
        <select
          key={group.label}
          value={group.selected || ""}
          onChange={(e) => group.onSelect?.(e.target.value)}
          className="h-8 rounded-lg border border-input bg-background px-3 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">{group.label}</option>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ))}

      {activeFilters.length > 0 && (
        <>
          <div className="h-4 w-px bg-border" />
          {activeFilters.map((filter) => (
            <Badge key={filter.value} variant="neutral" className="gap-1 cursor-pointer">
              {filter.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </>
      )}
    </div>
  );
}

export { FilterBar };
