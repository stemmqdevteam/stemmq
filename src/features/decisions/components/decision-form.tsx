'use client'

import { useActionState, useState, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, ChevronDown, ChevronUp, Target,
  Brain, GitBranch, DollarSign, Clock, RotateCcw,
  Users, Tag, Lightbulb, AlertCircle, X,
} from 'lucide-react'
import { toast } from 'sonner'
import { createDecision, updateDecision } from '@/features/decisions/actions'
import { AISuggestButton } from '@/features/decisions/components/ai-suggest-button'
import { Button } from '@/componentsz'
import { Input, Textarea, Select } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils'
import type { Decision, ActionResult } from '@/types'

/* ── Types ───────────────────────────────────────────────── */
interface ExpectedOutcome {
  id: string
  title: string
  metric: string
  target_value: string
  timeframe: string
}

interface Props {
  mode: 'create' | 'edit'
  decision?: Decision
  orgId: string
}

/* ── Option constants ────────────────────────────────────── */
const INTENT_OPTIONS = [
  { value: 'growth',     label: '📈 Growth — expand, acquire, scale' },
  { value: 'efficiency', label: '⚡ Efficiency — reduce cost, improve operations' },
  { value: 'risk',       label: '🛡️ Risk — mitigate, protect, prevent' },
  { value: 'experiment', label: '🧪 Experiment — test hypothesis, learn' },
  { value: 'other',      label: '⚙️ Other' },
]

const HORIZON_OPTIONS = [
  { value: 'days',     label: 'Days (< 1 week)' },
  { value: 'weeks',    label: 'Weeks (1–4 weeks)' },
  { value: 'months',   label: 'Months (1–6 months)' },
  { value: 'quarters', label: 'Quarters (3–12 months)' },
  { value: 'years',    label: 'Years (1+ years)' },
]

const REVERSIBILITY_OPTIONS = [
  { value: 'easily_reversible', label: '🔄 Easily reversible — undo at any time' },
  { value: 'reversible',        label: '↩️ Reversible — possible but costly' },
  { value: 'difficult',         label: '⚠️ Difficult — significant cost to reverse' },
  { value: 'irreversible',      label: '🔒 Irreversible — cannot be undone' },
]

/* ── Assumption Item ─────────────────────────────────────── */
function AssumptionItem({
  value, index, total, onChange, onRemove,
}: {
  value: string; index: number; total: number
  onChange: (v: string) => void; onRemove: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="flex gap-2"
    >
      <div className="flex items-center justify-center w-6 h-10 text-xs font-mono text-surface-400 flex-shrink-0 mt-0">
        {index + 1}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`e.g. "Users will prefer the new checkout flow"`}
        className={cn(
          'flex-1 h-10 px-3 text-sm rounded-[10px] border outline-none transition-all',
          'bg-white dark:bg-surface-900/60',
          'border-surface-200 dark:border-surface-700',
          'hover:border-surface-300 dark:hover:border-surface-600',
          'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10',
          'placeholder:text-surface-400'
        )}
      />
      <button
        type="button"
        onClick={onRemove}
        disabled={total <= 1}
        className="p-2 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors disabled:opacity-30 disabled:pointer-events-none flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

/* ── Section wrapper ─────────────────────────────────────── */
function Section({
  title, description, icon: Icon, children, collapsible = false, defaultOpen = true,
}: {
  title: string; description?: string; icon: React.ElementType
  children: React.ReactNode; collapsible?: boolean; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Card>
      <div
        className={cn('flex items-start justify-between mb-4', collapsible && 'cursor-pointer')}
        onClick={collapsible ? () => setOpen((v) => !v) : undefined}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm">{title}</h3>
            {description && <p className="text-xs text-surface-400 mt-0.5">{description}</p>}
          </div>
        </div>
        {collapsible && (
          <button type="button" className="text-surface-400 p-1">
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        )}
      </div>
      <AnimatePresence initial={false}>
        {(!collapsible || open) && (
          <motion.div
            initial={collapsible ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

/* ── Main Form ───────────────────────────────────────────── */
export function DecisionForm({ mode, decision, orgId }: Props) {
  // Assumptions state
  const [assumptions, setAssumptions] = useState<string[]>(
    decision?.assumptions?.map((a) => a.content) ?? ['']
  )

  // Outcomes state
  const [outcomes, setOutcomes] = useState<ExpectedOutcome[]>(
    (decision?.expected_outcomes ?? []).map((o) => ({
      id:           o.id,
      title:        o.title,
      metric:       o.metric ?? '',
      target_value: o.target_value ?? '',
      timeframe:    o.timeframe ?? '',
    }))
  )

  // Track core fields for AI context (AI needs to read them without form submit)
  const [aiTitle, setAiTitle]           = useState(decision?.title ?? '')
  const [aiDescription, setAiDescription] = useState(decision?.description ?? '')
  const [aiIntent, setAiIntent]         = useState(decision?.intent ?? '')
  const [aiReasoning, setAiReasoning]   = useState(decision?.reasoning ?? '')

  // Stakeholders / tags
  const [stakeholders, setStakeholders] = useState<string[]>(decision?.stakeholders ?? [])
  const [stakeholderInput, setStakeholderInput] = useState('')
  const [tags, setTags] = useState<string[]>(decision?.tags ?? [])
  const [tagInput, setTagInput] = useState('')

  // Server action
  const action = mode === 'create'
    ? createDecision
    : updateDecision.bind(null, decision!.id)

  const [state, formAction, isPending] = useActionState<ActionResult, FormData>(
    action as (state: ActionResult, formData: FormData) => Promise<ActionResult>,
    { success: false, error: null, fieldErrors: {} }
  )

  const addAssumption = () => setAssumptions((prev) => [...prev, ''])
  const updateAssumption = (i: number, v: string) =>
    setAssumptions((prev) => prev.map((a, idx) => (idx === i ? v : a)))
  const removeAssumption = (i: number) =>
    setAssumptions((prev) => prev.filter((_, idx) => idx !== i))

  const addOutcome = () =>
    setOutcomes((prev) => [
      ...prev,
      { id: Math.random().toString(36).slice(2), title: '', metric: '', target_value: '', timeframe: '' },
    ])
  const updateOutcome = (i: number, key: keyof ExpectedOutcome, val: string) =>
    setOutcomes((prev) => prev.map((o, idx) => (idx === i ? { ...o, [key]: val } : o)))
  const removeOutcome = (i: number) => setOutcomes((prev) => prev.filter((_, idx) => idx !== i))

  const addStakeholder = () => {
    if (stakeholderInput.trim()) {
      setStakeholders((prev) => [...prev, stakeholderInput.trim()])
      setStakeholderInput('')
    }
  }
  const addTag = () => {
    if (tagInput.trim() && tags.length < 10) {
      setTags((prev) => [...prev, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden fields for complex data */}
      <input type="hidden" name="assumptions" value={JSON.stringify(assumptions.filter((a) => a.trim()))} />
      <input type="hidden" name="expected_outcomes" value={JSON.stringify(outcomes.filter((o) => o.title.trim()))} />
      <input type="hidden" name="stakeholders" value={JSON.stringify(stakeholders)} />
      <input type="hidden" name="tags" value={tags.join(',')} />

      {/* Error banner */}
      {state?.error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
        >
          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{state.error}</p>
        </motion.div>
      )}

      {/* ── Core ──────────────────────────────────────────── */}
      <Section title="Decision" description="Define what you're deciding and why." icon={GitBranch}>
        <div className="space-y-4">
          <Input
            name="title"
            label="Decision title"
            placeholder="e.g. Launch paid tier for enterprise customers"
            defaultValue={decision?.title}
            required
            hint="Be specific. A good title is a complete sentence."
            error={(state?.fieldErrors as Record<string, string[]> | undefined)?.title?.[0]}
            onChange={(e) => setAiTitle(e.target.value)}
          />
          <Select
            name="intent"
            label="Intent"
            options={INTENT_OPTIONS}
            placeholder="What is the primary intent?"
            defaultValue={decision?.intent}
            required
            error={(state?.fieldErrors as Record<string, string[]> | undefined)?.intent?.[0]}
          />
          <Textarea
            name="description"
            label="Context & background"
            placeholder="What's the situation? Why is this decision being made now?"
            defaultValue={decision?.description ?? ''}
            hint="Optional but improves your Decision Quality Score."
          />
          <Input
            name="category"
            label="Category"
            placeholder="e.g. Product, Marketing, Engineering"
            defaultValue={decision?.category ?? ''}
          />
        </div>
      </Section>

      {/* ── Assumptions ───────────────────────────────────── */}
      <Section
        title="Assumptions"
        description="Every assumption this decision depends on. Required — at least one."
        icon={Brain}
      >
        <div className="space-y-2.5">
          <AnimatePresence>
            {assumptions.map((a, i) => (
              <AssumptionItem
                key={i}
                value={a}
                index={i}
                total={assumptions.length}
                onChange={(v) => updateAssumption(i, v)}
                onRemove={() => removeAssumption(i)}
              />
            ))}
          </AnimatePresence>

          {(state?.fieldErrors as Record<string, string[]> | undefined)?.assumptions && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {(state?.fieldErrors as Record<string, string[]> | undefined)?.assumptions?.[0]}
            </p>
          )}

          <div className="flex items-center gap-4 mt-2 flex-wrap">
            <button
              type="button"
              onClick={addAssumption}
              className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add assumption
            </button>
            <AISuggestButton
              title={aiTitle}
              description={aiDescription}
              intent={aiIntent}
              reasoning={aiReasoning}
              existingAssumptions={assumptions}
              onAdd={(s) => setAssumptions((prev) => [...prev.filter(a => a.trim()), s])}
            />
          </div>

          <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                Assumptions are the beliefs your decision relies on. Document them now — then mark each correct, incorrect, or partially correct as reality unfolds.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Expected Outcomes ─────────────────────────────── */}
      <Section
        title="Expected outcomes"
        description="What results do you expect? Link metrics to targets."
        icon={Target}
        collapsible
      >
        <div className="space-y-4">
          {outcomes.map((o, i) => (
            <div key={o.id} className="p-4 rounded-xl border border-surface-100 dark:border-surface-800 space-y-3 relative">
              <button
                type="button"
                onClick={() => removeOutcome(i)}
                className="absolute top-3 right-3 p-1 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <Input
                label={`Outcome ${i + 1}`}
                placeholder="e.g. Increase MRR by 20%"
                value={o.title}
                onChange={(e) => updateOutcome(i, 'title', e.target.value)}
              />
              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="Metric"
                  placeholder="e.g. MRR"
                  value={o.metric}
                  onChange={(e) => updateOutcome(i, 'metric', e.target.value)}
                />
                <Input
                  label="Target"
                  placeholder="e.g. +$50k"
                  value={o.target_value}
                  onChange={(e) => updateOutcome(i, 'target_value', e.target.value)}
                />
                <Input
                  label="Timeframe"
                  placeholder="e.g. Q2 2025"
                  value={o.timeframe}
                  onChange={(e) => updateOutcome(i, 'timeframe', e.target.value)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addOutcome}
            className="flex items-center gap-2 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add expected outcome
          </button>
        </div>
      </Section>

      {/* ── Reasoning ─────────────────────────────────────── */}
      <Section
        title="Reasoning"
        description="Why this decision? What alternatives were considered?"
        icon={Lightbulb}
        collapsible
        defaultOpen={false}
      >
        <div className="space-y-4">
          <Textarea
            name="reasoning"
            label="Reasoning"
            placeholder="Document your thinking process. Why this approach over alternatives?"
            defaultValue={decision?.reasoning ?? ''}
            className="min-h-[120px]"
          />
        </div>
      </Section>

      {/* ── Decision properties ────────────────────────────── */}
      <Section
        title="Properties"
        description="Time horizon, reversibility, and financial context."
        icon={Clock}
        collapsible
        defaultOpen={!!decision}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Select
            name="time_horizon"
            label="Time horizon"
            options={HORIZON_OPTIONS}
            placeholder="When will we know the result?"
            defaultValue={decision?.time_horizon ?? ''}
          />
          <Select
            name="reversibility"
            label="Reversibility"
            options={REVERSIBILITY_OPTIONS}
            placeholder="How hard to undo?"
            defaultValue={decision?.reversibility ?? ''}
          />
          <Input
            name="financial_exposure"
            label="Financial exposure ($)"
            type="number"
            placeholder="0"
            defaultValue={decision?.financial_exposure?.toString() ?? ''}
            hint="Estimated cost or revenue impact"
            leftIcon={<DollarSign className="w-4 h-4" />}
          />
        </div>
      </Section>

      {/* ── Stakeholders ──────────────────────────────────── */}
      <Section
        title="Stakeholders"
        description="Who is affected by or involved in this decision?"
        icon={Users}
        collapsible
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              value={stakeholderInput}
              onChange={(e) => setStakeholderInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addStakeholder() } }}
              placeholder="Add a stakeholder name or role"
              className={cn(
                'flex-1 h-10 px-3 text-sm rounded-[10px] border outline-none transition-all',
                'bg-white dark:bg-surface-900/60',
                'border-surface-200 dark:border-surface-700',
                'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10',
                'placeholder:text-surface-400'
              )}
            />
            <Button type="button" variant="secondary" size="sm" onClick={addStakeholder}>
              Add
            </Button>
          </div>
          {stakeholders.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {stakeholders.map((s, i) => (
                <Badge key={i} variant="default" className="gap-1.5">
                  <Users className="w-3 h-3" />
                  {s}
                  <button
                    type="button"
                    onClick={() => setStakeholders((prev) => prev.filter((_, idx) => idx !== i))}
                    className="ml-0.5 hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ── Tags ──────────────────────────────────────────── */}
      <Section
        title="Tags"
        description="Label this decision for easy filtering."
        icon={Tag}
        collapsible
        defaultOpen={false}
      >
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
              placeholder="Add a tag"
              className={cn(
                'flex-1 h-10 px-3 text-sm rounded-[10px] border outline-none transition-all',
                'bg-white dark:bg-surface-900/60',
                'border-surface-200 dark:border-surface-700',
                'focus:border-brand-500 focus:ring-3 focus:ring-brand-500/10',
                'placeholder:text-surface-400'
              )}
            />
            <Button type="button" variant="secondary" size="sm" onClick={addTag} disabled={tags.length >= 10}>
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <Badge key={i} variant="brand" size="sm" className="gap-1">
                  #{t}
                  <button
                    type="button"
                    onClick={() => setTags((prev) => prev.filter((_, idx) => idx !== i))}
                    className="ml-0.5 hover:text-red-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ── Submit ────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-surface-400">
          Decisions with more context score higher on the Quality Index.
        </p>
        <Button type="submit" loading={isPending} size="lg">
          {mode === 'create' ? 'Create decision' : 'Save changes'}
        </Button>
      </div>
    </form>
  )
}
