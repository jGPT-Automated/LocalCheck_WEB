"use client";

import {
  ArrowLeft,
  ArrowRight,
  Basketball,
  CalendarBlank,
  Check,
  Clock,
  CornersOut,
  House,
  MapPin,
  NavigationArrow,
  PingPong,
  UsersThree,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CourtDetail } from "./court-data";
import type { CourtWeather } from "./court-weather";
import type { SupabasePublicConfig } from "./supabase-planning";
import WeeklyHeatmap from "./weekly-heatmap";

function CourtMap({ court, token, weather }: { court: CourtDetail; token: string; weather: CourtWeather | null }) {
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
          logoPosition: "top-left",
        });

        map.addControl(new mapboxgl.AttributionControl({ compact: true }), "top-left");
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
        <span><i /> Verified place</span>
        <div>
          {weather ? (
            <span className={`court-weather-label court-weather-label--${weather.icon}`} title={`Feels like ${weather.feelsLike}°, ${weather.precipitationChance}% rain, wind ${weather.windSpeed} mph`}>
              <i aria-hidden="true" />
              <strong>{weather.temperature}°</strong>
              <span>{weather.label}</span>
            </span>
          ) : null}
          <span>{court.neighborhood}</span>
        </div>
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
  weather,
  supabase,
  todayIso,
}: {
  court: CourtDetail;
  mapboxToken: string;
  weather: CourtWeather | null;
  supabase: SupabasePublicConfig;
  todayIso: string;
}) {
  const [checkedIn, setCheckedIn] = useState(false);
  const [isLocal, setIsLocal] = useState(court.isLocal);
  const [planned, setPlanned] = useState<string[]>([]);
  const sportClass = court.sport.toLowerCase();
  const SportIcon = court.sport === "Basketball" ? Basketball : PingPong;
  const liveCount = court.liveCount + (checkedIn ? 1 : 0);
  const hasActivityHistory = court.activity.some((value) => value > 0);
  const distanceLabel = /\d/.test(court.distance) ? `${court.distance} away` : court.distance;

  const togglePlan = (title: string) => {
    setPlanned((current) => current.includes(title) ? current.filter((item) => item !== title) : [...current, title]);
  };

  return (
    <main className={`court-page court-page--${sportClass}`}>
      <header className="court-page__nav">
        <Link className="court-page__brand" href="/" aria-label="LocalCheck home">
          <span><CornersOut size={30} /><Check size={15} weight="bold" /></span>
          <b>LOCALCHECK</b>
        </Link>
        <Link className="court-page__back" href="/courts"><ArrowLeft size={17} weight="bold" /> Back to explore</Link>
      </header>

      <section className="court-page__hero">
        <div className="court-page__overview">
          <span className="court-page__sport"><SportIcon size={17} weight="fill" /> {court.sport} · {court.neighborhood}</span>
          <h1>{court.name}</h1>
          <p className="court-page__address"><MapPin size={16} weight="fill" /> {court.address}<i />{distanceLabel}</p>

          <div className="court-page__signals">
            <div className="court-page__signal court-page__signal--live">
              <span><i /></span><strong>{liveCount}</strong><p><b>Live now</b><small>{checkedIn ? "You are checked in" : court.liveNote}</small></p>
            </div>
            <div className="court-page__signal">
              <UsersThree size={25} weight="fill" /><strong>{court.localCount}</strong><p><b>Locals</b><small>Call this court home</small></p>
            </div>
            <button className={`court-page__local${isLocal ? " is-local" : ""}`} type="button" onClick={() => setIsLocal((value) => !value)} aria-pressed={isLocal}>
              {isLocal ? <Check size={18} weight="bold" /> : <House size={18} weight="fill" />}
              <span><b>{isLocal ? "Your local court" : "Make this local"}</b><small>{isLocal ? "Home court selected" : "Set as your home court"}</small></span>
            </button>
          </div>

          <div className="court-page__actions">
            <button className={`court-page__check${checkedIn ? " is-checked" : ""}`} type="button" onClick={() => setCheckedIn((value) => !value)} aria-pressed={checkedIn}>
              <Check size={19} weight="bold" /> {checkedIn ? "Checked in" : "Check in now"}
            </button>
            <a href="#weekly-pulse">Plan this week <ArrowRight size={18} weight="bold" /></a>
          </div>
        </div>

        <CourtMap court={court} token={mapboxToken} weather={weather} />
      </section>

      <section className="court-page__content">
        <div className="court-page__main-column">
          <WeeklyHeatmap court={court} todayIso={todayIso} isLocal={isLocal} onMakeLocal={() => setIsLocal(true)} supabase={supabase} />

          <section className="court-panel court-panel--players">
            <header><div><span className="court-panel__eyebrow"><i /> At the court</span><h2>Who&apos;s here</h2></div><strong>{liveCount} live</strong></header>
            <div className="court-player-list">
              {court.players.length ? court.players.map((player) => (
                <div className="court-player" key={player.initials}>
                  <span className={`court-player__avatar court-player__avatar--${player.tier}`}>{player.initials}</span>
                  <p><strong>{player.name}</strong><small>{player.detail}</small></p>
                  <i className="court-player__live" />
                </div>
              )) : (
                <div className="court-panel__empty"><UsersThree size={22} weight="fill" /><strong>No public check-ins</strong><span>Check in to put this court on the map.</span></div>
              )}
              {court.players.length ? <div className="court-player court-player--private">
                <span className="court-player__avatar">+{Math.max(0, liveCount - court.players.length)}</span>
                <p><strong>Other players</strong><small>Private or friends-only check-ins</small></p>
              </div> : null}
            </div>
          </section>

          <section className="court-panel court-panel--schedule" id="tonight">
            <header><div><span className="court-panel__eyebrow"><CalendarBlank size={15} weight="fill" /> Plan the run</span><h2>Coming up</h2></div></header>
            <div className="court-schedule">
              {court.schedule.length ? court.schedule.map((slot) => {
                const selected = planned.includes(slot.title);
                return (
                  <button key={slot.title} type="button" className={selected ? "is-planned" : ""} onClick={() => togglePlan(slot.title)} aria-pressed={selected}>
                    <span><b>{slot.day}</b><strong>{slot.time}</strong></span>
                    <p><strong>{slot.title}</strong><small>{slot.type} · {slot.attendance}</small></p>
                    <i>{selected ? <Check size={16} weight="bold" /> : "+"}</i>
                  </button>
                );
              }) : <div className="court-panel__empty"><CalendarBlank size={22} weight="fill" /><strong>No runs scheduled</strong><span>Be the first local to plan one.</span></div>}
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

          <section className="court-panel court-panel--activity">
            <header><div><span className="court-panel__eyebrow"><Clock size={15} weight="fill" /> Activity history</span><h2>{hasActivityHistory ? "Today" : "Building now"}</h2></div></header>
            <p>{hasActivityHistory ? court.peakWindow : "No fabricated traffic curve—this fills as real check-ins arrive."}</p>
            <div className="court-activity-bars" aria-label="Typical court activity throughout the day">
              {court.activity.map((value, index) => <i key={`${value}-${index}`} style={{ height: `${value}%` }} />)}
            </div>
            <div className="court-activity-axis"><span>8A</span><span>2P</span><span>8P</span></div>
          </section>
        </aside>
      </section>
    </main>
  );
}
