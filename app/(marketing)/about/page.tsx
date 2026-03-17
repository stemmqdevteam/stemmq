"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Target, Brain, Layers } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { AnimatedGradient } from "@/components/animations/animated-gradient";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";

const teamMembers = [
  { name: "Alex Morgan", role: "CEO & Co-founder", initials: "AM", bg: "bg-accent/10 text-accent" },
  { name: "Jordan Lee", role: "CTO & Co-founder", initials: "JL", bg: "bg-purple-500/10 text-purple-500" },
  { name: "Sam Patel", role: "Head of Product", initials: "SP", bg: "bg-success/10 text-success" },
  { name: "Taylor Kim", role: "Head of Engineering", initials: "TK", bg: "bg-warning/10 text-warning" },
  { name: "Riley Chen", role: "Head of Design", initials: "RC", bg: "bg-blue-500/10 text-blue-500" },
  { name: "Casey Zhang", role: "Head of Growth", initials: "CZ", bg: "bg-danger/10 text-danger" },
];

const orgStats = [
  { value: "2023", label: "Founded" },
  { value: "18", label: "Team members" },
  { value: "12", label: "Modules built" },
  { value: "SOC 2", label: "Certified" },
];

const principles = [
  {
    icon: Target,
    title: "Decisions over opinions",
    desc: "Every strategic direction at StemmQ is a Structured Decision Object — with owner, assumptions, and DQS. We eat our own cooking.",
  },
  {
    icon: Brain,
    title: "Infrastructure over process",
    desc: "Process documents get forgotten. Infrastructure runs whether you remember to use it or not. We build the latter.",
  },
  {
    icon: Layers,
    title: "Transparency over assumption",
    desc: "We make our assumptions explicit. In product decisions, company strategy, and how we work with our team.",
  },
];

const beforeAfter = {
  before: [
    "Strategic decisions made in Slack threads",
    "Assumptions buried in decks, never validated",
    "AI agents act without governance or audit trail",
    "Leadership transitions destroy institutional memory",
    "No way to know which decisions actually worked",
  ],
  after: [
    "Every decision is a Structured Decision Object",
    "Assumptions tracked, weighted, and validated over time",
    "Every agent action goes through the Decision Gate",
    "Institutional memory preserved and queryable forever",
    "Outcome tracking reveals which decisions drove results",
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AnimatedGradient intensity="low" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">About StemmQ</span>
              <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
                We believe decisions should be an asset,{" "}
                <span className="gradient-text">not a liability.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                StemmQ was founded on a simple observation: organizations invest heavily in data
                infrastructure, product infrastructure, and engineering infrastructure — but leave
                the most consequential thing they do to chance. Decision-making.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 gradient-mesh border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {orgStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="py-20 bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="left">
              <div className="p-8 rounded-2xl border border-border bg-card">
                <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To give every organization the infrastructure to make strategic decisions
                  that are structured, traceable, and continuously improving.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div className="p-8 rounded-2xl border border-border bg-card">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                  <Brain className="h-5 w-5 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A world where no critical assumption goes unexamined, no strategic decision
                  is made without context, and organizational knowledge compounds rather than decays.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Problem We're Solving */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="The Problem"
            title="Organizations have no decision infrastructure"
            subtitle="Every company has data infrastructure. Most have engineering infrastructure. Almost none have decision infrastructure — the system that governs how choices are made, tracked, and learned from."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-xl border border-danger/20 bg-danger/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="h-5 w-5 text-danger" />
                <span className="font-semibold text-foreground">Without StemmQ</span>
              </div>
              <div className="space-y-3">
                {beforeAfter.before.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
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

            <div className="rounded-xl border border-success/20 bg-success/5 p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-semibold text-foreground">With StemmQ</span>
              </div>
              <div className="space-y-3">
                {beforeAfter.after.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
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
          </div>
        </div>
      </section>

      {/* Our Principles */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Our Principles"
            title="How we think"
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Team"
            title="The people building StemmQ"
            subtitle="A small, focused team building infrastructure that matters."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center group"
              >
                <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full font-semibold text-lg mb-3 ${member.bg} group-hover:scale-110 transition-transform`}>
                  {member.initials}
                </div>
                <p className="text-sm font-medium text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{member.role}</p>
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
