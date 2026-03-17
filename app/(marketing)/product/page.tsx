"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { GitBranch, Target, Activity, ArrowRight, Bot, Brain } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { WorkflowSection } from "@/components/marketing/workflow-section";
import { AnimatedGradient } from "@/components/animations/animated-gradient";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockBrowser, MockFlowDiagram, MockAgentFeed } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const sections = [
  {
    icon: GitBranch,
    label: "Capture",
    title: "Structure every decision",
    description:
      "Every strategic decision becomes a Structured Decision Object — with explicit context, owner, strategic intent, assumptions, and projected outcomes. No decision exists in isolation.",
    features: [
      "Structured Decision Objects (SDO) as the core data unit",
      "Strategic intent classification: Growth, Defense, Efficiency, Experiment, Risk Mitigation",
      "Decision Quality Score (DQS) computed from assumption coverage and data quality",
      "Decision Impact Weight (DIW) for prioritization across initiatives",
    ],
  },
  {
    icon: Target,
    label: "Calibrate",
    title: "Track every assumption",
    description:
      "No decision can be saved without explicit assumptions. Each assumption is tracked, weighted, and validated over time — creating an organizational calibration system.",
    features: [
      "Mandatory assumption capture for every decision",
      "Impact-weighted scoring from 1 to 5",
      "Status lifecycle: Pending → Validated / Challenged / Invalidated",
      "Forecast reliability tracking per person, team, and agent",
    ],
  },
  {
    icon: Activity,
    label: "Simulate",
    title: "Model every outcome",
    description:
      "Before committing to a strategic direction, simulate probabilistic outcomes. Test scenarios, stress-test assumptions, and understand the full landscape of possibilities.",
    features: [
      "Probabilistic scenario simulation with confidence intervals",
      "Multi-path outcome modeling linked to real decisions",
      "Sensitivity analysis for key assumptions",
      "Monte Carlo simulation for complex strategic scenarios",
    ],
  },
];

function SDOMockVisual() {
  return (
    <MockBrowser url="app.stemmq.com/decisions/new">
      <div className="space-y-3">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">New Decision</div>
        <div>
          <div className="text-[10px] text-muted-foreground mb-1">Title</div>
          <div className="rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground">Expand into EMEA market Q1 2026</div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="text-[10px] text-muted-foreground mb-1">Strategic Intent</div>
            <div className="rounded-lg border border-success/30 bg-success/5 px-3 py-2 text-xs text-success font-medium">Growth</div>
          </div>
          <div>
            <div className="text-[10px] text-muted-foreground mb-1">DQS Score</div>
            <div className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent font-bold">87 / 100</div>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground mb-1.5">Assumptions (3)</div>
          {[
            { text: "EMEA TAM > $50M", status: "bg-success/10 text-success" },
            { text: "6-month ramp time sufficient", status: "bg-warning/10 text-warning" },
            { text: "Regulatory approval in 8 weeks", status: "bg-muted text-muted-foreground" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${a.status}`}>●</div>
              <span className="text-[10px] text-foreground">{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </MockBrowser>
  );
}

function AssumptionMockVisual() {
  return (
    <MockBrowser url="app.stemmq.com/assumptions">
      <div className="space-y-2.5">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Assumption Tracker</div>
        {[
          { text: "EMEA TAM > $50M", weight: 5, status: "Validated", color: "bg-success/10 text-success border-success/20" },
          { text: "6-month ramp time sufficient", weight: 4, status: "Pending", color: "bg-warning/10 text-warning border-warning/20" },
          { text: "Regulatory approval in 8 weeks", weight: 3, status: "Challenged", color: "bg-danger/10 text-danger border-danger/20" },
          { text: "Local partner exists in target regions", weight: 5, status: "Validated", color: "bg-success/10 text-success border-success/20" },
        ].map((a, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-card/50 hover:bg-muted/30 transition-colors">
            <div className="flex-1 min-w-0 mr-3">
              <div className="text-[10px] text-foreground font-medium truncate">{a.text}</div>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map((dot) => (
                  <div key={dot} className={`h-1.5 w-1.5 rounded-full ${dot <= a.weight ? "bg-accent" : "bg-muted"}`} />
                ))}
                <span className="text-[9px] text-muted-foreground ml-1">weight {a.weight}</span>
              </div>
            </div>
            <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium border shrink-0 ${a.color}`}>{a.status}</span>
          </div>
        ))}
      </div>
    </MockBrowser>
  );
}

function SimulationMockVisual() {
  const bars = [15, 28, 42, 55, 68, 79, 85, 82, 74, 62, 48, 32, 20];
  const outcomes = [
    { label: "Conservative", prob: 22, color: "bg-warning/20 text-warning border-warning/30" },
    { label: "Base Case", prob: 61, color: "bg-accent/20 text-accent border-accent/30" },
    { label: "Optimistic", prob: 17, color: "bg-success/20 text-success border-success/30" },
  ];
  return (
    <MockBrowser url="app.stemmq.com/simulations">
      <div className="space-y-3">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Outcome Distribution</div>
        {/* Probability curve */}
        <div className="flex items-end gap-0.5 h-20 bg-muted/30 rounded-lg p-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-accent/30 hover:bg-accent/60 transition-colors"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        {/* Outcomes */}
        <div className="grid grid-cols-3 gap-1.5">
          {outcomes.map((o) => (
            <div key={o.label} className={`rounded-lg border p-2 text-center ${o.color}`}>
              <div className="text-sm font-bold">{o.prob}%</div>
              <div className="text-[9px] font-medium">{o.label}</div>
            </div>
          ))}
        </div>
      </div>
    </MockBrowser>
  );
}

const sectionVisuals = [SDOMockVisual, AssumptionMockVisual, SimulationMockVisual];

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <AnimatedGradient intensity="medium" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
              <Brain className="h-3.5 w-3.5" />
              Decision Intelligence Infrastructure
            </span>
            <h1 className="mx-auto max-w-4xl fluid-heading-1 font-bold tracking-tight text-foreground">
              The infrastructure that makes decisions{" "}
              <span className="gradient-text">compound</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              StemmQ replaces ad-hoc decision-making with a structured, auditable, and
              intelligent system that gets smarter with every decision your organization makes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={ROUTES.auth}>
                <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                  Start Building
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={ROUTES.decisionIntelligence}>
                <Button variant="outline" size="lg">See the System</Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Core Sections with real mock UI */}
      {sections.map((section, i) => {
        const Visual = sectionVisuals[i];
        return (
          <section
            key={section.label}
            className={i % 2 === 1 ? "py-20 bg-muted/30 border-y border-border" : "py-20"}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:grid-flow-row-dense" : ""}`}>
                <FadeIn direction={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                        <section.icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {section.label}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{section.title}</h2>
                    <p className="mt-4 text-muted-foreground leading-relaxed">{section.description}</p>
                    <ul className="mt-6 space-y-3">
                      {section.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                          <span className="text-sm text-muted-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>

                <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.1} className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <Visual />
                </FadeIn>
              </div>
            </div>
          </section>
        );
      })}

      {/* Decision Gate */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Agent Governance</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
                No agent can execute without a decision
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                Every AI agent — native or external — must generate a Structured Decision Object before
                any action executes. The Decision Gate is the governance layer that makes AI agents trustworthy.
              </p>
            </div>
          </FadeIn>

          <div className="hidden md:flex items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              { label: "Agent Intent", color: "border-accent/40 bg-accent/10 text-accent" },
              { label: "→", isArrow: true },
              { label: "SDO Created", color: "border-purple-500/40 bg-purple-500/10 text-purple-400" },
              { label: "→", isArrow: true },
              { label: "Gate Evaluation", color: "border-warning/40 bg-warning/10 text-warning" },
              { label: "→", isArrow: true },
              { label: "Approve / Reject", color: "border-success/40 bg-success/10 text-success" },
              { label: "→", isArrow: true },
              { label: "Outcome Tracked", color: "border-blue-400/40 bg-blue-400/10 text-blue-400" },
            ].map((item, i) =>
              "isArrow" in item ? (
                <ArrowRight key={i} className="h-4 w-4 text-slate-600 shrink-0" />
              ) : (
                <div key={i} className={`rounded-xl border px-4 py-3 text-center min-w-[110px] ${item.color}`}>
                  <div className="text-xs font-semibold">{item.label}</div>
                </div>
              )
            )}
          </div>
          <div className="md:hidden mt-4">
            <MockFlowDiagram vertical />
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-10 text-center">
              <Link href={ROUTES.aiAgents}>
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/5 gap-2">
                  <Bot className="h-4 w-4" />
                  Explore the Agent System
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Agent Feed Preview */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <SectionHeader
                  eyebrow="Live Intelligence"
                  title="Every agent decision, visible and governed"
                  subtitle="Watch agents propose, evaluate, and execute — all through the Decision Gate. Full transparency over every automated action in your organization."
                  align="left"
                />
                <div className="mt-8">
                  <Link href={ROUTES.aiAgents}>
                    <Button variant="accent" className="gap-2 shadow-md shadow-accent/20">
                      See the Agent System
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">Live agent proposals</span>
                </div>
                <MockAgentFeed />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <WorkflowSection />
      <CTASection />
      <MarketingFooter />
    </div>
  );
}
