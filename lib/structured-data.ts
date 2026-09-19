/**
 * Structured data (JSON-LD) builders.
 *
 * Every number that appears in schema is derived from live court data at
 * render time — nothing here is hardcoded. See lib/court-stats.ts.
 */
import { SITE_URL } from "./site";
import type { ExplorerCourt } from "../app/courts/supabase-courts";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#mobile-app`;

const LOGO = `${SITE_URL}/localcheck-logo-final-preview.png`;

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: "LocalCheck",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: LOGO },
    email: "localchecksports@gmail.com",
    founder: { "@type": "Person", name: "Jesse Herrig" },
    sameAs: ["https://x.com/localchecksports"],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "LocalCheck",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/courts?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function mobileAppSchema() {
  return {
    "@type": "MobileApplication",
    "@id": APP_ID,
    name: "LocalCheck",
    applicationCategory: "SportsApplication",
    operatingSystem: "iOS",
    url: SITE_URL,
    publisher: { "@id": ORG_ID },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Weekly court heatmap showing when locals plan to play",
      "Geofenced one-tap check-in",
      "Scheduled pickup games with rosters",
      "Game logging with ELO ratings and local leaderboards",
      "Opponent-reviewed score disputes",
      "AI-verified court submissions from a live camera capture",
    ],
  };
}

/** Sitewide graph — rendered once in the root layout. */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationSchema(), websiteSchema(), mobileAppSchema()],
  };
}

const SPORT_LABEL: Record<string, string> = {
  basketball: "Basketball",
  pickleball: "Pickleball",
};

/**
 * SportsActivityLocation for a single court.
 *
 * This is the schema that lets an assistant answer "where can I play
 * pickleball in Denver" with a specific court rather than a guess.
 */
export function courtSchema(court: ExplorerCourt) {
  const sport = SPORT_LABEL[court.sport] ?? court.sport;
  const url = `${SITE_URL}/courts/${court.slug}`;
  const isFree = court.accessType === "public_free";

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${url}#place`,
    name: court.name,
    url,
    sport,
    description: `${court.name} is a ${sport.toLowerCase()} court in ${[court.city, court.state]
      .filter(Boolean)
      .join(", ")}. See live check-ins, weekly activity, setup, and access details on LocalCheck.`,
    isAccessibleForFree: isFree,
    publicAccess: court.accessType !== "private_paid",
    additionalType: "https://schema.org/SportsActivityLocation",
    subjectOf: { "@id": WEBSITE_ID },
  };

  if (court.address || court.city) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: court.address || undefined,
      addressLocality: court.city || undefined,
      addressRegion: court.state || undefined,
      addressCountry: "US",
    };
  }

  if (typeof court.latitude === "number" && typeof court.longitude === "number") {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: court.latitude,
      longitude: court.longitude,
    };
    schema.hasMap = `https://maps.apple.com/?daddr=${court.latitude},${court.longitude}`;
  }

  const amenities: Array<Record<string, unknown>> = [];
  if (court.courtCount) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      name: "Court count",
      value: court.courtCount,
    });
  }
  if (court.indoor !== null && court.indoor !== undefined) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      name: court.indoor ? "Indoor" : "Outdoor",
      value: true,
    });
  }
  if (court.hasLights !== null && court.hasLights !== undefined) {
    amenities.push({
      "@type": "LocationFeatureSpecification",
      name: "Lights",
      value: court.hasLights,
    });
  }
  if (amenities.length) schema.amenityFeature = amenities;

  return schema;
}

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: ReadonlyArray<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Serialize for a <script type="application/ld+json"> tag. */
export function jsonLd(schema: unknown) {
  return { __html: JSON.stringify(schema) };
}
