export type CourtNameInput = {
  name?: string | null;
  shortName?: string | null;
  address?: string | null;
  sport?: "basketball" | "pickleball" | null;
};

const GENERIC_SUFFIXES = [
  /\s+pickleball courts?$/i,
  /\s+basketball courts?$/i,
  /\s+recreation center$/i,
  /\s+community center$/i,
  /\s+sports complex$/i,
  /\s+neighborhood park$/i,
];

function clean(value?: string | null) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function looksGenerated(value: string) {
  return /^(court|basketball court|pickleball court)[-_\s#]*\d+$/i.test(value);
}

function addressFallback(address: string, sport?: CourtNameInput["sport"]) {
  const firstStreet = address.split(/\s+(?:&|and|at)\s+|,/i)[0] ?? address;
  const street = firstStreet
    .replace(/^\d+[A-Za-z-]*\s+/, "")
    .replace(/\b(street|st|avenue|ave|boulevard|blvd|road|rd|drive|dr|lane|ln|parkway|pkwy)\.?$/i, "")
    .trim();
  const label = street || "Local";
  return `${label} ${sport === "pickleball" ? "Pickleball" : "Court"}`;
}

/**
 * Produces the compact map/card label. Curated aliases win, then a cleaned
 * official facility name, then a street-based fallback for raw detections.
 * Database IDs never become public court names.
 */
export function courtShortName(input: CourtNameInput) {
  const explicit = clean(input.shortName);
  if (explicit && !looksGenerated(explicit)) return explicit.slice(0, 32);

  const official = clean(input.name);
  if (official && !looksGenerated(official)) {
    const shortened = GENERIC_SUFFIXES.reduce((value, pattern) => value.replace(pattern, ""), official).trim();
    if (shortened) return shortened.slice(0, 32);
  }

  return addressFallback(clean(input.address), input.sport).slice(0, 32);
}

