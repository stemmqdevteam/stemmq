import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";
import {
  Globe, DollarSign, BookOpen, Heart, Clock, Target,
  ArrowRight, MapPin, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

const benefits = [
  { icon: Globe, title: "Remote-first", desc: "Work from anywhere. Async by default, synchronous when it matters." },
  { icon: DollarSign, title: "Equity for all", desc: "Every full-time hire receives meaningful equity. We succeed together." },
  { icon: BookOpen, title: "$3,000 learning budget", desc: "Annual stipend for courses, conferences, books, and tools." },
  { icon: Heart, title: "Full healthcare", desc: "Medical, dental, and vision covered 100% for you and dependents." },
  { icon: Clock, title: "Flexible hours", desc: "Own your schedule. We measure output, not hours online." },
  { icon: Target, title: "Mission-driven", desc: "We're building infrastructure that changes how organizations think." },
];

const openRoles = [
  {
    dept: "Engineering",
    roles: [
      { title: "Staff Software Engineer — Decision Engine", location: "Remote", type: "Full-time" },
      { title: "Senior Backend Engineer — Agent Infrastructure", location: "Remote", type: "Full-time" },
      { title: "ML Engineer — Pattern Recognition", location: "Remote", type: "Full-time" },
    ],
  },
  {
    dept: "Product",
    roles: [
      { title: "Senior Product Manager — AI Governance", location: "Remote", type: "Full-time" },
      { title: "Product Designer — Decision Interfaces", location: "Remote", type: "Full-time" },
    ],
  },
  {
    dept: "Go-to-Market",
    roles: [
      { title: "Enterprise Account Executive", location: "Remote / NYC", type: "Full-time" },
      { title: "Solutions Engineer — Enterprise", location: "Remote", type: "Full-time" },
      { title: "Content Marketing Manager", location: "Remote", type: "Full-time" },
    ],
  },
  {
    dept: "Operations",
    roles: [
      { title: "Legal Counsel — Privacy & AI Compliance", location: "Remote / SF", type: "Full-time" },
    ],
  },
];

const interviewSteps = [
  { step: "01", title: "Application Review", desc: "We review within 5 business days. No automated screeners." },
  { step: "02", title: "Async Screen", desc: "30-minute async video or written response. No scheduling friction." },
  { step: "03", title: "Role Interview", desc: "Deep-dive on skills and approach with your direct team." },
  { step: "04", title: "Team Interview", desc: "Meet 2–3 cross-functional team members. Culture and values." },
  { step: "05", title: "Offer", desc: "Transparent offer with full equity and compensation breakdown." },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <FadeIn>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">Careers</span>
            <h1 className="mt-3 fluid-heading-1 font-bold tracking-tight text-foreground">
              Build the future of{" "}
              <span className="gradient-text">decision intelligence</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a small, focused team building infrastructure that changes how organizations think and decide.
              Every person here owns a meaningful piece of that work.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">18</div>
                <div className="text-xs text-muted-foreground">Team members</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground">Remote</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why StemmQ */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Why StemmQ"
            title="We treat our people like we treat decisions"
            subtitle="With structure, transparency, and a commitment to getting better over time."
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, i) => (
              <div key={benefit.title} className="rounded-xl border border-border bg-card p-6 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <benefit.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Open Roles"
            title={`${openRoles.reduce((acc, d) => acc + d.roles.length, 0)} open positions`}
            subtitle="We hire for slope, not just current ability. If you're curious and care deeply about the problem, apply."
          />

          <div className="mt-10 space-y-8">
            {openRoles.map((dept) => (
              <div key={dept.dept}>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="h-3.5 w-3.5 text-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{dept.dept}</span>
                </div>
                <div className="space-y-2">
                  {dept.roles.map((role, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-sm transition-all group">
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                          {role.title}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {role.location}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {role.type}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0 ml-4">
                        Apply <ArrowRight className="h-3.5 w-3.5 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interview Process */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeader
            eyebrow="Interview Process"
            title="Transparent from the start"
            subtitle="We respect your time. Our process is structured, async-friendly, and designed to give you as much signal as you give us."
          />

          <div className="mt-10 space-y-0">
            {interviewSteps.map((step, i) => (
              <div key={step.step} className="flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="h-9 w-9 rounded-xl bg-accent/10 flex items-center justify-center text-sm font-bold text-accent shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                    {step.step}
                  </div>
                  {i < interviewSteps.length - 1 && <div className="w-0.5 h-8 bg-border mt-1" />}
                </div>
                <div className="pb-6">
                  <div className="text-sm font-semibold text-foreground mb-1">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-foreground mb-4">Don't see your role?</h2>
            <p className="text-muted-foreground mb-8">
              We're always interested in meeting exceptional people. If you believe in what we're building,
              send us a note — we'd love to hear from you.
            </p>
            <Button variant="accent" size="lg" className="gap-2 shadow-lg shadow-accent/20">
              Send us a note
              <ArrowRight className="h-4 w-4" />
            </Button>
          </FadeIn>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
