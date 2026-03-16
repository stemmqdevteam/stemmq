import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  minHeight?: string;
}

function ChartContainer({
  title,
  subtitle,
  actions,
  children,
  className,
  minHeight = "h-64",
}: ChartContainerProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="flex items-center justify-between p-5 pb-0">
        <div>
          <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className={cn("p-5", minHeight)}>
        {children || (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
            <div className="text-center">
              <BarChart3 className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Chart visualization</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export { ChartContainer };
