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
import { useEffect, useRef, useState } from "react";
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
          attributionControl: false,
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
        <span><i /> {court.details.some((detail) => detail.label === "Status" && detail.value === "Source verified") ? "Source verified" : "Court listing"}</span>
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
  breadcrumbs,
  sourceLink,
}: {
  court: CourtDetail;
  mapboxToken: string;
  todayIso: string;
  plannedAt: string[];
  scheduleDataAvailable: boolean;
  breadcrumbs: React.ReactNode;
  sourceLink: React.ReactNode;
}) {
  const sportClass = court.sport.toLowerCase();
  const SportIcon = court.sport === "Basketball" ? Basketball : PingPong;
  const distanceLabel = /\d/.test(court.distance) ? `${court.distance} away` : court.distance;

  return (
    <main className={`court-page court-page--${sportClass}`}>
      <SiteHeader />
      {breadcrumbs}

      <section className="court-page__hero">
        <div className="court-page__overview">
          <span className="court-page__sport"><SportIcon size={17} weight="fill" /> {court.sport} · {court.neighborhood}</span>
          <h1>{court.name}</h1>
          <p className="court-page__address"><MapPin size={16} weight="fill" /> {court.address}<i />{distanceLabel}</p>
          {sourceLink}

          <div className="court-page__signals">
            <div className="court-page__signal court-page__signal--live">
              <span><i /></span><strong>{court.liveCount}</strong><p><b>Live now</b><small>{court.liveNote}</small></p>
            </div>
            <div className="court-page__signal">
              <UsersThree size={25} weight="fill" /><strong>{court.localCount}</strong><p><b>Locals</b><small>Call this court home</small></p>
            </div>
          </div>

          <div className="court-page__actions">
            <a href="#weekly-pulse">View weekly activity <ArrowRight size={18} weight="bold" /></a>
            <Link href="/app">Explore the app <ArrowRight size={18} weight="bold" /></Link>
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
            <header><div><span className="court-panel__eyebrow"><i /> At the court · View only</span><h2>Who&apos;s here</h2></div><strong>{court.liveCount} live</strong></header>
            <div className="court-player-list">
              <div className="court-panel__empty">
                <UsersThree size={22} weight="fill" />
                <strong>{court.liveCount ? `${court.liveCount} publicly checked in` : "No public check-ins"}</strong>
                <span>{court.liveCount ? "Live occupancy from the LocalCheck app." : "Nobody is publicly checked in right now."}</span>
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
        </aside>
      </section>
    </main>
  );
}
