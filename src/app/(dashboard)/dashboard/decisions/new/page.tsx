import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { DecisionForm } from '@/features/decisions/components/decision-form'
import { ROUTES } from '@/constants'

export const metadata: Metadata = { title: 'New Decision · StemmQ' }

export default async function NewDecisionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(ROUTES.login)

  const { data: membership } = await supabase
    .from('org_members').select('org_id').eq('user_id', user.id).limit(1).maybeSingle()
  if (!membership) redirect(ROUTES.login)

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">New Decision</h1>
        <p className="text-sm text-surface-500">
          Document what you're deciding, why, and what you're assuming.
        </p>
      </div>
      <DecisionForm mode="create" orgId={membership.org_id} />
    </div>
  )
}
