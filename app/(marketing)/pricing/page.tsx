import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = { title: "Pricing" };

const faq = [
  {
    q: "What happens when my free trial ends?",
    a: "Your workspace and data are preserved. You can upgrade anytime to continue using StemmQ, or export your data.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. Upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards and can arrange invoicing for Enterprise plans.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. All plans include free setup, onboarding guidance, and migration support.",
  },
  {
    q: "Do you offer discounts for nonprofits or education?",
    a: "Yes. Contact us for special pricing for qualified nonprofit organizations and educational institutions.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <span className="text-sm font-medium text-accent">Pricing</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Plans for every stage
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, scale as your decision intelligence matures.
            </p>
          </FadeIn>
        </div>
      </section>

      <PricingCards />

      {/* FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground text-center mb-12">
              Frequently asked questions
            </h2>
          </FadeIn>
          <div className="space-y-6">
            {faq.map((item) => (
              <FadeIn key={item.q}>
                <div className="rounded-xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold text-card-foreground">{item.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
