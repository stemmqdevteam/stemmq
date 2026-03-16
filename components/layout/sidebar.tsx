"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  Target,
  Activity,
  Bot,
  Network,
  FileText,
  BarChart3,
  Users,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_NAV } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  GitBranch,
  Target,
  Activity,
  Bot,
  Network,
  FileText,
  BarChart3,
  Users,
  Settings,
};

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex h-screen flex-col border-r border-sidebar-border bg-sidebar"
    >
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg">
              <span className="text-xs font-bold text-white">S</span>
            </div>
            <span className="text-base font-semibold text-foreground">StemmQ</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/" className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg gradient-bg">
            <span className="text-xs font-bold text-white">S</span>
          </Link>
        )}
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 py-2 overflow-y-auto">
        {SIDEBAR_NAV.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          const link = (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-sidebar-accent"
                  : "text-sidebar-foreground hover:bg-sidebar-active hover:text-foreground"
              )}
            >
              {Icon && <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-accent")} />}
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/10 px-1.5 text-xs font-medium text-accent">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.href} content={item.label} position="right">
                {link}
              </Tooltip>
            );
          }
          return link;
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-2">
        {collapsed ? (
          <button
            onClick={() => setCollapsed(false)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-4 w-4 rotate-180" />
          </button>
        ) : (
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <Avatar initials="SC" size="sm" status="online" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Sarah Chen</p>
              <p className="text-xs text-muted-foreground truncate">CSO</p>
            </div>
            <button className="rounded-md p-1 text-muted-foreground hover:bg-muted transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

export { Sidebar };
