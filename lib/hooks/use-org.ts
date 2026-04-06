"use client";

import { useState, useEffect } from "react";
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

    setOrgId("demo-org");
    setOrgRole("admin");
    setPlan("growth");
    setIsLoading(false);
  }, [user]);

  return { orgId, orgRole, plan, isLoading };
}
