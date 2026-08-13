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
  House,
  List,
  MapPin,
  PingPong,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Sport = "basketball" | "pickleball";

type Court = {
  id: string;
  sportId: Sport;
  name: string;
  sport: string;
  status: string;
  location: string;
  count: number;
  courtCount: string;
  detail: string;
  players: string[];
  localCount: number;
  isLocal: boolean;
  activity: string;
};

const courts: Court[] = [
  {
    id: "austin-basketball-hancock",
    sportId: "basketball",
    name: "Hancock Recreation Center",
    sport: "Basketball",
    status: "Austin launch court",
    location: "Austin, TX",
    count: 0,
    courtCount: "2 courts",
    detail: "Outdoor · public & free",
    players: [],
    localCount: 0,
    isLocal: false,
    activity: "No public check-ins yet",
  },
  {
    id: "austin-pickleball-pan-am",
    sportId: "pickleball",
    name: "Pan American Pickleball Courts",
    sport: "Pickleball",
    status: "Austin launch court",
    location: "Austin, TX",
    count: 0,
    courtCount: "6 courts",
    detail: "Outdoor · public & free",
    players: [],
    localCount: 0,
    isLocal: false,
    activity: "No public check-ins yet",
  },
];

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

function CourtCard({ court }: { court: Court }) {
  const [checkedIn, setCheckedIn] = useState(false);
  const SportIcon = court.sportId === "basketball" ? Basketball : PingPong;
  const count = court.count + (checkedIn ? 1 : 0);

  return (
    <article className={`court-card court-card--${court.sportId}`} data-testid={`court-card-${court.sportId}`}>
      <div className={`court-card__sport-art court-card__sport-art--${court.sportId}`} aria-hidden="true">
        <span className="court-lines__boundary" />
        {court.sportId === "basketball" ? (
          <>
            <span className="court-lines__arc" />
            <span className="court-lines__key" />
            <span className="court-lines__circle" />
            <span className="court-lines__rim" />
          </>
        ) : (
          <>
            <span className="court-lines__net" />
            <span className="court-lines__kitchen court-lines__kitchen--left" />
            <span className="court-lines__kitchen court-lines__kitchen--right" />
            <span className="court-lines__center court-lines__center--left" />
            <span className="court-lines__center court-lines__center--right" />
          </>
        )}
      </div>
      <div className="court-card__shade" aria-hidden="true" />

      <div className="court-card__content">
        <div className="court-card__topline">
          <span className="sport-label">
            <span className="sport-label__icon"><SportIcon size={16} weight="fill" /></span>
            {court.sport}
          </span>
          {court.isLocal ? (
            <span className="local-court-label"><House size={14} weight="fill" /> Your local court</span>
          ) : (
            <span className="distance-label">{court.status}</span>
          )}
        </div>

        <div className="court-card__main">
          <h3>{court.name}</h3>
          <div className="court-card__location">
            <MapPin size={15} weight="fill" />
            <span>{court.location}</span>
            <span className="meta-dot" />
            <span>{court.status}</span>
          </div>
          <p>{court.courtCount} <span>·</span> {court.detail}</p>
        </div>

        <div className="court-card__activity" aria-label={`${count} live now and ${court.localCount} locals`}>
          <div className="activity-metric activity-metric--live">
            <span className="activity-metric__signal"><i /></span>
            <strong>{count}</strong>
            <span><b>Live now</b><small>{checkedIn ? "You are checked in" : court.activity}</small></span>
          </div>
          <div className="activity-metric activity-metric--locals">
            <div className="player-stack" aria-hidden="true">
              {court.players.map((initials, index) => (
                <span key={initials} style={{ zIndex: court.players.length - index }}>{initials}</span>
              ))}
            </div>
            <strong>{court.localCount}</strong>
            <span><b>Locals</b><small>Call this home</small></span>
          </div>
        </div>

        <div className="court-card__actions">
          <button
            className={`button button--check${checkedIn ? " is-checked" : ""}`}
            type="button"
            onClick={() => setCheckedIn((value) => !value)}
            aria-pressed={checkedIn}
            data-testid={`check-in-${court.sportId}`}
          >
            {checkedIn ? <Check size={17} weight="bold" /> : null}
            {checkedIn ? "Checked in" : "Check in"}
          </button>
          <Link className="button button--view" href={`/courts/${court.id}`} data-testid={`view-court-${court.sportId}`}>
            View court <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
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
            <Link href="/courts">Find games</Link>
            <button type="button" onClick={() => scrollTo("#how")}>How it works</button>
            <button type="button" onClick={() => scrollTo("#about")}>About</button>
            <button type="button" onClick={() => setNotice("Login opens in the LocalCheck app.")}>Log in</button>
            <button className="nav-cta" type="button" onClick={() => scrollTo("#courts")}>Check in</button>
          </nav>
          <button className="menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Open navigation">
            {menuOpen ? <X size={25} /> : <List size={27} />}
          </button>
        </header>

        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link href="/courts" onClick={() => setMenuOpen(false)}>Find games</Link>
            <button type="button" onClick={() => scrollTo("#how")}>How it works</button>
            <button type="button" onClick={() => scrollTo("#about")}>About</button>
            <button type="button" onClick={() => { setNotice("Login opens in the LocalCheck app."); setMenuOpen(false); }}>Log in</button>
          </nav>
        ) : null}

        <div className="hero__copy">
          <span className="hero__eyebrow"><i /> Seven cities now mapped</span>
          <h1>Find<br />your<br />run<span>.</span></h1>
          <p>Live courts. Real competition.</p>
          <div className="hero__actions">
            <Link className="button button--hero" href="/courts">
              Explore 56 courts <ArrowRight size={19} weight="bold" />
            </Link>
            <button className="text-button" type="button" onClick={() => scrollTo("#how")}>See how it works <CaretRight size={17} weight="bold" /></button>
          </div>
        </div>

        <div className="hero__signal" aria-label="LocalCheck launch court summary">
          <span><strong>56</strong> launch courts</span>
          <i />
          <span><strong>28</strong> basketball</span>
          <i />
          <span><strong>28</strong> pickleball</span>
        </div>

        <a className="qr-card" href="https://github.com/jGPT-Automated/LocalCheck_Expo" target="_blank" rel="noreferrer" aria-label="Preview the LocalCheck app project">
          <span>Scan to preview the app</span>
          <img src="/qr-localcheck.png" alt="QR code for LocalCheck" width="78" height="78" />
          <ArrowUpRight size={17} weight="bold" />
        </a>
      </section>

      <section className="live-courts section" id="courts">
        <div className="section-heading">
          <div>
            <span className="eyebrow eyebrow--orange">Launch court preview</span>
            <h2>Know before<br />you go.</h2>
          </div>
          <p>One court card, everywhere. The map starts with verified venue identity and access; live and local counts stay honest as the community checks in.</p>
        </div>

        <div className="court-grid">
          {courts.map((court) => <CourtCard court={court} key={court.id} />)}
        </div>

        <div className="card-legend" aria-label="Court card design details">
          <span><i className="legend-dot" /> Orange always means live</span>
          <span><UsersThree size={17} /> Counts start at zero—not fabricated</span>
          <span><CornersOut size={17} /> Court geometry distinguishes each sport</span>
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
            <p>Browse nearby basketball and pickleball courts by real activity—not stale reviews.</p>
          </article>
          <article>
            <span>02</span>
            <div className="step-icon"><Check size={27} weight="bold" /></div>
            <h3>Check in</h3>
            <p>One tap tells your local community the court is active and keeps the live picture honest.</p>
          </article>
          <article>
            <span>03</span>
            <div className="step-icon"><Clock size={27} weight="fill" /></div>
            <h3>Plan the week</h3>
            <p>Mark when you are coming, see who else is in, and let the next run organize itself.</p>
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
          <div className="rank-card" aria-label="Sample local leaderboard">
            <header><span>East Austin · Basketball</span><strong>Local ranking</strong></header>
            {[
              ["01", "JM", "Jordan Miles", "1284", "+18"],
              ["02", "AR", "Alex Rivera", "1251", "+7"],
              ["03", "TK", "Taylor Kim", "1219", "+11"],
              ["04", "MC", "Morgan Chen", "1188", "—"],
            ].map((row, index) => (
              <div className={index === 0 ? "is-current" : ""} key={row[0]}>
                <span className="rank-number">{row[0]}</span>
                <span className="rank-avatar">{row[1]}</span>
                <strong>{row[2]}</strong>
                <span className="rank-score">{row[3]}</span>
                <small>{row[4]}</small>
              </div>
            ))}
            <footer><span>Updated after every ranked game</span><ArrowUpRight size={17} /></footer>
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <span className="eyebrow eyebrow--orange">The launch map is ready</span>
        <h2>Find your run<span>.</span></h2>
        <p>Browse the first 56 source-backed basketball and pickleball courts.</p>
        <Link className="button button--hero" href="/courts">Explore courts <ArrowRight size={19} weight="bold" /></Link>
      </section>

      <footer className="site-footer">
        <Brand compact />
        <p>Live courts. Real competition.</p>
        <div><Link href="/privacy">Privacy</Link><a href="#top">Back to top</a><span>© 2026 LocalCheck</span></div>
      </footer>

      {notice ? <div className="toast" role="status">{notice}</div> : null}
    </main>
  );
}
