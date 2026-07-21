import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, getSubscription } from "@/lib/auth";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.redirect(new URL("/sign-in", request.url), 303);
  const subscription = await getSubscription(user.id);
  const stripe = getStripe();
  if (!stripe || !subscription?.stripe_customer_id) return NextResponse.redirect(new URL("/account", request.url), 303);
  const session = await stripe.billingPortal.sessions.create({ customer: subscription.stripe_customer_id, return_url: `${request.nextUrl.origin}/account` });
  return NextResponse.redirect(session.url, 303);
}
