import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="legal-page" id="top">
      <SiteHeader />
      <section className="legal-hero" aria-labelledby="not-found-title">
        <div>
          <span className="eyebrow eyebrow--orange">404 · Out of bounds</span>
          <h1 id="not-found-title">Page not found<span>.</span></h1>
          <p className="legal-intro">
            This route is empty. Head back to LocalCheck or find a court near you.
          </p>
          <div className="pioneers-hero__actions">
            <Button asChild className="button button--hero">
              <Link href="/courts">Find a court <ArrowRight size={18} weight="bold" /></Link>
            </Button>
            <Link className="pioneers-hero__secondary" href="/">Back home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
