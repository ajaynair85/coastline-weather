import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getSubscription } from "@/lib/auth";
import { signOut } from "@/app/sign-in/actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Your account | Coastline" };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const subscription = await getSubscription(user.id);
  return <main className="simple-page">
    <nav className="simple-nav"><Link className="brand" href="/">COASTLINE<span>°</span></Link><form action={signOut}><button className="text-button">Sign out</button></form></nav>
    <section className="account-card">
      <p className="eyebrow">Your account</p><h1>{subscription ? "Your coast is unlocked." : "Unlock the full forecast."}</h1>
      <p>{user.email}</p>
      {subscription ? <>
        <div className="membership-status"><span>Coastline Plus</span><b>{subscription.status}</b></div>
        <form action="/api/stripe/portal" method="post"><button className="primary-button">Manage billing</button></form>
      </> : <>
        <p>Get seven-day beach forecasts, wave outlooks, and member-only planning details for $2.99/month.</p>
        <form action="/api/stripe/checkout" method="post"><button className="primary-button">Start 7-day free trial</button></form>
      </>}
      <Link className="back-link" href="/beaches">← Browse beaches</Link>
    </section>
  </main>;
}
