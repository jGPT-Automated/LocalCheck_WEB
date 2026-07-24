import { notFound } from "next/navigation";
import CourtPageClient from "./court-page-client";
import type { CourtDetail } from "./court-data";
import { getCourtWeather } from "./court-weather";
import { loadExplorerCourt } from "../supabase-courts";

async function getMapboxToken() {
  try {
    const { env } = await import("cloudflare:workers");
    return env.MAPBOX_ACCESS_TOKEN ?? "";
  } catch {
    return process.env.MAPBOX_ACCESS_TOKEN ?? "";
  }
}

async function getSupabasePublicConfig() {
  try {
    const { env } = await import("cloudflare:workers");
    return {
      url: env.SUPABASE_URL ?? "",
      publishableKey: env.SUPABASE_PUBLISHABLE_KEY ?? "",
    };
  } catch {
    return {
      url: process.env.SUPABASE_URL ?? "",
      publishableKey: process.env.SUPABASE_PUBLISHABLE_KEY ?? "",
    };
  }
}

export default async function CourtPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lookupId = id === "basketball"
    ? "austin-basketball-hancock"
    : id === "pickleball" ? "austin-pickleball-pan-am" : id;
  let court: CourtDetail | undefined;

  if (!court) {
    const listing = await loadExplorerCourt(lookupId);
    if (listing) {
      const setting = listing.setting
        ? listing.setting.replaceAll("_", " ").replace(/^./, (value) => value.toUpperCase())
        : listing.indoor === true ? "Indoor" : listing.indoor === false ? "Outdoor" : "Not listed";
      const access = listing.accessType === "private_paid"
        ? "Private · paid"
        : listing.accessType === "public_paid" ? "Public · fees may apply" : "Public · free";
      court = {
        id: listing.id,
        name: listing.name,
        sport: listing.sport === "pickleball" ? "Pickleball" : "Basketball",
        address: [listing.address, listing.city, listing.state].filter(Boolean).join(", "),
        neighborhood: [listing.city, listing.state].filter(Boolean).join(", ") || "Local court",
        distance: "Map listing",
        coordinates: [listing.longitude, listing.latitude],
        liveCount: listing.liveCount ?? 0,
        localCount: listing.localCount ?? 0,
        isLocal: false,
        liveNote: listing.liveCount ? "Players checked in" : "No public check-ins yet",
        peakWindow: "Weekly intent builds as locals make plans",
        details: [
          { label: "Setup", value: listing.courtCount ? `${listing.courtCount} ${listing.courtCount === 1 ? "court" : "courts"}` : "Not listed" },
          { label: "Access", value: access },
          { label: "Setting", value: setting },
          { label: "Status", value: listing.verified ? "Source verified" : "Needs review" },
        ],
        players: [],
        schedule: [],
        activity: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      } satisfies CourtDetail;
    }
  }

  if (!court) notFound();

  const [mapboxToken, weather, supabase] = await Promise.all([
    getMapboxToken(),
    getCourtWeather(court.coordinates),
    getSupabasePublicConfig(),
  ]);

  return (
    <CourtPageClient
      court={court}
      mapboxToken={mapboxToken}
      weather={weather}
      supabase={supabase}
      todayIso={new Date().toISOString().slice(0, 10)}
    />
  );
}
