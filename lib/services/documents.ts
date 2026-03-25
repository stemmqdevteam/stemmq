import { createClient } from "@/lib/supabase/server";

export async function getDocuments(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("documents")
    .select("*, users:uploaded_by(full_name)")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}
