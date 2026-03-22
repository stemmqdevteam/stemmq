"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ArrowRight, Sparkles, Zap, Building2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

/* ═══════════════════════════════════════════════════
   PLAN DATA
═══════════════════════════════════════════════════ */

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    color: "#6366f1",
    recommended: false,
    price: { monthly: 0, yearly: 0 },
    unit: "per member / month",
    desc: "For individuals and small teams exploring structured decisions.",
    cta: "Sign up",
    ctaHref: ROUTES.auth,
    sectionLabel: "Includes:",
    features: [
      "100 decisions / month",
      "Up to 5 team members",
      "Assumption tracking",
      "Decision Quality Score (DQS)",
      "Decision Gate (basic)",
      "7-day decision history",
      "Email support",
    ],
    notIncluded: null,
  },
  {
    id: "pro",
    name: "Pro",
    icon: Sparkles,
    color: "#6366f1",
    recommended: false,
    price: { monthly: 16, yearly: 12 },
    unit: "per member / month",
    desc: "For growing teams that need AI simulations and deeper intelligence.",
    cta: "Get started",
    ctaHref: ROUTES.auth,
    sectionLabel: "Everything in Starter, and:",
    features: [
      "Unlimited decisions",
      "Up to 50 team members",
      "Monte Carlo simulations",
      "Pattern recognition engine",
      "Configurable risk thresholds",
      "Strategy graph visualization",
      "Document intelligence",
      "Full decision history",
      "Priority support",
    ],
    notIncluded: null,
  },
  {
    id: "business",
    name: "Business",
    icon: Shield,
    color: "#6366f1",
    recommended: true,
    price: { monthly: 28, yearly: 22 },
    unit: "per member / month",
    desc: "For organizations that need governance, AI agents, and advanced controls.",
    cta: "Get started",
    ctaHref: ROUTES.auth,
    sectionLabel: "Everything in Pro, and:",
    features: [
      "Decision Agent governance",
      "Human-in-the-loop controls",
      "Multi-agent orchestration",
      "SAML SSO",
      "Granular role permissions",
      "Audit log export (CSV / PDF)",
      "Advanced assumption calibration",
      "Compliance reporting",
      "Dedicated onboarding",
      "Priority phone support",
    ],
    notIncluded: null,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    color: "#6366f1",
    recommended: false,
    price: { monthly: null, yearly: null },
    unit: "Custom pricing",
    desc: "For enterprises that need custom governance, compliance, and a dedicated team.",
    cta: "Contact Sales",
    ctaHref: "/contact",
    sectionLabel: "Everything in Business, and:",
    features: [
      "Unlimited team members",
      "Custom approval workflows",
      "On-premise deployment",
      "Data residency (US / EU / APAC)",
      "Custom SLA (99.99% uptime)",
      "Dedicated success manager",
      "Invoice billing & MSA",
      "Security review & SOC 2",
      "Advanced integrations",
      "Custom contract terms",
    ],
    notIncluded: null,
  },
];

/* ═══════════════════════════════════════════════════
   PRICE DISPLAY
═══════════════════════════════════════════════════ */

function PriceDisplay({ plan, billing }: { plan: typeof plans[0]; billing: "monthly" | "yearly" }) {
  const current = plan.price[billing];

  if (current === null) {
    return (
      <div className="mb-4">
        <p className="text-2xl font-bold text-white">Custom pricing</p>
        <p className="text-xs text-white/35 mt-1">{plan.unit}</p>
      </div>
    );
  }

  if (current === 0) {
    return (
      <div className="mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-white">$0</span>
          <span className="text-sm text-white/40">{plan.unit}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-1.5">
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="text-3xl font-bold text-white tabular-nums"
          >
            ${current}
          </motion.span>
        </AnimatePresence>
        <span className="text-sm text-white/40">{plan.unit}</span>
      </div>
      {billing === "yearly" && (
        <p className="text-[11px] text-emerald-400 mt-1">
          Billed annually · save ${(plan.price.monthly! - current) * 12}/member/yr
        </p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PLAN CARD
═══════════════════════════════════════════════════ */

function PlanCard({ plan, billing }: { plan: typeof plans[0]; billing: "monthly" | "yearly" }) {
  const isEnterprise = plan.id === "enterprise";
  const isRecommended = plan.recommended;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border overflow-hidden h-full",
        isRecommended
          ? "border-[#6366f1]/60 bg-[#0c0f1e]"
          : "border-white/8 bg-white/[0.025]"
      )}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div
          className="absolute top-0 right-4 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-b-lg"
          style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
        >
          Recommended
        </div>
      )}

      {/* Subtle top glow for recommended */}
      {isRecommended && (
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #6366f1, transparent)" }}
        />
      )}

      <div className={cn("flex flex-col flex-1 p-5 sm:p-6", isRecommended ? "pt-7" : "")}>
        {/* Name */}
        <p className="text-sm font-bold text-white mb-3">{plan.name}</p>

        {/* Price */}
        <PriceDisplay plan={plan} billing={billing} />

        {/* Description */}
        <p className="text-xs text-white/45 leading-relaxed mb-5">{plan.desc}</p>

        {/* CTA */}
        <Link href={plan.ctaHref} className="block mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative w-full py-2.5 rounded-lg text-sm font-semibold text-center transition-all overflow-hidden group",
              isRecommended
                ? "text-white shadow-md shadow-indigo-500/25"
                : isEnterprise
                  ? "text-white/75 border border-white/12 bg-transparent hover:bg-white/6 hover:text-white"
                  : "text-[#818cf8] border border-[#6366f1]/35 bg-[#6366f1]/8 hover:bg-[#6366f1]/14"
            )}
            style={isRecommended ? { background: "linear-gradient(135deg,#6366f1,#4f46e5)" } : {}}
          >
            <span className="relative z-10">{plan.cta}</span>
            {isRecommended && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            )}
          </motion.button>
        </Link>

        {/* Divider + feature section label */}
        <div className="border-t border-white/6 pt-5">
          <p className="text-[11px] font-bold text-white/55 mb-3.5">{plan.sectionLabel}</p>

          {/* Feature list */}
          <ul className="space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <Check className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-white/60 leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */

function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-16 sm:py-24 bg-[#030712]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3"
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-sm sm:text-base text-white/40 max-w-sm mx-auto mb-8"
          >
            Start free. Scale as your decision intelligence matures.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="inline-flex items-center rounded-lg border border-white/10 bg-white/4 p-0.5 gap-0.5"
          >
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={cn(
                  "relative px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all capitalize",
                  billing === b ? "text-white" : "text-white/35 hover:text-white/65"
                )}
              >
                {billing === b && (
                  <motion.div
                    layoutId="billing-tab"
                    className="absolute inset-0 rounded-md bg-white/10 border border-white/12"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                  />
                )}
                <span className="relative z-10">{b}</span>
                {b === "yearly" && (
                  <span
                    className={cn(
                      "relative z-10 ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full",
                      billing === "yearly"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/6 text-white/30"
                    )}
                  >
                    Save 25%
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-xs text-white/25 mt-8"
        >
          All plans include the Decision Gate.{" "}
          <a href="/contact" className="text-white/45 hover:text-white/70 transition-colors underline underline-offset-2">
            Talk to sales
          </a>{" "}
          for volume discounts or custom contracts.
        </motion.p>

      </div>
    </section>
  );
}

export { PricingCards };