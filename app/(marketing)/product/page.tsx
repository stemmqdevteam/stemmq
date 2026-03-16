import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn } from "@/components/animations/fade-in";
import { GitBranch, Target, Activity } from "lucide-react";

export const metadata: Metadata = { title: "Product" };

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

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <span className="text-sm font-medium text-accent">Product</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Decision Intelligence Infrastructure
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              StemmQ replaces ad-hoc decision-making with a structured, auditable, and
              intelligent system that helps organizations make decisions that compound.
            </p>
          </FadeIn>
        </div>
      </section>

      {sections.map((section, i) => (
        <section
          key={section.label}
          className={i % 2 === 1 ? "py-20 bg-muted/30" : "py-20"}
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction={i % 2 === 0 ? "left" : "right"}>
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

              <FadeIn direction={i % 2 === 0 ? "right" : "left"} delay={0.1}>
                <div className="rounded-xl border border-border bg-card/50 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <section.icon className="h-12 w-12 text-muted-foreground/20 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Product illustration</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      <CTASection />
      <MarketingFooter />
    </div>
  );
}
