import { createClient } from "./server";

export interface UserOrgContext {
  userId: string;
  orgId: string;
  orgRole: string;
}

/**
 * Get the current authenticated user's organization context.
 * Used by server actions and server components.
 */
export async function getCurrentUserOrg(): Promise<UserOrgContext | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: membership } = await supabase
    .from("org_members")
    .select("org_id, role")
    .eq("user_id", user.id)
    .limit(1)
    .single();

  if (!membership) return null;

  return {
    userId: user.id,
    orgId: membership.org_id,
    orgRole: membership.role,
  };
}

/**
 * Log an audit event for the organization.
 */
export async function logAudit(params: {
  orgId: string;
  action: string;
  actorId: string;
  resource?: string;
  resourceType?: string;
  details?: Record<string, unknown>;
}) {
  const supabase = await createClient();

  await supabase.from("audit_logs").insert({
    org_id: params.orgId,
    action: params.action,
    actor_id: params.actorId,
    resource: params.resource,
    resource_type: params.resourceType,
    details: (params.details ?? {}) as import("./database.types").Json,
  });
}
