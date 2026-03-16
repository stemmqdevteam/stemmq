"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { FadeIn } from "@/components/animations/fade-in";

function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Ready to make decisions that{" "}
            <span className="gradient-text">compound?</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the organizations building strategic decision intelligence infrastructure.
            Start free, no credit card required.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={ROUTES.signup}>
              <Button variant="accent" size="lg" className="gap-2 text-base px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={ROUTES.about}>
              <Button variant="outline" size="lg" className="text-base px-8">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export { CTASection };
