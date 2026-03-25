import { createClient } from "@/lib/supabase/server";

export async function getTeamMembers(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("org_members")
    .select("*, users:user_id(id, email, full_name, avatar_url, role)")
    .eq("org_id", orgId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}
