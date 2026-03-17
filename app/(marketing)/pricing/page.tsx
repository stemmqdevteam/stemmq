"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle, Minus, Quote } from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";

const faq = [
  { q: "What happens when my free trial ends?", a: "Your workspace and data are preserved. You can upgrade anytime to continue using StemmQ, or export your data at no cost." },
  { q: "Can I change plans later?", a: "Absolutely. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards and can arrange invoicing for Enterprise plans." },
  { q: "Is there a setup fee?", a: "No. All plans include free setup, onboarding guidance, and migration support." },
  { q: "Do you offer discounts for nonprofits or education?", a: "Yes. Contact us for special pricing for qualified nonprofit organizations and educational institutions." },
  { q: "How does agent governance work on paid plans?", a: "All paid plans include the Decision Gate. Pro adds configurable risk thresholds. Enterprise adds custom approval workflows and SSO." },
];

type Check = "yes" | "no" | "partial" | string;

const comparisonCategories = [
  {
    label: "Core",
    rows: [
      { feature: "Decisions per month", starter: "100", pro: "Unlimited", enterprise: "Unlimited" },
      { feature: "Team members", starter: "10", pro: "50", enterprise: "Unlimited" },
      { feature: "Assumption tracking", starter: "yes", pro: "yes", enterprise: "yes" },
      { feature: "Decision Quality Score (DQS)", starter: "yes", pro: "yes", enterprise: "yes" },
    ],
  },
  {
    label: "Intelligence",
    rows: [
      { feature: "AI-powered simulations", starter: "no", pro: "yes", enterprise: "yes" },
      { feature: "Pattern recognition engine", starter: "no", pro: "yes", enterprise: "yes" },
      { feature: "Strategy graph visualization", starter: "no", pro: "yes", enterprise: "yes" },
      { feature: "Document intelligence", starter: "no", pro: "yes", enterprise: "yes" },
    ],
  },
  {
    label: "AI Governance",
    rows: [
      { feature: "Agent governance (Decision Gate)", starter: "partial", pro: "yes", enterprise: "yes" },
      { feature: "Configurable risk thresholds", starter: "no", pro: "yes", enterprise: "yes" },
      { feature: "Human-in-the-loop controls", starter: "no", pro: "yes", enterprise: "yes" },
      { feature: "Custom approval workflows", starter: "no", pro: "no", enterprise: "yes" },
    ],
  },
  {
    label: "Enterprise",
    rows: [
      { feature: "SSO / SAML", starter: "no", pro: "no", enterprise: "yes" },
      { feature: "On-premise deployment", starter: "no", pro: "no", enterprise: "yes" },
      { feature: "Dedicated success manager", starter: "no", pro: "no", enterprise: "yes" },
      { feature: "Custom SLA", starter: "no", pro: "no", enterprise: "yes" },
      { feature: "Audit log export", starter: "no", pro: "partial", enterprise: "yes" },
    ],
  },
];

function CellValue({ value }: { value: Check }) {
  if (value === "yes") return <CheckCircle className="h-4 w-4 text-success mx-auto" />;
  if (value === "no") return <XCircle className="h-4 w-4 text-muted-foreground/40 mx-auto" />;
  if (value === "partial") return <Minus className="h-4 w-4 text-warning mx-auto" />;
  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Pricing</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Plans for every stage of{" "}
              <span className="gradient-text">decision intelligence</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as your decision infrastructure matures.
              Every plan includes the Decision Gate.
            </p>
          </FadeIn>
        </div>
      </section>

      <PricingCards />

      {/* Comparison Table */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Compare Plans"
            title="Full feature comparison"
          />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left py-3 pr-6 text-sm font-medium text-muted-foreground w-[40%]">Feature</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-foreground">Starter</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-accent bg-accent/5 rounded-t-lg">Pro</th>
                  <th className="py-3 px-4 text-center text-sm font-semibold text-foreground">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonCategories.map((cat) => (
                  <>
                    <tr key={cat.label + "-header"}>
                      <td colSpan={4} className="pt-6 pb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {cat.label}
                        </span>
                      </td>
                    </tr>
                    {cat.rows.map((row, i) => (
                      <motion.tr
                        key={row.feature}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-3 pr-6 text-sm text-foreground">{row.feature}</td>
                        <td className="py-3 px-4 text-center"><CellValue value={row.starter} /></td>
                        <td className="py-3 px-4 text-center bg-accent/3"><CellValue value={row.pro} /></td>
                        <td className="py-3 px-4 text-center"><CellValue value={row.enterprise} /></td>
                      </motion.tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-success" /> Included</div>
            <div className="flex items-center gap-1"><Minus className="h-3.5 w-3.5 text-warning" /> Limited</div>
            <div className="flex items-center gap-1"><XCircle className="h-3.5 w-3.5 text-muted-foreground/40" /> Not included</div>
          </div>
        </div>
      </section>

      {/* Trust Signal */}
      <section className="py-16 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-8 relative">
            <Quote className="h-8 w-8 text-accent/20 mb-4" />
            <p className="text-lg text-foreground leading-relaxed mb-6">
              "We evaluated five decision intelligence platforms. StemmQ was the only one that could govern our AI agents
              and give us a complete audit trail. The ROI was obvious within 60 days."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-sm font-bold text-accent">DL</span>
              </div>
              <div>
                <div className="font-semibold text-foreground">David Lee</div>
                <div className="text-sm text-muted-foreground">CTO · Series C Enterprise SaaS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently asked questions"
          />
          <div className="mt-10 space-y-4">
            {faq.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-sm transition-shadow"
              >
                <h3 className="text-sm font-semibold text-foreground mb-2">{item.q}</h3>
                <p className="text-sm text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
