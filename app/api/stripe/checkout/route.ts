import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url), 303);
  const stripe = getStripe();
  const price = process.env.STRIPE_PRICE_ID;
  if (!stripe || !price) return NextResponse.redirect(new URL("/pricing?setup=required", request.url), 303);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: user.email,
    line_items: [{ price, quantity: 1 }],
    subscription_data: { trial_period_days: 7, metadata: { supabase_user_id: user.id } },
    metadata: { supabase_user_id: user.id },
    success_url: `${request.nextUrl.origin}/account?checkout=success`,
    cancel_url: `${request.nextUrl.origin}/pricing`,
    allow_promotion_codes: true,
  });
  return NextResponse.redirect(session.url!, 303);
}
