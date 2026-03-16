"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-secondary/8 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-purple-500/6 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Now in Public Beta
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
        >
          Decision Intelligence{" "}
          <span className="gradient-text">Infrastructure</span>{" "}
          for the Enterprise
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          Capture every strategic decision. Track every assumption. Simulate every outcome.
          StemmQ gives your organization the infrastructure to make decisions that compound.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href={ROUTES.signup}>
            <Button variant="accent" size="lg" className="gap-2 text-base px-8">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={ROUTES.product}>
            <Button variant="outline" size="lg" className="gap-2 text-base px-8">
              <Play className="h-4 w-4" />
              See How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Dashboard preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 mx-auto max-w-5xl"
        >
          <div className="relative rounded-xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-danger/60" />
                <div className="h-3 w-3 rounded-full bg-warning/60" />
                <div className="h-3 w-3 rounded-full bg-success/60" />
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 rounded-md bg-muted/50 px-3 py-0.5 text-xs text-muted-foreground">
                  app.stemmq.com/dashboard
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {["Active Decisions", "Avg DQS", "Assumption Accuracy", "Confidence Index"].map(
                  (label, i) => (
                    <div
                      key={label}
                      className="rounded-lg border border-border bg-background/50 p-4"
                    >
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {["47", "78.4", "84.1%", "91.2"][i]}
                      </p>
                      <p className="mt-0.5 text-xs text-success">
                        {["+12.3%", "+4.2%", "-2.1%", "+6.8%"][i]}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-border bg-background/50 p-4 h-40">
                  <p className="text-xs text-muted-foreground mb-3">Decision Quality Trend</p>
                  <div className="flex items-end gap-1 h-24">
                    {[40, 55, 45, 60, 52, 68, 72, 65, 78, 75, 82, 78].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/20"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-background/50 p-4 h-40">
                  <p className="text-xs text-muted-foreground mb-3">Strategic Health</p>
                  <div className="flex items-center justify-center h-24">
                    <div className="relative h-20 w-20">
                      <svg viewBox="0 0 36 36" className="h-20 w-20 -rotate-90">
                        <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
                        <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="91 100" className="text-accent" strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-foreground">91</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Gradient shadow below */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-accent/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

export { HeroSection };
