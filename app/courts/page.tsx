import type { Metadata } from "next";
import CourtExplorerClient from "./court-explorer-client";
import { launchCourts } from "./supabase-courts";

export const metadata: Metadata = {
  title: "Find a Court — LocalCheck",
  description: "Explore live basketball and pickleball courts on the LocalCheck map.",
};

async function getMapboxToken() {
  try {
    const { env } = await import("cloudflare:workers");
    return env.MAPBOX_ACCESS_TOKEN ?? "";
  } catch {
    return process.env.MAPBOX_ACCESS_TOKEN ?? "";
  }
}

export default async function CourtsPage() {
  // Render the source-backed launch set immediately. A bounded client-side
  // refresh swaps in the same catalog with live Supabase counters.
  const mapboxToken = await getMapboxToken();

  return (
    <CourtExplorerClient
      initialCourts={launchCourts}
      mapboxToken={mapboxToken}
      source="curated"
    />
  );
}
