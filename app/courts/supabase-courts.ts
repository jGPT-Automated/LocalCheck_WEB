import { courtShortName } from "../../lib/court-name";

export type CourtSport = "basketball" | "pickleball";
export type CourtAccess = "public_free" | "public_paid" | "private_paid";

export type ExplorerCourt = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  sport: CourtSport;
  market: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  courtCount: number | null;
  setting: string;
  surface: string;
  indoor: boolean | null;
  hasLights: boolean | null;
  accessType: CourtAccess;
  verified: boolean;
  verificationStatus: string;
  sourceUrl: string;
  priority: number;
  liveCount: number | null;
  localCount: number | null;
};

export type CourtDataResult = {
  courts: ExplorerCourt[];
  source: "supabase" | "unavailable";
};

type RuntimeEnv = {
  SUPABASE_URL?: string;
  SUPABASE_PUBLISHABLE_KEY?: string;
};

type RawCourt = Record<string, unknown>;

function indoorFromSetting(setting: string) {
  if (setting === "indoor") return true;
  if (setting === "outdoor" || setting === "outdoor_covered") return false;
  return null;
}

async function getRuntimeEnv(): Promise<RuntimeEnv> {
  try {
    const { env } = await import("cloudflare:workers");
    return env as RuntimeEnv;
  } catch {
    return process.env as RuntimeEnv;
  }
}

function stringValue(...values: unknown[]) {
  const value = values.find((candidate) => typeof candidate === "string" && candidate.trim());
  return typeof value === "string" ? value.trim() : "";
}

function numberValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return null;
}

function booleanValue(...values: unknown[]) {
  for (const value of values) {
    if (typeof value === "boolean") return value;
    if (value === 1 || value === "1" || value === "true") return true;
    if (value === 0 || value === "0" || value === "false") return false;
  }
  return null;
}

function coordinatePair(raw: RawCourt) {
  const candidates = [raw.geo, raw.geometry, raw.center];

  for (const candidate of candidates) {
    let parsed = candidate;
    if (typeof parsed === "string") {
      try {
        parsed = JSON.parse(parsed);
      } catch {
        parsed = null;
      }
    }

    if (Array.isArray(parsed) && parsed.length >= 2) {
      const longitude = numberValue(parsed[0]);
      const latitude = numberValue(parsed[1]);
      if (longitude !== null && latitude !== null) return { latitude, longitude };
    }

    if (parsed && typeof parsed === "object") {
      const coordinates = (parsed as { coordinates?: unknown }).coordinates;
      if (Array.isArray(coordinates) && coordinates.length >= 2) {
        const longitude = numberValue(coordinates[0]);
        const latitude = numberValue(coordinates[1]);
        if (longitude !== null && latitude !== null) return { latitude, longitude };
      }
    }
  }

  let latitude = numberValue(raw.latitude, raw.lat, raw.y);
  let longitude = numberValue(raw.longitude, raw.lng, raw.lon, raw.x);

  if (latitude !== null && longitude !== null && Math.abs(latitude) > 90 && Math.abs(longitude) <= 90) {
    [latitude, longitude] = [longitude, latitude];
  }

  return { latitude, longitude };
}

function normalizeAccess(value: string): CourtAccess {
  if (value === "public_paid" || value === "private_paid") return value;
  return "public_free";
}

function normalizeCourt(raw: RawCourt, index: number): ExplorerCourt | null {
  const { latitude, longitude } = coordinatePair(raw);
  if (
    latitude === null ||
    longitude === null ||
    Math.abs(latitude) > 90 ||
    Math.abs(longitude) > 180
  ) return null;

  const rawSport = stringValue(raw.sport, raw.sport_type, raw.court_type, raw.type).toLowerCase();
  const sport: CourtSport = rawSport.includes("pickle") ? "pickleball" : "basketball";
  const slug = stringValue(raw.slug);
  const id = stringValue(raw.id, raw.court_id) || slug || `court-${index}-${latitude}-${longitude}`;
  const name = stringValue(raw.name, raw.court_name, raw.title) || "Community court";
  const setting = stringValue(raw.setting);
  const verificationStatus = stringValue(raw.verification_status) || "unverified";

  return {
    id,
    slug: slug || id,
    name,
    shortName: courtShortName({
      name,
      shortName: stringValue(raw.short_name),
      address: stringValue(raw.address, raw.street_address, raw.formatted_address),
      sport,
    }),
    sport,
    market: stringValue(raw.market, raw.metro, raw.city),
    address: stringValue(raw.address, raw.street_address, raw.formatted_address, raw.location_name),
    city: stringValue(raw.city, raw.locality, raw.municipality),
    state: stringValue(raw.state, raw.region, raw.state_code),
    latitude,
    longitude,
    courtCount: numberValue(raw.court_count, raw.courts, raw.num_courts, raw.number_of_courts),
    setting,
    surface: stringValue(raw.surface, raw.surface_type),
    indoor: booleanValue(raw.indoor, raw.is_indoor) ?? indoorFromSetting(setting),
    hasLights: booleanValue(raw.has_lights, raw.lights, raw.lighted),
    accessType: normalizeAccess(stringValue(raw.access_type)),
    verified: booleanValue(raw.is_confirmed, raw.is_verified, raw.verified)
      ?? (verificationStatus === "source_verified" || verificationStatus === "source_and_detection"),
    verificationStatus,
    sourceUrl: "",
    priority: 0,
    liveCount: null,
    localCount: null,
  };
}

async function fetchRows(path: string, query: Record<string, string>) {
  const env = await getRuntimeEnv();
  const baseUrl = env.SUPABASE_URL?.replace(/\/$/, "");
  const publishableKey = env.SUPABASE_PUBLISHABLE_KEY;
  if (!baseUrl || !publishableKey) throw new Error("Supabase is not configured");

  const url = new URL(`${baseUrl}/rest/v1/${path}`);
  Object.entries(query).forEach(([key, value]) => url.searchParams.set(key, value));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json", apikey: publishableKey },
      next: { revalidate: 180 },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Supabase returned ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error("Invalid court response");
    return rows as RawCourt[];
  } finally {
    clearTimeout(timeout);
  }
}

// Public venue fields only. Activity counters are omitted until QA isolation is deployed.
const PUBLIC_FIELDS = "id,slug,name,short_name,address,city,state,market,latitude,longitude,sport_type,access_type,setting,court_count,surface,indoor,has_lights,is_confirmed";

export async function loadExplorerCourts(): Promise<CourtDataResult> {
  try {
    const courts: ExplorerCourt[] = [];
    const pageSize = 500;
    // Pagination keeps later additions on the shared view without a second catalog.
    for (let offset = 0; ; offset += pageSize) {
      const rows = await fetchRows("courts_with_stats", {
        select: PUBLIC_FIELDS, order: "id.asc", limit: String(pageSize), offset: String(offset),
      });
      courts.push(...rows.map(normalizeCourt).filter((court): court is ExplorerCourt => Boolean(court)));
      if (rows.length < pageSize) break;
      if (offset >= 9500) throw new Error("Court catalog requires viewport pagination");
    }
    return { courts, source: "supabase" };
  } catch {
    return { courts: [], source: "unavailable" };
  }
}

export async function loadExplorerCourt(idOrSlug: string): Promise<ExplorerCourt | null> {
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idOrSlug);
  const rows = await fetchRows("courts_with_stats", {
    select: PUBLIC_FIELDS, [isUuid ? "id" : "slug"]: `eq.${idOrSlug}`, limit: "1",
  });
  return rows.length ? normalizeCourt(rows[0], 0) : null;
}
