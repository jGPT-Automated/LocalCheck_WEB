import type { ExplorerCourt } from "../app/courts/supabase-courts";

type FeatureCandidate = Pick<ExplorerCourt, "slug" | "sport" | "verified" | "localCount" | "liveCount" | "priority">;

function compareCourts(a: FeatureCandidate, b: FeatureCandidate) {
  return (b.localCount ?? -1) - (a.localCount ?? -1)
    || (b.liveCount ?? -1) - (a.liveCount ?? -1)
    || b.priority - a.priority
    || a.slug.localeCompare(b.slug);
}

export function selectFeaturedCourts<T extends FeatureCandidate>(courts: readonly T[]) {
  const best = (sport: FeatureCandidate["sport"]): T | null =>
    courts.filter((court) => court.sport === sport && court.verified).sort(compareCourts)[0] ?? null;

  return { basketball: best("basketball"), pickleball: best("pickleball") };
}
