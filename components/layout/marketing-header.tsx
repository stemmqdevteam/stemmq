"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MARKETING_NAV, ROUTES } from "@/lib/constants";
import type { MarketingNavItem } from "@/lib/types";
import { Button } from "@/components/ui/button";

function MarketingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdown when navigating
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  function handleMouseEnter(label: string) {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveDropdown(label);
  }

  function handleMouseLeave() {
    closeTimerRef.current = setTimeout(() => setActiveDropdown(null), 150);
  }

  function isDropdownActive(item: MarketingNavItem) {
    if (!item.children) return false;
    return item.children.some(
      (c) => pathname === c.href || pathname.startsWith(c.href + "/"),
    );
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.05)]"
            : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 relative z-10 shrink-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg shadow-md shadow-accent/20"
            >
              <span className="text-sm font-bold text-white">S</span>
            </motion.div>
            <span className="text-lg font-semibold text-foreground">
              StemmQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {MARKETING_NAV.map((item) => {
              if (!item.children) {
                // Direct link
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              }

              // Dropdown item
              const isActive = isDropdownActive(item);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
                      isActive || activeDropdown === item.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : "",
                      )}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-accent"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{
                          duration: 0.15,
                          ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-xl border border-border bg-card/98 backdrop-blur-xl shadow-2xl shadow-black/10 p-2 z-50"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/80",
                              pathname === child.href ? "bg-accent/5" : "",
                            )}
                          >
                            <span
                              className={cn(
                                "text-sm font-medium",
                                pathname === child.href
                                  ? "text-accent"
                                  : "text-foreground",
                              )}
                            >
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-xs text-muted-foreground leading-relaxed">
                                {child.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link href={ROUTES.auth}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="relative group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-indigo-500/20"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
                {/* Shimmer */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-10 rounded-lg p-2 text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </header>

      {/* Mobile Full-Screen Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden bg-background/98 backdrop-blur-xl overflow-y-auto"
          >
            <div className="flex flex-col px-6 pt-24 pb-8 min-h-full">
              <nav className="flex flex-col gap-1 w-full">
                {MARKETING_NAV.map((item, idx) => {
                  if (!item.children) {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                            pathname === item.href
                              ? "bg-accent/10 text-accent"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  }

                  const isOpen = mobileExpanded === item.label;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.06 }}
                    >
                      <button
                        onClick={() =>
                          setMobileExpanded(isOpen ? null : item.label)
                        }
                        className={cn(
                          "flex items-center justify-between w-full rounded-xl px-4 py-3.5 text-base font-medium transition-colors",
                          isDropdownActive(item)
                            ? "bg-accent/10 text-accent"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isOpen ? "rotate-180" : "",
                          )}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 py-1 space-y-0.5">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className={cn(
                                    "flex flex-col rounded-lg px-4 py-3 transition-colors",
                                    pathname === child.href
                                      ? "bg-accent/5 text-accent"
                                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                  )}
                                >
                                  <span className="text-sm font-medium text-foreground">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-xs text-muted-foreground mt-0.5">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-3 mt-8 pt-6 border-t border-border"
              >
                <div className="w-full flex justify-center items-center">
                  <Link href={ROUTES.auth} className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="relative group w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-indigo-500/20"
                      style={{
                        background: "linear-gradient(135deg,#6366f1,#4f46e5)",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>

                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { MarketingHeader };
