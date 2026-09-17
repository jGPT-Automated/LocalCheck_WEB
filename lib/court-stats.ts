import type { ExplorerCourt } from "../app/courts/supabase-courts";

export type CourtStats = {
  total: number;
  basketball: number;
  pickleball: number;
  markets: number;
};

/**
 * The four launch counts the homepage shows.
 *
 * Derived once here and used by both the server render (`app/page.tsx`) and the
 * client refresh from `/api/courts` (`app/home-view.tsx`), so the two paths
 * cannot disagree about what the numbers mean. Any court set — Supabase rows or
 * the bundled fallback — produces the same shape.
 */
export function deriveCourtStats(
  courts: Array<Pick<ExplorerCourt, "sport" | "market">>,
): CourtStats {
  return {
    total: courts.length,
    basketball: courts.filter((court) => court.sport === "basketball").length,
    pickleball: courts.filter((court) => court.sport === "pickleball").length,
    markets: new Set(courts.map((court) => court.market).filter(Boolean)).size,
  };
}
