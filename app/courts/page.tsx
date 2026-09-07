import type { Metadata } from "next";
import CourtExplorerClient from "./court-explorer-client";
import { loadExplorerCourts } from "./supabase-courts";

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
  const result = await loadExplorerCourts();
  const mapboxToken = await getMapboxToken();

  return (
    <CourtExplorerClient
      initialCourts={result.courts}
      mapboxToken={mapboxToken}
      source={result.source}
    />
  );
}
