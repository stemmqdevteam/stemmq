import { createClient } from "@/lib/supabase/server";

export async function getActivityFeed(orgId: string, limit: number = 20) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("audit_logs")
    .select("*, users:actor_id(full_name, avatar_url, email)")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
}
