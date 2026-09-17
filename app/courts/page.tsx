import type { Metadata } from "next";
import CourtExplorerClient from "./court-explorer-client";
import { loadExplorerCourts } from "./supabase-courts";

export const metadata: Metadata = {
  title: "Find a Court — LocalCheck",
  description: "Explore live basketball and pickleball courts on the LocalCheck map.",
  alternates: { canonical: "/courts" },
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
  // Same data layer the sitemap and homepage use, so the rendered court set
  // and the URLs in sitemap.xml can never disagree about which venues exist.
  const [mapboxToken, courtData] = await Promise.all([getMapboxToken(), loadExplorerCourts()]);

  return (
    <CourtExplorerClient
      initialCourts={courtData.courts}
      mapboxToken={mapboxToken}
      source={courtData.source}
    />
  );
}
