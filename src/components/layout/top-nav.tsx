"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, Sun, Moon, ChevronRight, Menu, Settings, CreditCard, Shield, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { Dropdown } from "@/components/ui/dropdown";

function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
  };

  // Build breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs = segments.map((seg, i) => ({
    label: seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " "),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 sm:px-6 shrink-0">
      {/* Left side: hamburger + breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="lg:hidden rounded-lg p-2 -ml-2 text-muted-foreground hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </motion.button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 text-sm min-w-0 overflow-hidden">
          <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
            Home
          </Link>
          {breadcrumbs.slice(-2).map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-1 min-w-0">
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              {crumb.isLast ? (
                <span className="font-medium text-foreground truncate">{crumb.label}</span>
              ) : (
                <Link href={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors truncate">
                  {crumb.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Search */}
        <button
          className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2.5 sm:px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden md:inline-flex h-5 items-center rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
            &#8984;K
          </kbd>
        </button>

        {/* Notifications */}
        <Link
          href={ROUTES.notifications}
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background" />
        </Link>

        {/* Theme toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.button>

        {/* User menu */}
        <Dropdown
          trigger={
            <button className="rounded-lg p-1 hover:bg-muted transition-colors">
              <Avatar initials="SC" size="sm" />
            </button>
          }
          items={[
            { label: "Account Settings", onClick: () => router.push(ROUTES.settings) },
            { label: "Billing", onClick: () => router.push(ROUTES.billing) },
            { label: "Security", onClick: () => router.push(ROUTES.security) },
            { divider: true, label: "" },
            { label: "Sign out", onClick: () => {}, danger: true },
          ]}
        />
      </div>
    </header>
  );
}

export { TopNav };
