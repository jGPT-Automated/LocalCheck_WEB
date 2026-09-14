"use client";
/* eslint-disable @next/next/no-img-element */

import {
  ArrowRight,
  ArrowUpRight,
  Basketball,
  CaretRight,
  Check,
  Clock,
  CornersOut,
  List,
  MapPin,
  PingPong,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


import type { ExplorerCourt } from "./courts/supabase-courts";

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand${compact ? " brand--compact" : ""}`} href="#top" aria-label="LocalCheck home">
      <span className="brand__mark" aria-hidden="true">
        <CornersOut size={compact ? 27 : 34} weight="regular" />
        <Check className="brand__check" size={compact ? 14 : 18} weight="bold" />
      </span>
      <span className="brand__word">LOCALCHECK</span>
    </a>
  );
}

function CourtCard({ court }: { court: ExplorerCourt }) {
  const SportIcon = court.sport === "basketball" ? Basketball : PingPong;
  return <article className={`court-card court-card--${court.sport}`}>
    <div className="court-card__content">
      <div className="court-card__topline"><span className="sport-label"><SportIcon size={18} />{court.sport}</span></div>
      <div className="court-card__main"><h3>{court.name}</h3><p>{[court.city, court.state].filter(Boolean).join(", ")}</p><p>{court.courtCount ? `${court.courtCount} courts · ` : ""}{court.setting.replaceAll("_", " ")}</p></div>
      <div className="court-card__actions"><Link className="button button--view" href={`/courts/${court.slug}`}>View court <ArrowRight size={17} /></Link></div>
    </div>
  </article>;
}

export default function Home() {
  const [courts, setCourts] = useState<ExplorerCourt[]>([]);
  const [courtState, setCourtState] = useState("loading");
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/courts", { signal: controller.signal }).then(async response => {
      if (!response.ok) throw new Error("Courts unavailable");
      const result = await response.json();
      setCourts(result.courts); setCourtState("ready");
    }).catch(() => { if (!controller.signal.aborted) setCourtState("error"); });
    return () => controller.abort();
  }, []);
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)));
      hero.style.setProperty("--hero-shift", `${progress * -46}px`);
      hero.style.setProperty("--hero-scale", `${1 + progress * 0.055}`);
      hero.style.setProperty("--copy-shift", `${progress * 22}px`);
      hero.style.setProperty("--hero-opacity", `${1 - progress * 0.2}`);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main id="top">
      <section className="hero" ref={heroRef}>
        <img className="hero__art" src="/hero-map.png" alt="Dark topographic Austin map with live routes converging at a basketball court" fetchPriority="high" />
        <div className="hero__veil" aria-hidden="true" />

        <header className="site-header">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/courts">Find courts</Link>
            <button type="button" onClick={() => scrollTo("#how")}>How it works</button>
            <button type="button" onClick={() => scrollTo("#about")}>About</button>
            <button type="button" onClick={() => setNotice("Login opens in the LocalCheck app.")}>Log in</button>
            <button className="nav-cta" type="button" onClick={() => scrollTo("#courts")}>Explore courts</button>
          </nav>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Open navigation">
            {menuOpen ? <X size={25} /> : <List size={27} />}
          </button>
        </header>

        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/courts" onClick={() => setMenuOpen(false)}>Find courts</Link>
            <button type="button" onClick={() => scrollTo("#how")}>How it works</button>
            <button type="button" onClick={() => scrollTo("#about")}>About</button>
            <button type="button" onClick={() => { setNotice("Login opens in the LocalCheck app."); setMenuOpen(false); }}>Log in</button>
          </nav>
        ) : null}

        <div className="hero__copy">
          <span className="hero__eyebrow"><i /> Basketball & pickleball · Houston and Austin pilots</span>
          <h1>Find<br />your<br />run<span>.</span></h1>
          <p>Live courts. Real competition.</p>
          <div className="hero__actions">
            <Link className="button button--hero" href="/courts">
              Explore courts <ArrowRight size={19} weight="bold" />
            </Link>
            <button className="text-button" type="button" onClick={() => scrollTo("#how")}>See how it works <CaretRight size={17} weight="bold" /></button>
          </div>
        </div>

        <div className="hero__signal" aria-live="polite">
          <span>{courtState === "ready" ? `${courts.length} public courts on LocalCheck` : "Find a court. Bring your people."}</span>
        </div>
        <a className="qr-card" href="mailto:localchecksports@gmail.com?subject=LocalCheck%20pilot"><span>Join the iPhone pilot</span><ArrowUpRight size={20} /></a>
      </section>

      <section className="live-courts section" id="courts">
        <div className="section-heading">
          <div>
            <span className="eyebrow eyebrow--orange">Launch court preview</span>
            <h2>Know before<br />you go.</h2>
          </div>
          <p>Browse the same public court listings as the LocalCheck app. Check in, arrange a game, and meet your local players in the app.</p>
        </div>

        <div className="court-grid">
          {courts.slice(0, 2).map((court) => <CourtCard court={court} key={court.id} />)}
          {courtState !== "ready" ? <p role="status">{courtState === "error" ? "Court listings are temporarily unavailable. Please try again shortly." : "Loading court listings…"}</p> : courts.length === 0 ? <p>No public courts are listed yet.</p> : null}
        </div>

      </section>

      <section className="how section" id="how">
        <div className="how__intro">
          <span className="eyebrow">No empty-court gamble</span>
          <h2>From couch<br />to court.</h2>
          <p>LocalCheck turns the group text into a live, shared picture of your local sports scene.</p>
        </div>
        <div className="steps">
          <article>
            <span>01</span>
            <div className="step-icon"><MapPin size={27} weight="fill" /></div>
            <h3>Find the run</h3>
            <p>Explore nearby basketball and pickleball courts. Choose a home court to follow your local community.</p>
          </article>
          <article>
            <span>02</span>
            <div className="step-icon"><Check size={27} weight="bold" /></div>
            <h3>Check in</h3>
            <p>Check in when you arrive. In-app activity helps other players decide when to join; it is not a guarantee that a court is occupied.</p>
          </article>
          <article>
            <span>03</span>
            <div className="step-icon"><Clock size={27} weight="fill" /></div>
            <h3>Plan the week</h3>
            <p>Schedule a game or join a run in the app. Coordinate with other players before heading out.</p>
          </article>
        </div>
      </section>

      <section className="about section" id="about">
        <div className="about__panel">
          <div className="about__copy">
            <span className="eyebrow eyebrow--orange">Built for local competition</span>
            <h2>Show up.<br />Play for something.</h2>
            <p>Log games, build a real local ranking, and see the people who make your home court what it is.</p>
            <button className="text-button text-button--light" type="button" onClick={() => setNotice("Competition profiles are coming in the LocalCheck app.")}>Explore competition <ArrowRight size={18} weight="bold" /></button>
          </div>
          <div className="rank-card">
            <header><span>After the game</span><strong>Make the result count</strong></header>
            <p style={{padding: "1.5rem"}}>Record your game, review the score with the other players, and follow your progress. Resolve score disagreements in the app before a result is settled.</p>
            <footer><span>Player profiles and rankings are in the app</span><ArrowUpRight size={17} /></footer>
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <span className="eyebrow eyebrow--orange">Start with your local court</span>
        <h2>Find your run<span>.</span></h2>
        <p>We are piloting with basketball and pickleball players in Houston and Austin. Email us to join the iPhone pilot.</p>
        <Link className="button button--hero" href="/courts">Explore courts <ArrowRight size={19} weight="bold" /></Link>
      </section>

      <footer className="site-footer">
        <Brand compact />
        <p>Live courts. Real competition.</p>
        <div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/support">Support</Link><a href="#top">Back to top</a><span>© 2026 LocalCheck</span></div>
      </footer>

      {notice ? <div className="toast" role="status">{notice}</div> : null}
    </main>
  );
}
