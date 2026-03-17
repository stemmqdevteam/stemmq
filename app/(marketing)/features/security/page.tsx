"use client";

import { motion } from "framer-motion";
import {
  Shield, Lock, Eye, Key, FileText, Server, CheckCircle,
  ArrowRight, AlertTriangle, Database
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockAuditLog } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const securityPillars = [
  { icon: Lock, title: "Zero-Knowledge Architecture", desc: "Your decision data is encrypted at rest with AES-256. No StemmQ employee can read your decisions without explicit authorization." },
  { icon: FileText, title: "Immutable Decision Logs", desc: "Every decision, approval, and outcome is written to an append-only audit log. Nothing can be modified or deleted after the fact." },
  { icon: Server, title: "Data Residency Options", desc: "Choose where your data lives. US, EU, and APAC regions available. On-premise deployment for regulated industries." },
  { icon: Eye, title: "Real-Time Audit Trail", desc: "Every action — human or agent — is logged with actor, timestamp, resource, and IP. Exportable for compliance review." },
  { icon: Key, title: "Granular Permissions", desc: "Role-based access at the decision, team, and agent level. Define exactly who can propose, approve, or view each decision type." },
  { icon: Shield, title: "Agent Access Controls", desc: "Every AI agent operates within a defined permission boundary. Agents cannot escalate their own privileges or bypass the Decision Gate." },
];

const compliance = [
  { name: "SOC 2 Type II", status: "certified", icon: "✓" },
  { name: "GDPR", status: "compliant", icon: "✓" },
  { name: "HIPAA", status: "coming", icon: "→" },
  { name: "ISO 27001", status: "coming", icon: "→" },
];

const dataFlow = [
  { label: "User Input", sub: "All interfaces" },
  { label: "TLS 1.3", sub: "In-transit encryption" },
  { label: "API Gateway", sub: "Auth + rate limiting" },
  { label: "Decision Engine", sub: "Core processing" },
  { label: "AES-256 Storage", sub: "Encrypted at rest" },
  { label: "Immutable Audit Log", sub: "Append-only record" },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero - dark tone */}
      <section className="bg-primary pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent mb-6">
                <Shield className="h-3.5 w-3.5" />
                Enterprise Security
              </span>
              <h1 className="fluid-heading-1 font-bold tracking-tight text-white">
                Enterprise security.
                <br />
                <span className="gradient-text">Absolute auditability.</span>
              </h1>
              <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
                Decision infrastructure must be trustworthy. StemmQ is built on immutable logs,
                encrypted storage, and granular access controls — from day one, not as an add-on.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href={ROUTES.auth}>
                  <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                    Get Security Overview
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="gap-2 border-white/20 text-white hover:bg-white/5">
                  <FileText className="h-4 w-4" />
                  Download Trust Report
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Security Architecture */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Security Architecture"
            title="Security at every layer"
            subtitle="StemmQ was designed security-first. Every decision in the system is protected by multiple overlapping security controls."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityPillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <pillar.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Trail */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right" delay={0.1}>
              <MockAuditLog />
            </FadeIn>

            <FadeIn direction="left">
              <div>
                <SectionHeader
                  eyebrow="Audit Trail"
                  title="Every action. Permanent record."
                  subtitle="Immutable audit logs capture who did what, when, from where — including every AI agent action and human approval. Nothing is retroactively editable."
                  align="left"
                />
                <ul className="mt-6 space-y-3">
                  {[
                    "Agent proposal → Gate evaluation → Approval → Execution, all linked in one chain",
                    "Human reviewer actions logged as immutable decision metadata",
                    "Exportable audit reports in CSV, JSON, or compliance PDF",
                    "API access to query audit history programmatically",
                    "Retention policies configurable per compliance requirement",
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

      {/* Compliance */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Compliance"
            title="Built for regulated industries"
            subtitle="StemmQ's audit infrastructure is designed to satisfy the most demanding compliance requirements."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {compliance.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-xl border p-5 text-center ${cert.status === "certified" || cert.status === "compliant" ? "border-success/30 bg-success/5" : "border-border bg-muted/20"}`}
              >
                <div className={`text-xl mb-2 ${cert.status === "certified" || cert.status === "compliant" ? "text-success" : "text-muted-foreground"}`}>
                  {cert.icon}
                </div>
                <div className="text-sm font-semibold text-foreground">{cert.name}</div>
                <div className={`text-xs mt-1 ${cert.status === "coming" ? "text-muted-foreground" : "text-success"}`}>
                  {cert.status === "coming" ? "In progress" : cert.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Flow */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Data Flow</span>
              <h2 className="mt-2 text-3xl font-bold text-white">Your data stays yours</h2>
              <p className="mt-3 text-slate-400 max-w-lg mx-auto">Every piece of data is encrypted and protected at every stage of processing.</p>
            </div>
          </FadeIn>

          <div className="flex flex-col md:flex-row items-center justify-center gap-2 flex-wrap max-w-4xl mx-auto">
            {dataFlow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center min-w-[110px]">
                  <div className="text-xs font-semibold text-white">{step.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{step.sub}</div>
                </div>
                {i < dataFlow.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-slate-600 shrink-0 rotate-90 md:rotate-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeIn>
            <Shield className="h-12 w-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Talk to our security team</h2>
            <p className="text-muted-foreground mb-8">
              Have specific compliance requirements or need a custom deployment? Our security team
              will walk you through our architecture and answer any technical questions.
            </p>
            <Link href={ROUTES.auth}>
              <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
                Schedule a Security Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
