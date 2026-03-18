"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Star, TrendingUp, Users, Zap, Award } from "lucide-react";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const logos = [
  { name: "Acme Corp", abbr: "AC" },
  { name: "TechFlow", abbr: "TF" },
  { name: "Meridian AI", abbr: "MA" },
  { name: "Nexus Labs", abbr: "NL" },
  { name: "Quantum Ops", abbr: "QO" },
  { name: "Stratos", abbr: "ST" },
];

const stats = [
  { icon: TrendingUp, value: "34%", label: "avg assumption accuracy lift", color: "#6366f1" },
  { icon: Users, value: "2,400+", label: "enterprise teams onboarded", color: "#8b5cf6" },
  { icon: Zap, value: "8 wks", label: "avg time to first insight", color: "#3b82f6" },
  { icon: Award, value: "97%", label: "decision confidence score", color: "#a855f7" },
];

const testimonials = [
  {
    quote:
      "StemmQ fundamentally changed how our leadership team approaches strategic decisions. We went from gut-feel to evidence-based in 8 weeks.",
    author: "Alexandra Rivera",
    role: "VP of Strategy",
    company: "TechFlow",
    stat: "+34% accuracy",
    avatar: "AR",
    color: "#6366f1",
  },
  {
    quote:
      "The assumption tracking alone saved us from two major strategic missteps in Q3. I can't imagine running a roadmap without it now.",
    author: "Marcus Osei",
    role: "Chief Product Officer",
    company: "Meridian AI",
    stat: "2 pivots avoided",
    avatar: "MO",
    color: "#8b5cf6",
  },
  {
    quote:
      "Our board meetings are completely different now. Every decision comes with a DQS score and a full assumption log. It's like night and day.",
    author: "Priya Nair",
    role: "CEO & Co-founder",
    company: "Nexus Labs",
    stat: "DQS 91.2",
    avatar: "PN",
    color: "#3b82f6",
  },
];

/* ─────────────────────────────────────────────
   Animated counter
───────────────────────────────────────────── */
function AnimatedStat({ value, label, icon: Icon, color }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative flex flex-col items-center gap-2 p-6 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15 transition-all group"
    >
      {/* glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}18, transparent 70%)` }}
      />
      <div
        className="relative h-10 w-10 rounded-xl flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <p className="relative text-2xl sm:text-3xl font-bold text-white tabular-nums">{value}</p>
      <p className="relative text-[11px] text-white/40 text-center leading-snug">{label}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Testimonial card
───────────────────────────────────────────── */
function TestimonialCard({
  t,
  active,
  onClick,
}: {
  t: (typeof testimonials)[0];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      animate={{ scale: active ? 1 : 0.97, opacity: active ? 1 : 0.55 }}
      transition={{ duration: 0.3 }}
      className={`relative rounded-2xl border p-5 sm:p-6 cursor-pointer transition-colors ${
        active
          ? "border-indigo-500/40 bg-indigo-500/8"
          : "border-white/8 bg-white/3 hover:border-white/15"
      }`}
    >
      {active && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none" />
      )}

      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote mark */}
      <Quote className="h-6 w-6 text-indigo-400/40 mb-2" />

      <p className="text-sm text-white/70 leading-relaxed mb-5">{t.quote}</p>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{t.author}</p>
          <p className="text-[10px] text-white/40 truncate">
            {t.role} · {t.company}
          </p>
        </div>
        {/* Stat pill */}
        <span
          className="ml-auto flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{ background: `${t.color}20`, color: t.color, border: `1px solid ${t.color}30` }}
        >
          {t.stat}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main Section
───────────────────────────────────────────── */
function TrustSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-[#030712] border-y border-white/6"
    >
      {/* Ambient background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 px-4 py-1.5 text-xs font-medium text-indigo-300 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Proven Results
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
            Trusted by teams who refuse{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              to fly blind
            </span>
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/40 max-w-xs sm:max-w-md mx-auto leading-relaxed">
            From seed-stage startups to Fortune 500 boardrooms — decisions made with StemmQ compound.
          </p>
        </motion.div>

        {/* ── Logo Strip — infinite marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative mb-14 sm:mb-20 overflow-hidden"
        >
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

          {/* Marquee track — duplicated for seamless loop */}
          <div className="flex overflow-hidden">
            <motion.div
              className="flex items-center gap-6 sm:gap-10 flex-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              style={{ willChange: "transform" }}
            >
              {/* render twice for seamless loop */}
              {[...logos, ...logos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0 group cursor-default select-none"
                >
                  {/* monogram chip */}
                  <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-md sm:rounded-lg bg-white/8 border border-white/10 flex items-center justify-center text-[8px] sm:text-[10px] font-bold text-white/50 group-hover:border-indigo-500/40 group-hover:text-indigo-300 transition-all flex-shrink-0">
                    {logo.abbr}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-white/25 group-hover:text-white/55 transition-colors whitespace-nowrap">
                    {logo.name}
                  </span>
                  {/* dot separator */}
                  <span className="ml-4 sm:ml-6 h-1 w-1 rounded-full bg-white/10 flex-shrink-0" />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14 sm:mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.08 }}
            >
              <AnimatedStat {...s} />
            </motion.div>
          ))}
        </div>

        {/* ── Testimonials ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 + i * 0.1 }}
            >
              <TestimonialCard
                t={t}
                active={activeIdx === i}
                onClick={() => setActiveIdx(i)}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Dot nav (mobile-friendly) ── */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                activeIdx === i ? "w-6 bg-indigo-400" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

export { TrustSection };