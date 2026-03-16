"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, GitBranch, Target, Activity, Bot, Network,
  FileText, BarChart3, Users, Settings, ChevronLeft, LogOut,
  Bell, Plug, ScrollText, Clock, ChevronsLeft,
  ChevronDown, CreditCard, Shield, Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_NAV, SIDEBAR_SECONDARY_NAV, ROUTES } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip } from "@/components/ui/tooltip";
import { useSidebar } from "@/lib/hooks/use-sidebar";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, GitBranch, Target, Activity, Bot, Network,
  FileText, BarChart3, Users, Settings, Bell, Plug, ScrollText, Clock,
};

function SidebarContent() {
  const { collapsed, setCollapsed, closeMobile } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleNavClick = () => {
    closeMobile();
  };

  const renderNavItem = (item: typeof SIDEBAR_NAV[0]) => {
    const Icon = iconMap[item.icon];
    const isActive = pathname === item.href;

    const link = (
      <Link
        href={item.href}
        onClick={handleNavClick}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-sidebar-active text-sidebar-accent"
            : "text-sidebar-foreground hover:bg-sidebar-active/70 hover:text-foreground"
        )}
      >
        {/* Active indicator bar */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active"
            className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-sidebar-accent"
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
        {Icon && <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-sidebar-accent")} />}
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
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
    return <div key={item.href}>{link}</div>;
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between px-4 shrink-0">
        {!collapsed ? (
          <>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg gradient-bg shadow-sm shadow-accent/20">
                <span className="text-xs font-bold text-white">S</span>
              </div>
              <span className="text-base font-semibold text-foreground">StemmQ</span>
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setCollapsed(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-muted transition-colors"
            >
              <ChevronsLeft className="h-4 w-4" />
            </motion.button>
          </>
        ) : (
          <Link href="/" className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg gradient-bg shadow-sm shadow-accent/20">
            <span className="text-xs font-bold text-white">S</span>
          </Link>
        )}
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 py-2 overflow-y-auto">
        {SIDEBAR_NAV.map(renderNavItem)}

        {/* Divider */}
        <div className="my-3 mx-3 border-t border-sidebar-border" />

        {/* Secondary Navigation */}
        {!collapsed && (
          <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            More
          </p>
        )}
        {SIDEBAR_SECONDARY_NAV.map(renderNavItem)}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-2 shrink-0 relative">
        {collapsed ? (
          <Tooltip content="Expand sidebar" position="right">
            <button
              onClick={() => setCollapsed(false)}
              className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </button>
          </Tooltip>
        ) : (
          <>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/80 transition-colors"
            >
              <Avatar initials="SC" size="sm" status="online" />
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-foreground truncate">Sarah Chen</p>
                <p className="text-xs text-muted-foreground truncate">CSO</p>
              </div>
              <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />
            </button>

            {/* User dropdown */}
            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-2 right-2 mb-1 rounded-xl border border-border bg-card shadow-lg overflow-hidden"
                >
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium text-foreground">Sarah Chen</p>
                    <p className="text-xs text-muted-foreground">sarah@stemmq.com</p>
                  </div>

                  {/* Workspace */}
                  <div className="px-2 py-1.5 border-b border-border">
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="flex-1 text-left text-xs">StemmQ HQ</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Menu items */}
                  <div className="px-2 py-1.5">
                    <button
                      onClick={() => { setUserMenuOpen(false); router.push(ROUTES.settings); closeMobile(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Settings className="h-3.5 w-3.5" />
                      Account Settings
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); router.push(ROUTES.billing); closeMobile(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      Billing
                    </button>
                    <button
                      onClick={() => { setUserMenuOpen(false); router.push(ROUTES.security); closeMobile(); }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      Security
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border px-2 py-1.5">
                    <button className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-danger hover:bg-danger/10 transition-colors">
                      <LogOut className="h-3.5 w-3.5" />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 64 : 256 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden lg:flex h-screen flex-col border-r border-sidebar-border bg-sidebar shrink-0"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-sidebar border-r border-sidebar-border lg:hidden shadow-xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export { Sidebar };
