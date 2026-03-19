"use client";

import Link from "next/link";
import { AnimatedGradient } from "@/components/animations/animated-gradient";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel - brand visual (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-card overflow-hidden">
        <AnimatedGradient intensity="medium" />
        <div className="relative z-10 max-w-md px-12">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-lg shadow-accent/20">
              <span className="text-base font-bold text-white">S</span>
            </div>
            <span className="text-2xl font-bold text-foreground">StemmQ</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Make better strategic decisions, faster.
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Decision Intelligence Infrastructure for teams that need to track assumptions, model outcomes, and govern AI-assisted decisions.
          </p>
          {/* Floating mockup cards */}
          <div className="mt-10 space-y-3">
            <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-accent">Decision Quality Score</span>
                <span className="text-lg font-bold text-foreground">87.4</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full w-[87%] rounded-full bg-accent" />
              </div>
            </div>
            <div className="rounded-lg border border-border/50 bg-card/80 backdrop-blur-sm p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">6 assumptions validated</p>
                  <p className="text-xs text-muted-foreground">European Market Expansion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 py-12 bg-background relative">
        <div className="absolute inset-0 gradient-mesh opacity-20 lg:hidden" />
        <div className="relative w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 text-center lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-bg shadow-md shadow-accent/20">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-xl font-semibold text-foreground">StemmQ</span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
