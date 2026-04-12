import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getDecisionById } from '@/lib/supabase/queries'
import { DecisionForm } from '@/features/decisions/components/decision-form'
import { ROUTES } from '@/constants'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = { title: 'Edit Decision · StemmQ' }

export default async function EditDecisionPage({ params }: Props) {
  const { id } = await params

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(id)) notFound()

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(ROUTES.login)

  const { data: membership } = await supabase
    .from('org_members')
    .select('org_id, role')
    .eq('user_id', user.id)
    .limit(1)
    .maybeSingle()

  if (!membership) redirect(ROUTES.login)

  const canEdit = ['owner', 'admin', 'member'].includes(membership.role)
  if (!canEdit) redirect(`${ROUTES.decisions}/${id}`)

  const { data: decision, error } = await getDecisionById(supabase, id, membership.org_id)
  if (error || !decision) notFound()

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold mb-1">Edit Decision</h1>
        <p className="text-sm text-surface-500 truncate">{decision.title}</p>
      </div>
      <DecisionForm mode="edit" decision={decision} orgId={membership.org_id} />
    </div>
  )
}
