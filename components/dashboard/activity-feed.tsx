import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import type { ActivityItem } from "@/lib/types";

const typeColors: Record<string, string> = {
  decision: "bg-accent",
  assumption: "bg-warning",
  simulation: "bg-purple-500",
  agent: "bg-success",
  document: "bg-accent-secondary",
  team: "bg-muted-foreground",
};

function ActivityFeed({ items, maxItems = 10 }: { items: ActivityItem[]; maxItems?: number }) {
  const displayed = items.slice(0, maxItems);

  return (
    <div className="space-y-0">
      {displayed.map((item, index) => (
        <div key={item.id} className="flex gap-3 py-3 first:pt-0">
          <div className="relative flex flex-col items-center">
            <Avatar initials={item.avatar} size="sm" />
            {index < displayed.length - 1 && (
              <div className="flex-1 w-px bg-border mt-2" />
            )}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-sm text-card-foreground">
              <span className="font-medium">{item.user}</span>
              <span className="text-muted-foreground"> {item.action} </span>
              <span className="font-medium">{item.target}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={cn("h-1.5 w-1.5 rounded-full", typeColors[item.targetType])}
              />
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(item.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ActivityFeed };
