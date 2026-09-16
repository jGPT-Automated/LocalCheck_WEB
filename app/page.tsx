import type { Metadata } from "next";
import HomeView from "./home-view";

export const metadata: Metadata = {
  title: "LocalCheck — Find Your Run",
  description:
    "Find live basketball and pickleball courts, see who is playing, and check in with one tap.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeView />;
}
