"use client";

import { motion } from "framer-motion";
import {
  Brain, Target, Activity, Shield, BarChart3, CheckCircle,
  GitBranch, ArrowRight, TrendingUp, Layers
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { AnimatedGradient } from "@/components/animations/animated-gradient";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockBrowser, MockSDOCard, MockFlowDiagram } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const sdoFields = [
  { label: "Title", value: "Expand into EMEA market Q1 2026", type: "text" },
  { label: "Strategic Intent", value: "Growth — New Market Entry", type: "badge-success" },
  { label: "Owner", value: "Sarah Chen · VP Strategy", type: "text" },
  { label: "Assumptions", value: "6 captured · 4 validated · 2 pending", type: "text" },
  { label: "Decision Quality Score", value: "87 / 100", type: "score" },
  { label: "Status", value: "Active", type: "badge-accent" },
];

const pipelineSteps = [
  {
    step: "01",
    label: "Intent Capture",
    desc: "Every decision starts with explicit intent. Who owns it? What outcome are they driving? What assumptions does it rest on?",
    icon: Target,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    step: "02",
    label: "Assumption Validation",
    desc: "Each assumption is weighted, tracked, and validated against real outcomes. No decision hides on unexamined beliefs.",
    icon: CheckCircle,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    step: "03",
    label: "Risk & Pattern Modeling",
    desc: "The decision runs through pattern recognition, historical accuracy checks, and risk modeling before scoring.",
    icon: Shield,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    step: "04",
    label: "Decision Gate",
    desc: "Approved decisions execute. Risky ones escalate. Rejected ones are documented with reasoning for the organizational memory.",
    icon: GitBranch,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    step: "05",
    label: "Outcome Tracking",
    desc: "What actually happened? Was the forecast accurate? Which assumptions held? The system learns from every single decision.",
    icon: TrendingUp,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
];

const dqsComponents = [
  { label: "Assumption Coverage", pct: 35, color: "bg-accent" },
  { label: "Data Quality", pct: 30, color: "bg-purple-500" },
  { label: "Historical Accuracy", pct: 20, color: "bg-success" },
  { label: "Confidence Level", pct: 15, color: "bg-warning" },
];

const timeline = [
  { period: "Month 0", dqs: 42, assumptions: "Rarely captured", description: "Ad-hoc decisions, no tracking" },
  { period: "Month 3", dqs: 68, assumptions: "Consistently validated", description: "Patterns emerging, DQS improving" },
  { period: "Month 12", dqs: 91, assumptions: "Predictive accuracy 87%", description: "Compounding intelligence in every decision" },
];

export default function DecisionIntelligencePage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <AnimatedGradient intensity="medium" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-28 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent">Decision Intelligence</span>
                <h1 className="mt-3 fluid-heading-1 font-bold tracking-tight text-foreground">
                  A Decision Object is the{" "}
                  <span className="gradient-text">atom</span> of strategic work
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Every decision in StemmQ becomes a Structured Decision Object — with intent, owner,
                  assumptions, risk score, and outcome tracking built in from the start.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link href={ROUTES.auth}>
                    <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                      Start Structuring Decisions
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <MockSDOCard />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SDO Anatomy */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">SDO Anatomy</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
                Every field exists for a reason
              </h2>
              <p className="mt-4 text-slate-400 max-w-xl mx-auto">
                Structured Decision Objects have no optional fields that matter. Each one enforces
                the discipline that makes decisions compound over time.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            <MockBrowser url="app.stemmq.com/decisions/new">
              <div className="space-y-3">
                {sdoFields.map((field, i) => (
                  <motion.div
                    key={field.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
                  >
                    <span className="text-xs text-muted-foreground font-medium">{field.label}</span>
                    {field.type === "badge-success" ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-medium">{field.value}</span>
                    ) : field.type === "badge-accent" ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{field.value}</span>
                    ) : field.type === "score" ? (
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-accent" style={{ width: "87%" }} />
                        </div>
                        <span className="text-xs font-bold text-foreground">{field.value}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-foreground font-medium text-right max-w-[60%]">{field.value}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </MockBrowser>
          </div>
        </div>
      </section>

      {/* Decision Pipeline */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Decision Lifecycle"
            title="From intent to outcome — fully tracked"
            subtitle="Every decision moves through a structured lifecycle. Nothing skips steps. Everything is auditable."
          />
          <div className="mt-12 space-y-6 max-w-3xl mx-auto">
            {pipelineSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 group"
              >
                <div className="flex flex-col items-center">
                  <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="w-0.5 h-8 bg-border mt-2" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-muted-foreground">{item.step}</span>
                    <h3 className="text-base font-semibold text-foreground">{item.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DQS Breakdown */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="flex flex-col items-center">
                <div className="relative h-48 w-48 mb-8">
                  <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted" />
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="87 100" className="text-accent" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-foreground">87</span>
                    <span className="text-xs text-muted-foreground">DQS Score</span>
                  </div>
                </div>
                <div className="w-full max-w-sm space-y-3">
                  {dqsComponents.map((comp) => (
                    <div key={comp.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{comp.label}</span>
                        <span className="text-foreground font-medium">{comp.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${comp.pct * 2.5}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${comp.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div>
                <SectionHeader
                  eyebrow="Decision Quality Score"
                  title="Quality isn't a feeling — it's a number"
                  subtitle="DQS is a composite score measuring assumption coverage, data quality, historical accuracy, and confidence. It tells you exactly how good a decision is before you commit."
                  align="left"
                />
                <ul className="mt-6 space-y-3">
                  {[
                    "High DQS decisions execute faster with less friction",
                    "Low DQS triggers assumption review before approval",
                    "DQS improves over time as your decision history grows",
                    "Compare DQS across teams, agents, and time periods",
                  ].map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Compounding Effect */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="The Compounding Effect"
            title="Decisions get better the more you make"
            subtitle="Organizations that track decision quality improve it by an average of 34% within 6 months. The more decisions you capture, the smarter every future decision becomes."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-border bg-card p-6 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/3 rounded-full -translate-y-12 translate-x-12" />
                <div className="text-xs font-semibold text-accent mb-3">{item.period}</div>
                <div className="text-5xl font-bold text-foreground mb-2">{item.dqs}</div>
                <div className="text-xs text-muted-foreground mb-3">DQS Average</div>
                <div className="h-0.5 bg-border mb-3" />
                <div className="text-xs font-medium text-foreground mb-1">{item.assumptions}</div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </motion.div>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div className="mt-8 text-center p-6 rounded-xl border border-accent/20 bg-accent/5">
              <p className="text-lg font-semibold text-foreground">
                "Organizations that track decision quality improve it by{" "}
                <span className="text-accent">34% within 6 months.</span>"
              </p>
              <p className="text-sm text-muted-foreground mt-2">StemmQ platform data, 2024</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <CTASection />
      <MarketingFooter />
    </div>
  );
}
