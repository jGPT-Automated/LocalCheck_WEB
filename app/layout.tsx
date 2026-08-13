import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/600.css";
import "@fontsource/oswald/700.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://localchecksports.com"),
  title: "LocalCheck — Find Your Run",
  description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "LocalCheck — Find Your Run",
    description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
    url: "/",
    siteName: "LocalCheck",
    images: [
      {
        url: "/hero-map.png",
        width: 1664,
        height: 936,
        alt: "LocalCheck live court map",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalCheck — Find Your Run",
    description: "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
    images: ["/hero-map.png"],
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
