import Link from "next/link";
import { signIn, signUp } from "./actions";

export const metadata = { title: "Sign in | Coastline" };

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string; message?: string }> }) {
  const query = await searchParams;
  return <main className="simple-page auth-page">
    <nav className="simple-nav"><Link className="brand" href="/">COASTLINE<span>°</span></Link><Link href="/pricing">Membership</Link></nav>
    <section className="auth-card">
      <p className="eyebrow">Coastline membership</p>
      <h1>Welcome to the coast.</h1>
      <p>Sign in to see your seven-day beach outlook and manage your $2.99 monthly membership.</p>
      {query.error && <p className="form-message error">{query.error}</p>}
      {query.message && <p className="form-message">{query.message}</p>}
      <form className="auth-form">
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
        <label>Password<input name="password" type="password" minLength={8} autoComplete="current-password" required /></label>
        <button formAction={signIn}>Sign in</button>
        <button className="secondary-button" formAction={signUp}>Create account</button>
      </form>
      <small>By continuing, you agree to the <Link href="/terms">terms</Link> and <Link href="/privacy">privacy policy</Link>.</small>
    </section>
  </main>;
}
