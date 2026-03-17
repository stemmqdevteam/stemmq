"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Brain, Shield, Zap, CheckCircle, XCircle, AlertTriangle,
  Target, BarChart3, TrendingUp, Users, ArrowRight, Play, Network, Eye
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { EnterpriseSection } from "@/components/marketing/enterprise-section";
import { AnimatedGradient } from "@/components/animations/animated-gradient";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren } from "@/components/animations/stagger-children";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockBrowser, MockAgentFeed, MockFlowDiagram } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const agentTypes = [
  { icon: TrendingUp, name: "PricingAgent", role: "Pricing Optimization", dept: "Revenue", color: "text-accent bg-accent/10 border-accent/20" },
  { icon: Users, name: "MarketingAgent", role: "Campaign Intelligence", dept: "Marketing", color: "text-purple-500 bg-purple-500/10 border-purple-500/20" },
  { icon: Target, name: "SalesAgent", role: "Pipeline Optimization", dept: "Sales", color: "text-success bg-success/10 border-success/20" },
  { icon: Zap, name: "OpsAgent", role: "Process Optimization", dept: "Operations", color: "text-warning bg-warning/10 border-warning/20" },
];

const canDo = [
  "Propose pricing changes backed by historical data",
  "Suggest campaign timing based on pattern recognition",
  "Flag emerging risks before they become decisions",
  "Recommend budget reallocations with DQS support",
  "Cross-reference CRM outcomes against past predictions",
  "Generate structured decision objects automatically",
];

const cannotDo = [
  "Execute any action without a Decision Object",
  "Bypass the Decision Gate under any condition",
  "Modify production systems without approval",
  "Make irreversible decisions autonomously",
  "Operate outside defined risk boundaries",
  "Act without generating an auditable record",
];

const perfMetrics = [
  { icon: Brain, label: "Forecast Accuracy", value: "81%", trend: "+12%" },
  { icon: CheckCircle, label: "Decision Quality Score", value: "8.4/10", trend: "+0.9" },
  { icon: TrendingUp, label: "ROI Contribution", value: "$2.4M", trend: "+34%" },
  { icon: Shield, label: "Risk Exposure", value: "Medium", trend: "−18%" },
  { icon: BarChart3, label: "Success Rate", value: "67%", trend: "+8%" },
];

export default function AIAgentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <AnimatedGradient intensity="strong" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-medium text-accent mb-6">
                  <Bot className="h-3.5 w-3.5" />
                  AI Agent System
                </span>
                <h1 className="fluid-heading-1 font-bold tracking-tight text-foreground">
                  Agents that <span className="gradient-text">decide.</span>
                  <br />Infrastructure that governs.
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Every AI agent in StemmQ operates through a Decision Gate.
                  No action executes without a structured decision object — giving you complete intelligence and control.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href={ROUTES.auth}>
                    <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                      Build Your First Agent
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={ROUTES.decisionIntelligence}>
                    <Button variant="outline" size="lg" className="gap-2">
                      <Play className="h-4 w-4" />
                      See Decision Gate
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">Live agent proposals</span>
                </div>
                <MockAgentFeed />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Decision Gate Pipeline */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Core Principle</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
                Every Agent Action = A Decision Object
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg">
                No agent — internal or external — can execute an action without first generating
                a structured decision in StemmQ. The Decision Gate is non-negotiable.
              </p>
            </div>
          </FadeIn>

          {/* Desktop flow */}
          <FadeIn delay={0.2}>
            <div className="hidden md:flex items-center justify-between gap-2 max-w-5xl mx-auto">
              {[
                { step: "1", label: "Intent", desc: "Agent proposes action", color: "border-accent/40 bg-accent/10 text-accent" },
                { step: "2", label: "Evaluation", desc: "Risk + pattern analysis", color: "border-purple-500/40 bg-purple-500/10 text-purple-400" },
                { step: "3", label: "Decision Gate", desc: "Approve / Reject / Escalate", color: "border-warning/40 bg-warning/10 text-warning" },
                { step: "4", label: "Execution", desc: "Only approved actions run", color: "border-success/40 bg-success/10 text-success" },
                { step: "5", label: "Outcome Tracking", desc: "Log + learn + improve", color: "border-blue-400/40 bg-blue-400/10 text-blue-400" },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-2">
                  <div className={`rounded-xl border px-5 py-4 text-center min-w-[140px] ${item.color}`}>
                    <div className="text-xs font-bold mb-1 opacity-60">Step {item.step}</div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-[10px] mt-1 opacity-70">{item.desc}</div>
                  </div>
                  {i < 4 && <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />}
                </div>
              ))}
            </div>
            {/* Mobile flow */}
            <div className="md:hidden max-w-sm mx-auto">
              <MockFlowDiagram vertical />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Agent Types */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Agent Types"
            title="Build or connect any agent"
            subtitle="Create native agents with our no-code builder, or connect third-party AI systems through our API and webhook gateway."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentTypes.map((agent, i) => (
              <motion.div
                key={agent.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className={`h-10 w-10 rounded-lg border flex items-center justify-center mb-4 ${agent.color}`}>
                  <agent.icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold text-muted-foreground mb-1">{agent.dept}</div>
                <div className="text-base font-bold text-foreground mb-1">{agent.name}</div>
                <div className="text-sm text-muted-foreground">{agent.role}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl border border-dashed border-border bg-muted/20 text-center">
            <span className="text-sm text-muted-foreground">
              + Connect any external AI system via{" "}
              <span className="text-accent font-medium">POST /external-agent/decision</span>
            </span>
          </div>
        </div>
      </section>

      {/* Agent Builder UI Mock */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <SectionHeader
                  eyebrow="Agent Builder"
                  title="Create an agent like creating a Notion page"
                  subtitle="Define goal, permissions, and risk boundaries. Your agent starts operating immediately — every action goes through the Decision Gate."
                  align="left"
                />
                <ul className="mt-8 space-y-3">
                  {["Define agent identity and objective", "Set capability scope and system permissions", "Configure risk boundaries and approval thresholds", "Write natural-language instruction layer", "Agent begins operating — decisions logged automatically"].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <MockBrowser url="app.stemmq.com/agents/new">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-border">
                    <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">New Agent</div>
                      <div className="text-[10px] text-muted-foreground">Configure agent identity and scope</div>
                    </div>
                  </div>
                  {[
                    { label: "Agent Name", value: "Q4RevenueAgent", type: "input" },
                    { label: "Department", value: "Revenue · Pricing", type: "select" },
                    { label: "Objective", value: "Maximize Q4 revenue while minimizing churn risk", type: "textarea" },
                    { label: "Max Risk Level", value: "Medium — auto-escalate above", type: "select" },
                  ].map((field) => (
                    <div key={field.label}>
                      <div className="text-[10px] font-medium text-muted-foreground mb-1">{field.label}</div>
                      <div className={`rounded-lg border border-border bg-background/50 px-3 py-2 text-xs text-foreground ${field.type === "textarea" ? "h-12" : ""}`}>
                        {field.value}
                      </div>
                    </div>
                  ))}
                  <button className="w-full rounded-lg bg-accent text-white text-xs font-semibold py-2.5 hover:bg-accent/90 transition-colors">
                    Create Agent →
                  </button>
                </div>
              </MockBrowser>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Human-in-the-Loop */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" delay={0.1} className="order-2 lg:order-1">
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span className="text-xs font-semibold text-foreground">Risk Threshold Triggered</span>
                    <span className="ml-auto text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded-full">High Risk</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    SalesAgent proposes reducing enterprise contract floor to $6,000/yr (−40%). Exceeds defined risk threshold.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="text-[10px] py-2 rounded-lg bg-success/10 text-success font-semibold hover:bg-success/20 transition-colors">✓ Approve</button>
                    <button className="text-[10px] py-2 rounded-lg bg-accent/10 text-accent font-semibold hover:bg-accent/20 transition-colors">⟳ Revise</button>
                    <button className="text-[10px] py-2 rounded-lg bg-danger/10 text-danger font-semibold hover:bg-danger/20 transition-colors">✕ Reject</button>
                  </div>
                </div>
                <div className="rounded-xl border border-success/20 bg-success/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-xs font-semibold text-foreground">Auto-Approved — Low Risk</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PricingAgent launched 5% seasonal discount. Below risk threshold — no human required. Decision logged automatically.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left" className="order-1 lg:order-2">
              <div>
                <SectionHeader
                  eyebrow="Human-in-the-Loop"
                  title="Conditional, not mandatory"
                  subtitle="Human review activates only when predefined thresholds are crossed — risk level, financial exposure, or irreversibility. Everything else executes automatically."
                  align="left"
                />
                <div className="mt-6 space-y-3">
                  {[
                    { trigger: "Risk exceeds defined threshold", action: "Escalate to human reviewer" },
                    { trigger: "Financial exposure above limit", action: "Require approval" },
                    { trigger: "Confidence score < 70%", action: "Flag for review" },
                    { trigger: "Irreversible or high-impact action", action: "Mandatory human approval" },
                  ].map((rule) => (
                    <div key={rule.trigger} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border">
                      <AlertTriangle className="h-3.5 w-3.5 text-warning mt-0.5 shrink-0" />
                      <div>
                        <span className="text-xs font-medium text-foreground">{rule.trigger}</span>
                        <span className="text-xs text-muted-foreground"> → {rule.action}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CAN vs CANNOT */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Agent Governance"
            title="What agents can — and cannot — do"
            subtitle="Clear boundaries are what make AI agents trustworthy. StemmQ enforces these at the infrastructure level, not through prompting."
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-success/20 bg-success/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-semibold text-foreground">Agents CAN</span>
              </div>
              <div className="space-y-3">
                {canDo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-danger/20 bg-danger/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="h-5 w-5 text-danger" />
                <span className="font-semibold text-foreground">Agents CANNOT</span>
              </div>
              <div className="space-y-3">
                {cannotDo.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5"
                  >
                    <XCircle className="h-4 w-4 text-danger mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent Performance */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Performance System"
            title="Every agent earns its track record"
            subtitle="StemmQ continuously evaluates every agent against five performance dimensions. Agents that perform well get more autonomy. Agents that don't get reviewed."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {perfMetrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <metric.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="text-xl font-bold text-foreground">{metric.value}</div>
                <div className="text-[10px] text-success mt-0.5">{metric.trend}</div>
                <div className="text-xs text-muted-foreground mt-1.5 leading-tight">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Multi-agent example */}
          <div className="mt-12 rounded-xl border border-border bg-card/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Network className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">Multi-Agent Orchestration</span>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {[
                { agent: "PricingAgent", action: "Proposes 15% Q4 discount" },
                null,
                { agent: "MarketingAgent", action: "Triggers campaign proposal" },
                null,
                { agent: "Decision Gate", action: "Evaluates as combined unit" },
              ].map((item, i) => (
                item === null ? (
                  <ArrowRight key={i} className="h-4 w-4 text-muted-foreground shrink-0 rotate-90 sm:rotate-0 mx-auto sm:mx-0" />
                ) : (
                  <div key={i} className="flex-1 rounded-lg border border-border bg-background/50 p-3 text-center min-w-0">
                    <div className="text-xs font-bold text-accent mb-1">{item.agent}</div>
                    <div className="text-[11px] text-muted-foreground">{item.action}</div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <EnterpriseSection />
      <CTASection />
      <MarketingFooter />
    </div>
  );
}
