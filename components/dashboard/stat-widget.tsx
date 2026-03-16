import { cn } from "@/lib/utils";

interface StatWidgetProps {
  label: string;
  value: string | number;
  className?: string;
}

function StatWidget({ label, value, className }: StatWidgetProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-4", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold text-card-foreground">{value}</p>
    </div>
  );
}

export { StatWidget };
