import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline";
import { createReadStream } from "node:fs";

const root = process.cwd();
const candidatesPath = path.join(root, "data", "launch-court-candidates.json");
const outputJsonPath = path.join(root, "data", "launch-courts.json");
const outputCsvPath = path.join(root, "data", "launch-courts.csv");
const rawCsvPath = process.argv[2];

if (!rawCsvPath) {
  throw new Error("Pass the source detection CSV path as the first argument.");
}

const candidates = JSON.parse(await fs.readFile(candidatesPath, "utf8"));
const relevantStates = new Set(candidates.map((court) => court.state));
const previousRows = await fs.readFile(outputJsonPath, "utf8")
  .then((content) => JSON.parse(content))
  .catch(() => []);
const previousBySlug = new Map(previousRows.map((court) => [court.slug, court]));
const marketCenters = {
  "New York City": { latitude: 40.7128, longitude: -74.006 },
  "Washington DC": { latitude: 38.9072, longitude: -77.0369 },
  Miami: { latitude: 25.7617, longitude: -80.1918 },
  "Los Angeles": { latitude: 34.0522, longitude: -118.2437 },
  Houston: { latitude: 29.7604, longitude: -95.3698 },
  Austin: { latitude: 30.2672, longitude: -97.7431 },
  Denver: { latitude: 39.7392, longitude: -104.9903 },
};

function parseCsvLine(line) {
  const values = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"') {
      if (quoted && line[index + 1] === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (character === "," && !quoted) {
      values.push(value);
      value = "";
    } else {
      value += character;
    }
  }
  values.push(value);
  return values;
}

async function loadDetections() {
  const detections = new Map([...relevantStates].map((state) => [state, []]));
  const input = createReadStream(rawCsvPath, { encoding: "utf8" });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });
  let header = null;

  for await (const line of lines) {
    const values = parseCsvLine(line);
    if (!header) {
      header = values;
      continue;
    }
    const row = Object.fromEntries(header.map((column, index) => [column, values[index] ?? ""]));
    if (!relevantStates.has(row.state)) continue;
    const [longitudeText, latitudeText] = String(row.center).split(",");
    const longitude = Number(longitudeText);
    const latitude = Number(latitudeText);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
    detections.get(row.state).push({
      id: row.id,
      city: row.location,
      latitude,
      longitude,
    });
  }

  return detections;
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function geocode(court) {
  const queries = [
    court.geocode_query_override,
    `${court.name}, ${court.address}, ${court.city}, ${court.state} ${court.postal_code}`,
    `${court.address}, ${court.city}, ${court.state} ${court.postal_code}`,
    `${court.name}, ${court.market}`,
  ].filter(Boolean);

  for (const query of queries) {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.searchParams.set("format", "jsonv2");
    url.searchParams.set("limit", "3");
    url.searchParams.set("countrycodes", "us");
    url.searchParams.set("addressdetails", "1");
    url.searchParams.set("q", query);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "LocalCheckLaunchDataset/1.0 (research seed; contact via github.com/jGPT-Automated/LocalCheck_WEB)",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error(`Nominatim returned ${response.status}`);
    const results = await response.json();
    const center = marketCenters[court.market];
    const selected = results.find((result) => {
      if (!center) return true;
      return haversineMeters(center, {
        latitude: Number(result.lat),
        longitude: Number(result.lon),
      }) <= 80_000;
    });
    if (selected) {
      return {
        latitude: Number(selected.lat),
        longitude: Number(selected.lon),
        display_name: selected.display_name,
        importance: Number(selected.importance ?? 0),
        query,
      };
    }
    await sleep(1100);
  }

  return null;
}

function haversineMeters(a, b) {
  const radius = 6_371_000;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDelta = toRadians(b.latitude - a.latitude);
  const longitudeDelta = toRadians(b.longitude - a.longitude);
  const latitude1 = toRadians(a.latitude);
  const latitude2 = toRadians(b.latitude);
  const value =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(longitudeDelta / 2) ** 2;
  return radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

function nearestDetection(court, detections) {
  let nearest = null;
  for (const detection of detections.get(court.state) ?? []) {
    const distance = haversineMeters(court, detection);
    if (!nearest || distance < nearest.distance_m) {
      nearest = { ...detection, distance_m: distance };
    }
  }
  return nearest;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function priority(reason) {
  return {
    iconic: 100,
    open_play_anchor: 92,
    pickup_anchor: 90,
    social_anchor: 86,
    community_hub: 82,
    neighborhood_hub: 78,
    city_anchor: 76,
    downtown_anchor: 74,
  }[reason] ?? 70;
}

function detectionStatus(distance) {
  if (distance == null) return "none";
  if (distance <= 90) return "strong";
  if (distance <= 220) return "nearby";
  if (distance <= 500) return "review";
  return "none";
}

function csvEscape(value) {
  if (value == null) return "";
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

const detections = await loadDetections();
const enriched = [];

for (const [index, candidate] of candidates.entries()) {
  process.stdout.write(`[${index + 1}/${candidates.length}] ${candidate.name}\n`);
  const slug = `${slugify(candidate.market)}-${candidate.sport}-${slugify(candidate.short_name)}`;
  const previous = previousBySlug.get(slug);
  const center = marketCenters[candidate.market];
  const previousIsLocal =
    previous &&
    center &&
    haversineMeters(center, previous) <= 80_000 &&
    (!candidate.geocode_query_override || previous.geocode_query === candidate.geocode_query_override);
  const result = previousIsLocal
    ? {
        latitude: previous.latitude,
        longitude: previous.longitude,
        display_name: previous.geocode_display_name,
        importance: previous.geocode_importance,
        query: previous.geocode_query,
      }
    : await geocode(candidate);
  if (!result) throw new Error(`No geocode found for ${candidate.name}`);
  const court = {
    ...candidate,
    slug,
    latitude: Number(result.latitude.toFixed(7)),
    longitude: Number(result.longitude.toFixed(7)),
    geocode_source: "OpenStreetMap Nominatim",
    geocode_query: result.query,
    geocode_display_name: result.display_name,
    geocode_importance: Number(result.importance.toFixed(6)),
    launch_priority: priority(candidate.launch_reason),
    verification_status: "source_verified",
  };

  if (court.sport === "basketball") {
    const match = nearestDetection(court, detections);
    const distance = match ? Number(match.distance_m.toFixed(1)) : null;
    court.detection_source_id = distance !== null && distance <= 500 ? match.id : null;
    court.detection_distance_m = distance !== null && distance <= 500 ? distance : null;
    court.detection_city = distance !== null && distance <= 500 ? match.city : null;
    court.satellite_match_status = detectionStatus(distance);
  } else {
    court.detection_source_id = null;
    court.detection_distance_m = null;
    court.detection_city = null;
    court.satellite_match_status = "not_applicable";
  }

  enriched.push(court);
  if (!previousIsLocal) await sleep(1100);
}

await fs.writeFile(outputJsonPath, `${JSON.stringify(enriched, null, 2)}\n`);

const columns = [
  "slug",
  "market",
  "sport",
  "name",
  "short_name",
  "address",
  "city",
  "state",
  "postal_code",
  "latitude",
  "longitude",
  "access_type",
  "setting",
  "court_count",
  "launch_reason",
  "launch_priority",
  "verification_status",
  "source_tier",
  "source_url",
  "geocode_source",
  "geocode_query",
  "geocode_display_name",
  "detection_source_id",
  "detection_distance_m",
  "detection_city",
  "satellite_match_status"
];
const csv = [
  columns.join(","),
  ...enriched.map((court) => columns.map((column) => csvEscape(court[column])).join(",")),
].join("\n");
await fs.writeFile(outputCsvPath, `${csv}\n`);

const summary = enriched.reduce((accumulator, court) => {
  const key = `${court.market} · ${court.sport}`;
  accumulator[key] = (accumulator[key] ?? 0) + 1;
  return accumulator;
}, {});
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
