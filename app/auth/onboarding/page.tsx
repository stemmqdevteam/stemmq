"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Check, Sparkles, Brain, Building2,
  Users, Target, Zap, Shield, BarChart3, Search, Bot,
  BookOpen, TrendingUp, Globe, X, Plus, ChevronRight,
  CheckCircle2, Loader2, Layers
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════
   TYPES & CONSTANTS
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

const ROLES = [
  { label: "Executive / C-Suite", icon: Building2, color: "#6366f1" },
  { label: "VP / Director", icon: TrendingUp, color: "#a855f7" },
  { label: "Product Manager", icon: Layers, color: "#3b82f6" },
  { label: "Data Analyst", icon: BarChart3, color: "#10b981" },
  { label: "Strategy Consultant", icon: Target, color: "#f59e0b" },
  { label: "Operations Manager", icon: Shield, color: "#06b6d4" },
  { label: "Engineer", icon: Zap, color: "#8b5cf6" },
  { label: "Other", icon: Users, color: "#64748b" },
];

const GOALS = [
  { id: "quality", label: "Improve decision quality", desc: "Higher DQS across all strategic calls", icon: Target, color: "#6366f1" },
  { id: "speed", label: "Speed up decisions", desc: "Reduce time from idea to approved action", icon: Zap, color: "#f59e0b" },
  { id: "alignment", label: "Align team on strategy", desc: "One source of truth for all strategic intent", icon: Users, color: "#10b981" },
  { id: "assumptions", label: "Track assumptions", desc: "Validate every bet your team is making", icon: Search, color: "#a855f7" },
  { id: "ai", label: "Govern AI agents", desc: "Decision Gate for every autonomous action", icon: Bot, color: "#3b82f6" },
  { id: "audit", label: "Create audit trails", desc: "Board-ready decision history at any time", icon: BookOpen, color: "#06b6d4" },
];

const STEP_META = [
  { label: "Company", icon: Building2 },
  { label: "Role", icon: Users },
  { label: "Goals", icon: Target },
  { label: "Team", icon: Sparkles },
  { label: "Launch", icon: Zap },
];

interface FormState {
  companyName: string;
  website: string;
  teamSize: string;
  industry: string;
  role: string;
  goals: string[];
  inviteEmails: string[];
  workspaceName: string;
}

/* ═══════════════════════════════════════════════════
   AMBIENT BACKGROUND
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
      {/* Base dark */}
      <div className="absolute inset-0 bg-[#030712]" />
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.022]"
        style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.8) 1px,transparent 1px)`, backgroundSize: "52px 52px" }} />
      {/* Animated orbs */}
      <motion.div
        key={`orb1-${step}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-[-15%] left-[-5%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full blur-[120px]"
        style={{ background: `${c1}18` }}
      />
      <motion.div
        key={`orb2-${step}`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] max-w-[420px] max-h-[420px] rounded-full blur-[100px]"
        style={{ background: `${c2}12` }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP PROGRESS INDICATOR
═══════════════════════════════════════════════════ */

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
              {done
                ? <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                : <Icon className="h-4 w-4" style={{ color: active ? "#818cf8" : "rgba(255,255,255,0.25)" }} />
              }
              {active && (
                <motion.div layoutId="step-ring"
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/60"
                  transition={{ type: "spring", bounce: 0.2 }} />
              )}
            </motion.div>
            {/* Label — desktop only */}
            <span className="hidden md:block text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: done ? "#10b981" : active ? "#818cf8" : "rgba(255,255,255,0.2)" }}>
              {s.label}
            </span>
            {/* Connector */}
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

/* ═══════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════ */

function ProgressBar({ step }: { step: number }) {
  const pct = ((step + 1) / TOTAL_STEPS) * 100;
  return (
    <div className="w-full h-0.5 bg-white/6">
      <motion.div className="h-full rounded-full"
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ background: "linear-gradient(90deg,#6366f1,#a855f7)" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SELECTION CHIPS / CARDS
═══════════════════════════════════════════════════ */

function SelectChip({
  label, selected, onClick, small = false,
}: { label: string; selected: boolean; onClick: () => void; small?: boolean }) {
  return (
    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`rounded-xl border text-sm font-medium transition-all ${small ? "px-3 py-2" : "px-4 py-2.5"}`}
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

function IndustryChip({
  item, selected, onClick,
}: { item: { label: string; icon: string }; selected: boolean; onClick: () => void }) {
  return (
    <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 rounded-2xl border p-3 sm:p-4 text-center transition-all"
      style={{
        borderColor: selected ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.10)",
        background: selected ? "rgba(99,102,241,0.10)" : "rgba(255,255,255,0.02)",
      }}
    >
      <span className="text-xl sm:text-2xl">{item.icon}</span>
      <span className="text-[10px] sm:text-xs font-semibold"
        style={{ color: selected ? "#818cf8" : "rgba(255,255,255,0.45)" }}>
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

function RoleCard({
  role, selected, onClick,
}: { role: typeof ROLES[0]; selected: boolean; onClick: () => void }) {
  const Icon = role.icon;
  return (
    <motion.button whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-3 w-full rounded-xl border px-4 py-3 text-left transition-all"
      style={{
        borderColor: selected ? `${role.color}50` : "rgba(255,255,255,0.08)",
        background: selected ? `${role.color}10` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${role.color}15`, border: `1px solid ${role.color}25` }}>
        <Icon className="h-4 w-4" style={{ color: role.color }} />
      </div>
      <span className="text-sm font-semibold flex-1"
        style={{ color: selected ? "white" : "rgba(255,255,255,0.6)" }}>
        {role.label}
      </span>
      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <CheckCircle2 className="h-4 w-4" style={{ color: role.color }} />
        </motion.div>
      )}
    </motion.button>
  );
}

function GoalCard({
  goal, selected, onClick,
}: { goal: typeof GOALS[0]; selected: boolean; onClick: () => void }) {
  const Icon = goal.icon;
  return (
    <motion.button whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative flex items-start gap-3 rounded-2xl border p-4 text-left transition-all overflow-hidden group"
      style={{
        borderColor: selected ? `${goal.color}50` : "rgba(255,255,255,0.08)",
        background: selected ? `${goal.color}08` : "rgba(255,255,255,0.02)",
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: `radial-gradient(circle at 20% 30%, ${goal.color}06, transparent 60%)` }} />
      <div className="relative h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${goal.color}15`, border: `1px solid ${goal.color}25` }}>
        <Icon className="h-4.5 w-4.5" style={{ color: goal.color }} />
      </div>
      <div className="relative flex-1 min-w-0">
        <p className="text-sm font-semibold mb-0.5"
          style={{ color: selected ? "white" : "rgba(255,255,255,0.70)" }}>
          {goal.label}
        </p>
        <p className="text-[11px] leading-snug"
          style={{ color: selected ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.30)" }}>
          {goal.desc}
        </p>
      </div>
      {selected && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="relative h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: `${goal.color}20`, border: `1px solid ${goal.color}40` }}>
          <Check className="h-3 w-3" style={{ color: goal.color }} />
        </motion.div>
      )}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════
   FORM INPUT
═══════════════════════════════════════════════════ */

function OnboardInput({
  placeholder, value, onChange, type = "text", label, hint,
}: {
  placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; label?: string; hint?: string;
}) {
  return (
    <div>
      {label && <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-1.5">{label}</p>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all"
      />
      {hint && <p className="text-[10px] text-white/25 mt-1">{hint}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SLIDE VARIANTS
═══════════════════════════════════════════════════ */

const slide = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0, filter: "blur(4px)" }),
  center: { x: 0, opacity: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0, filter: "blur(4px)" }),
};
const slideT = { duration: 0.3, ease: [0.22, 1, 0.36, 1]as [number, number, number, number] };

/* ═══════════════════════════════════════════════════
   STEP PANELS
═══════════════════════════════════════════════════ */

/* ── Step 0: Company ── */
function StepCompany({ form, update }: { form: FormState; update: (k: keyof FormState, v: any) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 1 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Tell us about your organization</h2>
        <p className="text-sm text-white/40">We'll personalize your StemmQ workspace around your context.</p>
      </div>

      <OnboardInput label="Company name *" placeholder="Acme Corp" value={form.companyName} onChange={v => update("companyName", v)} />
      <OnboardInput label="Website (optional)" placeholder="https://company.com" value={form.website} onChange={v => update("website", v)} />

      {/* Team size */}
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2">Team size</p>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map(s => (
            <SelectChip key={s} label={s} selected={form.teamSize === s} onClick={() => update("teamSize", s)} small />
          ))}
        </div>
      </div>

      {/* Industry */}
      <div>
        <p className="text-xs font-semibold text-white/45 uppercase tracking-wide mb-2.5">Industry</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {INDUSTRIES.map(ind => (
            <IndustryChip key={ind.label} item={ind} selected={form.industry === ind.label} onClick={() => update("industry", ind.label)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 1: Role ── */
function StepRole({ form, update }: { form: FormState; update: (k: keyof FormState, v: any) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 2 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">What's your role?</h2>
        <p className="text-sm text-white/40">We'll surface the most relevant decision frameworks for your context.</p>
      </div>
      <div className="space-y-2">
        {ROLES.map(role => (
          <RoleCard key={role.label} role={role} selected={form.role === role.label} onClick={() => update("role", role.label)} />
        ))}
      </div>
    </div>
  );
}

/* ── Step 2: Goals ── */
function StepGoals({ form, update }: { form: FormState; update: (k: keyof FormState, v: any) => void }) {
  const toggleGoal = (id: string) => {
    const next = form.goals.includes(id) ? form.goals.filter(g => g !== id) : [...form.goals, id];
    update("goals", next);
  };
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 3 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">What do you want to achieve?</h2>
        <p className="text-sm text-white/40">Pick all that apply. We'll configure your workspace accordingly.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {GOALS.map(goal => (
          <GoalCard key={goal.id} goal={goal} selected={form.goals.includes(goal.id)} onClick={() => toggleGoal(goal.id)} />
        ))}
      </div>
      {form.goals.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <span className="text-xs text-indigo-300">
            {form.goals.length} goal{form.goals.length > 1 ? "s" : ""} selected — your workspace will be pre-configured
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* ── Step 3: Invite ── */
function StepInvite({ form, update }: { form: FormState; update: (k: keyof FormState, v: any) => void }) {
  const updateEmail = (i: number, val: string) => {
    const emails = [...form.inviteEmails];
    emails[i] = val;
    update("inviteEmails", emails);
  };
  const removeEmail = (i: number) => {
    const emails = form.inviteEmails.filter((_, idx) => idx !== i);
    update("inviteEmails", emails.length === 0 ? [""] : emails);
  };
  const addEmail = () => {
    if (form.inviteEmails.length >= 5) return;
    update("inviteEmails", [...form.inviteEmails, ""]);
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 4 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Invite your team</h2>
        <p className="text-sm text-white/40">Decision-making is better together. You can always add more later.</p>
      </div>

      {/* Info strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { icon: Shield, label: "Role-based access", color: "#6366f1" },
          { icon: Zap, label: "Instant activation", color: "#10b981" },
          { icon: Users, label: "Unlimited members", color: "#a855f7" },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-xl border border-white/6 bg-white/2 p-3 text-center">
              <div className="h-7 w-7 rounded-lg flex items-center justify-center mx-auto mb-1.5"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                <Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
              </div>
              <p className="text-[9px] text-white/35 leading-snug">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Email fields */}
      <div className="space-y-2">
        <AnimatePresence>
          {form.inviteEmails.map((email, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={`colleague${i > 0 ? `${i + 1}` : ""}@company.com`}
                value={email}
                onChange={e => updateEmail(i, e.target.value)}
                className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"
              />
              {(i > 0 || form.inviteEmails.length > 1) && (
                <button onClick={() => removeEmail(i)}
                  className="h-11 w-11 rounded-xl border border-white/8 bg-white/3 flex items-center justify-center hover:border-red-500/30 hover:bg-red-500/5 transition-all flex-shrink-0">
                  <X className="h-4 w-4 text-white/30 hover:text-red-400 transition-colors" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {form.inviteEmails.length < 5 && (
          <motion.button whileHover={{ scale: 1.02 }} onClick={addEmail}
            className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors py-1">
            <div className="h-5 w-5 rounded-full bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
              <Plus className="h-3 w-3 text-indigo-400" />
            </div>
            Add another teammate
          </motion.button>
        )}
      </div>

      <button className="w-full text-center text-xs text-white/25 hover:text-white/50 transition-colors py-1">
        Skip — I'll invite teammates later
      </button>
    </div>
  );
}

/* ── Step 4: Launch ── */
function StepLaunch({ form, update }: { form: FormState; update: (k: keyof FormState, v: any) => void }) {
  const defaultName = form.companyName ? `${form.companyName} HQ` : "My Workspace";
  const selectedGoals = GOALS.filter(g => form.goals.includes(g.id));

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest font-bold mb-1">Step 5 of 5</p>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1.5">Almost there — name your workspace</h2>
        <p className="text-sm text-white/40">This is how your team will see it in StemmQ.</p>
      </div>

      <OnboardInput
        label="Workspace name *"
        placeholder={defaultName}
        value={form.workspaceName || defaultName}
        onChange={v => update("workspaceName", v)}
        hint="You can change this anytime in settings"
      />

      {/* Config summary */}
      <div className="rounded-2xl border border-white/8 bg-white/2 p-4 sm:p-5 space-y-3">
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Your workspace will include</p>
        {[
          { label: "Structured Decision Objects (SDO)", active: true, color: "#6366f1" },
          { label: "Decision Quality Score engine", active: true, color: "#a855f7" },
          { label: "Assumption tracking & validation", active: form.goals.includes("assumptions"), color: "#10b981" },
          { label: "AI Decision Gate", active: form.goals.includes("ai"), color: "#3b82f6" },
          { label: "Audit trail & org memory", active: form.goals.includes("audit"), color: "#06b6d4" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${item.active ? "" : "opacity-30"}`}
              style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
              <CheckCircle2 className="h-3 w-3" style={{ color: item.active ? item.color : "rgba(255,255,255,0.2)" }} />
            </div>
            <span className={`text-xs sm:text-sm ${item.active ? "text-white/70" : "text-white/25 line-through"}`}>
              {item.label}
            </span>
            {!item.active && (
              <span className="text-[9px] text-white/20 ml-1">not selected</span>
            )}
          </div>
        ))}
      </div>

      {/* Goals recap */}
      {selectedGoals.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedGoals.map(g => {
            const Icon = g.icon;
            return (
              <span key={g.id} className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold"
                style={{ color: g.color, background: `${g.color}12`, borderColor: `${g.color}25` }}>
                <Icon className="h-3 w-3" /> {g.label}
              </span>
            );
          })}
        </div>
      )}
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
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.1, bounce: 0.5 }}
          className="relative h-24 w-24 mx-auto mb-8"
        >
          {/* Outer ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.4, repeat: 2 }}
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid rgba(99,102,241,0.4)" }}
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.3, bounce: 0.6 }}>
              <Zap className="h-10 w-10 text-indigo-400" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-3">StemmQ is ready</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Welcome{name ? `, ${name}` : ""}!
          </h2>
          <p className="text-sm text-white/45 mb-8 leading-relaxed">
            Your workspace is configured and ready. Let's make your first structured decision.
          </p>
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
  const [launching, setLaunching] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [form, setForm] = useState<FormState>({
    companyName: "", website: "", teamSize: "", industry: "",
    role: "", goals: [], inviteEmails: [""], workspaceName: "",
  });

  const update = (k: keyof FormState, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  const canAdvance: Record<number, boolean> = {
    0: !!form.companyName,
    1: !!form.role,
    2: form.goals.length > 0,
    3: true, // invite is optional
    4: !!(form.workspaceName || form.companyName),
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) { setDir(1); setStep(s => s + 1); }
  };
  const back = () => {
    if (step > 0) { setDir(-1); setStep(s => s - 1); }
  };

  const handleLaunch = async () => {
    setLaunching(true);
    await new Promise(r => setTimeout(r, 1200));
    setLaunching(false);
    setLaunched(true);
    await new Promise(r => setTimeout(r, 2200));
    router.push("/dashboard");
  };

  const pct = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canAdvance[step] && step < TOTAL_STEPS - 1) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, canAdvance]);

  if (launched) return <LaunchSuccess name={form.companyName} />;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">
      <AmbientBg step={step} />

      {/* ── HEADER ── */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 h-14 border-b border-white/6 flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Brain className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-white hidden sm:block">StemmQ</span>
        </Link>

        {/* Progress pct — mobile */}
        <span className="text-xs font-semibold text-white/30 sm:hidden">{pct}% complete</span>

        <button
          onClick={handleLaunch}
          className="text-xs text-white/30 hover:text-white/60 transition-colors flex items-center gap-1"
        >
          Skip setup <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="relative z-10 flex-shrink-0">
        <ProgressBar step={step} />
      </div>

      {/* ── STEP DOTS ── */}
      <div className="relative z-10 flex-shrink-0 pt-4 sm:pt-5 pb-3 sm:pb-4 px-4 flex items-center justify-center">
        <StepBar current={step} />
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="relative z-10 flex-1 overflow-y-auto overscroll-contain">
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideT}
            >
              {step === 0 && <StepCompany form={form} update={update} />}
              {step === 1 && <StepRole form={form} update={update} />}
              {step === 2 && <StepGoals form={form} update={update} />}
              {step === 3 && <StepInvite form={form} update={update} />}
              {step === 4 && <StepLaunch form={form} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── FIXED BOTTOM NAV ── */}
      <div className="relative z-10 flex-shrink-0 border-t border-white/6 bg-[#030712]/90 backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-xl mx-auto flex items-center justify-between">

          {/* Back */}
          <motion.button
            whileHover={step > 0 ? { scale: 1.04 } : {}}
            whileTap={step > 0 ? { scale: 0.97 } : {}}
            onClick={back}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-0 disabled:pointer-events-none text-white/40 hover:text-white/70 border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </motion.button>

          {/* Step counter */}
          <div className="text-center">
            <p className="text-[10px] text-white/25 font-semibold tabular-nums hidden sm:block">
              {step + 1} / {TOTAL_STEPS}
            </p>
          </div>

          {/* Next / Launch */}
          {step < TOTAL_STEPS - 1 ? (
            <motion.button
              whileHover={canAdvance[step] ? { scale: 1.04 } : {}}
              whileTap={canAdvance[step] ? { scale: 0.97 } : {}}
              onClick={next}
              disabled={!canAdvance[step]}
              className="relative group flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-indigo-500/20 disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Continue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={canAdvance[step] ? { scale: 1.04 } : {}}
              whileTap={canAdvance[step] ? { scale: 0.97 } : {}}
              onClick={handleLaunch}
              disabled={!canAdvance[step] || launching}
              className="relative group flex items-center gap-2.5 px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-emerald-500/20 disabled:opacity-35 disabled:cursor-not-allowed"
              style={{ background: launching ? "#059669" : "linear-gradient(135deg,#059669,#10b981)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {launching
                  ? <><Loader2 className="h-4 w-4 animate-spin" /> Launching...</>
                  : <><Sparkles className="h-4 w-4" /> Launch StemmQ</>
                }
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
            </motion.button>
          )}
        </div>

        {/* Hint */}
        {!canAdvance[step] && step < TOTAL_STEPS - 1 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center text-[10px] text-amber-400/60 mt-2">
            {step === 0 ? "Enter your company name to continue" : step === 1 ? "Select your role to continue" : "Select at least one goal to continue"}
          </motion.p>
        )}
      </div>
    </div>
  );
}