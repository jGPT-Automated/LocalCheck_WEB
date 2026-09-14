import Link from "next/link";
import { notFound } from "next/navigation";
import { loadExplorerCourt } from "../supabase-courts";

export default async function CourtPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let court;
  try { court = await loadExplorerCourt(id); }
  catch { return <main className="legal-page"><header className="legal-header"><Link href="/courts">← All courts</Link></header><section className="legal-hero"><h1>Court unavailable</h1><p role="alert">We could not load this court. Please try again shortly.</p></section></main>; }
  if (!court) notFound();
  return <main className="legal-page">
    <header className="legal-header"><Link className="brand" href="/">LOCALCHECK</Link><Link href="/courts">← All courts</Link></header>
    <section className="legal-hero"><div><span className="eyebrow eyebrow--orange">{court.sport}</span><h1 style={{fontSize:"clamp(2rem, 6vw, 5rem)"}}>{court.name}</h1><p>{[court.address, court.city, court.state].filter(Boolean).join(", ")}</p></div></section>
    <article className="legal-copy section">
      <h2>Court details</h2><ul><li>Courts: {court.courtCount ?? "Not listed"}</li><li>Setting: {court.setting.replaceAll("_", " ") || "Not listed"}</li><li>Access: {court.accessType === "public_free" ? "Public · free" : court.accessType === "public_paid" ? "Public · fees may apply" : "Private · fees may apply"}</li></ul>
      <p>Check local opening hours, access rules, and conditions before traveling.</p>
      <a className="button button--hero" href={`https://maps.apple.com/?ll=${court.latitude},${court.longitude}&q=${encodeURIComponent(court.name)}`}>Open directions</a>
      <h2>Play here with LocalCheck</h2><p>Check in, choose your home court, plan a game, and view player activity in the app. The website shows public court information; it does not check you in or change your account.</p>
      <a href="mailto:localchecksports@gmail.com?subject=LocalCheck%20pilot">Join the iPhone pilot</a>
    </article><footer className="legal-footer"><Link href="/support">LocalCheck Support</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></footer>
  </main>;
}
