import { createClient } from "@/lib/supabase/server";

export async function getNotifications(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getUnreadCount(userId: string) {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("notifications")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) return 0;
  return count ?? 0;
}

export async function createNotification(params: {
  userId: string;
  orgId: string;
  title: string;
  message: string;
  type?: string;
  actionUrl?: string;
  actorName?: string;
}) {
  const supabase = await createClient();
  await supabase.from("notifications").insert({
    user_id: params.userId,
    org_id: params.orgId,
    title: params.title,
    message: params.message,
    type: params.type ?? "info",
    action_url: params.actionUrl,
    actor_name: params.actorName,
  });
}
