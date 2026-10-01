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
  MapPin,
  PingPong,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { deriveCourtStats, type CourtStats } from "../lib/court-stats";
import { selectFeaturedCourts } from "../lib/featured-courts";
import type { CourtDataResult, ExplorerCourt } from "./courts/supabase-courts";

function CourtCard({ court }: { court: ExplorerCourt }) {
  const SportIcon = court.sport === "basketball" ? Basketball : PingPong;
  const status = court.localCount !== null && court.localCount > 0 ? "Most locals" : "Featured launch court";
  const location = [court.city, court.state].filter(Boolean).join(", ");
  const detail = [court.setting.replaceAll("_", " "), court.accessType.replaceAll("_", " ")].filter(Boolean).join(" · ");
  const live = court.liveCount ?? "—";
  const locals = court.localCount ?? "—";

  return (
    <article className={`court-card court-card--${court.sport}`} data-testid={`court-card-${court.sport}`}>
      <div className={`court-card__sport-art court-card__sport-art--${court.sport}`} aria-hidden="true">
        <span className="court-lines__boundary" />
        {court.sport === "basketball" ? (
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
          <span className="distance-label">{status}</span>
        </div>

        <div className="court-card__main">
          <h3>{court.name}</h3>
          <div className="court-card__location">
            <MapPin size={15} weight="fill" />
            <span>{location}</span>
            <span className="meta-dot" />
            <span>Verified court</span>
          </div>
          <p>{court.courtCount === null ? "Court count unlisted" : `${court.courtCount} ${court.courtCount === 1 ? "court" : "courts"}`} <span>·</span> {detail}</p>
        </div>

        <div className="court-card__activity" aria-label={`${live} live now and ${locals} locals`}>
          <div className="activity-metric activity-metric--live">
            <span className="activity-metric__signal"><i /></span>
            <strong>{live}</strong>
            <span><b>Live now</b><small>{court.liveCount === null ? "Count unavailable" : court.liveCount === 0 ? "No public check-ins yet" : "Public check-ins"}</small></span>
          </div>
          <div className="activity-metric activity-metric--locals">
            <UsersThree size={22} aria-hidden="true" />
            <strong>{locals}</strong>
            <span><b>Locals</b><small>{court.localCount === null ? "Count unavailable" : "Call this home"}</small></span>
          </div>
        </div>

        <div className="court-card__actions">
          <Link className="button button--check" href="/app">See the app <ArrowRight size={17} weight="bold" /></Link>
          <Link className="button button--view" href={`/courts/${court.slug}`} data-testid={`view-court-${court.sport}`}>
            View court <ArrowRight size={17} weight="bold" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function HomeView({ stats, initialCourts }: { stats: CourtStats; initialCourts: ExplorerCourt[] }) {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [counts, setCounts] = useState<CourtStats>(stats);
  const [featured, setFeatured] = useState(() => selectFeaturedCourts(initialCourts));

  /* Server-rendered counts are authoritative. This refresh mirrors the
     `/courts` explorer: if Supabase has newer data than the build, the
     homepage numbers correct themselves instead of showing a stale total.
     Same deriveCourtStats() as the server render, so both paths agree. */
  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2600);

    const refresh = async () => {
      try {
        const response = await fetch("/api/courts", { signal: controller.signal });
        if (!response.ok) return;
        const result = await response.json() as Partial<CourtDataResult>;
        /* Only trust a real database read; a curated fallback is what the
           server render already used, so re-deriving it can only go backwards. */
        if (result.source === "supabase" && result.courts?.length) {
          setCounts(deriveCourtStats(result.courts));
          setFeatured(selectFeaturedCourts(result.courts));
        }
      } catch {
        // Server-rendered counts stay correct; refresh is optional.
      } finally {
        window.clearTimeout(timeout);
      }
    };

    void refresh();
    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

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

  return (
    <main id="top">
      <section className="hero" ref={heroRef}>
        <img className="hero__art" src="/hero-map.png" alt="Dark topographic Austin map with live routes converging at a basketball court" fetchPriority="high" />
        <div className="hero__veil" aria-hidden="true" />
        <div className="hero__activity" aria-hidden="true"><span /><span /><span /></div>

        <SiteHeader />

        <div className="hero__copy">
          <span className="hero__eyebrow">
            <i />
            <motion.strong
              data-live-market-count="true"
              key={counts.markets}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {counts.markets}
            </motion.strong>
            cities now mapped
          </span>
          <h1>Find<br />your<br />run<span>.</span></h1>
          <p>Live courts. Real competition.</p>
          <div className="hero__actions">
            <Link className="button button--hero" href="/courts">
              Explore {counts.total} courts <ArrowRight size={19} weight="bold" />
            </Link>
            <Link className="text-button" href="/how-it-works">See how it works <CaretRight size={17} weight="bold" /></Link>
          </div>
        </div>

        <a className="qr-card" href="https://github.com/jGPT-Automated/LocalCheck_Expo" target="_blank" rel="noreferrer" aria-label="Preview the LocalCheck app project">
          <span>Scan to preview the app</span>
          <img src="/qr-localcheck.png" alt="QR code for LocalCheck" width="78" height="78" />
        </a>
      </section>

      <section className="live-courts section" id="courts">
        <div className="section-heading">
          <div>
            <span className="eyebrow eyebrow--orange">Community court spotlight</span>
            <h2>Know before<br />you go.</h2>
          </div>
          <p>One verified basketball court and one pickleball court, selected by local community size. Before locals join, the launch set leads the way; live activity updates from the court feed.</p>
        </div>

        <div className="court-grid">
          {[featured.basketball, featured.pickleball].filter((court): court is ExplorerCourt => court !== null).map((court) => <CourtCard court={court} key={court.id} />)}
        </div>

        <div className="card-legend" aria-label="Court card design details">
          <span><i className="legend-dot" /> Orange always means live</span>
          <span><UsersThree size={17} /> Counts come from the court feed</span>
          <span><CornersOut size={17} /> Court geometry distinguishes each sport</span>
        </div>
      </section>

      <section className="launch-programs section" id="pioneers">
        <div className="launch-programs__heading">
          <span className="eyebrow eyebrow--orange">The first to show up</span>
          <h2>Start the<br />movement<span>.</span></h2>
          <p>Early players get more than a place on the map. Help a court come alive, and help the people around you find their run.</p>
        </div>
        <div className="launch-programs__offers">
          <article>
            <span className="launch-programs__number">01 / STARTERS</span>
            <h3>The first 100.</h3>
            <p>The first 100 people to download and join LocalCheck get one year of LocalPlus, on us.</p>
            <strong>1 year of LocalPlus</strong>
          </article>
          <article>
            <span className="launch-programs__number">02 / PIONEERS</span>
            <h3>Build your court.</h3>
            <p>Add a court and bring five invited players who each check in at least once a week for four weeks. You get a free year of LocalPlus; each invite gets a free month on sign-up.</p>
            <strong>1 year for you · 1 month for each invite</strong>
          </article>
        </div>
        <Link className="launch-programs__link" href="/pioneers">Explore the launch programs <ArrowRight size={18} weight="bold" /></Link>
      </section>

      <section className="how section" id="how">
        <div className="how__intro">
          <span className="eyebrow">No empty-court gamble</span>
          <h2>From couch<br />to court.</h2>
          <p>LocalCheck is one shared platform for local courts, activity, and competition. See who is there now, who plans to play later, and organize the next run.</p>
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
            <p>Log reviewed games and build rankings that matter among friends, at your court, across your region, and eventually across LocalCheck.</p>
          </div>
          <div className="rank-card" aria-label="Global leaderboard">
            <header><span>LocalCheck · all courts</span><strong>Global leaderboard</strong></header>
            <div className="rank-card__empty">
              <span className="rank-card__empty-index">GLOBAL / —</span>
              <h3>Earn your place.</h3>
              <p>Public global standings are not available on the web yet. Once reviewed results and player visibility are ready, the rankings will appear here.</p>
            </div>
            <footer><span>Reviewed games · public players only</span><ArrowUpRight size={17} /></footer>
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <span className="eyebrow eyebrow--orange">The launch map is ready</span>
        <h2>Find your run<span>.</span></h2>
        <p>Browse the first {counts.total.toLocaleString()} source-backed basketball and pickleball courts.</p>
        <Link className="button button--hero" href="/courts">Explore courts <ArrowRight size={19} weight="bold" /></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
