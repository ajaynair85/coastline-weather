import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Coastline Plus — $2.99/month", description: "Unlock seven-day California beach forecasts with a seven-day free trial." };

export default async function PricingPage({ searchParams }: { searchParams: Promise<{ setup?: string }> }) {
  const [user, query] = await Promise.all([getCurrentUser(), searchParams]);
  return <main className="simple-page pricing-page">
    <nav className="simple-nav"><Link className="brand" href="/">COASTLINE<span>°</span></Link><Link href={user ? "/account" : "/sign-in"}>{user ? "Account" : "Sign in"}</Link></nav>
    <section className="pricing-hero"><p className="eyebrow">Coastline Plus</p><h1>More confidence<br /><em>before the coast.</em></h1><p>Live current conditions stay free. Members unlock the complete seven-day planning outlook at every California beach.</p></section>
    <section className="price-card"><div><p>Monthly membership</p><strong>$2.99 <span>/ month</span></strong><small>7 days free · cancel anytime</small></div><ul><li>Seven-day air temperature forecast</li><li>Daily wind and wave outlook</li><li>Every California beach page</li><li>Live camera shortcuts</li><li>More member tools coming next</li></ul>{query.setup && <p className="form-message">Payments are ready in the site. Add the production keys in Vercel to activate checkout.</p>}<Link className="primary-button" href={user ? "/account" : "/sign-in"}>{user ? "Start free trial" : "Create account & start trial"}</Link></section>
  </main>;
}
