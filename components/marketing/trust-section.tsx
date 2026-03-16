"use client";

import { FadeIn } from "@/components/animations/fade-in";

function TrustSection() {
  return (
    <section className="py-24 border-y border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by teams who refuse to fly blind
          </p>
        </FadeIn>

        {/* Logo strip */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16">
            {["Acme Corp", "TechFlow", "Meridian AI", "Nexus Labs", "Quantum Ops"].map(
              (name) => (
                <div
                  key={name}
                  className="flex items-center justify-center h-8 px-4 text-sm font-semibold text-muted-foreground/40"
                >
                  {name}
                </div>
              )
            )}
          </div>
        </FadeIn>

        {/* Testimonial */}
        <FadeIn delay={0.2}>
          <div className="mx-auto max-w-3xl text-center">
            <blockquote className="text-xl font-medium text-foreground leading-relaxed">
              &ldquo;StemmQ fundamentally changed how our leadership team approaches strategic decisions.
              We went from gut-feel to evidence-based decision-making in 8 weeks.
              Our assumption accuracy improved by 34%.&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="text-sm font-semibold text-foreground">Alexandra Rivera</p>
              <p className="text-sm text-muted-foreground">VP of Strategy, TechFlow</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export { TrustSection };
