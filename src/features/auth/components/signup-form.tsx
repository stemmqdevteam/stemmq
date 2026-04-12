'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, User, Building2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'
import { signupSchema, type SignupInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Step = 'account' | 'workspace' | 'done'

export function SignupForm() {
  const [step, setStep]               = useState<Step>('account')
  const [oauthLoading, setOauthLoading] = useState(false)
  const searchParams = useSearchParams()
  const wantsPro     = searchParams.get('plan') === 'pro'
  const postRedirect = wantsPro ? '/dashboard/settings/billing?upgrade=pro' : '/onboarding'

  const { register, handleSubmit, trigger, getValues, formState: { errors, isSubmitting } } =
    useForm<SignupInput>({
      resolver:      zodResolver(signupSchema),
      defaultValues: { full_name: '', email: '', org_name: '' },
    })

  const nextStep = async () => {
    const ok = await trigger(['full_name', 'email'])
    if (ok) setStep('workspace')
  }

  const onSubmit = async (values: SignupInput) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: values.email,
      options: {
        emailRedirectTo: `${window.location.origin}/callback?redirect=${encodeURIComponent(postRedirect)}`,
        data: { full_name: values.full_name, org_name: values.org_name, is_signup: true },
      },
    })
    if (error) { toast.error(error.message); return }
    setStep('done')
  }

  const handleGoogle = async () => {
    setOauthLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo:  `${window.location.origin}/callback?redirect=${encodeURIComponent(postRedirect)}`,
        queryParams: { access_type: 'offline', prompt: 'consent' },
      },
    })
    if (error) { toast.error(error.message); setOauthLoading(false) }
  }

  if (step === 'done') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-surface-500 text-sm mb-2">
          We sent a magic link to{' '}
          <strong className="text-surface-800 dark:text-surface-200">{getValues('email')}</strong>
        </p>
        <p className="text-xs text-surface-400 mb-8">
          Click the link to verify your email and create your workspace.
          {wantsPro && ' You\'ll be taken to billing to activate Pro after setup.'}
        </p>
        <Button variant="ghost" className="w-full" onClick={() => setStep('account')}>
          Use a different email
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <h2 className="font-display text-3xl font-bold mb-1">
        {wantsPro ? 'Start your Pro workspace' : 'Create your workspace'}
      </h2>
      <p className="text-surface-500 text-sm mb-8">
        {wantsPro
          ? "Sign up and you'll be taken to billing to activate Pro."
          : 'Free forever. No credit card required.'}
      </p>

      {step === 'account' && (
        <>
          <Button
            variant="outline" className="w-full h-11 mb-5"
            onClick={handleGoogle} loading={oauthLoading}
            leftIcon={
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            }
          >
            Continue with Google
          </Button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200 dark:border-surface-800" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs text-surface-400 bg-white dark:bg-surface-950">
                or sign up with email
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <Input
              label="Full name" placeholder="Alex Johnson"
              autoComplete="name" leftIcon={<User className="w-4 h-4" />}
              error={errors.full_name?.message}
              {...register('full_name')}
            />
            <Input
              type="email" label="Work email" placeholder="you@company.com"
              autoComplete="email" leftIcon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Button className="w-full h-11" onClick={nextStep} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Continue
            </Button>
          </div>
        </>
      )}

      {step === 'workspace' && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Organization name" placeholder="Acme Corp"
            leftIcon={<Building2 className="w-4 h-4" />}
            hint="You can change this any time in Settings."
            error={errors.org_name?.message}
            {...register('org_name')}
          />
          <Button type="submit" className="w-full h-11" loading={isSubmitting} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Create workspace
          </Button>
          <button type="button" onClick={() => setStep('account')}
            className="w-full text-center text-sm text-surface-400 hover:text-surface-600 transition-colors">
            ← Back
          </button>
        </form>
      )}

      <p className="text-center text-sm text-surface-500 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
          Sign in
        </Link>
      </p>

      <p className="text-center text-xs text-surface-400 mt-4">
        By signing up you agree to our{' '}
        <Link href="/terms" className="hover:underline">Terms</Link>
        {' '}and{' '}
        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
      </p>
    </motion.div>
  )
}
