import { cn } from "@/lib/utils";

interface InsightPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  actions?: React.ReactNode;
}

function InsightPanel({ title, children, className, actions }: InsightPanelProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="flex items-center justify-between p-5 pb-3">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {actions}
      </div>
      <div className="px-5 pb-5 max-h-96 overflow-y-auto">{children}</div>
    </div>
  );
}

export { InsightPanel };
