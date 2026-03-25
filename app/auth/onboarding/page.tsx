"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, Building2,
  Users, Target, Zap, Shield, BarChart3, Search, Bot,
  BookOpen, TrendingUp, ChevronRight,
  CheckCircle2, Loader2, Layers, CreditCard, Lightbulb,
  Plus, X
} from "lucide-react";
import Link from "next/link";
import {
  createOrganization,
  updateOrganizationConfig,
  createFirstDecision,
  completeOnboarding,
} from "./actions";
import { getPlanCookie } from "@/app/auth/actions";

/* ═══════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════ */

const TOTAL_STEPS = 5;

const TEAM_SIZES = ["1–10", "11–50", "51–200", "201–1K", "1K+"];

const INDUSTRIES = [
  { label: "Technology", icon: "💻" },
  { label: "Finance", icon: "💰" },
  { label: "Healthcare", icon: "🏥" },
  { label: "Consulting", icon: "🧠" },
  { label: "Manufacturing", icon: "🏭" },
  { label: "Government", icon: "🏛️" },
  { label: "Education", icon: "🎓" },
  { label: "Energy", icon: "⚡" },
  { label: "Retail", icon: "🛍️" },
  { label: "Other", icon: "✦" },
];

const STAGES = [
  { label: "Startup", desc: "Building product-market fit" },
  { label: "Growth", desc: "Scaling operations and team" },
  { label: "Enterprise", desc: "Mature, optimizing strategy" },
];

const STRATEGIC_GOALS = [
  { id: "revenue_growth", label: "Revenue Growth", icon: TrendingUp, color: "#6366f1" },
  { id: "market_expansion", label: "Market Expansion", icon: Target, color: "#a855f7" },
  { id: "cost_optimization", label: "Cost Optimization", icon: BarChart3, color: "#10b981" },
  { id: "product_innovation", label: "Product Innovation", icon: Lightbulb, color: "#f59e0b" },
  { id: "risk_reduction", label: "Risk Reduction", icon: Shield, color: "#ef4444" },
  { id: "operational_excellence", label: "Operational Excellence", icon: Zap, color: "#06b6d4" },
];

const DECISION_STYLES = [
  { id: "consensus", label: "Consensus-driven", desc: "Team alignment before action" },
  { id: "executive", label: "Executive-led", desc: "Top-down, fast execution" },
  { id: "data_driven", label: "Data-driven", desc: "Evidence and metrics first" },
  { id: "hybrid", label: "Hybrid", desc: "Mix of approaches" },
];

const RISK_TOLERANCES = [
  { id: "conservative", label: "Conservative", color: "#10b981" },
  { id: "moderate", label: "Moderate", color: "#f59e0b" },
  { id: "aggressive", label: "Aggressive", color: "#ef4444" },
];

const INTENTS = ["Growth", "Defense", "Efficiency", "Experiment", "Risk Mitigation"];

const STEP_META = [
  { label: "Organization", icon: Building2 },
  { label: "Strategy", icon: Target },
  { label: "Culture", icon: Users },
  { label: "Decision", icon: Brain },
  { label: "Launch", icon: Zap },
];

interface FormState {
  // Step 1: Organization
  orgName: string;
  industry: string;
  teamSize: string;
  stage: string;
  orgId: string;
  // Step 2: Strategic Focus
  primaryGoal: string;
  kpis: string[];
  // Step 3: Decision Culture
  decisionStyle: string;
  assumptionTracking: string;
  riskTolerance: string;
  // Step 4: First Decision
  decisionTitle: string;
  decisionIntent: string;
  expectedOutcome: string;
  assumptions: string[];
  // Plan
  selectedPlan: string;
}

/* ═══════════════════════════════════════════════════
   VISUAL COMPONENTS (preserved from original)
═══════════════════════════════════════════════════ */

function AmbientBg({ step }: { step: number }) {
  const colors = [
    ["#6366f1", "#a855f7"],
    ["#a855f7", "#3b82f6"],
    ["#f59e0b", "#6366f1"],
    ["#10b981", "#6366f1"],
    ["#6366f1", "#10b981"],
  ];
  const [c1, c2] = colors[step] ?? colors[0];
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.8) 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />
      <motion.div key={`orb1-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
        className="absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px]"
        style={{ background: `${c1}18` }} />
      <motion.div key={`orb2-${step}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[420px] max-h-[420px] rounded-full blur-[100px]"
        style={{ background: `${c2}12` }} />
    </div>
  );
}

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-2">
      {STEP_META.map((s, i) => {
        const Icon = s.icon;
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center gap-1.5 sm:gap-2">
            <motion.div
              animate={{
                scale: active ? 1.1 : 1,
                borderColor: done ? "#10b98160" : active ? "#6366f180" : "rgba(255,255,255,0.10)",
                background: done ? "#10b98112" : active ? "#6366f112" : "rgba(255,255,255,0.03)",
              }}
              transition={{ duration: 0.3 }}
              className="relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl border"
            >
              {done ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                : <Icon className="h-4 w-4" style={{ color: active ? "#818cf8" : "rgba(255,255,255,0.25)" }} />}
              {active && (
                <motion.div layoutId="step-ring"
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/60"
                  transition={{ type: "spring", bounce: 0.2 }} />
              )}
            </motion.div>
            <span className="hidden md:block text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: done ? "#10b981" : active ? "#818cf8" : "rgba(255,255,255,0.2)" }}>
              {s.label}
            </span>
            {i < STEP_META.length - 1 && (
              <div className="w-4 sm:w-8 md:w-10 h-px"
                style={{ background: done ? "linear-gradient(90deg,#10b981,#6366f1)" : "rgba(255,255,255,0.08)" }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full h-0.5 bg-white/6">
      <motion.div className="h-full rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg,#6366f1,#a855f7)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   REUSABLE UI
═══════════════════════════════════════════════════ */

function SelectChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className="rounded-xl border text-sm font-medium transition-all px-4 py-2.5"
      style={{
        borderColor: selected ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.10)",
        background: selected ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.03)",
        color: selected ? "#818cf8" : "rgba(255,255,255,0.50)",
      }}
    >
      {label}
    </motion.button>
  );
}

function IndustryChip({ item, selected, onClick }: { item: { label: string; icon: string }; selected: boolean; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-2xl border p-3 sm:p-4 text-center transition-all"
      style={{
        borderColor: selected ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.10)",
        background: selected ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span className="text-xl sm:text-2xl">{item.icon}</span>
      <span className="text-[10px] sm:text-xs font-semibold" style={{ color: selected ? "#818cf8" : "rgba(255,255,255,0.45)" }}>
        {item.label}
      </span>
      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="h-4 w-4 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
          <CheckCircle2 className="h-2.5 w-2.5 text-indigo-400" />
        </motion.div>
      )}
    </motion.button>
  );
}

function OnboardInput({ placeholder, value, onChange, label, hint }: {
  placeholder: string; value: string; onChange: (v: string) => void; label?: string; hint?: string;
}) {
  return (
    <div>
      {label && <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-1.5">{label}</p>}
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className="w-full h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all" />
      {hint && <p className="text-[10px] text-white/25 mt-1">{hint}</p>}
    </div>
  );
}

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0, filter: "blur(4px)" }),
};
const slideT = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ═══════════════════════════════════════════════════
   STEP 1: Organization Setup
═══════════════════════════════════════════════════ */

function StepOrganization({ form, update }: { form: FormState; update: (k: keyof FormState, v: unknown) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 1 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Set up your organization</h2>
        <p className="text-sm text-white/40">We&apos;ll personalize your StemmQ workspace around your context.</p>
      </div>
      <OnboardInput label="Organization name *" placeholder="Acme Corp" value={form.orgName} onChange={v => update("orgName", v)} />
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Company size</p>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map(s => (
            <SelectChip key={s} label={s} selected={form.teamSize === s} onClick={() => update("teamSize", s)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2.5">Industry</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {INDUSTRIES.map(ind => (
            <IndustryChip key={ind.label} item={ind} selected={form.industry === ind.label} onClick={() => update("industry", ind.label)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Stage</p>
        <div className="space-y-2">
          {STAGES.map(s => (
            <motion.button key={s.label} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
              onClick={() => update("stage", s.label)}
              className="flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left transition-all"
              style={{
                borderColor: form.stage === s.label ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)",
                background: form.stage === s.label ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: form.stage === s.label ? "white" : "rgba(255,255,255,0.6)" }}>{s.label}</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{s.desc}</p>
              </div>
              {form.stage === s.label && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 2: Strategic Focus
═══════════════════════════════════════════════════ */

function StepStrategicFocus({ form, update }: { form: FormState; update: (k: keyof FormState, v: unknown) => void }) {
  const [kpiInput, setKpiInput] = useState("");
  const addKpi = () => {
    if (kpiInput.trim() && (form.kpis as string[]).length < 8) {
      update("kpis", [...form.kpis, kpiInput.trim()]);
      setKpiInput("");
    }
  };
  const removeKpi = (i: number) => update("kpis", form.kpis.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 2 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">What&apos;s your strategic focus?</h2>
        <p className="text-sm text-white/40">Select your primary goal — we&apos;ll tailor decision intelligence around it.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {STRATEGIC_GOALS.map(goal => {
          const Icon = goal.icon;
          const selected = form.primaryGoal === goal.id;
          return (
            <motion.button key={goal.id} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
              onClick={() => update("primaryGoal", goal.id)}
              className="relative flex items-center gap-3 rounded-2xl border p-4 text-left transition-all"
              style={{
                borderColor: selected ? `${goal.color}50` : "rgba(255,255,255,0.08)",
                background: selected ? `${goal.color}08` : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${goal.color}15`, border: `1px solid ${goal.color}25` }}>
                <Icon className="h-4 w-4" style={{ color: goal.color }} />
              </div>
              <span className="text-sm font-semibold" style={{ color: selected ? "white" : "rgba(255,255,255,0.6)" }}>
                {goal.label}
              </span>
              {selected && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                  <CheckCircle2 className="h-4 w-4" style={{ color: goal.color }} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Key KPIs you track</p>
        <div className="flex gap-2">
          <input type="text" placeholder="e.g. ARR, churn rate, NPS..." value={kpiInput}
            onChange={e => setKpiInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addKpi())}
            className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all" />
          <motion.button whileTap={{ scale: 0.95 }} onClick={addKpi}
            className="h-11 px-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-sm font-semibold text-indigo-400">
            Add
          </motion.button>
        </div>
        {form.kpis.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {form.kpis.map((kpi, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                {kpi}
                <button onClick={() => removeKpi(i)} className="hover:text-white transition-colors"><X className="h-3 w-3" /></button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 3: Decision Culture
═══════════════════════════════════════════════════ */

function StepDecisionCulture({ form, update }: { form: FormState; update: (k: keyof FormState, v: unknown) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 3 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">How does your team decide?</h2>
        <p className="text-sm text-white/40">We&apos;ll calibrate intelligence features based on your decision culture.</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Decision-making style</p>
        <div className="space-y-2">
          {DECISION_STYLES.map(s => (
            <motion.button key={s.id} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
              onClick={() => update("decisionStyle", s.id)}
              className="flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left transition-all"
              style={{
                borderColor: form.decisionStyle === s.id ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.08)",
                background: form.decisionStyle === s.id ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.02)",
              }}
            >
              <div className="flex-1">
                <p className="text-sm font-semibold" style={{ color: form.decisionStyle === s.id ? "white" : "rgba(255,255,255,0.6)" }}>{s.label}</p>
                <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.3)" }}>{s.desc}</p>
              </div>
              {form.decisionStyle === s.id && <CheckCircle2 className="h-4 w-4 text-indigo-400" />}
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">How do you track assumptions today?</p>
        <div className="flex flex-wrap gap-2">
          {["Not at all", "Spreadsheets", "Documents", "Other tool"].map(opt => (
            <SelectChip key={opt} label={opt} selected={form.assumptionTracking === opt} onClick={() => update("assumptionTracking", opt)} />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Risk tolerance</p>
        <div className="flex gap-3">
          {RISK_TOLERANCES.map(r => (
            <motion.button key={r.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              onClick={() => update("riskTolerance", r.id)}
              className="flex-1 rounded-xl border py-3 text-center transition-all"
              style={{
                borderColor: form.riskTolerance === r.id ? `${r.color}50` : "rgba(255,255,255,0.08)",
                background: form.riskTolerance === r.id ? `${r.color}12` : "rgba(255,255,255,0.02)",
                color: form.riskTolerance === r.id ? r.color : "rgba(255,255,255,0.5)",
              }}
            >
              <p className="text-sm font-semibold">{r.label}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 4: First Decision (MANDATORY)
═══════════════════════════════════════════════════ */

function StepFirstDecision({ form, update }: { form: FormState; update: (k: keyof FormState, v: unknown) => void }) {
  const addAssumption = () => {
    if (form.assumptions.length < 5) {
      update("assumptions", [...form.assumptions, ""]);
    }
  };
  const updateAssumption = (i: number, val: string) => {
    const next = [...form.assumptions];
    next[i] = val;
    update("assumptions", next);
  };
  const removeAssumption = (i: number) => {
    const next = form.assumptions.filter((_, idx) => idx !== i);
    update("assumptions", next.length === 0 ? [""] : next);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 4 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Create your first decision</h2>
        <p className="text-sm text-white/40">Every great strategy starts with a structured decision. This is yours.</p>
      </div>
      <OnboardInput label="Decision title *" placeholder="e.g. Expand into European market" value={form.decisionTitle} onChange={v => update("decisionTitle", v)} />
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Strategic intent</p>
        <div className="flex flex-wrap gap-2">
          {INTENTS.map(intent => (
            <SelectChip key={intent} label={intent} selected={form.decisionIntent === intent} onClick={() => update("decisionIntent", intent)} />
          ))}
        </div>
      </div>
      <OnboardInput label="Expected outcome" placeholder="What does success look like?" value={form.expectedOutcome} onChange={v => update("expectedOutcome", v)} />
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-white/45 uppercase tracking-wide">Assumptions *</p>
          <span className="text-[10px] text-white/25">{form.assumptions.filter(a => a.trim()).length} added</span>
        </div>
        <div className="space-y-2">
          {form.assumptions.map((assumption, i) => (
            <div key={i} className="flex gap-2">
              <input type="text" placeholder={`Assumption ${i + 1}...`} value={assumption}
                onChange={e => updateAssumption(i, e.target.value)}
                className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all" />
              {form.assumptions.length > 1 && (
                <button onClick={() => removeAssumption(i)}
                  className="h-11 w-11 rounded-xl border border-white/8 bg-white/3 flex items-center justify-center hover:border-red-500/30 hover:bg-red-500/5 transition-all flex-shrink-0">
                  <X className="h-4 w-4 text-white/30" />
                </button>
              )}
            </div>
          ))}
        </div>
        {form.assumptions.length < 5 && (
          <motion.button whileHover={{ scale: 1.02 }} onClick={addAssumption}
            className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-2 mt-1">
            <div className="h-5 w-5 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
              <Plus className="h-3 w-3 text-indigo-400" />
            </div>
            Add assumption
          </motion.button>
        )}
      </div>
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 flex items-start gap-2">
        <Sparkles className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-300/80 leading-relaxed">
          Every decision in StemmQ requires explicit assumptions. This is how we track accuracy and improve decision quality over time.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 5: Payment (Pro) / Launch (Free)
═══════════════════════════════════════════════════ */

function StepLaunch({ form, isPro, onPaymentSuccess, onSkip }: {
  form: FormState; isPro: boolean;
  onPaymentSuccess: () => void; onSkip: () => void;
}) {
  if (isPro) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 5 of 5</p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Activate Pro</h2>
          <p className="text-sm text-white/40">Unlock unlimited decisions, AI reasoning, simulations, and team collaboration.</p>
        </div>
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-500/5 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Pro Plan</p>
              <p className="text-sm text-white/40">$24/member/month</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            {["Unlimited decisions", "Advanced AI reasoning", "Simulations & what-if analysis", "Team collaboration", "Document intelligence", "Decision analytics"].map(f => (
              <div key={f} className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-indigo-400" />
                <span className="text-sm text-white/60">{f}</span>
              </div>
            ))}
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={onPaymentSuccess}
            className="w-full py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-indigo-500/20"
            style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
          >
            Continue to Pro
          </motion.button>
          <button onClick={onSkip} className="w-full text-center text-xs text-white/25 hover:text-white/50 transition-colors py-1">
            Skip — start with Free plan
          </button>
        </div>
      </div>
    );
  }

  // Free plan — launch screen
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 5 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">You&apos;re all set!</h2>
        <p className="text-sm text-white/40">Your workspace is configured and your first decision is ready.</p>
      </div>
      <div className="rounded-2xl border border-white/8 bg-white/2 p-5 space-y-3">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Your workspace summary</p>
        {[
          { label: "Organization", value: form.orgName },
          { label: "Industry", value: form.industry },
          { label: "First Decision", value: form.decisionTitle },
          { label: "Assumptions", value: `${form.assumptions.filter(a => a.trim()).length} tracked` },
        ].filter(r => r.value).map(row => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-xs text-white/30">{row.label}</span>
            <span className="text-xs text-white/70 font-medium">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUCCESS ANIMATION
═══════════════════════════════════════════════════ */

function LaunchSuccess({ name }: { name: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#030712] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
          className="relative h-24 w-24 mx-auto mb-8">
          <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4, repeat: 2 }}
            className="absolute inset-0 rounded-full" style={{ border: "2px solid rgba(99,102,241,0.4)" }} />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3, bounce: 0.6 }}>
              <Zap className="h-10 w-10 text-indigo-400" />
            </motion.div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-3">StemmQ is ready</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Welcome{name ? `, ${name}` : ""}!</h2>
          <p className="text-sm text-white/45 mb-8 leading-relaxed">Your workspace is configured and ready. Let&apos;s start making structured decisions.</p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/25">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Taking you to your dashboard...</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [saving, setSaving] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [form, setForm] = useState<FormState>({
    orgName: "", industry: "", teamSize: "", stage: "", orgId: "",
    primaryGoal: "", kpis: [],
    decisionStyle: "", assumptionTracking: "", riskTolerance: "",
    decisionTitle: "", decisionIntent: "", expectedOutcome: "", assumptions: [""],
    selectedPlan: "free",
  });

  // Load selected plan
  useEffect(() => {
    getPlanCookie().then(plan => {
      setIsPro(plan === "pro");
      setForm(prev => ({ ...prev, selectedPlan: plan }));
    });
  }, []);

  const update = (k: keyof FormState, v: unknown) => setForm(prev => ({ ...prev, [k]: v }));

  const canAdvance: Record<number, boolean> = {
    0: !!form.orgName,
    1: !!form.primaryGoal,
    2: !!form.decisionStyle,
    3: !!form.decisionTitle && !!form.decisionIntent && form.assumptions.some(a => a.trim()),
    4: true,
  };

  const next = async () => {
    if (!canAdvance[step]) return;
    setSaving(true);
    try {
      // Save data at step boundaries
      if (step === 0) {
        const result = await createOrganization({
          name: form.orgName,
          industry: form.industry,
          size: form.teamSize,
          stage: form.stage,
        });
        update("orgId", result.orgId);
      } else if (step === 1 && form.orgId) {
        await updateOrganizationConfig(form.orgId, {
          strategic_focus: { primaryGoal: form.primaryGoal, kpis: form.kpis },
        });
      } else if (step === 2 && form.orgId) {
        await updateOrganizationConfig(form.orgId, {
          decision_culture: {
            style: form.decisionStyle,
            assumptionTracking: form.assumptionTracking,
            riskTolerance: form.riskTolerance,
          },
        });
      } else if (step === 3 && form.orgId) {
        await createFirstDecision({
          orgId: form.orgId,
          title: form.decisionTitle,
          strategicIntent: form.decisionIntent,
          expectedOutcome: form.expectedOutcome,
          assumptions: form.assumptions.filter(a => a.trim()),
        });
      }
      setDir(1);
      setStep(s => s + 1);
    } catch (err) {
      console.error("Onboarding step failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const back = () => {
    if (step > 0) { setDir(-1); setStep(s => s - 1); }
  };

  const handleLaunch = async (paymentSuccess?: boolean) => {
    setSaving(true);
    try {
      setLaunched(true);
      // completeOnboarding does redirect
      await completeOnboarding(form.orgId, paymentSuccess);
    } catch {
      // redirect throws NEXT_REDIRECT, which is expected
    }
  };

  const pct = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  if (launched) return <LaunchSuccess name={form.orgName} />;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">
      <AmbientBg step={step} />

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 h-14 border-b border-white/6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-white hidden sm:block">StemmQ</span>
        </Link>
        <span className="text-xs font-semibold text-white/30 sm:hidden">{pct}% complete</span>
        <button onClick={() => handleLaunch(false)}
          className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1">
          Skip setup <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="relative z-10 flex-shrink-0"><ProgressBar step={step} /></div>

      <div className="relative z-10 flex-shrink-0 pt-4 sm:pt-5 pb-3 sm:pb-4 px-4 flex items-center justify-center">
        <StepBar current={step} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={step} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={slideT}>
              {step === 0 && <StepOrganization form={form} update={update} />}
              {step === 1 && <StepStrategicFocus form={form} update={update} />}
              {step === 2 && <StepDecisionCulture form={form} update={update} />}
              {step === 3 && <StepFirstDecision form={form} update={update} />}
              {step === 4 && <StepLaunch form={form} isPro={isPro}
                onPaymentSuccess={() => handleLaunch(true)}
                onSkip={() => handleLaunch(false)} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/6 bg-[#030712]/90 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <motion.button whileHover={step > 0 ? { scale: 1.04 } : {}} whileTap={step > 0 ? { scale: 0.97 } : {}}
            onClick={back} disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-0 disabled:pointer-events-none text-white/40 hover:text-white/70 border border-transparent hover:border-white/10">
            <ArrowLeft className="h-4 w-4" /> Back
          </motion.button>

          <p className="text-[10px] text-white/25 font-semibold tabular-nums hidden sm:block">{step + 1} / {TOTAL_STEPS}</p>

          {step < TOTAL_STEPS - 1 ? (
            <motion.button whileHover={canAdvance[step] ? { scale: 1.04 } : {}} whileTap={canAdvance[step] ? { scale: 0.97 } : {}}
              onClick={next} disabled={!canAdvance[step] || saving}
              className="relative group flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-indigo-500/20 disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>
              <span className="relative z-10 flex items-center gap-2">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                  : <>Continue <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></>}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => handleLaunch(false)} disabled={saving}
              className="relative group flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-emerald-500/20 disabled:opacity-35"
              style={{ background: "linear-gradient(135deg,#059669,#10b981)" }}>
              <span className="relative z-10 flex items-center gap-2">
                {saving ? <><Loader2 className="h-4 w-4 animate-spin" /> Launching...</>
                  : <><Sparkles className="h-4 w-4" /> Launch StemmQ</>}
              </span>
            </motion.button>
          )}
        </div>

        {!canAdvance[step] && step < TOTAL_STEPS - 1 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-[10px] text-amber-400/60 mt-2">
            {step === 0 ? "Enter your organization name to continue"
              : step === 1 ? "Select a strategic goal to continue"
              : step === 2 ? "Select a decision-making style to continue"
              : "Add a title, intent, and at least one assumption"}
          </motion.p>
        )}
      </div>
    </div>
  );
}
