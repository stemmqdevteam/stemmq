'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  GitBranch, Brain, Target, Activity,
  ArrowRight, Plus, Sparkles, TrendingUp,
  ChevronRight, Zap,
} from 'lucide-react'
import { useAuth } from '@/hooks'
import { useOrgStore, usePlan } from '@/store'
import { cn, formatRelativeTime, intentBadgeClass, statusBadgeClass } from '@/utils'
import { ROUTES, INTENT_LABELS, DECISION_STATUS_LABELS } from '@/constants'
import type { DashboardStats } from '@/types'

interface RecentDecision {
  id: string; title: string; intent: string
  status: string; quality_score: number | null; created_at: string
}
interface Props { stats: DashboardStats; recentDecisions: RecentDecision[]; serverFirstName?: string | null }

const up = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

/* ── KPI card ─────────────────────────────────────────────── */
function KPICard({ label, value, icon: Icon, iconBg, href, index }: {
  label: string; value: string | number; icon: React.ElementType
  iconBg: string; href: string; index: number
}) {
  return (
    <motion.div variants={up} custom={index} initial="hidden" animate="show">
      <Link href={href} className="block group">
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5 transition-all duration-200 hover:shadow-elevated hover:-translate-y-0.5 hover:border-[var(--muted-foreground)]/30">
          <div className="flex items-start justify-between mb-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
              <Icon className="w-5 h-5" />
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 transition-all" />
          </div>
          <p className="font-display font-bold text-3xl leading-none mb-1 text-[var(--foreground)]">{value}</p>
          <p className="text-xs text-[var(--muted-foreground)] font-medium">{label}</p>
        </div>
      </Link>
    </motion.div>
  )
}

/* ── Quick action ─────────────────────────────────────────── */
function QuickAction({ label, href, icon: Icon, color, index }: {
  label: string; href: string; icon: React.ElementType; color: string; index: number
}) {
  return (
    <motion.div variants={up} custom={index} initial="hidden" animate="show">
      <Link href={href}
        className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:bg-[var(--accent-muted)] transition-all group">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', color)}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="text-sm font-medium text-[var(--foreground)] flex-1">{label}</span>
        <ChevronRight className="w-3.5 h-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--accent)] transition-colors" />
      </Link>
    </motion.div>
  )
}

/* ── Skeleton ─────────────────────────────────────────────── */
function Skel({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg bg-[var(--muted)]', className)} />
}

/* ── Main ─────────────────────────────────────────────────── */
export function DashboardOverview({ stats, recentDecisions, serverFirstName }: Props) {
  const { profile, isLoading } = useAuth()
  const { org } = useOrgStore()
  const { plan } = usePlan()

  const firstName = !isLoading && profile?.full_name
    ? profile.full_name.split(' ')[0] : !isLoading ? 'there' : ''
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  const kpis = [
    { label: 'Total Decisions', value: stats.total_decisions, icon: GitBranch, iconBg: 'bg-brand-50 dark:bg-brand-950/40 text-brand-600', href: ROUTES.decisions },
    { label: 'Active', value: stats.active_decisions, icon: Activity, iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600', href: ROUTES.decisions + '?status=active' },
    { label: 'Pending Assumptions', value: stats.pending_assumptions, icon: Brain, iconBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600', href: ROUTES.assumptions },
    { label: 'Avg Quality Score', value: stats.avg_quality_score != null ? `${stats.avg_quality_score}` : '—', icon: Target, iconBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600', href: ROUTES.analytics },
  ]

  const quickActions = [
    { label: 'New decision', href: ROUTES.newDecision, icon: Plus, color: 'bg-brand-50 dark:bg-brand-950/40 text-brand-600' },
    { label: 'Review assumptions', href: ROUTES.assumptions, icon: Brain, color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600' },
    { label: 'Run simulation', href: ROUTES.simulations + '/new', icon: Sparkles, color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600' },
    { label: 'View analytics', href: ROUTES.analytics, icon: TrendingUp, color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600' },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <motion.div variants={up} custom={0} initial="hidden" animate="show">
          <h1 className="font-display text-2xl font-bold mb-0.5 text-[var(--foreground)]">
            {greeting}
            {firstName && firstName !== "there" ? `, ${firstName}` : ""}
            {" 👋"}
          </h1>
          <p className="text-sm text-[var(--muted-foreground)]">
            {org?.name} &middot; {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
        <motion.div variants={up} custom={1} initial="hidden" animate="show">
          <Link href={ROUTES.newDecision}
            className="inline-flex items-center gap-2 bg-[var(--accent)] hover:opacity-90 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-brand">
            <Plus className="w-4 h-4" /> New Decision
          </Link>
        </motion.div>
      </div>

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => <KPICard key={kpi.label} {...kpi} index={i + 1} />)}
      </div>

      {/* ── Main content ── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent decisions */}
        <motion.div variants={up} custom={6} initial="hidden" animate="show" className="lg:col-span-2">
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <h2 className="font-display font-semibold text-sm text-[var(--foreground)]">Recent decisions</h2>
              <Link href={ROUTES.decisions} className="text-xs text-[var(--accent)] hover:underline font-medium">
                View all →
              </Link>
            </div>

            {recentDecisions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[var(--muted)] flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-6 h-6 text-[var(--muted-foreground)]" />
                </div>
                <p className="font-semibold text-sm text-[var(--foreground)] mb-1">No decisions yet</p>
                <p className="text-xs text-[var(--muted-foreground)] mb-5 max-w-xs leading-relaxed">
                  Create your first decision to start tracking outcomes and building decision intelligence.
                </p>
                <Link href={ROUTES.newDecision}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[var(--accent)] text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Create decision
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[var(--border)]">
                {recentDecisions.map((d) => (
                  <Link key={d.id} href={`${ROUTES.decisions}/${d.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[var(--muted)] transition-colors group">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--foreground)] truncate group-hover:text-[var(--accent)] transition-colors">
                        {d.title}
                      </p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {formatRelativeTime(d.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide', intentBadgeClass(d.intent))}>
                        {INTENT_LABELS[d.intent as keyof typeof INTENT_LABELS] ?? d.intent}
                      </span>
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide', statusBadgeClass(d.status))}>
                        {DECISION_STATUS_LABELS[d.status as keyof typeof DECISION_STATUS_LABELS] ?? d.status}
                      </span>
                      {d.quality_score != null && (
                        <span className="text-xs font-bold tabular-nums text-[var(--muted-foreground)] w-6 text-right">
                          {d.quality_score}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div variants={up} custom={7} initial="hidden" animate="show" className="space-y-5">

          {/* Quick actions */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
            <h2 className="font-display font-semibold text-sm text-[var(--foreground)] mb-4">Quick actions</h2>
            <div className="space-y-2">
              {quickActions.map((a, i) => <QuickAction key={a.href} {...a} index={i + 8} />)}
            </div>
          </div>

          {/* This month */}
          <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
            <h2 className="font-display font-semibold text-sm text-[var(--foreground)] mb-4">This month</h2>
            <div className="space-y-3">
              {[
                { label: 'Decisions created', value: stats.decisions_this_month },
                { label: 'Decisions resolved', value: stats.resolved_decisions },
                { label: 'Assumption accuracy', value: stats.assumption_accuracy != null ? `${stats.assumption_accuracy}%` : '—' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--muted-foreground)]">{row.label}</span>
                  <span className="text-sm font-semibold text-[var(--foreground)]">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade banner — free only */}
          {plan === 'free' && (
            <motion.div variants={up} custom={12} initial="hidden" animate="show"
              className="relative overflow-hidden rounded-2xl p-5 gradient-bg text-white">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.3),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4" fill="currentColor" />
                  <span className="text-sm font-bold">Upgrade to Pro</span>
                </div>
                <p className="text-xs text-white/80 mb-4 leading-relaxed">
                  Unlock unlimited decisions, AI generation, simulations, and team collaboration.
                </p>
                <Link href={ROUTES.billing}
                  className="inline-flex items-center gap-1.5 bg-white text-brand-700 text-xs font-bold px-4 py-2 rounded-xl hover:bg-white/90 transition-all">
                  Upgrade now <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
