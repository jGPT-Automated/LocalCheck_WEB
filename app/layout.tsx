import type { Metadata } from "next";
import { SITE_URL } from "../lib/site";
import { jsonLd, siteGraph } from "../lib/structured-data";
import "@fontsource-variable/inter";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "LocalCheck — Find Live Basketball & Pickleball Courts Near You",
  description:
    "LocalCheck shows when people actually plan to play at your local basketball and pickleball courts. See the weekly heatmap, check in with one tap, log games, and climb your local ranking.",
  alternates: { canonical: "/" },
  keywords: [
    "pickup basketball",
    "pickleball courts",
    "courts near me",
    "pickup games",
    "court check-in",
    "local basketball runs",
  ],
  applicationName: "LocalCheck",
  authors: [{ name: "Jesse Herrig" }],
  creator: "LocalCheck",
  publisher: "LocalCheck",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "LocalCheck — Find Live Basketball & Pickleball Courts Near You",
    description:
      "See when people actually plan to play at your local courts. Live check-ins, weekly heatmaps, and real local rankings for basketball and pickleball.",
    url: "/",
    siteName: "LocalCheck",
    images: [
      {
        url: "/localcheck-logo-final-preview.png",
        width: 5160,
        height: 808,
        alt: "LocalCheck",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalCheck — Find Live Basketball & Pickleball Courts Near You",
    description:
      "See when people actually plan to play at your local courts. Live check-ins, weekly heatmaps, and real local rankings.",
    images: ["/localcheck-logo-final-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/*
          vinext's viewport shim emits width/height/scale only and drops
          `viewportFit`, so the Next-style `viewport` export cannot produce
          this. Without `viewport-fit=cover`, every `env(safe-area-inset-*)`
          resolves to 0 on notched iPhones and the last court card sits under
          the home indicator.

          Ordering matters: this must stay AFTER the generated viewport tag,
          because current Blink/WebKit/Firefox honour the last one inserted.
          Two viewport tags are non-conformant, and a UA that honoured the
          first would silently drop viewport-fit — degrading to today's
          behaviour, not breaking the page.
        */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        {/*
          Sitewide JSON-LD: Organization + WebSite (with SearchAction) +
          MobileApplication. Court-level SportsActivityLocation is emitted
          per court in app/courts/[id]/page.tsx.
        */}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(siteGraph())} />
      </head>
      <body>{children}</body>
    </html>
  );
}
