import type { Metadata } from "next";
import { AppOverview } from "./app-overview";
import { SITE_DESCRIPTION } from "@/lib/messaging";

export const metadata: Metadata = {
  title: "The LocalCheck App | Find the Run. Know Who's Going.",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  return <AppOverview />;
}
