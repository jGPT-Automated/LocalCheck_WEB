import type { Metadata } from "next";
import { AppOverview } from "./app-overview";
import { faqSchema, jsonLd } from "@/lib/structured-data";
import { APP_FAQS } from "@/lib/app-faqs";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "The LocalCheck App | Find the Run. Know Who's Going.",
  description: "Preview the LocalCheck app: find basketball and pickleball courts, see weekly player plans, organize games, and track reviewed scores and Elo ratings.",
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(APP_FAQS))} /><AppOverview breadcrumbs={<Breadcrumbs trail={[{ name: "LocalCheck", path: "/" }, { name: "The app", path: "/app" }]} />} /></>;
}
