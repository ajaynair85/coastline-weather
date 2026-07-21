import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { beaches, beachPath, getBeach } from "@/lib/beaches";
import { getBeachWeather } from "@/lib/weather";
import { getCurrentUser, getSubscription } from "@/lib/auth";
import { siteUrl } from "@/lib/site";

export const revalidate = 900;

export function generateStaticParams() {
  return beaches.map((beach) => ({ slug: beach.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const beach = getBeach((await params).slug);
  if (!beach) return {};
  const title = `${beach.name} weather, waves & live cam | Coastline`;
  return {
    title,
    description: `Live ${beach.name} air temperature, wind, water temperature, wave height, seven-day outlook, and coastal camera.`,
    alternates: { canonical: `${siteUrl}${beachPath(beach)}` },
    openGraph: { title, description: beach.description, url: `${siteUrl}${beachPath(beach)}` },
  };
}

export default async function BeachPage({ params }: { params: Promise<{ slug: string }> }) {
  const beach = getBeach((await params).slug);
  if (!beach) notFound();
  const [weather, user] = await Promise.all([getBeachWeather(beach), getCurrentUser()]);
  const subscription = user ? await getSubscription(user.id) : null;
  const unlocked = Boolean(subscription);
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebPage", name: `${beach.name} beach weather`, description: beach.description,
    url: `${siteUrl}${beachPath(beach)}`, isAccessibleForFree: true,
    about: { "@type": "Beach", name: beach.name, geo: { "@type": "GeoCoordinates", latitude: beach.latitude, longitude: beach.longitude } },
    hasPart: { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: ".member-forecast" },
  };
  return <main className="beach-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <nav className="simple-nav"><Link className="brand" href="/">COASTLINE<span>°</span></Link><div><Link href="/beaches">All beaches</Link><Link href={user ? "/account" : "/sign-in"}>{user ? "Account" : "Sign in"}</Link></div></nav>
    <header className="beach-hero"><div><p className="eyebrow">{beach.region} · Updated {new Date(weather.updatedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p><h1>{beach.name}</h1><p>{beach.description}</p></div><div className="live-badge"><span /> Live forecast data</div></header>
    <section className="current-panel">
      <div className="current-main"><p>Right now</p><strong>{weather.temperature}°</strong><span>{weather.condition}</span></div>
      <dl><div><dt>Water</dt><dd>{weather.waterTemperature ?? "—"}°F</dd></div><div><dt>Waves</dt><dd>{weather.waveHeight ?? "—"} ft</dd></div><div><dt>Wind</dt><dd>{weather.windDirection} {weather.windSpeed} mph</dd></div><div><dt>ZIP</dt><dd>{beach.zip}</dd></div></dl>
    </section>
    <section className="beach-info"><div><p className="eyebrow">Live view</p><h2>Check the shoreline.</h2><p>Camera availability is controlled by its operator.</p></div><a className="camera-button" href={beach.cam} target="_blank" rel="noreferrer">{beach.camLabel ?? "Open camera"} ↗</a></section>
    <section className="member-forecast">
      <div className="forecast-heading"><div><p className="eyebrow">Coastline Plus</p><h2>Seven-day beach outlook.</h2></div>{unlocked && <span className="unlocked">Member access</span>}</div>
      {unlocked ? <div className="forecast-grid">{weather.forecast.map((day) => <article key={day.date}><p>{new Date(`${day.date}T12:00:00`).toLocaleDateString("en-US", { weekday: "short" })}</p><strong>{day.high}°</strong><span>{day.condition}</span><dl><div><dt>Low</dt><dd>{day.low}°</dd></div><div><dt>Wind</dt><dd>{day.wind} mph</dd></div><div><dt>Waves</dt><dd>{day.wave ?? "—"} ft</dd></div></dl></article>)}</div> : <div className="paywall-card"><div className="blur-forecast" aria-hidden="true"><span>Tue 68°</span><span>Wed 66°</span><span>Thu 70°</span></div><div><h3>Plan the whole week.</h3><p>Unlock daily highs and lows, maximum wind, and wave outlooks for every beach.</p><Link className="primary-button" href={user ? "/account" : "/sign-in"}>{user ? "Start 7-day free trial" : "Create an account"}</Link><small>Then $2.99/month. Cancel anytime.</small></div></div>}
    </section>
    <footer><Link className="brand" href="/">COASTLINE<span>°</span></Link><p>Forecasts are for planning, not marine safety. Data: Open-Meteo with contributing national weather services.</p></footer>
  </main>;
}
