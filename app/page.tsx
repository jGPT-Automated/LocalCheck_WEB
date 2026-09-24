import type { Metadata } from "next";
import HomeView from "./home-view";
import { loadExplorerCourts } from "./courts/supabase-courts";
import { deriveCourtStats } from "../lib/court-stats";
import { SITE_DESCRIPTION } from "../lib/messaging";

export const metadata: Metadata = {
  title: "LocalCheck | Find Your Run",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

/**
 * Counts come from the same data layer `/courts` and the sitemap use, so the
 * homepage can never disagree with the map page about how many courts exist.
 * `deriveCourtStats` is shared with the client refresh in `home-view.tsx`, so
 * the server render and the browser correction mean the same thing.
 *
 * `/` was fully static before this awaited Supabase. ISR keeps it off the
 * request path: the page renders from cache and refreshes in the background,
 * so TTFB stays what it was while the counts still track the database.
 */
export const revalidate = 180;

export default async function Page() {
  const { courts } = await loadExplorerCourts();
  return <HomeView stats={deriveCourtStats(courts)} initialCourts={courts} />;
}
