/**
 * /llms.txt — machine-readable site summary for AI crawlers and assistants.
 *
 * Generated from live Supabase court data on every revalidation, so the
 * catalog never drifts from what the site actually serves. Nothing here is
 * hardcoded: counts, cities, and court links all derive from
 * loadExplorerCourts() + deriveCourtStats(), the same single source of truth
 * the homepage, /courts, and sitemap.ts use.
 *
 * Format follows the llms.txt convention: H1 name, blockquote summary,
 * prose context, then H2 sections of annotated links.
 */
import { loadExplorerCourts, type ExplorerCourt } from "../courts/supabase-courts";
import { deriveCourtStats } from "../../lib/court-stats";
import { SITE_URL } from "../../lib/site";

export const revalidate = 3600;

function titleCase(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function courtLine(court: ExplorerCourt) {
  const sport = court.sport === "pickleball" ? "Pickleball" : "Basketball";
  const place = [court.city, court.state].filter(Boolean).join(", ");
  const setup = court.courtCount
    ? `${court.courtCount} ${court.courtCount === 1 ? "court" : "courts"}`
    : null;
  const access =
    court.accessType === "private_paid"
      ? "private, paid"
      : court.accessType === "public_paid"
        ? "public, fees may apply"
        : "public and free";
  const detail = [sport, place, setup, access].filter(Boolean).join(" · ");

  return `- [${court.name}](${SITE_URL}/courts/${court.slug}): ${detail}. Live check-ins, weekly plan heatmap, and access details.`;
}

export async function GET() {
  const { courts } = await loadExplorerCourts();
  const stats = deriveCourtStats(courts);

  const byMarket = new Map<string, ExplorerCourt[]>();
  for (const court of courts) {
    if (!court.slug) continue;
    const market = court.market || court.city || "Other";
    const bucket = byMarket.get(market);
    if (bucket) bucket.push(court);
    else byMarket.set(market, [court]);
  }

  const marketNames = [...byMarket.keys()].sort((a, b) => a.localeCompare(b));

  const marketSections = marketNames.map((market) => {
    const list = (byMarket.get(market) ?? [])
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    const basketball = list.filter((court) => court.sport === "basketball").length;
    const pickleball = list.filter((court) => court.sport === "pickleball").length;

    return [
      `## ${titleCase(market)}`,
      "",
      `${list.length} ${list.length === 1 ? "court" : "courts"} — ${basketball} basketball, ${pickleball} pickleball.`,
      "",
      ...list.map(courtLine),
    ].join("\n");
  });

  const body = [
    "# LocalCheck",
    "",
    "> LocalCheck is a free iOS app that shows when people actually plan to play at local basketball and pickleball courts. Instead of listing that a court exists, it shows a weekly heatmap of who is coming and when, geofenced one-tap check-in so live counts are real, scheduled pickup games, and ELO-based local rankings.",
    "",
    `LocalCheck covers ${stats.total} source-backed courts across ${stats.markets} US cities at launch — ${stats.basketball} basketball and ${stats.pickleball} pickleball. Operated by Jesse Herrig. Contact: localchecksports@gmail.com.`,
    "",
    "## What makes LocalCheck different",
    "",
    "- **Intent, not history.** The weekly heatmap is built from locals marking the hours they plan to show up, so it answers \"will there be a run at 6pm Tuesday\" rather than \"was this court busy last month\".",
    "- **Geofenced check-in.** Check-in only works when you are physically at the court, so a live count of three means three real people. Counts start at zero and are never fabricated.",
    "- **Reviewed scores.** Logged games go to the opponent for approval or dispute before they count toward ELO. Unresolved games are voided rather than recorded wrong.",
    "- **Verified court submissions.** New courts require a live location lock plus a live camera capture that is AI-analyzed; photo-library uploads are rejected.",
    "- **Free.** No purchases, no subscription, no ads, no cross-app tracking.",
    "",
    "## Start here",
    "",
    `- [How LocalCheck works](${SITE_URL}/how-it-works): Full explanation of the weekly heatmap, geofenced check-in, scheduled runs, ELO ratings and score disputes, home courts, and AI-verified court submissions. Includes answers to the most common questions.`,
    `- [Court explorer](${SITE_URL}/courts): Browse and filter all ${stats.total} launch courts by sport and city, as a map or a list.`,
    `- [Homepage](${SITE_URL}/): Product overview, live launch stats, and app preview.`,
    `- [Pioneers](${SITE_URL}/pioneers): The early-local program for people who claim and build out their home court.`,
    "",
    "## Key questions LocalCheck answers",
    "",
    "- Where can I play pickup basketball or pickleball near me right now?",
    "- Is anyone actually at a specific court at this moment?",
    "- What time of week is a given court busiest?",
    "- Who are the regulars at my local court, and how do I rank among them?",
    "- How do I find a scheduled pickup game to join?",
    "- How do I get a court added to the map?",
    "",
    ...marketSections,
    "",
    "## Policies and support",
    "",
    `- [Privacy Policy](${SITE_URL}/privacy): What LocalCheck collects, how it is used and shared, retention, and account deletion. No third-party advertising or cross-app tracking.`,
    `- [Terms of Service](${SITE_URL}/terms): Account rules, acceptable use, community standards and enforcement, court submission rules, and safety disclaimers.`,
    `- [Support](${SITE_URL}/support): How to reach us with questions, bugs, or reports.`,
    "",
    "## Platform",
    "",
    "- Platform: iOS. Price: free, no in-app purchases.",
    "- Sports at launch: basketball and pickleball.",
    "- Safety: every player profile has Report Player and Block Player controls; reports go to localchecksports@gmail.com.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
