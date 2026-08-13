import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";
import "./hero-scroll.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://localchecksports.com"),
  title: "LocalCheck — Find Your Run",
  description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "LocalCheck — Find Your Run",
    description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalCheck — Find Your Run",
    description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
    images: ["/localcheck-logo-final-preview.png"],
  },
  other: {
    "codex-preview": "development",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
