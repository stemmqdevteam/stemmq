import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = { title: "Features" };

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <FadeIn>
            <span className="text-sm font-medium text-accent">Features</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Everything your organization needs
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              12 interconnected modules that work together to create a complete decision intelligence system.
            </p>
          </FadeIn>
        </div>
      </section>

      <FeatureGrid />
      <CTASection />
      <MarketingFooter />
    </div>
  );
}
