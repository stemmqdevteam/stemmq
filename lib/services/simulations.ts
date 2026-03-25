import { createClient } from "@/lib/supabase/server";

export async function getSimulations(orgId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("simulations")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getSimulation(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("simulations")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
