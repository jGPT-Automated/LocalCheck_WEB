"use client";

import {
  ArrowLeft,
  ArrowRight,
  Basketball,
  Check,
  CornersOut,
  Crosshair,
  MagnifyingGlass,
  MapPin,
  PingPong,
  SlidersHorizontal,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ExplorerCourt, CourtSport } from "./supabase-courts";
import styles from "./explorer.module.css";

type Filter = "all" | CourtSport;
type MapState = "loading" | "ready" | "unavailable";

type Props = {
  initialCourts: ExplorerCourt[];
  mapboxToken: string;
  source: "supabase" | "curated";
};

function featureCollection(courts: ExplorerCourt[]) {
  return {
    type: "FeatureCollection" as const,
    features: courts.map((court) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [court.longitude, court.latitude],
      },
      properties: {
        id: court.id,
        name: court.shortName,
        sport: court.sport,
        liveCount: court.liveCount ?? 0,
      },
    })),
  };
}

function locationLabel(court: ExplorerCourt) {
  return [court.city, court.state].filter(Boolean).join(", ") || court.address || "Court location";
}

function setupLabel(court: ExplorerCourt) {
  const setup = court.courtCount ? `${court.courtCount} ${court.courtCount === 1 ? "court" : "courts"}` : "Court details";
  const setting = court.setting
    ? court.setting.replaceAll("_", " ")
    : court.indoor === true ? "Indoor" : court.indoor === false ? "Outdoor" : "";
  return [setup, setting, court.surface].filter(Boolean).join(" · ");
}

function accessLabel(court: ExplorerCourt) {
  if (court.accessType === "private_paid") return "Private · paid";
  if (court.accessType === "public_paid") return "Public · fees may apply";
  return "Public · free";
}

function Metric({ value, label, live = false }: { value: number | null; label: string; live?: boolean }) {
  return (
    <span className={`${styles.metric}${live ? ` ${styles.metricLive}` : ""}`}>
      {live ? <i aria-hidden="true" /> : <UsersThree size={15} weight="fill" aria-hidden="true" />}
      <strong>{value ?? "—"}</strong>
      <small>{label}</small>
    </span>
  );
}

function CourtListCard({
  court,
  selected,
  onSelect,
}: {
  court: ExplorerCourt;
  selected: boolean;
  onSelect: () => void;
}) {
  const SportIcon = court.sport === "basketball" ? Basketball : PingPong;

  return (
    <article
      className={`${styles.courtCard} ${styles[court.sport]}${selected ? ` ${styles.selected}` : ""}`}
      data-court-id={court.id}
    >
      <button className={styles.cardTarget} type="button" onClick={onSelect} aria-label={`Show ${court.name} on the map`} />
      <div className={styles.cardTopline}>
        <span className={styles.sportLabel}><SportIcon size={15} weight="fill" /> {court.sport}</span>
        {court.verified ? <span className={styles.verified}><Check size={12} weight="bold" /> Verified</span> : null}
      </div>
      <h2>{court.shortName}</h2>
      {court.shortName !== court.name ? <p className={styles.canonicalName}>{court.name}</p> : null}
      <p className={styles.location}><MapPin size={14} weight="fill" /> {locationLabel(court)}</p>
      <p className={styles.setup}>{setupLabel(court)} · {accessLabel(court)}</p>
      <div className={styles.cardFooter}>
        <div className={styles.metrics}>
          <Metric value={court.liveCount} label="Live now" live />
          <Metric value={court.localCount} label="Locals" />
        </div>
        <Link className={styles.cardLink} href={`/courts/${encodeURIComponent(court.id)}`} aria-label={`View ${court.name}`}>
          <ArrowRight size={16} weight="bold" />
        </Link>
      </div>
    </article>
  );
}

type SheetDetent = "peek" | "half" | "full";

/** Mobile sheet snap points, as visible sheet height in px (half is viewport-relative). */
const SHEET_PEAK_PX = 158;

function isMobileSheetViewport() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 760px)").matches;
}

/**
 * Bottom padding for camera moves, so markers never hide behind the sheet.
 * On desktop the sidebar is a separate column and needs no compensation.
 */
function mapBottomPadding(detent: SheetDetent) {
  if (!isMobileSheetViewport()) return 100;
  const viewportHeight = window.innerHeight;
  const sheetHeight =
    detent === "peek"
      ? SHEET_PEAK_PX
      : detent === "half"
        ? viewportHeight * 0.55
        : viewportHeight * 0.92;
  return Math.min(sheetHeight + 24, Math.round(viewportHeight * 0.72));
}

export default function CourtExplorerClient({ initialCourts, mapboxToken, source }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("mapbox-gl").Map | null>(null);
  const mapboxRef = useRef<typeof import("mapbox-gl").default | null>(null);
  const selectedMarkerRef = useRef<import("mapbox-gl").Marker | null>(null);
  const [mapState, setMapState] = useState<MapState>(mapboxToken ? "loading" : "unavailable");
  const [courts, setCourts] = useState(initialCourts);
  const [dataSource, setDataSource] = useState(source);
  const [filter, setFilter] = useState<Filter>("all");
  const [market, setMarket] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detent, setDetent] = useState<SheetDetent>("peek");
  const [dragging, setDragging] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);
  const dragRef = useRef({ pointerId: 0, startY: 0, startTy: 0, lastY: 0, lastTime: 0, velocity: 0, moved: false });
  /** A drag release also fires click on the handle; swallow that one click. */
  const suppressHandleClick = useRef(false);
  /** Imperative camera calls read this; kept in sync outside render. */
  const detentRef = useRef<SheetDetent>("peek");

  /* Keeps the imperative camera calls (selectCourt, resetMap, initial fit)
     reading the current detent without mutating a ref during render. */
  useEffect(() => {
    detentRef.current = detent;
  }, [detent]);

  const markets = useMemo(
    () => Array.from(new Set(courts.map((court) => court.market).filter(Boolean))).sort(),
    [courts],
  );

  /**
   * Pointer-driven sheet drag. The handle is the only drag surface, so the
   * list keeps scrolling natively and there is no scroll-vs-drag ambiguity.
   * The sheet never dismisses fully — it always rests on a detent.
   */
  useEffect(() => {
    if (!isMobileSheetViewport()) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const sheetHeight = () => sheet.getBoundingClientRect().height || window.innerHeight * 0.92;
    const maxTy = () => Math.max(sheetHeight() - 60, 0);

    const currentTy = () => {
      const transform = getComputedStyle(sheet).transform;
      if (!transform || transform === "none") {
        return Math.max(sheetHeight() - SHEET_PEAK_PX, 0);
      }
      const matrix = new DOMMatrixReadOnly(transform);
      return matrix.m42 || 0;
    };

    const onPointerDown = (event: PointerEvent) => {
      const now = performance.now();
      dragRef.current = {
        pointerId: event.pointerId,
        startY: event.clientY,
        startTy: currentTy(),
        lastY: event.clientY,
        lastTime: now,
        velocity: 0,
        moved: false,
      };
      setDragging(true);
      sheet.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== event.pointerId) return;
      const now = performance.now();
      const elapsed = now - drag.lastTime;
      if (elapsed > 0) drag.velocity = (event.clientY - drag.lastY) / elapsed;
      drag.lastY = event.clientY;
      drag.lastTime = now;
      const delta = event.clientY - drag.startY;
      if (Math.abs(delta) > 6) drag.moved = true;
      const next = Math.min(Math.max(drag.startTy + delta, 0), maxTy());
      sheet.style.setProperty("--sheet-ty", `${next}px`);
    };

    const onPointerUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== event.pointerId) return;
      setDragging(false);
      /* Only a real drag suppresses the follow-up click; a tap should still
         cycle the detent through the handle's onClick. */
      suppressHandleClick.current = drag.moved;
      if (!drag.moved) {
        sheet.style.removeProperty("--sheet-ty");
        dragRef.current = { pointerId: 0, startY: 0, startTy: 0, lastY: 0, lastTime: 0, velocity: 0, moved: false };
        return;
      }
      const height = sheetHeight();
      const visible = height - (drag.startTy + (event.clientY - drag.startY));
      const flick = drag.velocity * 220;
      const projected = visible + flick;
      const stops: Array<{ detent: SheetDetent; visibleHeight: number }> = [
        { detent: "peek", visibleHeight: SHEET_PEAK_PX },
        { detent: "half", visibleHeight: window.innerHeight * 0.55 },
        { detent: "full", visibleHeight: height },
      ];
      const nearest = stops.reduce((best, stop) =>
        Math.abs(stop.visibleHeight - projected) < Math.abs(best.visibleHeight - projected) ? stop : best,
      );
      sheet.style.removeProperty("--sheet-ty");
      setDetent(nearest.detent);
      dragRef.current = { pointerId: 0, startY: 0, startTy: 0, lastY: 0, lastTime: 0, velocity: 0, moved: false };
    };

    const handle = sheet.querySelector<HTMLElement>("[data-sheet-handle]");
    handle?.addEventListener("pointerdown", onPointerDown);
    handle?.addEventListener("pointermove", onPointerMove);
    handle?.addEventListener("pointerup", onPointerUp);
    handle?.addEventListener("pointercancel", onPointerUp);
    return () => {
      handle?.removeEventListener("pointerdown", onPointerDown);
      handle?.removeEventListener("pointermove", onPointerMove);
      handle?.removeEventListener("pointerup", onPointerUp);
      handle?.removeEventListener("pointercancel", onPointerUp);
    };
  }, [detent]);

  const filteredCourts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return courts
      .filter((court) => filter === "all" || court.sport === filter)
      .filter((court) => market === "all" || court.market === market)
      .filter((court) => {
        if (!normalizedQuery) return true;
        return [court.shortName, court.name, court.market, court.address, court.city, court.state]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => (b.liveCount ?? -1) - (a.liveCount ?? -1) || b.priority - a.priority || a.shortName.localeCompare(b.shortName));
  }, [courts, filter, market, query]);

  const selectedCourt = useMemo(
    () => courts.find((court) => court.id === selectedId) ?? null,
    [courts, selectedId],
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 2600);

    const refresh = async () => {
      try {
        const response = await fetch("/api/courts", { signal: controller.signal });
        if (!response.ok) return;
        const result = await response.json() as {
          courts?: ExplorerCourt[];
          source?: "supabase" | "curated";
        };
        if (result.source === "supabase" && result.courts?.length) {
          setCourts(result.courts);
          setDataSource("supabase");
        }
      } catch {
        // The bundled launch courts are already interactive; refresh is optional.
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
    if (!mapboxToken || !containerRef.current) return;
    let mounted = true;

    const initialize = async () => {
      try {
        const mapboxgl = (await import("mapbox-gl")).default;
        if (!mounted || !containerRef.current) return;
        mapboxgl.accessToken = mapboxToken;
        mapboxRef.current = mapboxgl;

        const map = new mapboxgl.Map({
          container: containerRef.current,
          style: "mapbox://styles/mapbox/dark-v11",
          center: [-97.7431, 30.2672],
          zoom: 10.5,
          attributionControl: false,
          pitchWithRotate: false,
        });
        mapRef.current = map;
        map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");

        map.on("load", () => {
          if (!mounted) return;
          map.addSource("courts", {
            type: "geojson",
            data: featureCollection(initialCourts),
            cluster: true,
            clusterMaxZoom: 12,
            clusterRadius: 46,
          });

          map.addLayer({
            id: "court-clusters",
            type: "circle",
            source: "courts",
            filter: ["has", "point_count"],
            paint: {
              "circle-color": "#fc4c02",
              "circle-radius": ["step", ["get", "point_count"], 19, 20, 23, 80, 28],
              "circle-stroke-width": 5,
              "circle-stroke-color": "rgba(252,76,2,0.18)",
              "circle-opacity": 0.94,
            },
          });
          map.addLayer({
            id: "court-cluster-count",
            type: "symbol",
            source: "courts",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-size": 11,
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            },
            paint: { "text-color": "#ffffff" },
          });
          map.addLayer({
            id: "basketball-courts",
            type: "circle",
            source: "courts",
            filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "sport"], "basketball"]],
            paint: {
              "circle-color": "#d8b58d",
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 5, 13, 9],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#18181d",
            },
          });
          map.addLayer({
            id: "pickleball-courts",
            type: "circle",
            source: "courts",
            filter: ["all", ["!", ["has", "point_count"]], ["==", ["get", "sport"], "pickleball"]],
            paint: {
              "circle-color": "#9ccfbe",
              "circle-radius": ["interpolate", ["linear"], ["zoom"], 6, 5, 13, 9],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#18181d",
            },
          });

          const selectPoint = (event: import("mapbox-gl").MapMouseEvent & { features?: import("mapbox-gl").MapboxGeoJSONFeature[] }) => {
            const id = event.features?.[0]?.properties?.id;
            if (typeof id === "string") setSelectedId(id);
          };
          map.on("click", "basketball-courts", selectPoint);
          map.on("click", "pickleball-courts", selectPoint);
          map.on("click", "court-clusters", (event) => {
            const coordinates = (event.features?.[0]?.geometry as { coordinates?: [number, number] } | undefined)?.coordinates;
            if (coordinates) map.easeTo({ center: coordinates, zoom: Math.min(map.getZoom() + 2.25, 13.5), duration: 520 });
          });

          ["court-clusters", "basketball-courts", "pickleball-courts"].forEach((layer) => {
            map.on("mouseenter", layer, () => { map.getCanvas().style.cursor = "pointer"; });
            map.on("mouseleave", layer, () => { map.getCanvas().style.cursor = ""; });
          });

          if (initialCourts.length > 1) {
            const bounds = new mapboxgl.LngLatBounds();
            initialCourts.forEach((court) => bounds.extend([court.longitude, court.latitude]));
            map.fitBounds(bounds, {
              padding: { top: 110, right: 90, bottom: mapBottomPadding(detentRef.current), left: 90 },
              retainPadding: false,
              maxZoom: 11.7,
              duration: 0,
            });
          } else if (initialCourts[0]) {
            map.jumpTo({ center: [initialCourts[0].longitude, initialCourts[0].latitude], zoom: 12.5 });
          }
          setMapState("ready");
        });
        map.on("error", () => mounted && setMapState("unavailable"));
      } catch {
        if (mounted) setMapState("unavailable");
      }
    };

    void initialize();
    return () => {
      mounted = false;
      selectedMarkerRef.current?.remove();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [initialCourts, mapboxToken]);

  useEffect(() => {
    if (mapState !== "ready") return;
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;
    const sourceInstance = map?.getSource("courts") as import("mapbox-gl").GeoJSONSource | undefined;
    sourceInstance?.setData(featureCollection(filteredCourts));
    if (map && mapboxgl && filteredCourts.length) {
      const bounds = new mapboxgl.LngLatBounds();
      filteredCourts.forEach((court) => bounds.extend([court.longitude, court.latitude]));
      map.fitBounds(bounds, {
        padding: { top: 80, right: 80, bottom: mapBottomPadding(detentRef.current), left: 80 },
        retainPadding: false,
        maxZoom: 12.5,
        duration: 520,
      });
    }
  }, [filteredCourts, mapState]);

  /* The sheet covers the bottom of the map on mobile, so the camera re-fits
     whenever the detent changes and markers stay in the visible region. */
  useEffect(() => {
    if (mapState !== "ready") return;
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;
    if (!map || !mapboxgl || !filteredCourts.length || selectedId) return;
    const bounds = new mapboxgl.LngLatBounds();
    filteredCourts.forEach((court) => bounds.extend([court.longitude, court.latitude]));
    map.fitBounds(bounds, {
      padding: { top: 80, right: 80, bottom: mapBottomPadding(detent), left: 80 },
      retainPadding: false,
      maxZoom: 12.5,
      duration: 380,
    });
  }, [detent, filteredCourts, mapState, selectedId]);

  useEffect(() => {
    const map = mapRef.current;
    const mapboxgl = mapboxRef.current;
    selectedMarkerRef.current?.remove();
    selectedMarkerRef.current = null;
    if (!map || !mapboxgl || !selectedCourt || mapState !== "ready") return;

    const marker = document.createElement("div");
    marker.className = styles.selectedMarker;
    marker.innerHTML = "<span></span>";
    selectedMarkerRef.current = new mapboxgl.Marker({ element: marker })
      .setLngLat([selectedCourt.longitude, selectedCourt.latitude])
      .addTo(map);
  }, [mapState, selectedCourt]);

  useEffect(() => {
    if (!selectedId) return;
    document.querySelector(`[data-court-id="${CSS.escape(selectedId)}"]`)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selectedId]);

  const selectCourt = (court: ExplorerCourt) => {
    setSelectedId(court.id);
    mapRef.current?.easeTo({
      center: [court.longitude, court.latitude],
      zoom: Math.max(mapRef.current.getZoom(), 13),
      padding: { top: 0, right: 0, bottom: mapBottomPadding(detentRef.current), left: 0 },
      retainPadding: false,
      duration: 620,
    });
  };

  const resetMap = () => {
    if (!mapRef.current || !mapboxRef.current || !filteredCourts.length) return;
    const bounds = new mapboxRef.current.LngLatBounds();
    filteredCourts.forEach((court) => bounds.extend([court.longitude, court.latitude]));
    mapRef.current.fitBounds(bounds, {
      padding: { top: 90, right: 90, bottom: mapBottomPadding(detentRef.current), left: 90 },
      retainPadding: false,
      maxZoom: 12.5,
      duration: 650,
    });
  };

  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <Link className={styles.brand} href="/" aria-label="LocalCheck home">
          <span><CornersOut size={31} /><Check size={15} weight="bold" /></span>
          <b>LOCALCHECK</b>
        </Link>
        <div className={styles.navCenter}>
          <span><i /> Source-backed launch set</span>
          <strong>{markets.length} cities · {courts.length.toLocaleString()} courts</strong>
        </div>
        <Link className={styles.back} href="/"><ArrowLeft size={16} weight="bold" /> Back home</Link>
      </header>

      <div className={styles.shell} data-detent={detent}>
        <aside
          className={`${styles.sidebar} ${styles[detent === "peek" ? "sheetPeek" : detent === "half" ? "sheetHalf" : "sheetFull"]}${dragging ? ` ${styles.sidebarDragging}` : ""}`}
          ref={sheetRef}
        >
          <div
            className={styles.sheetHandle}
            data-sheet-handle
            role="button"
            tabIndex={0}
            aria-label="Resize court list"
            onClick={() => {
              if (suppressHandleClick.current) {
                suppressHandleClick.current = false;
                return;
              }
              setDetent((value) => (value === "peek" ? "half" : value === "half" ? "full" : "peek"));
            }}
          >
            <i className={styles.sheetGrabber} aria-hidden="true" />
          </div>
          <div className={styles.sidebarHeader}>
            <span className={styles.eyebrow}><i /> Find your run</span>
            <div className={styles.titleRow}>
              <div><h1>Find a court.</h1><p>Source-backed places now. Live community data as it grows.</p></div>
              <button className={styles.mobileFilter} type="button" onClick={() => setFiltersOpen((value) => !value)} aria-label="Toggle filters" aria-expanded={filtersOpen}>
                {filtersOpen ? <X size={19} /> : <SlidersHorizontal size={19} />}
              </button>
            </div>
            <label className={styles.search}>
              <MagnifyingGlass size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search courts or cities" aria-label="Search courts or cities" />
              {query ? <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button> : null}
            </label>
            <div className={`${styles.filters}${filtersOpen ? ` ${styles.filtersOpen}` : ""}`} role="group" aria-label="Filter by sport">
              {(["all", "basketball", "pickleball"] as Filter[]).map((value) => (
                <button className={filter === value ? styles.activeFilter : ""} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} key={value}>
                  {value === "basketball" ? <Basketball size={15} weight="fill" /> : value === "pickleball" ? <PingPong size={15} weight="fill" /> : <Crosshair size={15} weight="bold" />}
                  {value}
                </button>
              ))}
              <label className={styles.marketFilter}>
                <span>City</span>
                <select value={market} onChange={(event) => setMarket(event.target.value)} aria-label="Filter by city">
                  <option value="all">All 7 launch cities</option>
                  {markets.map((value) => <option value={value} key={value}>{value}</option>)}
                </select>
              </label>
            </div>
            <div className={styles.resultMeta}>
              <strong>{filteredCourts.length.toLocaleString()} {filteredCourts.length === 1 ? "court" : "courts"}</strong>
              <span className={dataSource === "supabase" ? styles.liveSource : styles.previewSource}><i /> {dataSource === "supabase" ? "Supabase live" : "Verified launch set"}</span>
            </div>
          </div>

          <div className={styles.courtList} aria-live="polite">
            {filteredCourts.length ? filteredCourts.slice(0, 120).map((court) => (
              <CourtListCard court={court} selected={court.id === selectedId} onSelect={() => selectCourt(court)} key={court.id} />
            )) : (
              <div className={styles.emptyState}><MapPin size={25} weight="fill" /><strong>No courts found</strong><p>Try another city or switch the sport filter.</p></div>
            )}
            {filteredCourts.length > 120 ? <p className={styles.listLimit}>All {filteredCourts.length.toLocaleString()} markers are on the map. Refine the search to narrow the side list.</p> : null}
          </div>
        </aside>

        <section className={styles.mapPanel} aria-label="Court map">
          <div ref={containerRef} className={styles.map} />
          <div className={styles.mapShade} aria-hidden="true" />
          {mapState !== "ready" ? (
            <div className={styles.mapFallback}>
              <MapPin size={28} weight="fill" />
              <strong>{mapState === "loading" ? "Loading courts" : "Map unavailable"}</strong>
              <span>{mapState === "loading" ? "Building the live map" : "Court results are still available in the list"}</span>
            </div>
          ) : null}
          <button className={styles.fitButton} type="button" onClick={resetMap}><Crosshair size={17} weight="bold" /> Show all</button>
          <div className={styles.legend} aria-label="Map legend">
            <span><i className={styles.basketballDot} /> Basketball</span>
            <span><i className={styles.pickleballDot} /> Pickleball</span>
            <span><i className={styles.liveDot} /> Cluster</span>
          </div>

          {selectedCourt ? (
            <article className={`${styles.mapSelection} ${styles[selectedCourt.sport]}`}>
              <button className={styles.closeSelection} type="button" onClick={() => setSelectedId(null)} aria-label="Close selected court"><X size={16} /></button>
              <span className={styles.selectionSport}>{selectedCourt.sport === "basketball" ? <Basketball size={15} weight="fill" /> : <PingPong size={15} weight="fill" />} {selectedCourt.sport}</span>
              <h2>{selectedCourt.shortName}</h2>
              {selectedCourt.shortName !== selectedCourt.name ? <p className={styles.selectionCanonical}>{selectedCourt.name}</p> : null}
              <p><MapPin size={14} weight="fill" /> {locationLabel(selectedCourt)}</p>
              <div>
                <Metric value={selectedCourt.liveCount} label="Live now" live />
                <Metric value={selectedCourt.localCount} label="Locals" />
                <Link href={`/courts/${encodeURIComponent(selectedCourt.id)}`}>View court <ArrowRight size={16} weight="bold" /></Link>
              </div>
            </article>
          ) : null}
        </section>
      </div>
    </main>
  );
}
