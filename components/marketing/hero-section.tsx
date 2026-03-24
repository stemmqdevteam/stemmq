"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ChevronDown, Sparkles, TrendingUp, Brain, Shield } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { AnimatedGradient } from "@/components/animations/animated-gradient";

// Animated counter hook
function useCounter(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// Floating orb component
function FloatingOrb({
  delay,
  x,
  y,
  size,
  color,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(40px)" }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

// Subtle grid background
function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, var(--background) 75%)",
        }}
      />
    </div>
  );
}

// Live activity feed item
function ActivityItem({
  text,
  time,
  icon,
  delay,
}: {
  text: string;
  time: string;
  icon: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-2 py-1.5"
    >
      <div className="h-5 w-5 rounded-full bg-accent/12 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <p className="text-[11px] text-foreground/75 flex-1 leading-tight">{text}</p>
      <span className="text-[10px] text-muted-foreground/60 flex-shrink-0">{time}</span>
    </motion.div>
  );
}

function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.96]);

  const dqsScore = useCounter(87, 1800);
  const decisionsCount = useCounter(2847, 2200);
  const accuracyScore = useCounter(94, 2000);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <AnimatedGradient intensity="medium" />
      <GridBackground />

      {/* Ambient orbs */}
      <FloatingOrb delay={0} x="5%" y="20%" size={300} color="rgba(99,102,241,0.12)" />
      <FloatingOrb delay={2} x="75%" y="10%" size={250} color="rgba(59,130,246,0.10)" />
      <FloatingOrb delay={4} x="60%" y="70%" size={200} color="rgba(168,85,247,0.08)" />
      <FloatingOrb delay={1.5} x="20%" y="65%" size={180} color="rgba(99,102,241,0.06)" />

      <motion.div
        style={{ opacity, scale }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center w-full"
      >
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 sm:mb-9"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/8 px-4 py-1.5 text-xs sm:text-sm font-medium text-accent hover:bg-accent/12 transition-colors group"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Introducing DQS 2.0 — Decision Quality Score</span>
            <ArrowRight className="h-3 w-3 opacity-60 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ y: y1 }}
          className="mx-auto max-w-4xl fluid-heading-1 font-bold tracking-tight text-foreground"
        >
          The Operating System
          <br />
          <span className="gradient-text">for Strategic Decisions</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 sm:mt-7 max-w-2xl fluid-body-lg text-muted-foreground leading-relaxed"
        >
          StemmQ captures every strategic decision, tracks assumptions in real-time, and simulates
          outcomes — giving your team the clarity to move fast without breaking things.
        </motion.p>

        {/* Social proof avatars */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground/70"
        >
          <div className="flex -space-x-1.5">
            {["#6366f1", "#3b82f6", "#8b5cf6", "#06b6d4"].map((color, i) => (
              <div
                key={i}
                className="h-5 w-5 rounded-full border-2 border-background"
                style={{ background: color }}
              />
            ))}
          </div>
          <span>
            Trusted by <strong className="text-foreground/80 font-semibold">400+ enterprise teams</strong>
          </span>
        </motion.div> */}

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <Link href={ROUTES.auth}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="accent"
                size="lg"
                className="gap-2 text-base px-8 h-12 shadow-lg shadow-accent/25 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start for Free
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
              </Button>
            </motion.div>
          </Link>

          <Link href={ROUTES.product}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button variant="outline" size="lg" className="gap-2.5 text-base px-8 h-12 group">
                <div className="h-6 w-6 rounded-full bg-accent/15 flex items-center justify-center">
                  <Play className="h-2.5 w-2.5 text-accent fill-current" />
                </div>
                Watch 2-min demo
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Animated stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 sm:mt-12 flex items-center justify-center gap-8 sm:gap-14"
        >
          {[
            { value: `${decisionsCount.toLocaleString()}+`, label: "Decisions tracked" },
            { value: `${dqsScore}`, label: "Avg DQS score" },
            { value: `${accuracyScore}%`, label: "Assumption accuracy" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ===== HERO VISUAL SECTION ===== */}
        <div className="relative mt-14 sm:mt-16 hidden sm:block">

          {/* LEFT floating card — Active Decision */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, type: "spring", stiffness: 100 }}
            style={{ y: y1 }}
            className="absolute -left-2 top-8 z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/10 w-58">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-7 w-7 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Brain className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-foreground">Live Decision</p>
                    <p className="text-[9px] text-muted-foreground">Q2 Strategic Review</p>
                  </div>
                  <div className="ml-auto h-2 w-2 rounded-full bg-success animate-pulse" />
                </div>
                <p className="text-[11px] text-foreground/80 leading-relaxed mb-3">
                  Expand into European market via Germany-first entry strategy
                </p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">
                    Growth
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-accent" />
                    <span className="text-[11px] font-bold text-foreground">DQS 87</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT floating card — Confidence Index */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, type: "spring", stiffness: 100 }}
            style={{ y: y2 }}
            className="absolute -right-2 top-16 z-20 hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/10 w-48">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] text-muted-foreground">Confidence Index</p>
                  <Shield className="h-3.5 w-3.5 text-success" />
                </div>
                <p className="text-3xl font-bold text-foreground">91.2</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <p className="text-[10px] text-success font-medium">+6.8% this month</p>
                </div>
                <div className="mt-3 flex items-end gap-0.5 h-8">
                  {[35, 48, 42, 56, 50, 62, 58, 70, 68, 75, 82, 91].map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: i === 11 ? "var(--success)" : "rgba(16,185,129,0.25)",
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 1.4 + i * 0.05, duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* BOTTOM-LEFT floating card — Team Activity */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, type: "spring", stiffness: 80 }}
            style={{ y: y3 }}
            className="absolute -left-2 bottom-16 z-20 hidden xl:block"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              <div className="rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl p-3.5 shadow-2xl shadow-black/10 w-52">
                <p className="text-[11px] font-semibold text-foreground mb-2">Team Activity</p>
                <div className="divide-y divide-border/30">
                  <ActivityItem
                    text="Sarah approved EU expansion"
                    time="2m ago"
                    icon={<span className="text-[8px] text-success leading-none">✓</span>}
                    delay={1.3}
                  />
                  <ActivityItem
                    text="James flagged assumption risk"
                    time="8m ago"
                    icon={<span className="text-[8px] text-warning leading-none">!</span>}
                    delay={1.4}
                  />
                  <ActivityItem
                    text="AI simulation complete"
                    time="15m ago"
                    icon={<span className="text-[8px] text-accent leading-none">⚡</span>}
                    delay={1.5}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, type: "spring", stiffness: 80 }}
            className="mx-auto max-w-5xl relative"
          >
            {/* Glow halos */}
            <div className="absolute -inset-4 bg-accent/6 rounded-3xl blur-3xl" />
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-accent/15 blur-3xl rounded-full" />

            {/* Browser window */}
            <div className="relative rounded-2xl border border-border/80 bg-card/85 backdrop-blur-sm shadow-2xl shadow-black/15 overflow-hidden">

              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3 bg-card/90">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-danger/70" />
                  <div className="h-3 w-3 rounded-full bg-warning/70" />
                  <div className="h-3 w-3 rounded-full bg-success/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="inline-flex items-center gap-2 rounded-md bg-muted/60 px-3 py-1 text-xs text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                    app.stemmq.com/dashboard
                  </div>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className={`h-5 w-5 rounded ${i === 0 ? "bg-accent/20" : "bg-muted/60"}`} />
                  ))}
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-5 sm:p-7">

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Decision Intelligence Hub</h3>
                    <p className="text-xs text-muted-foreground">Q2 2025 · Updated 2 minutes ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-16 rounded-md bg-accent/10 border border-accent/20" />
                    <div className="h-7 px-3 rounded-md bg-accent text-white text-[10px] flex items-center font-medium gap-1">
                      <span>+</span> New Decision
                    </div>
                  </div>
                </div>

                {/* KPI cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Active Decisions", value: "47", delta: "+12" },
                    { label: "Avg DQS Score", value: "78.4", delta: "+4.2%" },
                    { label: "Assumptions Tracked", value: "234", delta: "+18" },
                    { label: "Confidence Index", value: "91.2", delta: "+6.8%" },
                  ].map((kpi, i) => (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.08 }}
                      className="rounded-xl border border-border/60 bg-background/60 p-3 sm:p-4"
                    >
                      <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">{kpi.label}</p>
                      <p className="mt-1.5 text-xl sm:text-2xl font-bold text-foreground">{kpi.value}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className="h-2.5 w-2.5 text-success" />
                        <p className="text-[10px] text-success">{kpi.delta}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                  {/* Bar chart */}
                  <div className="sm:col-span-2 rounded-xl border border-border/60 bg-background/60 p-4 h-36 sm:h-44">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[11px] text-muted-foreground font-medium">Decision Quality Trend</p>
                      <div className="flex gap-1">
                        {["1M", "3M", "6M"].map((t, i) => (
                          <span
                            key={t}
                            className={`text-[9px] px-1.5 py-0.5 rounded cursor-pointer ${
                              i === 1 ? "bg-accent/15 text-accent" : "text-muted-foreground"
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end gap-1 h-16 sm:h-24">
                      {[38, 50, 44, 58, 52, 64, 68, 62, 74, 72, 80, 78].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background:
                              i >= 10
                                ? "linear-gradient(180deg, var(--accent) 0%, rgba(99,102,241,0.35) 100%)"
                                : "rgba(99,102,241,0.18)",
                          }}
                          initial={{ scaleY: 0, originY: 1 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: 0.9 + i * 0.05, duration: 0.4, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Donut chart */}
                  <div className="rounded-xl border border-border/60 bg-background/60 p-4 h-36 sm:h-44">
                    <p className="text-[11px] text-muted-foreground font-medium mb-3">Strategic Health</p>
                    <div className="flex items-center gap-4 h-20 sm:h-28">
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                          <circle
                            cx="18" cy="18" r="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-muted/40"
                          />
                          <motion.circle
                            cx="18" cy="18" r="14"
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeDasharray="88 100"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 1.3, duration: 1.2, ease: "easeOut" }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-base sm:text-lg font-bold text-foreground">91</span>
                          <span className="text-[8px] text-muted-foreground">/ 100</span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {[
                          { label: "Decisions", pct: "88%", bg: "bg-accent" },
                          { label: "Assumptions", pct: "76%", bg: "bg-accent-secondary" },
                          { label: "Outcomes", pct: "94%", bg: "bg-success/80" },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center gap-1.5">
                            <div className={`h-1.5 w-1.5 rounded-full ${item.bg}`} />
                            <span className="text-[9px] text-muted-foreground">{item.label}</span>
                            <span className="text-[9px] font-semibold text-foreground ml-1">{item.pct}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent decisions mini-table */}
                <div className="mt-3 rounded-xl border border-border/60 bg-background/60 overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-border/40 flex items-center justify-between">
                    <p className="text-[11px] font-medium text-foreground">Recent Decisions</p>
                    <span className="text-[10px] text-accent cursor-pointer">View all →</span>
                  </div>
                  {[
                    { title: "EU Market Expansion", owner: "Sarah M.", dqs: 87, status: "In Review", statusCls: "text-warning bg-warning/10" },
                    { title: "Series B Fundraising", owner: "Michael K.", dqs: 92, status: "Approved", statusCls: "text-success bg-success/10" },
                    { title: "Platform Migration", owner: "Dev Team", dqs: 71, status: "Drafting", statusCls: "text-accent bg-accent/10" },
                  ].map((row, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + i * 0.1 }}
                      className="flex items-center gap-3 px-4 py-2.5 border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <div className="h-6 w-6 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Brain className="h-3 w-3 text-accent" />
                      </div>
                      <p className="text-[11px] font-medium text-foreground flex-1 text-left truncate">{row.title}</p>
                      <p className="text-[10px] text-muted-foreground hidden sm:block w-16 truncate">{row.owner}</p>
                      <span className="text-[11px] font-bold text-foreground w-8 text-right">{row.dqs}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium hidden sm:inline-flex ${row.statusCls}`}>
                        {row.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-14 sm:mt-20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-muted-foreground/40 cursor-pointer hover:text-muted-foreground/70 transition-colors"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export { HeroSection };