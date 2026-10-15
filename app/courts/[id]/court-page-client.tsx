"use client";

import {
  ArrowRight,
  Basketball,
  MapPin,
  NavigationArrow,
  PingPong,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { CourtDetail } from "./court-data";
import WeeklyHeatmap from "./weekly-heatmap";

function CourtMap({ court, token }: { court: CourtDetail; token: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapState, setMapState] = useState<"loading" | "ready" | "unavailable">(token ? "loading" : "unavailable");

  useEffect(() => {
    if (!token || !containerRef.current) return;

    let map: import("mapbox-gl").Map | undefined;
    let mounted = true;

    const initialize = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (!mounted || !containerRef.current) return;

        mapboxgl.accessToken = token;
        map = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: court.coordinates,
          zoom: 14.6,
          pitch: 34,
          bearing: -14,
          attributionControl: true,
        });

        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
        map.on("load", () => mounted && setMapState("ready"));
        map.on("error", () => mounted && setMapState("unavailable"));

        const marker = document.createElement("div");
        marker.className = "court-map-marker";
        marker.innerHTML = "<span></span>";
        new mapboxgl.Marker({ element: marker, anchor: "center" }).setLngLat(court.coordinates).addTo(map);
      } catch {
        if (mounted) setMapState("unavailable");
      }
    };

    void initialize();
    return () => {
      mounted = false;
      map?.remove();
    };
  }, [court.coordinates, token]);

  return (
    <div className="court-map" aria-label={`Map showing ${court.name}`}>
      <div ref={containerRef} className="court-map__canvas" />
      <div className="court-map__texture" aria-hidden="true" />
      {mapState !== "ready" ? (
        <div className="court-map__fallback">
          <MapPin size={23} weight="fill" />
          <span>{mapState === "loading" ? "Loading live map" : "Court map"}</span>
        </div>
      ) : null}
      <div className="court-map__topline">
        <span><i /> Community court</span>
        <span>{court.neighborhood}</span>
      </div>
      <div className="court-map__caption">
        <div><strong>{court.name}</strong><span>{court.address}</span></div>
        <a
          href={`https://maps.apple.com/?daddr=${court.coordinates[1]},${court.coordinates[0]}`}
          target="_blank"
          rel="noreferrer"
          aria-label={`Get directions to ${court.name}`}
        >
          <NavigationArrow size={18} weight="fill" />
        </a>
      </div>
    </div>
  );
}

export default function CourtPageClient({
  court,
  mapboxToken,
  todayIso,
  plannedAt,
  scheduleDataAvailable,
}: {
  court: CourtDetail;
  mapboxToken: string;
  todayIso: string;
  plannedAt: string[];
  scheduleDataAvailable: boolean;
}) {
  const sportClass = court.sport.toLowerCase();
  const SportIcon = court.sport === "Basketball" ? Basketball : PingPong;
  const distanceLabel = /\d/.test(court.distance) ? `${court.distance} away` : court.distance;

  return (
    <main id="top" className={`court-page court-page--${sportClass}`}>
      <SiteHeader />

      <section className="court-page__hero">
        <div className="court-page__overview">
          <Link className="court-detail-back" href="/courts">← Community courts</Link>
          <Badge variant="outline" className="court-page__sport"><SportIcon size={17} weight="fill" /> {court.sport} · {court.neighborhood}</Badge>
          <h1>{court.name}</h1>
          <p className="court-page__address"><MapPin size={16} weight="fill" /> {court.address}<i />{distanceLabel}</p>

          <div className="court-page__signals">
            <div className="court-page__signal court-page__signal--live">
              <span><i /></span><strong>{court.liveCount ?? "—"}</strong><p><b>Live now</b><small>{court.liveNote}</small></p>
            </div>
            <div className="court-page__signal">
              <UsersThree size={25} weight="fill" /><strong>{court.localCount ?? "—"}</strong><p><b>Locals</b><small>Call this court home</small></p>
            </div>
          </div>

          <div className="court-page__actions">
            <Button asChild><a href="#weekly-pulse">See when people plan to play <ArrowRight size={18} weight="bold" /></a></Button>
            <Button variant="outline" asChild><Link href="/app">Join your local game <ArrowRight size={18} weight="bold" /></Link></Button>
          </div>
        </div>

        <CourtMap court={court} token={mapboxToken} />
      </section>

      <section className="court-page__content court-page__content--read-only">
        <div className="court-page__main-column">
          <WeeklyHeatmap
            court={court}
            todayIso={todayIso}
            plannedAt={plannedAt}
            dataAvailable={scheduleDataAvailable}
          />

          <section className="court-panel court-panel--players">
            <header><div><span className="court-panel__eyebrow"><i /> At the court · View only</span><h2>Who&apos;s here</h2></div><strong>{court.liveCount ?? "—"} live</strong></header>
            <div className="court-player-list">
              <div className="court-panel__empty">
                <UsersThree size={22} weight="fill" />
                <strong>{court.liveCount === null ? "Live activity is unavailable" : court.liveCount ? `${court.liveCount} publicly checked in` : "Be part of the next run"}</strong>
                <span>{court.liveCount === null ? "Check the app for the latest court activity." : court.liveCount ? "Public check-ins from LocalCheck. Open the app to connect with your local community." : "No public check-ins right now. Plan your next visit in LocalCheck so others know when to join."}</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="court-page__side-column">
          <section className="court-panel court-panel--details">
            <header><div><span className="court-panel__eyebrow">Court profile</span><h2>Details</h2></div></header>
            <dl>
              {court.details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}
            </dl>
          </section>
          <section className="court-panel court-detail-invite"><span className="court-panel__eyebrow">YOUR COURT. YOUR PEOPLE.</span><h2>Make this<br/>your local.</h2><p>Plan a run, check in when you arrive, and keep your game going with the people nearby.</p><Button asChild><Link href="/app">Explore the app <ArrowRight/></Link></Button></section>
        </aside>
      </section>
      <section className="court-detail-story"><div><span className="court-panel__eyebrow">MORE THAN A PIN ON A MAP</span><h2>The game gets better<br/>when people show up.</h2><p>See the plans. Bring your friends. Log the result. LocalCheck gives your court a shared home, with activity and competition that grows every time you play.</p><Button asChild><Link href="/app">See how LocalCheck works <ArrowRight/></Link></Button></div><Image unoptimized src="/app-screens/home-feed.png" alt="LocalCheck app community activity feed" width="300" height="650" loading="lazy"/></section>
      <section className="court-detail-faq"><h2>Before you play.</h2><Accordion type="single" collapsible><AccordionItem value="live"><AccordionTrigger>What does the live count mean?</AccordionTrigger><AccordionContent>It shows public LocalCheck check-ins, not every person physically at the court. A zero count means no public check-ins are reported. Private activity is not a public player list.</AccordionContent></AccordionItem><AccordionItem value="plans"><AccordionTrigger>Are planned times reservations?</AccordionTrigger><AccordionContent>No. Plans show when players intend to come. They do not reserve a public court or guarantee a game.</AccordionContent></AccordionItem><AccordionItem value="contribute"><AccordionTrigger>How can I help build a court community?</AccordionTrigger><AccordionContent>Verify a new court through the app, invite five people who check in at least weekly for four weeks, and become a Pioneer. <Link href="/pioneers">See the launch rewards.</Link></AccordionContent></AccordionItem></Accordion></section>
      <SiteFooter/>
    </main>
  );
}
