"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/providers/auth-provider";

interface OrgContext {
  orgId: string | null;
  orgRole: string | null;
  plan: string | null;
  isLoading: boolean;
}

export function useOrg(): OrgContext {
  const { user } = useAuth();
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgRole, setOrgRole] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    async function fetchOrg() {
      const { data: membership } = await supabase
        .from("org_members")
        .select("org_id, role")
        .eq("user_id", user!.id)
        .limit(1)
        .single();

      if (membership) {
        setOrgId(membership.org_id);
        setOrgRole(membership.role);

        const { data: subscription } = await supabase
          .from("subscriptions")
          .select("plan")
          .eq("org_id", membership.org_id)
          .single();

        setPlan(subscription?.plan ?? "free");
      }
      setIsLoading(false);
    }

    fetchOrg();
  }, [user]);

  return { orgId, orgRole, plan, isLoading };
}
