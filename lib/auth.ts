import { createSupabaseServerClient } from "./supabase/server";

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSubscription(userId: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("subscriptions")
    .select("status,current_period_end,stripe_customer_id")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .maybeSingle();
  return data;
}
