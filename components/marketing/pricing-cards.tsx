"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  CheckCircle2, ArrowRight, Sparkles, Zap, Building2,
  Flame, Clock, Users, TrendingUp, Shield, Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";

/* ═══════════════════════════════════════════════════
   COUNTDOWN HOOK
═══════════════════════════════════════════════════ */

function useCountdown(hours = 23, minutes = 47, secs = 12) {
  const [time, setTime] = useState({ h: hours, m: minutes, s: secs });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ═══════════════════════════════════════════════════
   PLAN DATA — real SaaS market pricing
   Original prices reflect full value, slashed to show deal
═══════════════════════════════════════════════════ */

const plans = [
  {
    id: "starter",
    name: "Starter",
    icon: Zap,
    color: "#6366f1",
    badge: null,
    tag: "Free forever",
    price: {
      monthly: { original: 0, current: 0 },
      yearly: { original: 0, current: 0 },
    },
    desc: "For founders and small teams ready to make their first structured decisions.",
    cta: "Start Free — No Card",
    ctaHref: ROUTES.auth,
    highlight: false,
    popular: false,
    highlights: [
      "100 decisions / month",
      "Up to 5 team members",
      "Assumption tracking",
      "Decision Quality Score (DQS)",
      "Decision Gate (basic)",
      "7-day decision history",
    ],
    notIncluded: ["AI simulations", "Pattern recognition", "Agent governance"],
  },
  {
    id: "pro",
    name: "Pro",
    icon: Sparkles,
    color: "#818cf8",
    badge: "Most Popular",
    tag: "Best value",
    price: {
      monthly: { original: 149, current: 49 },
      yearly: { original: 119, current: 39 },
    },
    desc: "For growing teams that need AI-powered simulations and deeper decision intelligence.",
    cta: "Start 14-Day Free Trial",
    ctaHref: ROUTES.auth,
    highlight: true,
    popular: true,
    highlights: [
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
    notIncluded: ["SSO / SAML", "On-premise deployment"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    icon: Building2,
    color: "#a855f7",
    badge: null,
    tag: "Custom contract",
    price: {
      monthly: { original: null, current: null },
      yearly: { original: null, current: null },
    },
    desc: "For orgs that need custom governance, compliance, and a dedicated team.",
    cta: "Talk to Sales",
    ctaHref: "/contact",
    highlight: false,
    popular: false,
    highlights: [
      "Unlimited everything",
      "Custom approval workflows",
      "SSO / SAML authentication",
      "On-premise deployment",
      "Dedicated success manager",
      "Custom SLA (99.99% uptime)",
      "Audit log export (CSV/PDF)",
      "Invoice billing & MSA",
      "Security review & SOC 2",
    ],
    notIncluded: [],
  },
];

/* ═══════════════════════════════════════════════════
   URGENCY BANNER
═══════════════════════════════════════════════════ */

function UrgencyBanner() {
  const time = useCountdown(23, 47, 12);
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2.5 rounded-2xl border border-amber-500/25 bg-amber-500/8 px-4 sm:px-6 py-3 mb-6"
    >
      <Flame className="h-4 w-4 text-amber-400 flex-shrink-0" />
      <span className="text-xs sm:text-sm font-semibold text-amber-200">
        <span className="text-amber-400">Launch pricing ends in</span>{" "}
        <span className="font-mono text-white bg-amber-500/20 px-1.5 py-0.5 rounded-md">
          {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
        </span>
        {" "}— Pro is $100 off/mo from full price
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   SOCIAL PROOF STRIP
═══════════════════════════════════════════════════ */

function SocialProofStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-8">
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1.5">
          {["#6366f1", "#a855f7", "#10b981", "#f59e0b", "#3b82f6"].map((c, i) => (
            <div key={i} className="h-6 w-6 rounded-full border-2 border-[#030712] flex items-center justify-center text-[8px] font-bold text-white"
              style={{ background: c, zIndex: 5 - i }}>
              {["JH", "KM", "SR", "DL", "PT"][i]}
            </div>
          ))}
        </div>
        <span className="text-xs text-white/45">2,400+ teams</span>
      </div>
      <span className="text-white/15 hidden sm:block">·</span>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
        <span className="text-xs text-white/45 ml-1">4.9 / 5 (312 reviews)</span>
      </div>
      <span className="text-white/15 hidden sm:block">·</span>
      <div className="flex items-center gap-1.5 text-xs text-white/45">
        <Shield className="h-3.5 w-3.5 text-emerald-400" />
        <span>SOC 2 Type II</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PRICE DISPLAY
═══════════════════════════════════════════════════ */

function PriceDisplay({
  plan, billing,
}: {
  plan: typeof plans[0]; billing: "monthly" | "yearly";
}) {
  const priceData = plan.price[billing];

  if (priceData.current === null) {
    return (
      <div className="mb-4">
        <p className="text-2xl sm:text-3xl font-bold text-white">Custom</p>
        <p className="text-[11px] text-white/35 mt-0.5">Volume-based · Flexible contract</p>
      </div>
    );
  }

  if (priceData.current === 0) {
    return (
      <div className="mb-4">
        <p className="text-2xl sm:text-3xl font-bold text-white">Free</p>
        <p className="text-[11px] text-white/35 mt-0.5">No credit card · Free forever</p>
      </div>
    );
  }

  const saving = priceData.original! - priceData.current;

  return (
    <div className="mb-4">
      {/* Original crossed-out price */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm text-white/25 line-through font-medium">${priceData.original}/mo</span>
        <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/12 border border-emerald-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          Save ${saving}
        </span>
      </div>

      {/* Current price */}
      <div className="flex items-end gap-1.5">
        <AnimatePresence mode="wait">
          <motion.p key={priceData.current}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
            ${priceData.current}
          </motion.p>
        </AnimatePresence>
        <div className="mb-1.5">
          <p className="text-[11px] text-white/40 leading-tight">per seat</p>
          <p className="text-[11px] text-white/40 leading-tight">per month</p>
        </div>
      </div>

      {billing === "yearly" && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-[11px] text-emerald-400 font-semibold mt-1">
          Billed annually · ${priceData.current! * 12}/yr per seat
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PLAN CARD
═══════════════════════════════════════════════════ */

function PlanCard({ plan, billing, index }: {
  plan: typeof plans[0]; billing: "monthly" | "yearly"; index: number;
}) {
  const Icon = plan.icon;
  const isPro = plan.id === "pro";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isPro ? -8 : -4 }}
      className={cn(
        "relative flex flex-col rounded-2xl border overflow-hidden h-full",
        isPro
          ? "border-indigo-500/50 shadow-2xl shadow-indigo-500/20"
          : "border-white/10 hover:border-white/18"
      )}
      style={{
        background: isPro
          ? "linear-gradient(160deg, rgba(99,102,241,0.14) 0%, rgba(168,85,247,0.07) 100%)"
          : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute top-0 inset-x-0 flex justify-center z-20">
          <div className="px-5 py-1 text-[10px] font-bold text-white uppercase tracking-widest rounded-b-xl"
            style={{ background: "linear-gradient(90deg,#6366f1,#a855f7)" }}>
            {plan.badge}
          </div>
        </div>
      )}

      {/* Pro glow */}
      {isPro && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% -10%, rgba(99,102,241,0.25), transparent 55%)" }} />
      )}

      <div className={cn("relative flex flex-col flex-1 p-5 sm:p-6", plan.badge ? "pt-9" : "")}>
        {/* Plan header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center"
              style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}>
              <Icon className="h-4 w-4" style={{ color: plan.color }} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{plan.name}</p>
              <p className="text-[10px]" style={{ color: `${plan.color}cc` }}>{plan.tag}</p>
            </div>
          </div>
        </div>

        {/* Price */}
        <PriceDisplay plan={plan} billing={billing} />

        {/* Desc */}
        <p className="text-[11px] sm:text-xs text-white/45 leading-relaxed mb-5">{plan.desc}</p>

        {/* Divider */}
        <div className="h-px w-full bg-white/6 mb-5" />

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5">
              <div className="h-4 w-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                style={{ background: `${plan.color}14`, border: `1px solid ${plan.color}28` }}>
                <CheckCircle2 className="h-2.5 w-2.5" style={{ color: plan.color }} />
              </div>
              <span className="text-[11px] sm:text-xs text-white/65 leading-snug">{h}</span>
            </li>
          ))}
          {plan.notIncluded.slice(0, 2).map((h) => (
            <li key={h} className="flex items-start gap-2.5 opacity-40">
              <div className="h-4 w-4 rounded-full bg-white/4 border border-white/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                <div className="h-0.5 w-2 bg-white/30 rounded" />
              </div>
              <span className="text-[11px] sm:text-xs text-white/40 leading-snug line-through">{h}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href={plan.ctaHref}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative w-full py-3 rounded-xl text-sm font-semibold transition-all overflow-hidden group",
              isPro
                ? "text-white shadow-lg shadow-indigo-500/30"
                : "text-white/70 border border-white/12 bg-white/5 hover:bg-white/10 hover:text-white"
            )}
            style={isPro ? { background: "linear-gradient(135deg,#6366f1,#4f46e5)" } : {}}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {plan.cta}
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
            {isPro && (
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            )}
          </motion.button>
        </Link>

        {/* Sub-CTA note */}
        {isPro && (
          <p className="text-center text-[10px] text-white/25 mt-2.5">
            14-day free trial · No card needed · Cancel anytime
          </p>
        )}
        {plan.id === "starter" && (
          <p className="text-center text-[10px] text-white/25 mt-2.5">
            Free forever · No hidden limits
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */

function PricingCards() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref} className="py-16 sm:py-20 bg-[#030712]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section header */}
        <div className="text-center mb-7 sm:mb-9">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-4 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" /> Simple, Transparent Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.07 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3"
          >
            Start free.{" "}
            <span style={{ background: "linear-gradient(135deg,#818cf8 0%,#6366f1 40%,#a855f7 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Scale with confidence.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="text-sm sm:text-base text-white/40 max-w-md mx-auto mb-7"
          >
            Every plan ships with the Decision Gate. No feature paywalls on what matters most.
          </motion.p>

          {/* Social proof */}
          <SocialProofStrip />

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 }}
            className="inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/4 p-1"
          >
            {(["monthly", "yearly"] as const).map((b) => (
              <button key={b} onClick={() => setBilling(b)}
                className={cn("relative px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all", billing === b ? "text-white" : "text-white/40 hover:text-white/70")}>
                {billing === b && (
                  <motion.div layoutId="pricing-pill"
                    className="absolute inset-0 rounded-lg bg-indigo-500/25 border border-indigo-500/30"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.4 }} />
                )}
                <span className="relative z-10 capitalize">{b}</span>
                {b === "yearly" && (
                  <span className={cn("relative z-10 ml-1.5 text-[9px] font-bold rounded-full px-1.5 py-0.5", billing === "yearly" ? "bg-emerald-500/20 text-emerald-400" : "text-white/30")}>
                    −20%
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence>
            {billing === "yearly" && (
              <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                className="text-[11px] text-emerald-400 font-semibold mt-2.5">
                🎉 Saving $120/seat/yr vs monthly — that's 2 months free
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Urgency banner */}
        <UrgencyBanner />

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} index={i} />
          ))}
        </div>

        {/* Bottom trust row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10 flex flex-col items-center gap-3"
        >
          {/* Enterprise note */}
          <p className="text-xs text-white/30 text-center">
            Need a custom contract?{" "}
            <a href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2">
              Talk to our sales team
            </a>{" "}
            — most enterprise deals close in under 2 weeks.
          </p>

          {/* Guarantee strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-1">
            {[
              { icon: Shield, label: "SOC 2 Certified" },
              { icon: TrendingUp, label: "99.9% Uptime" },
              { icon: Users, label: "Cancel anytime" },
              { icon: Clock, label: "14-day free trial" },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5 text-[11px] text-white/30">
                  <Icon className="h-3.5 w-3.5 text-white/20" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export { PricingCards };