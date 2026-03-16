"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS, ROUTES } from "@/lib/constants";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";

function PricingCards() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Scale as your decision intelligence matures.
          </p>

          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={cn("text-sm font-medium", !annual ? "text-foreground" : "text-muted-foreground")}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                annual ? "bg-accent" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform shadow-sm",
                  annual && "translate-x-5"
                )}
              />
            </button>
            <span className={cn("text-sm font-medium", annual ? "text-foreground" : "text-muted-foreground")}>
              Annual
              <span className="ml-1.5 text-xs text-accent font-semibold">Save 20%</span>
            </span>
          </div>
        </FadeIn>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_TIERS.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={cn(
                  "relative rounded-xl border p-8 flex flex-col h-full",
                  tier.highlighted
                    ? "border-accent bg-card shadow-lg shadow-accent/5 scale-105"
                    : "border-border bg-card"
                )}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full gradient-bg px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-card-foreground">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-card-foreground">
                    {annual ? tier.annualPrice : tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-sm text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{tier.description}</p>
                <ul className="mt-8 space-y-3 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={tier.price === "Custom" ? ROUTES.about : ROUTES.signup} className="mt-8">
                  <Button
                    variant={tier.highlighted ? "accent" : "outline"}
                    className="w-full"
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

export { PricingCards };
