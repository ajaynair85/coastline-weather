import Link from "next/link";
import { beaches } from "@/lib/beaches";

export const metadata = { title: "California beach weather | Coastline", description: "Live weather, wind, water temperature, waves, and camera links for California beaches." };

export default function BeachesPage() {
  return <main className="simple-page directory-page">
    <nav className="simple-nav"><Link className="brand" href="/">COASTLINE<span>°</span></Link><div><Link href="/pricing">Membership</Link><Link href="/sign-in">Sign in</Link></div></nav>
    <header className="directory-hero"><p className="eyebrow">California coast directory</p><h1>Choose your beach.</h1><p>Open a beach for live air temperature, wind, waves, water temperature, cameras, and the seven-day member outlook.</p></header>
    <section className="directory-grid">{beaches.map((beach) => <Link className="directory-card" href={`/beaches/${beach.slug}`} key={beach.slug}><span>{beach.region}</span><h2>{beach.name}</h2><p>{beach.description}</p><b>Live conditions →</b></Link>)}</section>
  </main>;
}
