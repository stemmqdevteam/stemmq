'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { useUIStore } from '@/store'
import { cn } from '@/utils'

interface Props {
  userId:  string
  profile: {
    full_name:    string | null
    avatar_url:   string | null
    job_title:    string | null
    display_name: string | null
    bio:          string | null
    appearance:   string | null
  } | null
  email: string
}

const APPEARANCES = [
  { value: 'light', label: 'Light', bg: 'bg-white' },
  { value: 'auto',  label: 'Auto',  bg: 'bg-gradient-to-br from-white to-slate-900' },
  { value: 'dark',  label: 'Dark',  bg: 'bg-slate-950' },
]

const inputClass = 'w-full h-10 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-[var(--muted-foreground)] mt-1">{hint}</p>}
    </div>
  )
}

export function GeneralSettingsForm({ profile, email, userId }: Props) {
  const setTheme = useUIStore((s) => s.setTheme)

  const [isPending, startTransition] = useTransition()
  const [fullName,    setFullName]    = useState(profile?.full_name    ?? '')
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '')
  const [jobTitle,    setJobTitle]    = useState(profile?.job_title    ?? '')
  const [bio,         setBio]         = useState(profile?.bio          ?? '')
  const [appearance,  setAppearance]  = useState(profile?.appearance   ?? 'auto')

  const applyThemeToDom = (value: string) => {
    const root = document.documentElement
    const mq   = window.matchMedia('(prefers-color-scheme: dark)')
    if (value === 'dark')       root.classList.add('dark')
    else if (value === 'light') root.classList.remove('dark')
    else                        root.classList.toggle('dark', mq.matches)
  }

  const pickAppearance = (value: string) => {
    setAppearance(value)
    // Apply to DOM immediately so user sees the change live
    applyThemeToDom(value)
    // Persist to localStorage (ThemeProvider reads this on page load)
    setTheme(value === 'auto' ? 'system' : value as 'light' | 'dark' | 'system')
  }

  const save = () => {
    startTransition(async () => {
      const sb = createClient()

      const { error } = await sb
        .from('user_profiles')
        .upsert(
          {
            id:           userId,
            full_name:    fullName.trim()    || null,
            display_name: displayName.trim() || null,
            job_title:    jobTitle.trim()    || null,
            bio:          bio.trim()         || null,
            appearance,
            updated_at:   new Date().toISOString(),
          },
          { onConflict: 'id', ignoreDuplicates: false }
        )

      if (error) {
        console.error('[general-settings]', error.code, error.message)
        toast.error(`Save failed: ${error.message}`)
        return
      }

      toast.success('Profile saved')
    })
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-bold mb-1 text-[var(--foreground)]">General</h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-8">Your profile and appearance settings.</p>

      {/* Profile */}
      <section className="mb-8 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[var(--accent)] flex items-center justify-center text-white text-xl font-bold flex-shrink-0 overflow-hidden">
            {profile?.avatar_url
              ? <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              : (fullName.charAt(0) || email.charAt(0) || 'U').toUpperCase()
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--foreground)]">Profile photo</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Synced from Google. Change your Google photo to update it here.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name">
            <input value={fullName} onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name" className={inputClass} />
          </Field>
          <Field label="Display name" hint="Used in greetings and AI">
            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nickname" className={inputClass} />
          </Field>
        </div>

        <Field label="Job title">
          <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Head of Product, Founder" className={inputClass} />
        </Field>

        <Field label="Bio">
          <textarea value={bio} onChange={(e) => setBio(e.target.value)}
            placeholder="A short description about yourself..." rows={3}
            className={cn(inputClass, 'h-auto py-2.5 resize-none')} />
        </Field>
      </section>

      <div className="h-px bg-[var(--border)] mb-8" />

      {/* Email */}
      <section className="mb-8">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Email address</p>
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[var(--muted)] border border-[var(--border)]">
          <span className="text-sm text-[var(--foreground)]">{email}</span>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Verified ✓</span>
        </div>
        <p className="text-xs text-[var(--muted-foreground)] mt-2">To change your email, contact support@stemmq.com</p>
      </section>

      <div className="h-px bg-[var(--border)] mb-8" />

      {/* Appearance */}
      <section className="mb-8">
        <p className="text-sm font-semibold text-[var(--foreground)] mb-1">Appearance</p>
        <p className="text-xs text-[var(--muted-foreground)] mb-5">
          Saved to your profile and synced across devices.
          <strong> Auto</strong> follows your OS dark/light mode automatically.
        </p>

        <div className="flex gap-5">
          {APPEARANCES.map((a) => {
            const selected = appearance === a.value
            return (
              <button key={a.value} type="button" onClick={() => pickAppearance(a.value)}
                className="flex flex-col items-center gap-2.5 group">
                <div className={cn(
                  'w-[88px] h-14 rounded-xl border-2 transition-all duration-200 overflow-hidden',
                  a.bg,
                  selected
                    ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/25 scale-105 shadow-lg'
                    : 'border-[var(--border)] opacity-50 group-hover:opacity-80 group-hover:scale-[1.02]'
                )}>
                  <div className="flex items-center gap-1 px-2 pt-2.5">
                    {[4, 3, 3].map((w, i) => (
                      <div key={i} style={{ width: `${w * 4}px` }} className={cn(
                        'h-1.5 rounded-full',
                        a.value === 'dark' ? 'bg-white/20' : a.value === 'auto' ? 'bg-white/30' : 'bg-black/10'
                      )} />
                    ))}
                  </div>
                </div>
                <span className={cn('text-xs font-semibold',
                  selected ? 'text-[var(--accent)]' : 'text-[var(--muted-foreground)]'
                )}>
                  {a.label}
                  {selected && ' ✓'}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-4 px-3 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)]">
          <p className="text-xs text-[var(--muted-foreground)]">
            Current: <span className="font-semibold text-[var(--foreground)] capitalize">{appearance}</span>
            {appearance === 'auto'  && ' — follows your OS setting (changes with system)'}
            {appearance === 'light' && ' — always light regardless of OS'}
            {appearance === 'dark'  && ' — always dark regardless of OS'}
          </p>
        </div>
      </section>

      <div className="h-px bg-[var(--border)] mb-8" />

      {/* Save */}
      <div className="flex justify-end">
        <button onClick={save} disabled={isPending}
          className="flex items-center gap-2 bg-[var(--accent)] text-white font-semibold text-sm px-7 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98]">
          {isPending
            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
            : 'Save changes'
          }
        </button>
      </div>
    </div>
  )
}