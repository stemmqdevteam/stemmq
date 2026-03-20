"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  CheckCircle, XCircle, Minus, Quote, Zap, Shield, Building2,
  ArrowRight, Sparkles, Star, TrendingUp, Users, Lock, ChevronDown
} from "lucide-react";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { ROUTES } from "@/lib/constants";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════════════ */

function Orb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [-15, 15, -15], x: [-8, 8, -8] }}
      transition={{ duration: 10 + delay, repeat: Infinity, ease: "easeInOut", delay }}
      className={className}
    />
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */

const faq = [
  {
    q: "What happens when my free trial ends?",
    a: "Your workspace and data are preserved. You can upgrade anytime to continue using StemmQ, or export your data at no cost.",
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
  {
    q: "How does agent governance work on paid plans?",
    a: "All paid plans include the Decision Gate. Pro adds configurable risk thresholds. Enterprise adds custom approval workflows and SSO.",
  },
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

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    price: { monthly: 0, yearly: 0 },
    desc: "For solo founders and small teams exploring structured decisions.",
    color: "#6366f1",
    cta: "Start Free",
    ctaVariant: "outline" as const,
    badge: null,
    highlights: [
      "100 decisions / month",
      "Up to 10 team members",
      "Assumption tracking",
      "DQS scoring",
      "Decision Gate (basic)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Sparkles,
    price: { monthly: 49, yearly: 39 },
    desc: "For growing teams that need AI simulations and deeper intelligence.",
    color: "#818cf8",
    cta: "Start Pro Trial",
    ctaVariant: "accent" as const,
    badge: "Most Popular",
    highlights: [
      "Unlimited decisions",
      "Up to 50 team members",
      "Monte Carlo simulations",
      "Pattern recognition engine",
      "Configurable risk thresholds",
      "Strategy graph visualization",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    price: { monthly: null, yearly: null },
    desc: "For orgs that need custom governance, SSO, and dedicated support.",
    color: "#a855f7",
    cta: "Talk to Sales",
    ctaVariant: "outline" as const,
    badge: null,
    highlights: [
      "Unlimited everything",
      "Custom approval workflows",
      "SSO / SAML",
      "On-premise deployment",
      "Dedicated success manager",
      "Custom SLA",
    ],
  },
];

/* ═══════════════════════════════════════════════════
   CELL VALUE
═══════════════════════════════════════════════════ */

function CellValue({ value }: { value: Check }) {
  if (value === "yes")
    return (
      <div className="flex justify-center">
        <div className="h-5 w-5 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
          <CheckCircle className="h-3 w-3 text-emerald-400" />
        </div>
      </div>
    );
  if (value === "no")
    return (
      <div className="flex justify-center">
        <div className="h-5 w-5 rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
          <XCircle className="h-3 w-3 text-white/20" />
        </div>
      </div>
    );
  if (value === "partial")
    return (
      <div className="flex justify-center">
        <div className="h-5 w-5 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
          <Minus className="h-3 w-3 text-amber-400" />
        </div>
      </div>
    );
  return (
    <span className="text-[11px] font-semibold text-white/80 block text-center">
      {value}
    </span>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */

function PricingHero({ billing, setBilling }: { billing: "monthly" | "yearly"; setBilling: (v: "monthly" | "yearly") => void }) {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-32 pb-10 sm:pb-12 bg-[#030712]">
      {/* Orbs */}
      <Orb delay={0} className="absolute top-[-8%] left-[-4%] w-[440px] h-[440px] rounded-full bg-indigo-600/10 blur-[110px] pointer-events-none" />
      <Orb delay={3} className="absolute top-[-5%] right-[-4%] w-[360px] h-[360px] rounded-full bg-violet-600/8 blur-[90px] pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.8) 1px,transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Badge */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Simple, Transparent Pricing
          </span>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            Plans for every stage of{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8 0%,#6366f1 40%,#a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              decision intelligence
            </span>
          </h1>
        </Reveal>

        {/* Sub */}
        <Reveal delay={0.14}>
          <p className="text-sm sm:text-base md:text-lg text-white/45 max-w-xl mx-auto mb-8 leading-relaxed">
            Start free, scale as your decision infrastructure matures.
            Every plan includes the Decision Gate.
          </p>
        </Reveal>

        
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRICING CARDS (custom, replacing PricingCards import)
═══════════════════════════════════════════════════ */

function CustomPricingCards({ billing }: { billing: "monthly" | "yearly" }) {
  return (
    <PricingCards />
  );
}

/* ═══════════════════════════════════════════════════
   COMPARISON TABLE
═══════════════════════════════════════════════════ */

function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-16 sm:py-20 border-t border-white/6 bg-[#030712]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-4">
            Compare Plans
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Full feature comparison</h2>
          <p className="mt-2 text-sm text-white/40 max-w-sm mx-auto">Everything side by side so you can pick with confidence.</p>
        </Reveal>

        <div ref={ref} className="overflow-x-auto rounded-2xl border border-white/8 bg-white/2">
          <table className="w-full min-w-[520px]">
            {/* Header */}
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left py-4 px-4 sm:px-5 text-xs font-medium text-white/35 w-[42%]">Feature</th>
                {["Starter", "Pro", "Enterprise"].map((plan, i) => (
                  <th key={plan} className={`py-4 px-3 sm:px-4 text-center ${i === 1 ? "bg-indigo-500/8" : ""}`}>
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-xs font-bold ${i === 1 ? "text-indigo-300" : "text-white/70"}`}>{plan}</span>
                      {i === 1 && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold uppercase tracking-wider border border-indigo-500/30">
                          Popular
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {comparisonCategories.map((cat, catIdx) => (
                <>
                  {/* Category header */}
                  <tr key={cat.label + "-head"} className={catIdx > 0 ? "border-t border-white/6" : ""}>
                    <td colSpan={4} className="pt-5 pb-2 px-4 sm:px-5">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400/70">{cat.label}</span>
                    </td>
                  </tr>

                  {/* Feature rows */}
                  {cat.rows.map((row, rowIdx) => (
                    <motion.tr
                      key={row.feature}
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: (catIdx * 4 + rowIdx) * 0.03 }}
                      className="border-b border-white/4 last:border-0 hover:bg-white/2 transition-colors"
                    >
                      <td className="py-3 px-4 sm:px-5 text-[11px] sm:text-xs text-white/55">{row.feature}</td>
                      <td className="py-3 px-3 sm:px-4 text-center"><CellValue value={row.starter} /></td>
                      <td className="py-3 px-3 sm:px-4 text-center bg-indigo-500/4"><CellValue value={row.pro} /></td>
                      <td className="py-3 px-3 sm:px-4 text-center"><CellValue value={row.enterprise} /></td>
                    </motion.tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] text-white/30 px-1">
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <CheckCircle className="h-2.5 w-2.5 text-emerald-400" />
            </div>
            Included
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
              <Minus className="h-2.5 w-2.5 text-amber-400" />
            </div>
            Limited
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-4 rounded-full bg-white/4 border border-white/8 flex items-center justify-center">
              <XCircle className="h-2.5 w-2.5 text-white/20" />
            </div>
            Not included
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   TRUST TESTIMONIAL
═══════════════════════════════════════════════════ */

function TrustTestimonial() {
  return (
    <section className="py-14 sm:py-16 border-y border-white/6 bg-white/[0.015]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/8 to-violet-500/5 p-6 sm:p-8 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote icon */}
            <Quote className="h-7 w-7 text-indigo-400/30 mb-3" />

            <blockquote className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-6 relative">
              "We evaluated five decision intelligence platforms. StemmQ was the only one that could
              govern our AI agents and give us a complete audit trail. The ROI was obvious within 60 days."
            </blockquote>

            <div className="flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)" }}
              >
                DL
              </div>
              <div>
                <p className="text-sm font-semibold text-white">David Lee</p>
                <p className="text-xs text-white/40">CTO · Series C Enterprise SaaS</p>
              </div>
              <div className="ml-auto flex-shrink-0">
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  ROI in 60 days
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ ACCORDION
═══════════════════════════════════════════════════ */

function FAQItem({ item, i }: { item: (typeof faq)[0]; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={i * 0.05}>
      <motion.div
        className={`rounded-xl border transition-all cursor-pointer overflow-hidden ${
          open ? "border-indigo-500/30 bg-indigo-500/5" : "border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/3"
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4">
          <h3 className="text-xs sm:text-sm font-semibold text-white/85 leading-snug">{item.q}</h3>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0"
          >
            <ChevronDown className={`h-4 w-4 transition-colors ${open ? "text-indigo-400" : "text-white/30"}`} />
          </motion.div>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 sm:px-5 pb-4">
                <div className="h-px bg-indigo-500/15 mb-4" />
                <p className="text-xs sm:text-sm text-white/50 leading-relaxed">{item.a}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}

function FAQSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#030712]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-4">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Frequently asked questions</h2>
          <p className="mt-2 text-sm text-white/40">Can't find what you need?{" "}
            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">Drop us a line →</a>
          </p>
        </Reveal>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <FAQItem key={item.q} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   BOTTOM CTA
═══════════════════════════════════════════════════ */

function BottomCTA() {
  return (
    <section className="py-16 sm:py-20 border-t border-white/6 bg-[#030712] relative overflow-hidden">
      <Orb delay={1} className="absolute inset-0 m-auto w-[500px] h-[300px] rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Reveal>
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/8 to-violet-500/5 p-8 sm:p-12">
            <div className="flex justify-center gap-2 mb-5">
              {[TrendingUp, Shield, Users].map((Icon, i) => (
                <div key={i} className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-white/40" />
                </div>
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
              Start making decisions that{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#818cf8,#6366f1,#a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                compound
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/45 max-w-md mx-auto mb-8">
              Join 2,400+ enterprise teams using StemmQ to build decision infrastructure that gets smarter over time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={ROUTES.auth}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-xl shadow-indigo-500/25 w-full sm:w-auto justify-center"
                  style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </motion.button>
              </Link>
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white/65 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto justify-center"
                >
                  Talk to Sales
                </motion.button>
              </a>
            </div>
            <p className="mt-4 text-[11px] text-white/25">No credit card required · 14-day Pro trial · Cancel anytime</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */

export default function PricingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-[#030712]">
      <MarketingHeader />
      <PricingHero billing={billing} setBilling={setBilling} />
      <CustomPricingCards billing={billing} />
      <ComparisonTable />
      <TrustTestimonial />
      <FAQSection />
      <BottomCTA />
      <MarketingFooter />
    </div>
  );
}