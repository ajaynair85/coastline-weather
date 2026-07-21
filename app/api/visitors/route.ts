import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

export async function GET() {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Visitor count is not configured" }, { status: 503 });

  const { data, error } = await supabase.rpc("get_site_visitor_count");
  if (error) return NextResponse.json({ error: "Visitor count is unavailable" }, { status: 503 });

  return NextResponse.json({ count: Number(data) }, { headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  const supabase = getSupabase();
  if (!supabase) return NextResponse.json({ error: "Visitor count is not configured" }, { status: 503 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body.visitorId !== "string" || !uuidPattern.test(body.visitorId)) {
    return NextResponse.json({ error: "Invalid visitor identifier" }, { status: 400 });
  }

  const { data, error } = await supabase.rpc("record_site_visit", { p_visitor_id: body.visitorId });
  if (error) return NextResponse.json({ error: "Visitor count is unavailable" }, { status: 503 });

  return NextResponse.json({ count: Number(data) }, { headers: { "cache-control": "no-store" } });
}
