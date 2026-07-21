"use client";

import { FormEvent, useMemo, useState } from "react";

type Beach = {
  name: string;
  region: string;
  zip: string;
  temp: number;
  water: number;
  wind: string;
  surf: string;
  status: "Great" | "Good" | "Breezy";
  cam: string;
  accent: string;
};

const beaches: Beach[] = [
  { name: "Crescent City", region: "North Coast", zip: "95531", temp: 61, water: 54, wind: "NW 9 mph", surf: "3–4 ft", status: "Breezy", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "north" },
  { name: "Point Reyes", region: "North Coast", zip: "94956", temp: 64, water: 55, wind: "W 7 mph", surf: "2–3 ft", status: "Good", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "north" },
  { name: "Santa Cruz", region: "Central Coast", zip: "95060", temp: 68, water: 58, wind: "NW 6 mph", surf: "2–3 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "central" },
  { name: "Monterey Bay", region: "Central Coast", zip: "93940", temp: 66, water: 57, wind: "W 8 mph", surf: "2 ft", status: "Good", cam: "https://www.montereybayaquarium.org/cams-videos/live-cams/monterey-bay-cam", accent: "central" },
  { name: "Pismo Beach", region: "Central Coast", zip: "93449", temp: 71, water: 60, wind: "NW 10 mph", surf: "2–3 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "central" },
  { name: "Santa Monica", region: "Los Angeles", zip: "90401", temp: 73, water: 65, wind: "W 8 mph", surf: "1–2 ft", status: "Great", cam: "https://www.californiabeaches.com/southern-california-beach-webcams/", accent: "south" },
  { name: "Venice Beach", region: "Los Angeles", zip: "90291", temp: 74, water: 65, wind: "W 9 mph", surf: "1–2 ft", status: "Great", cam: "https://www.westland.net/beachcam/", accent: "south" },
  { name: "Huntington Beach", region: "Orange County", zip: "92648", temp: 75, water: 66, wind: "SW 7 mph", surf: "2–3 ft", status: "Good", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "south" },
  { name: "La Jolla Cove", region: "San Diego", zip: "92037", temp: 76, water: 67, wind: "W 6 mph", surf: "1–2 ft", status: "Great", cam: "https://www.coastal.ca.gov/publiced/fun/webcams.html", accent: "south" },
];

const zipAnchors: Record<string, string> = {
  "941": "Point Reyes", "949": "Point Reyes", "950": "Santa Cruz", "939": "Monterey Bay", "934": "Pismo Beach", "900": "Venice Beach", "902": "Venice Beach", "904": "Santa Monica", "926": "Huntington Beach", "920": "La Jolla Cove", "921": "La Jolla Cove", "955": "Crescent City",
};

export default function Home() {
  const [region, setRegion] = useState("All coast");
  const [zoom, setZoom] = useState(1);
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("Browse conditions from Crescent City to San Diego.");
  const [activeBeach, setActiveBeach] = useState("Santa Cruz");

  const visible = useMemo(() => region === "All coast" ? beaches : beaches.filter((beach) => beach.region === region), [region]);
  const selected = beaches.find((beach) => beach.name === activeBeach) ?? beaches[2];

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
        <nav className="nav"><a className="brand" href="#top">COASTLINE<span>°</span></a><div><a href="#conditions">Conditions</a><a href="#cameras">Live cams</a></div></nav>
        <div className="hero-grid" id="top">
          <div className="hero-copy"><p className="eyebrow">California beach weather</p><h1>The coast,<br /><em>at a glance.</em></h1><p className="lede">Plan a salt-air day with beach-by-beach temperatures, wind, surf and public live cameras along California&apos;s 840-mile shore.</p>
            <form className="zip-search" onSubmit={searchZip}><label htmlFor="zip">Find your nearest coast</label><div><input id="zip" value={zip} onChange={(event) => setZip(event.target.value.replace(/\D/g, "").slice(0, 5))} placeholder="Enter ZIP code" inputMode="numeric" /><button type="submit">Search</button></div></form>
            <p className="search-note" role="status">{message}</p>
          </div>
          <aside className="today-card"><p>Today on the coast</p><div className="sun">☀</div><strong>72°</strong><span>Clear & coastal</span><dl><div><dt>Best beach window</dt><dd>10 AM – 3 PM</dd></div><div><dt>Pacific breeze</dt><dd>6–10 mph</dd></div></dl></aside>
        </div>
        <div className="wave wave-one" /><div className="wave wave-two" />
      </section>

      <section className="explorer" id="conditions"><div className="section-head"><div><p className="eyebrow">Explore the shoreline</p><h2>Pick a region. Zoom the coast.</h2></div><div className="map-tools" aria-label="Map zoom controls"><button onClick={() => setZoom(Math.max(0.8, zoom - 0.15))} aria-label="Zoom out">−</button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(Math.min(1.7, zoom + 0.15))} aria-label="Zoom in">+</button></div></div>
        <div className="region-tabs" aria-label="California coast regions">{["All coast", "North Coast", "Central Coast", "Los Angeles", "Orange County", "San Diego"].map((item) => <button className={region === item ? "active" : ""} key={item} onClick={() => setRegion(item)}>{item}</button>)}</div>
        <div className="map-and-feature"><div className="map-frame"><div className="ca-map" style={{ transform: `scale(${zoom})` }} aria-label="Stylized California coastline map">{beaches.map((beach, index) => <button key={beach.name} className={`map-pin pin-${index} ${activeBeach === beach.name ? "selected" : ""}`} onClick={() => { setActiveBeach(beach.name); setRegion(beach.region); }} aria-label={`Show ${beach.name}`}>{index + 1}</button>)}</div><p className="map-caption">Tap a numbered coast stop to see its conditions.</p></div>
          <article className="feature-card"><p className="eyebrow">Highlighted beach</p><h3>{selected.name}</h3><div className="feature-temp">{selected.temp}° <span>{selected.status} for a beach day</span></div><div className="metrics"><div><b>Water</b><span>{selected.water}°</span></div><div><b>Wind</b><span>{selected.wind}</span></div><div><b>Surf</b><span>{selected.surf}</span></div></div><a className="cam-link" href={selected.cam} target="_blank" rel="noreferrer">Open available live camera <span>↗</span></a></article></div>
      </section>

      <section className="conditions" id="beach-list"><div className="section-head"><div><p className="eyebrow">Beach-by-beach</p><h2>Where to head next.</h2></div><p className="quiet">Snapshot conditions · refresh before heading out</p></div><div className="beach-grid">{visible.map((beach) => <article className={`beach-card ${activeBeach === beach.name ? "chosen" : ""}`} key={beach.name} onClick={() => setActiveBeach(beach.name)}><div className={`card-sky ${beach.accent}`}><span>{beach.status}</span><i>☀</i></div><div className="card-body"><p>{beach.region}</p><h3>{beach.name}</h3><div className="card-temp">{beach.temp}° <span>air</span></div><div className="mini-metrics"><span>Water <b>{beach.water}°</b></span><span>Wind <b>{beach.wind}</b></span><span>Surf <b>{beach.surf}</b></span></div><a href={beach.cam} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>Live cam ↗</a></div></article>)}</div></section>

      <section className="cams" id="cameras"><div><p className="eyebrow">Live views</p><h2>See the ocean before you go.</h2><p>Camera operators control availability. Each link opens its current public feed in a new tab.</p></div><div className="cam-list"><a href="https://www.montereybayaquarium.org/cams-videos/live-cams/monterey-bay-cam" target="_blank" rel="noreferrer"><span className="cam-dot" />Monterey Bay <b>Open cam ↗</b></a><a href="https://www.westland.net/beachcam/" target="_blank" rel="noreferrer"><span className="cam-dot" />Venice Beach <b>Open cam ↗</b></a><a href="https://www.coastal.ca.gov/publiced/fun/webcams.html" target="_blank" rel="noreferrer"><span className="cam-dot" />Statewide camera guide <b>Browse ↗</b></a></div></section>
      <footer><a className="brand" href="#top">COASTLINE<span>°</span></a><p>For beach planning, not marine safety. Check local alerts before entering the water.</p></footer>
    </main>
  );
}
