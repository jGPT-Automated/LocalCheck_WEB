import { ArrowLeft, Check, CornersOut } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { loadExplorerCourts } from "../courts/supabase-courts";
import { deriveCourtStats } from "../../lib/court-stats";
import { breadcrumbSchema, faqSchema, jsonLd } from "../../lib/structured-data";
import type { FaqItem } from "../../lib/structured-data";
import { COMMUNITY_PROMISE, PRODUCT_EXPLANATION, SITE_DESCRIPTION } from "../../lib/messaging";

export const revalidate = 180;

export const metadata: Metadata = {
  title: "How LocalCheck Works | Heatmaps, Check-ins & Rankings",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How LocalCheck Works",
    description:
      "The weekly heatmap, one-tap check-in, scheduled runs, friend, court, and regional rankings, and verified court submissions explained.",
    url: "/how-it-works",
    siteName: "LocalCheck",
    type: "website",
  },
};

const sections = [
  ["what-it-is", "What LocalCheck is"],
  ["three-steps", "The short version"],
  ["heatmap", "The weekly heatmap"],
  ["check-in", "Checking in"],
  ["runs", "Scheduled runs"],
  ["compete", "Games, ratings, and disputes"],
  ["locals", "Locals and home courts"],
  ["add-court", "Adding a court"],
  ["safety", "Safety and privacy"],
  ["faq", "Common questions"],
] as const;

const faqs: readonly FaqItem[] = [
  {
    question: "Is LocalCheck free?",
    answer:
      "Yes. LocalCheck is free to download and free to use. There are no in-app purchases, no subscription, and no ads.",
  },
  {
    question: "What does the heatmap actually show?",
    answer:
      "It shows when people plan to play at a specific court, hour by hour across the week. It is built from intent — locals marking the times they are coming — rather than reviews or guesswork. Darker cells mean more people plan to be there.",
  },
  {
    question: "Do I have to be at the court to check in?",
    answer:
      "Yes. Check-in is geofenced, so it only works when you are physically at the court. That is deliberate: it keeps the live count honest, so when the app says people are there, people are there.",
  },
  {
    question: "What happens if I add my time and nobody else shows up?",
    answer:
      "Nothing is lost — your plan is what makes the court visible to other locals in the first place. Counts start at zero and are never fabricated, so early plans are how a court goes from empty to active.",
  },
  {
    question: "How does the rating work?",
    answer:
      "Logged games feed an Elo rating. Wins against stronger opponents move you more than wins against weaker ones. That rating powers friend, court, and regional leaderboards.",
  },
  {
    question: "What if my opponent logs the wrong score?",
    answer:
      "Every submitted score goes to your opponent for review before it counts. They can approve it, or dispute it with a corrected score and a note. Disputed scores are held until both sides agree, and unresolved games can be voided rather than counted wrong.",
  },
  {
    question: "How do I add a court that isn't listed?",
    answer:
      "Use the add-court flow in the app. You lock your live location at the court, take a photo with the camera, and the photo is analyzed to verify it is a real court of the type you selected. Library uploads are not accepted — the capture has to be live.",
  },
  {
    question: "Is my location shared with other players?",
    answer:
      "Your precise location is used to show nearby courts and to enable geofenced check-in. Other players see that a court has check-ins and who is at it when you check in — not your continuous location. Location permission can be withdrawn in your device settings at any time.",
  },
  {
    question: "How do I report or block another player?",
    answer:
      "Open the player’s profile and use the Safety section, which has both Report Player and Block Player. Reports go to us directly at localchecksports@gmail.com.",
  },
  {
    question: "Which sports does LocalCheck cover?",
    answer:
      "Basketball and pickleball at launch. Court geometry, filters, and rankings are specific to each sport rather than shared.",
  },
];

function PageBrand() {
  return (
    <Link className="brand brand--compact" href="/" aria-label="LocalCheck home">
      <span className="brand__mark" aria-hidden="true">
        <CornersOut size={27} weight="regular" />
        <Check className="brand__check" size={14} weight="bold" />
      </span>
      <span className="brand__word">LOCALCHECK</span>
    </Link>
  );
}

export default async function HowItWorksPage() {
  const { courts } = await loadExplorerCourts();
  const stats = deriveCourtStats(courts);

  return (
    <main className="legal-page" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "LocalCheck", path: "/" },
            { name: "How it works", path: "/how-it-works" },
          ]),
        )}
      />

      <header className="legal-header">
        <PageBrand />
        <Link className="legal-back" href="/" aria-label="Back to LocalCheck">
          <ArrowLeft size={16} weight="bold" />
          <span className="legal-back__label">Back to LocalCheck</span>
        </Link>
      </header>

      <section className="legal-hero" aria-labelledby="page-title">
        <div>
          <span className="eyebrow eyebrow--orange">LocalCheck basics</span>
          <h1 id="page-title">
            How it
            <br />
            works<span>.</span>
          </h1>
        </div>
        <div className="legal-meta" aria-label="Launch coverage">
          <p>
            <span>Courts</span>
            <strong>{stats.total}</strong>
          </p>
          <p>
            <span>Cities</span>
            <strong>{stats.markets}</strong>
          </p>
          <p>
            <span>Sports</span>
            <strong>Basketball · Pickleball</strong>
          </p>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Page sections">
          <span>On this page</span>
          <nav>
            {sections.map(([id, label], index) => (
              <a href={`#${id}`} key={id}>
                <small>{String(index + 1).padStart(2, "0")}</small>
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-copy">
          <section id="what-it-is">
            <span className="legal-section-number">01</span>
            <h2>What LocalCheck is</h2>
            <p>
              {COMMUNITY_PROMISE} {PRODUCT_EXPLANATION}
            </p>
            <p>
              Every other court app tells you a court exists. That was never the hard part. The hard
              part is knowing whether showing up at 6pm on a Tuesday means a run or an empty
              blacktop. LocalCheck turns that into a live, shared picture built by the people who
              play there. The launch set includes {stats.total} source-backed basketball and pickleball courts across{" "}
              {stats.markets} cities at launch.
            </p>
            <p>
              It is free, iOS-only, and there is nothing to buy inside it.
            </p>
          </section>

          <section id="three-steps">
            <span className="legal-section-number">02</span>
            <h2>The short version</h2>
            <p>
              <strong>Find the run.</strong> Browse nearby courts by real activity, not stale
              reviews. Map or list, filtered by sport.
            </p>
            <p>
              <strong>Check in.</strong> One tap at the court tells your local community it is
              active, and keeps the live picture honest.
            </p>
            <p>
              <strong>Plan the week.</strong> Mark when you are coming, see who else is in, and let
              the next run organize itself.
            </p>
          </section>

          <section id="heatmap">
            <span className="legal-section-number">03</span>
            <h2>The weekly heatmap</h2>
            <p>
              Each court has a seven-day grid broken out by hour. Cells get darker as more locals
              mark that they are coming, so the week&apos;s rhythm becomes visible at a glance:
              the Tuesday evening run, the Saturday morning regulars, the hours nobody plays.
            </p>
            <p>
              Tap any slot to see exactly who is going and whether a game is already scheduled
              there. Adding your own time is one tap, and you can select several slots at once when
              you know your week.
            </p>
            <p>
              The heatmap is built from intent, not history. That is the difference between knowing
              a court was busy last month and knowing four people are coming tonight.
            </p>
          </section>

          <section id="check-in">
            <span className="legal-section-number">04</span>
            <h2>Checking in</h2>
            <p>
              Check-in is geofenced, so it only works when you are physically at the court. That
              constraint is the whole point. It means a live count of three is three real people,
              not three optimistic taps from a couch.
            </p>
            <p>
              Counts start at zero and are never fabricated. Orange always means live. A court with
              no check-ins says so plainly rather than inventing activity.
            </p>
          </section>

          <section id="runs">
            <span className="legal-section-number">05</span>
            <h2>Scheduled runs</h2>
            <p>
              Beyond marking times, you can schedule an actual game: a 2v2 at a specific court and
              hour with a roster, invites to friends, and a going state other locals can see and
              join.
            </p>
            <p>
              Scheduled games appear inside the court&apos;s heatmap, so someone browsing for a
              Thursday run sees the game that is already forming rather than an empty grid.
            </p>
          </section>

          <section id="compete">
            <span className="legal-section-number">06</span>
            <h2>Games, ratings, and disputes</h2>
            <p>
              Log a game with the sport, court, date, matchup, and score. Logged games feed an Elo
              rating that powers three useful views: how you rank with friends, at each court, and
              across your region.
            </p>
            <p>
              Scores are not self-reported into the void. Every submission goes to your opponent for
              review. They can approve it, or dispute it with a corrected score and a note. Disputed
              games are held while both sides work it out, with an auto-approve countdown so nothing
              stalls forever, and games that cannot be settled are voided rather than recorded
              wrong.
            </p>
            <p>
              Player profiles carry the result: record, check-ins, games played, head-to-head
              history against you, and recent activity.
            </p>
          </section>

          <section id="locals">
            <span className="legal-section-number">07</span>
            <h2>Locals and home courts</h2>
            <p>
              Set a court as your home court and you become one of its locals. Locals get a ranking
              at that court, and the court gets an identity beyond its address: the people who
              actually make it what it is.
            </p>
            <p>
              The friend view keeps the competition personal. Court rankings establish who leads
              each local scene. Regional rankings give top players a reason to seek stronger games
              beyond their usual run.
            </p>
          </section>

          <section id="add-court">
            <span className="legal-section-number">08</span>
            <h2>Adding a court</h2>
            <p>
              If your court is not on the map, you can add it — and you have to be standing on it.
              The flow locks your live location at the court, then asks for a photo taken with the
              camera in that moment.
            </p>
            <p>
              The photo is analyzed to confirm it is a real court of the sport you selected. Images
              from your photo library are not accepted, and the submitted photo is not retained
              after the check runs. That is how the catalog stays source-backed instead of becoming
              a pile of unverified pins.
            </p>
          </section>

          <section id="safety">
            <span className="legal-section-number">09</span>
            <h2>Safety and privacy</h2>
            <p>
              Every player profile has a Safety section with Report Player and Block Player. Reports
              reach us directly at{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>.
            </p>
            <p>
              LocalCheck does not use personal information for third-party advertising or
              cross-app tracking, does not sell personal information, and you can permanently delete
              your account from inside the app. The full detail is in the{" "}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </section>

          <section id="faq">
            <span className="legal-section-number">10</span>
            <h2>Common questions</h2>
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>

          <section id="explore">
            <span className="legal-section-number">11</span>
            <h2>Find your run</h2>
            <p>
              Browse the first {stats.total} source-backed courts — {stats.basketball} basketball and{" "}
              {stats.pickleball} pickleball — across {stats.markets} cities.
            </p>
            <p>
              <Link href="/courts">Explore courts</Link>
            </p>
          </section>
        </article>
      </div>

      <footer className="legal-footer">
        <PageBrand />
        <Link href="#top">Back to top</Link>
        <span>© 2026 LocalCheck</span>
      </footer>
    </main>
  );
}
