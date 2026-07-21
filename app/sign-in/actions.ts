"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function signIn(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/sign-in?error=Accounts+are+being+connected");
  const { error } = await supabase.auth.signInWithPassword({ email: text(formData, "email"), password: text(formData, "password") });
  if (error) redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  redirect("/account");
}

export async function signUp(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/sign-in?error=Accounts+are+being+connected");
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { error } = await supabase.auth.signUp({
    email: text(formData, "email"),
    password: text(formData, "password"),
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });
  if (error) redirect(`/sign-in?error=${encodeURIComponent(error.message)}`);
  redirect("/sign-in?message=Check+your+email+to+confirm+your+account");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/");
}
