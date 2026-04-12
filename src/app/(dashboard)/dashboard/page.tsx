import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getDashboardStats, getUserOrgMembership, getDecisions } from '@/lib/supabase/queries'
import { DashboardOverview } from '@/features/analytics/components/dashboard-overview'
import { ROUTES } from '@/constants'

export const metadata: Metadata = { title: 'Overview' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(ROUTES.login)

  const { data: membership } = await getUserOrgMembership(supabase, user.id)
  if (!membership) redirect(ROUTES.onboarding)

  const orgId = membership.org_id

  // Fetch profile server-side so greeting shows correct name on first render
  const [stats, { data: recent }, { data: profile }] = await Promise.all([
    getDashboardStats(supabase, orgId),
    getDecisions(supabase, orgId, { perPage: 6 }),
    supabase.from('user_profiles').select('full_name, avatar_url').eq('id', user.id).single(),
  ])

  return (
    <DashboardOverview
      stats={stats}
      recentDecisions={recent ?? []}
      serverFirstName={profile?.full_name?.split(' ')[0] ?? null}
    />
  )
}
