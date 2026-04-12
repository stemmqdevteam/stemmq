'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Edit2, Trash2, MoreHorizontal,
  Clock, DollarSign, RotateCcw, Users, Tag,
  Target, Brain, CheckCircle2, Archive, Play,
  FileText, TrendingUp, AlertTriangle,
} from 'lucide-react'
import { toast } from 'sonner'
import { changeDecisionStatus, deleteDecision } from '@/features/decisions/actions'
import { AssumptionPanel } from '@/features/assumptions/components/assumption-panel'
import { OutcomePanel } from '@/features/decisions/components/outcome-panel'
import { buttonClass } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ScoreRing, Avatar } from '@/components/ui/primitives'
import {
  cn, formatDate, formatRelativeTime, formatCurrency,
  intentBadgeClass, statusBadgeClass, scoreTextColor,
} from '@/utils'
import {
  ROUTES, INTENT_LABELS, DECISION_STATUS_LABELS,
  TIME_HORIZON_LABELS, REVERSIBILITY_LABELS,
} from '@/constants'
import type { Decision } from '@/types'

/* ── Status action config ────────────────────────────────── */
const STATUS_ACTIONS = [
  { status: 'active',   label: 'Mark active',   icon: Play,         color: 'text-emerald-600' },
  { status: 'draft',    label: 'Move to draft',  icon: FileText,     color: 'text-[var(--muted-foreground)]' },
  { status: 'resolved', label: 'Resolve',        icon: CheckCircle2, color: 'text-blue-600' },
  { status: 'archived', label: 'Archive',        icon: Archive,      color: 'text-[var(--muted-foreground)]' },
] as const

/* ── Resolve Modal ───────────────────────────────────────── */
function ResolveModal({
  decisionId,
  onClose,
}: {
  decisionId: string
  onClose: () => void
}) {
  const [notes, setNotes] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleResolve = () => {
    startTransition(async () => {
      const result = await changeDecisionStatus(decisionId, 'resolved', notes)
      if (result.success) {
        toast.success('Decision resolved')
        onClose()
      } else {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        className="w-full max-w-md bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-elevated p-6"
      >
        <h3 className="font-display font-bold text-lg mb-1">Resolve this decision</h3>
        <p className="text-sm text-[var(--muted-foreground)] mb-4">
          Document what happened and what you learned.
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What was the outcome? What assumptions proved correct or incorrect?"
          className={cn(
            'w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-all resize-none min-h-[120px]',
            'bg-[var(--muted)]',
            'border-[var(--border)]',
            'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10',
            'placeholder:text-[var(--muted-foreground)]'
          )}
        />
        <div className="flex gap-3 justify-end mt-4">
          <button onClick={onClose} className={buttonClass({ variant: 'ghost', size: 'sm' })}>
            Cancel
          </button>
          <button
            onClick={handleResolve}
            disabled={isPending}
            className={buttonClass({ variant: 'primary', size: 'sm' })}
          >
            {isPending ? 'Resolving…' : 'Resolve decision'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Detail sections ─────────────────────────────────────── */
function MetaItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-[var(--muted)] flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-[var(--muted-foreground)]" />
      </div>
      <div>
        <p className="text-xs text-[var(--muted-foreground)]">{label}</p>
        <p className="text-sm font-medium text-[var(--foreground)] mt-0.5">{value}</p>
      </div>
    </div>
  )
}

/* ── Main Component ──────────────────────────────────────── */
export function DecisionDetail({
  decision,
  orgId,
  canEdit,
}: {
  decision: Decision
  orgId: string
  canEdit: boolean
}) {
  const [showMenu, setShowMenu]         = useState(false)
  const [showResolve, setShowResolve]   = useState(false)
  const [activeTab, setActiveTab]       = useState<'assumptions' | 'outcomes' | 'context'>('assumptions')
  const [isPending, startTransition]    = useTransition()

  const isResolved = decision.status === 'resolved'
  const isArchived = decision.status === 'archived'

  const handleStatusChange = (status: typeof STATUS_ACTIONS[number]['status']) => {
    if (status === 'resolved') {
      setShowResolve(true)
      setShowMenu(false)
      return
    }
    startTransition(async () => {
      const result = await changeDecisionStatus(decision.id, status)
      if (result.success) toast.success(`Status changed to ${DECISION_STATUS_LABELS[status]}`)
      else toast.error(result.error)
    })
    setShowMenu(false)
  }

  const handleDelete = async () => {
    if (!confirm('Permanently delete this decision? This cannot be undone.')) return
    await deleteDecision(decision.id)
  }

  const availableActions = STATUS_ACTIONS.filter((a) => a.status !== decision.status)

  const unresolvedCount = (decision.assumptions ?? []).filter((a) => a.status === 'unknown').length

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Resolve modal */}
      <AnimatePresence>
        {showResolve && (
          <ResolveModal decisionId={decision.id} onClose={() => setShowResolve(false)} />
        )}
      </AnimatePresence>

      {/* Back + actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href={ROUTES.decisions}
          className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:text-[var(--foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to decisions
        </Link>

        <div className="flex items-center gap-2">
          {canEdit && !isArchived && (
            <Link
              href={`${ROUTES.decisions}/${decision.id}/edit`}
              className={buttonClass({ variant: 'secondary', size: 'sm' })}
            >
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </Link>
          )}

          {canEdit && (
            <div className="relative">
              <button
                onClick={() => setShowMenu((v) => !v)}
                className={buttonClass({ variant: 'outline', size: 'sm' })}
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full mt-1.5 w-44 bg-[var(--card)] rounded-xl border border-[var(--border)] shadow-elevated z-20 overflow-hidden py-1"
                  >
                    {availableActions.map((action) => (
                      <button
                        key={action.status}
                        onClick={() => handleStatusChange(action.status)}
                        disabled={isPending}
                        className={cn(
                          'w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5',
                          'hover:bg-[var(--muted)] transition-colors',
                          action.color
                        )}
                      >
                        <action.icon className="w-3.5 h-3.5" />
                        {action.label}
                      </button>
                    ))}
                    <div className="border-t border-[var(--border)] my-1" />
                    <button
                      onClick={handleDelete}
                      className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ── Left: main content ──────────────────────────── */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title + status */}
          <Card>
            <div className="flex items-start gap-4">
              <div className={cn('w-1.5 self-stretch rounded-full flex-shrink-0', {
                'bg-emerald-400': decision.intent === 'growth',
                'bg-blue-400':    decision.intent === 'efficiency',
                'bg-red-400':     decision.intent === 'risk',
                'bg-purple-400':  decision.intent === 'experiment',
                'bg-[var(--muted)]': decision.intent === 'other',
              })} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap mb-3">
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', intentBadgeClass(decision.intent))}>
                    {INTENT_LABELS[decision.intent] ?? decision.intent}
                  </span>
                  <span className={cn('text-xs px-2.5 py-1 rounded-full font-medium', statusBadgeClass(decision.status))}>
                    {DECISION_STATUS_LABELS[decision.status] ?? decision.status}
                  </span>
                  {decision.category && (
                    <Badge variant="outline" size="sm">{decision.category}</Badge>
                  )}
                </div>
                <h1 className="font-display text-xl font-bold leading-snug mb-3">
                  {decision.title}
                </h1>
                {decision.description && (
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {decision.description}
                  </p>
                )}
              </div>
              {decision.quality_score != null && (
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <ScoreRing score={Math.round(decision.quality_score)} size={52} strokeWidth={4} />
                  <p className="text-xs text-[var(--muted-foreground)]">DQS</p>
                </div>
              )}
            </div>

            {/* Resolution notes */}
            {isResolved && decision.resolution_notes && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolution notes
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">
                  {decision.resolution_notes}
                </p>
              </div>
            )}

            {/* Pending assumptions warning */}
            {unresolvedCount > 0 && !isResolved && !isArchived && (
              <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900 flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {unresolvedCount} assumption{unresolvedCount !== 1 ? 's' : ''} still unresolved
                </p>
              </div>
            )}
          </Card>

          {/* ── Tabs ────────────────────────────────────────── */}
          <div className="flex gap-0.5 bg-[var(--muted)] rounded-xl p-1">
            {([
              { key: 'assumptions', label: 'Assumptions', count: decision.assumptions?.length },
              { key: 'outcomes',    label: 'Outcomes',    count: decision.outcomes?.length },
              { key: 'context',     label: 'Context' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  activeTab === tab.key
                    ? 'bg-[var(--card)] text-[var(--foreground)] shadow-sm'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--muted-foreground)] hover:text-[var(--muted-foreground)]'
                )}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <Badge variant="default" size="xs">{tab.count}</Badge>
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'assumptions' && (
                <Card>
                  <h2 className="font-display font-semibold text-sm mb-4">Assumptions</h2>
                  <AssumptionPanel
                    assumptions={decision.assumptions ?? []}
                    decisionId={decision.id}
                    orgId={orgId}
                    canEdit={canEdit && !isArchived}
                  />
                </Card>
              )}

              {activeTab === 'outcomes' && (
                <Card>
                  <h2 className="font-display font-semibold text-sm mb-4">Outcomes</h2>
                  <OutcomePanel
                    outcomes={decision.outcomes ?? []}
                    expectedOutcomes={decision.expected_outcomes ?? []}
                    decisionId={decision.id}
                    orgId={orgId}
                    canEdit={canEdit}
                  />
                </Card>
              )}

              {activeTab === 'context' && (
                <Card className="space-y-6">
                  {decision.reasoning && (
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2">Reasoning</h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed whitespace-pre-wrap">
                        {decision.reasoning}
                      </p>
                    </div>
                  )}
                  {decision.expected_outcomes && decision.expected_outcomes.length > 0 && (
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-3">Expected outcomes</h3>
                      <div className="space-y-2">
                        {decision.expected_outcomes.map((o) => (
                          <div key={o.id} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--muted)]/50">
                            <Target className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{o.title}</p>
                              {(o.metric || o.target_value || o.timeframe) && (
                                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                                  {[o.metric, o.target_value, o.timeframe].filter(Boolean).join(' · ')}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {decision.stakeholders && decision.stakeholders.length > 0 && (
                    <div>
                      <h3 className="font-display font-semibold text-sm mb-2">Stakeholders</h3>
                      <div className="flex flex-wrap gap-2">
                        {decision.stakeholders.map((s) => (
                          <Badge key={s} variant="default">
                            <Users className="w-3 h-3" /> {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {(!decision.reasoning && !decision.expected_outcomes?.length && !decision.stakeholders?.length) && (
                    <p className="text-sm text-[var(--muted-foreground)] text-center py-6">No additional context added.</p>
                  )}
                </Card>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Right: metadata sidebar ──────────────────────── */}
        <div className="space-y-4">
          <Card>
            <h3 className="font-display font-semibold text-sm mb-4">Details</h3>
            <div className="space-y-4">
              <MetaItem
                icon={Clock}
                label="Created"
                value={formatDate(decision.created_at)}
              />
              {decision.time_horizon && (
                <MetaItem
                  icon={Clock}
                  label="Time horizon"
                  value={TIME_HORIZON_LABELS[decision.time_horizon] ?? decision.time_horizon}
                />
              )}
              {decision.reversibility && (
                <MetaItem
                  icon={RotateCcw}
                  label="Reversibility"
                  value={REVERSIBILITY_LABELS[decision.reversibility] ?? decision.reversibility}
                />
              )}
              {decision.financial_exposure != null && (
                <MetaItem
                  icon={DollarSign}
                  label="Financial exposure"
                  value={formatCurrency(decision.financial_exposure)}
                />
              )}
              {isResolved && decision.resolved_at && (
                <MetaItem
                  icon={CheckCircle2}
                  label="Resolved"
                  value={formatDate(decision.resolved_at)}
                />
              )}
            </div>
          </Card>

          {/* DQS breakdown */}
          {decision.quality_score != null && (
            <Card>
              <h3 className="font-display font-semibold text-sm mb-3">Quality Score</h3>
              <div className="flex items-center gap-4 mb-4">
                <ScoreRing score={Math.round(decision.quality_score)} size={56} strokeWidth={5} />
                <div>
                  <p className={cn('text-2xl font-display font-bold', scoreTextColor(decision.quality_score))}>
                    {Math.round(decision.quality_score)}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)]">out of 100</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: 'Has description',  met: !!decision.description },
                  { label: 'Has reasoning',     met: !!decision.reasoning },
                  { label: 'Has outcomes',      met: (decision.expected_outcomes?.length ?? 0) > 0 },
                  { label: 'Has assumptions',   met: (decision.assumptions?.length ?? 0) > 0 },
                  { label: 'Has time horizon',  met: !!decision.time_horizon },
                  { label: 'Has stakeholders',  met: (decision.stakeholders?.length ?? 0) > 0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <div className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', item.met ? 'bg-emerald-400' : 'bg-[var(--muted)]')} />
                    <span className={item.met ? 'text-[var(--muted-foreground)]' : 'text-[var(--muted-foreground)]'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tags */}
          {decision.tags && decision.tags.length > 0 && (
            <Card>
              <h3 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
                <Tag className="w-3.5 h-3.5" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {decision.tags.map((t) => (
                  <Badge key={t} variant="brand" size="sm">#{t}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
