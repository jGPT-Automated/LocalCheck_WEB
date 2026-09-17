import type { MetadataRoute } from "next";
import { loadExplorerCourts } from "./courts/supabase-courts";
import { SITE_URL } from "../lib/site";

/**
 * Sitemap generated from the same court data layer the deployed pages use.
 *
 * `loadExplorerCourts()` reads Supabase when configured and falls back to the
 * bundled curated catalog (`data/launch-courts.json`, 56 courts) otherwise.
 * Reusing it keeps the URL set in sync as venues are added — no duplicated
 * queries and no hardcoded slugs. API routes and machine-readable
 * (.json/.txt) endpoints are intentionally excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { courts } = await loadExplorerCourts();

  const seen = new Set<string>();
  const courtEntries: MetadataRoute.Sitemap = [];

  for (const court of courts) {
    const slug = court.slug?.trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    courtEntries.push({
      url: `${SITE_URL}/courts/${slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/courts`, changeFrequency: "weekly", priority: 0.9 },
    ...courtEntries,
    { url: `${SITE_URL}/support`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/pioneers`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
