"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { bayAreaBeaches, beaches } from "@/lib/beaches";
import type { BeachWeather } from "@/lib/weather";

const zipAnchors: Record<string, string> = {
  "940": "Pacifica State Beach", "941": "Baker Beach", "949": "Rodeo Beach", "950": "Santa Cruz", "939": "Monterey Bay", "934": "Pismo Beach", "900": "Venice Beach", "902": "Venice Beach", "904": "Santa Monica", "926": "Huntington Beach", "920": "La Jolla Cove", "921": "La Jolla Cove", "955": "Crescent City",
};

export default function Home() {
  const [region, setRegion] = useState("Bay Area");
  const [zoom, setZoom] = useState(1);
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("Bay Area beaches are ready to explore—try 94121, 94044, or 94941.");
  const [activeBeach, setActiveBeach] = useState("Pacifica State Beach");
  const [live, setLive] = useState<BeachWeather | null>(null);

  const visible = useMemo(() => region === "All coast" ? beaches : beaches.filter((beach) => beach.region === region), [region]);
  const selected = beaches.find((beach) => beach.name === activeBeach) ?? beaches[2];

  useEffect(() => {
    let active = true;
    setLive(null);
    fetch(`/api/weather/${selected.slug}`).then((response) => response.ok ? response.json() : Promise.reject()).then((data) => { if (active) setLive(data); }).catch(() => undefined);
    return () => { active = false; };
  }, [selected.slug]);

  function searchZip(event: FormEvent) {
    event.preventDefault();
    const match = zipAnchors[zip.trim().slice(0, 3)];
    if (!match) {
      setMessage("Try a California coastal ZIP, such as 95060, 93940, 90291, or 92037.");
      return;
    }
    const beach = beaches.find((item) => item.name === match)!;
    setActiveBeach(beach.name);
    setRegion(beach.region);
    setZoom(1.35);
    setMessage(`Closest coast match: ${beach.name} · ${beach.region}.`);
    document.getElementById("beach-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main>
      <section className="hero">
        <nav className="nav"><a className="brand" href="#top">COASTLINE<span>°</span></a><div><a href="#conditions">Conditions</a><Link href="/beaches">Beaches</Link><Link href="/pricing">Membership</Link><Link href="/sign-in">Sign in</Link></div></nav>
        <div className="hero-grid" id="top">
          <div className="hero-copy"><p className="eyebrow">California beach weather</p><h1>The coast,<br /><em>at a glance for Meagan.</em></h1><p className="lede">Plan a salt-air day with beach-by-beach temperatures, wind, surf and public live cameras along California&apos;s 840-mile shore.</p>
          </div>
          <aside className="today-card"><p>Today on the coast</p><div className="sun">☀</div><strong>72°</strong><span>Clear & coastal</span><dl><div><dt>Best beach window</dt><dd>10 AM – 3 PM</dd></div><div><dt>Pacific breeze</dt><dd>6–10 mph</dd></div></dl></aside>
        </div>
        <div className="wave wave-one" /><div className="wave wave-two" />
      </section>

      <section className="explorer" id="conditions"><div className="section-head"><div><p className="eyebrow">Explore the shoreline</p><h2>Pick a region. Zoom the coast.</h2></div><div className="map-tools" aria-label="Map zoom controls"><button onClick={() => setZoom(Math.max(0.8, zoom - 0.15))} aria-label="Zoom out">−</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(Math.min(1.7, zoom + 0.15))} aria-label="Zoom in">+</button></div></div>
        <div className="region-tabs" aria-label="California coast regions">{["Bay Area", "All coast", "North Coast", "Central Coast", "Los Angeles", "Orange County", "San Diego"].map((item) => <button className={region === item ? "active" : ""} key={item} onClick={() => setRegion(item)}>{item}</button>)}</div>
        {region === "Bay Area" && <div className="bay-beach-picker" aria-label="Bay Area beaches"><span>Bay Area beaches</span>{bayAreaBeaches.map((beach) => <button className={activeBeach === beach.name ? "active" : ""} key={beach.name} onClick={() => setActiveBeach(beach.name)}>{beach.name}</button>)}</div>}
        <div className="map-and-feature"><div className="map-frame"><div className="ca-map" style={{ transform: `scale(${zoom})` }} aria-label="Stylized California coastline map">{beaches.map((beach, index) => <button key={beach.name} className={`map-pin pin-${index} ${activeBeach === beach.name ? "selected" : ""}`} onClick={() => { setActiveBeach(beach.name); setRegion(beach.region); }} aria-label={`Show ${beach.name}`}>{index + 1}</button>)}</div><p className="map-caption">Tap a numbered coast stop to see its conditions.</p></div>
          <article className="feature-card"><p className="eyebrow">Highlighted beach · {live ? "Live now" : "Updating"}</p><h3>{selected.name}</h3><div className="feature-temp">{live?.temperature ?? selected.temp}° <span>{live?.condition ?? `${selected.status} for a beach day`}</span></div><div className="metrics"><div><b>Water</b><span>{live?.waterTemperature ?? selected.water}°</span></div><div><b>Wind</b><span>{live ? `${live.windDirection} ${live.windSpeed} mph` : selected.wind}</span></div><div><b>Surf</b><span>{live?.waveHeight ? `${live.waveHeight} ft` : selected.surf}</span></div></div><Link className="cam-link" href={`/beaches/${selected.slug}`}>Open live forecast <span>→</span></Link></article></div>
      </section>

      <section className="conditions" id="beach-list"><div className="section-head"><div><p className="eyebrow">Beach-by-beach</p><h2>{region === "Bay Area" ? "Bay Area beach picks." : "Where to head next."}</h2></div><p className="quiet">Open a beach for live conditions</p></div><div className="beach-grid">{visible.map((beach) => <article className={`beach-card ${activeBeach === beach.name ? "chosen" : ""}`} key={beach.name} onClick={() => setActiveBeach(beach.name)}><div className={`card-sky ${beach.accent}`}><span>{beach.status}</span><i>☀</i></div><div className="card-body"><p>{beach.region}</p><h3>{beach.name}</h3><div className="card-temp">{beach.temp}° <span>typical snapshot</span></div><div className="mini-metrics"><span>Water <b>{beach.water}°</b></span><span>Wind <b>{beach.wind}</b></span><span>Surf <b>{beach.surf}</b></span></div><Link href={`/beaches/${beach.slug}`} onClick={(event) => event.stopPropagation()}>Live forecast →</Link></div></article>)}</div></section>

      <section className="cams" id="cameras"><div><p className="eyebrow">Live views</p><h2>See the Bay Area coast before you go.</h2><p>Every Bay Area beach has a working camera link. Where no dependable beach-specific feed exists, the link is clearly labeled as a nearby coastal camera.</p></div><div className="cam-list">{bayAreaBeaches.map((beach) => <a href={beach.cam} key={beach.name} target="_blank" rel="noreferrer"><span className="cam-dot" />{beach.name}<b>{beach.camLabel ?? "Open camera"} ↗</b></a>)}</div></section>
      <section className="bottom-search"><div><p className="eyebrow">Bay Area beach finder</p><h2>Find your nearest coast.</h2></div><div><form className="zip-search" onSubmit={searchZip}><label htmlFor="zip">Enter a ZIP code</label><div><input id="zip" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="Try a Bay Area ZIP" inputMode="numeric" /><button type="submit">Search</button></div></form><p className="search-note" role="status">{message}</p></div></section>
      <footer><a className="brand" href="#top">COASTLINE<span>°</span></a><p>For beach planning, not marine safety. Check local alerts before entering the water.</p></footer>
    </main>
  );
}
