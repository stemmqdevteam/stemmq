"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Webhook, Database, Bot, Globe, ArrowRight,
  CheckCircle, Plug, Shield, Zap
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { EnterpriseSection } from "@/components/marketing/enterprise-section";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { MockBrowser, MockFlowDiagram } from "@/components/marketing/mock-ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = [
  { id: "api", label: "REST API", icon: Code2 },
  { id: "webhooks", label: "Webhooks", icon: Webhook },
  { id: "crm", label: "CRM", icon: Database },
  { id: "agents", label: "External Agents", icon: Bot },
];

const categoryContent = {
  api: {
    title: "API-First Architecture",
    desc: "Every StemmQ capability is available via REST API. Create decisions, query assumptions, trigger simulations, and manage agents programmatically.",
    features: ["Full REST API with OpenAPI 3.0 spec", "Rate limiting with burst support", "JWT + API key authentication", "Sandbox environment included"],
    code: `POST /v1/decisions
Authorization: Bearer sk_live_...

{
  "title": "Launch EMEA market expansion",
  "intent": "Growth",
  "owner": "sarah@company.com",
  "assumptions": [
    { "text": "TAM > $50M", "weight": 5 },
    { "text": "6-month ramp time", "weight": 3 }
  ]
}

→ 201 Created
{
  "id": "dec_abc123",
  "dqs": 74,
  "status": "active"
}`,
  },
  webhooks: {
    title: "Real-Time Webhook Events",
    desc: "Subscribe to any StemmQ event and trigger your own workflows. Every decision lifecycle event fires a signed webhook payload.",
    features: ["HMAC-SHA256 signed payloads", "Retry logic with exponential backoff", "Event filtering by type and risk level", "Webhook delivery logs in dashboard"],
    events: [
      { event: "decision.created", trigger: "New decision object created" },
      { event: "decision.gate.triggered", trigger: "Decision Gate review required" },
      { event: "decision.approved", trigger: "Decision approved for execution" },
      { event: "agent.proposal.pending", trigger: "Agent awaiting human approval" },
      { event: "assumption.invalidated", trigger: "Assumption marked as false" },
      { event: "outcome.logged", trigger: "Outcome tracking entry created" },
    ],
  },
  crm: {
    title: "CRM Validation Layer",
    desc: "Cross-reference strategic decisions against real customer data. Connect your CRM to validate assumptions with ground truth.",
    features: ["Salesforce, HubSpot, Pipedrive support", "Automated assumption validation against CRM data", "Decision-to-customer outcome mapping", "Revenue impact attribution"],
    integrations: ["Salesforce", "HubSpot", "Pipedrive", "Intercom", "Segment", "Amplitude"],
  },
  agents: {
    title: "External Agent Gateway",
    desc: "Connect any third-party AI agent — GPT, Claude, custom models — to StemmQ's Decision Gate. All external actions become governed decision objects.",
    features: ["Webhook receiver for agent actions", "Passive observation mode (detect + convert)", "SDKs for Node.js, Python, Go", "OpenAI and Anthropic function calling support"],
    code: `# Connect an external agent action
POST /v1/external-agent/decision
X-Agent-ID: agent_pricing_gpt4

{
  "agent_name": "GPT-4 Pricing Agent",
  "proposed_action": "Set Q4 price to $149",
  "reasoning": "Competitor analysis shows...",
  "confidence": 0.81
}

→ Decision Gate evaluates
→ Returns: approved | revise | escalate | reject`,
  },
};

const integrationLogos = [
  "Salesforce", "HubSpot", "Slack", "Notion", "Zapier", "OpenAI",
  "Anthropic", "Stripe", "Segment", "Amplitude", "Linear", "Jira",
  "GitHub", "Datadog", "Snowflake", "dbt",
];

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof categoryContent>("api");
  const content = categoryContent[activeTab];

  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Integrations</span>
              <h1 className="mt-3 fluid-heading-1 font-bold tracking-tight text-foreground">
                Connect StemmQ to your{" "}
                <span className="gradient-text">entire stack</span>
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                StemmQ sits at the intelligence layer — not the execution layer. Connect your existing tools and let every action become a governed decision.
              </p>
            </div>
          </FadeIn>

          {/* Logo grid */}
          <div className="mt-12 grid grid-cols-4 sm:grid-cols-8 gap-3 max-w-4xl mx-auto">
            {integrationLogos.map((name, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-border bg-card p-3 flex items-center justify-center hover:border-accent/30 hover:shadow-sm transition-all group"
              >
                <div className="text-center">
                  <div className="h-8 w-8 rounded-lg bg-muted/50 mx-auto mb-1 group-hover:bg-accent/10 transition-colors" />
                  <span className="text-[9px] text-muted-foreground">{name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Integration Types"
            title="Every connection goes through the Decision Gate"
          />

          {/* Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as keyof typeof categoryContent)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  activeTab === cat.id
                    ? "bg-accent text-white border-accent"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40"
                )}
              >
                <cat.icon className="h-3.5 w-3.5" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{content.title}</h3>
              <p className="text-muted-foreground mb-6">{content.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {content.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              {(activeTab === "crm") && "integrations" in content && (
                <div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Supported CRMs</div>
                  <div className="flex flex-wrap gap-2">
                    {(content as typeof categoryContent.crm).integrations.map((name) => (
                      <span key={name} className="px-3 py-1.5 rounded-lg border border-border bg-card text-sm text-foreground font-medium">{name}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              {"code" in content && (
                <div className="rounded-xl border border-border bg-primary overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-danger/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-success/60" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">terminal</span>
                  </div>
                  <pre className="p-4 text-[11px] leading-relaxed text-slate-300 font-mono overflow-x-auto">
                    <code>{(content as { code: string }).code}</code>
                  </pre>
                </div>
              )}
              {"events" in content && (
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/30">
                    <span className="text-xs font-semibold text-foreground">Webhook Events</span>
                  </div>
                  <div className="divide-y divide-border">
                    {(content as typeof categoryContent.webhooks).events.map((e) => (
                      <div key={e.event} className="px-4 py-3 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <code className="text-[11px] font-mono text-accent">{e.event}</code>
                        <span className="text-[11px] text-muted-foreground">{e.trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* External Agent Flow */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="External Agents"
            title="Any agent. One Decision Gate."
            subtitle="Whether you're running GPT-4, Claude, a custom model, or a third-party AI platform — all actions route through StemmQ's Decision Gate before execution."
          />

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
              {[
                { label: "External Agent", sub: "GPT-4, Claude, Custom", color: "border-purple-500/40 bg-purple-500/5 text-purple-500" },
                null,
                { label: "Decision Gate", sub: "Risk eval + approval", color: "border-warning/40 bg-warning/5 text-warning" },
                null,
                { label: "Execution", sub: "Only if approved", color: "border-success/40 bg-success/5 text-success" },
              ].map((item, i) => (
                item === null ? (
                  <ArrowRight key={i} className="h-5 w-5 text-muted-foreground mx-auto rotate-90 sm:rotate-0" />
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`rounded-xl border p-5 text-center ${item.color}`}
                  >
                    <div className="font-semibold text-sm mb-1">{item.label}</div>
                    <div className="text-[11px] opacity-70">{item.sub}</div>
                  </motion.div>
                )
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl border border-accent/20 bg-accent/5 text-center">
              <Plug className="h-5 w-5 text-accent mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                Connect any agent via <code className="text-accent">POST /v1/external-agent/decision</code> or passive observation mode
              </p>
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
