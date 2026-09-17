import type { Metadata } from "next";
import HomeView from "./home-view";
import { loadExplorerCourts } from "./courts/supabase-courts";

export const metadata: Metadata = {
  title: "LocalCheck — Find Your Run",
  description:
    "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
  alternates: { canonical: "/" },
};

/**
 * Counts come from the same data layer `/courts` and the sitemap use, so the
 * homepage can never disagree with the map page about how many courts exist.
 */
export default async function Page() {
  const { courts } = await loadExplorerCourts();

  const stats = {
    total: courts.length,
    basketball: courts.filter((court) => court.sport === "basketball").length,
    pickleball: courts.filter((court) => court.sport === "pickleball").length,
    markets: new Set(courts.map((court) => court.market).filter(Boolean)).size,
  };

  return <HomeView stats={stats} />;
}
