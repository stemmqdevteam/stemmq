"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Package, Lightbulb, Settings, Building2,
  ArrowRight, CheckCircle, Quote
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockBrowser, MockDecisionCard, MockAgentFeed } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const teams = [
  {
    id: "marketing",
    label: "Marketing",
    icon: TrendingUp,
    color: "text-accent bg-accent/10",
    problem: "Campaign decisions made on gut feel, no way to track which assumptions drove performance.",
    solution: "Every campaign becomes a structured decision with captured assumptions and outcome tracking.",
    outcomes: ["34% improvement in campaign assumption accuracy", "Agents surface timing patterns humans miss", "Full audit trail for every budget decision"],
    mockType: "agent" as const,
  },
  {
    id: "product",
    label: "Product",
    icon: Package,
    color: "text-purple-500 bg-purple-500/10",
    problem: "Feature prioritization is political, not data-driven. No visibility into which bets paid off.",
    solution: "Each feature decision captures strategic intent, assumptions, and links to outcome metrics.",
    outcomes: ["DQS scoring cuts prioritization debates by 60%", "Historical decision accuracy improves roadmap confidence", "Agents cross-reference user data before proposing features"],
    mockType: "decision" as const,
  },
  {
    id: "founders",
    label: "Founders",
    icon: Lightbulb,
    color: "text-warning bg-warning/10",
    problem: "Strategic decisions happen fast, rationale gets lost, and the same mistakes repeat across rounds.",
    solution: "Institutional memory captures the reasoning behind every strategic call — forever.",
    outcomes: ["Zero strategic decisions lost in leadership transitions", "Investor-ready decision rationale on demand", "Pattern recognition reveals strategic blind spots"],
    mockType: "decision" as const,
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    color: "text-success bg-success/10",
    problem: "Process changes happen without impact tracking, creating invisible organizational debt.",
    solution: "Every process change is a decision with owner, assumptions, and measurable outcomes.",
    outcomes: ["Full audit trail for compliance and governance", "Process agents flag risk before changes execute", "Cross-team decision visibility reduces conflicts"],
    mockType: "agent" as const,
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: Building2,
    color: "text-blue-500 bg-blue-500/10",
    problem: "At scale, decisions happen everywhere — siloed, untracked, and impossible to govern.",
    solution: "StemmQ becomes the organizational decision layer — every team, every agent, one system of record.",
    outcomes: ["Cross-org decision governance from one platform", "SSO + SAML + immutable audit logs", "AI agent supervision across entire org stack"],
    mockType: "agent" as const,
  },
];

const stats = [
  { value: "+34%", label: "Assumption accuracy improvement within 6 months" },
  { value: "8 wks", label: "Average time to structured decision-making org-wide" },
  { value: "91%", label: "Agent proposal approval rate on first submission" },
  { value: "0", label: "Untracked strategic decisions for compliant orgs" },
];

const quotes = [
  {
    quote: "StemmQ changed how we run product planning. Our DQS baseline jumped 28 points in two quarters.",
    name: "Jordan Kim",
    role: "Head of Product",
    company: "Series B SaaS",
    initials: "JK",
  },
  {
    quote: "Every investor asks us to show our decision-making process. We just export from StemmQ.",
    name: "Priya Sharma",
    role: "Co-founder & CEO",
    company: "Fintech Startup",
    initials: "PS",
  },
  {
    quote: "We have 40 AI agents running. Without StemmQ's Decision Gate, that would be terrifying.",
    name: "Marcus Webb",
    role: "VP Engineering",
    company: "Enterprise SaaS",
    initials: "MW",
  },
];

function UseCaseMock({ type }: { type: "decision" | "agent" }) {
  if (type === "agent") {
    return (
      <MockBrowser>
        <MockAgentFeed />
      </MockBrowser>
    );
  }
  return (
    <MockBrowser>
      <div className="space-y-3">
        <MockDecisionCard title="Launch React SDK in Q1" intent="Growth" dqs={82} />
        <MockDecisionCard title="Deprecate v1 API endpoint" intent="Efficiency" dqs={74} status="draft" />
        <MockDecisionCard title="Hire 3 ML engineers" intent="Growth" dqs={91} status="approved" />
      </div>
    </MockBrowser>
  );
}

export default function UseCasesPage() {
  const [activeTeam, setActiveTeam] = useState("marketing");
  const active = teams.find((t) => t.id === activeTeam)!;

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Use Cases</span>
            <h1 className="mt-3 fluid-heading-1 font-bold tracking-tight text-foreground">
              Built for the teams that{" "}
              <span className="gradient-text">move the needle</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From scrappy startups to enterprise orgs, StemmQ adapts to how your team makes decisions —
              then makes those decisions better over time.
            </p>
          </FadeIn>

          {/* Team pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => setActiveTeam(team.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  activeTeam === team.id
                    ? "bg-accent text-white border-accent shadow-md shadow-accent/20"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-foreground"
                )}
              >
                <team.icon className="h-3.5 w-3.5" />
                {team.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active team content */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTeam}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mb-4 ${active.color}`}>
                  <active.icon className="h-4 w-4" />
                  {active.label} Teams
                </div>

                <div className="mb-6 p-4 rounded-lg border border-danger/20 bg-danger/5">
                  <div className="text-xs font-semibold text-danger uppercase tracking-wider mb-2">The Problem</div>
                  <p className="text-sm text-foreground">{active.problem}</p>
                </div>

                <div className="mb-6 p-4 rounded-lg border border-success/20 bg-success/5">
                  <div className="text-xs font-semibold text-success uppercase tracking-wider mb-2">The StemmQ Way</div>
                  <p className="text-sm text-foreground">{active.solution}</p>
                </div>

                <div className="space-y-2.5">
                  {active.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href={ROUTES.auth}>
                    <Button variant="accent" size="lg" className="gap-2 shadow-md shadow-accent/20">
                      Start for {active.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <UseCaseMock type={active.mockType} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="What teams say"
            title="Decision intelligence in practice"
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 relative hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Quote className="h-6 w-6 text-accent/30 mb-4" />
                <p className="text-sm text-foreground leading-relaxed mb-5">"{quote.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-accent">{quote.initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{quote.name}</div>
                    <div className="text-xs text-muted-foreground">{quote.role} · {quote.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <MarketingFooter />
    </div>
  );
}
