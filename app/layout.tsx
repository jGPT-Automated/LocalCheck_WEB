import type { Metadata } from "next";
import { SITE_URL } from "../lib/site";
import { jsonLd, siteNodes } from "../lib/structured-data";
import { BRAND_LINE, SITE_DESCRIPTION } from "../lib/messaging";
import "@fontsource-variable/inter";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `LocalCheck | ${BRAND_LINE}`,
  description: SITE_DESCRIPTION,
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
  authors: [{ name: "LocalCheck" }],
  creator: "LocalCheck",
  publisher: "LocalCheck",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: `LocalCheck | ${BRAND_LINE}`,
    description: SITE_DESCRIPTION,
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
    title: `LocalCheck | ${BRAND_LINE}`,
    description: SITE_DESCRIPTION,
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
          MobileApplication, as separate self-describing tags rather than one
          @graph — see lib/structured-data.ts for why. Court-level
          SportsActivityLocation is emitted per court in
          app/courts/[id]/page.tsx.
        */}
        {siteNodes().map((node) => (
          <script
            key={String(node["@type"])}
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLd(node)}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
