import type { Metadata } from "next";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { CTASection } from "@/components/marketing/cta-section";
import { FadeIn } from "@/components/animations/fade-in";

export const metadata: Metadata = { title: "About" };

const teamMembers = [
  { name: "Alex Morgan", role: "CEO & Co-founder", initials: "AM" },
  { name: "Jordan Lee", role: "CTO & Co-founder", initials: "JL" },
  { name: "Sam Patel", role: "Head of Product", initials: "SP" },
  { name: "Taylor Kim", role: "Head of Engineering", initials: "TK" },
  { name: "Riley Chen", role: "Head of Design", initials: "RC" },
  { name: "Casey Zhang", role: "Head of Growth", initials: "CZ" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-3xl">
            <FadeIn>
              <span className="text-sm font-medium text-accent">About</span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                We believe decisions should be an asset, not a liability.
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

      {/* Mission */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To give every organization the infrastructure to make strategic decisions
                  that are structured, traceable, and continuously improving.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="right">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A world where no critical assumption goes unexamined, no strategic decision
                  is made without context, and organizational knowledge compounds rather than decays.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Decision Intelligence */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6">
          <FadeIn>
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Why Decision Intelligence?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every company has a strategy. Few companies have a system for evaluating whether their
                strategy is working. Even fewer can trace the assumptions behind their decisions and
                learn from them systematically.
              </p>
              <p>
                As AI agents become more prevalent in organizations, the need for decision governance
                becomes critical. Who approved this? What assumptions drove it? What was the expected
                outcome? Without infrastructure, these questions are unanswerable.
              </p>
              <p>
                Decision Intelligence is the discipline of treating organizational decision-making
                as a first-class engineering problem. StemmQ is the platform that makes it practical.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground">Our Team</h2>
            <p className="mt-2 text-muted-foreground">The people building StemmQ.</p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <FadeIn key={member.name}>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold text-lg mb-3">
                    {member.initials}
                  </div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <MarketingFooter />
    </div>
  );
}
