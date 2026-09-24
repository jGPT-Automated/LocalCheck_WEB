import { ArrowLeft, ArrowRight, Camera, Check, CornersOut, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Pioneers — LocalCheck",
  description:
    "Join LocalCheck at launch. The first 100 Starters get a year of LocalPlus; Pioneers grow a court community and earn a year for themselves and a month for their invites.",
  alternates: { canonical: "/pioneers" },
  openGraph: {
    title: "Local Pioneers — LocalCheck",
    description:
      "The first 100 Starters get a year of LocalPlus. Add a court and bring five weekly players to become a Pioneer.",
    url: "/pioneers",
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
    title: "Local Pioneers — LocalCheck",
    description:
      "The first 100 Starters get a year of LocalPlus. Add a court and bring five weekly players to become a Pioneer.",
    images: ["/localcheck-logo-final-preview.png"],
  },
};

const sections = [
  ["how", "How to become a Pioneer"],
  ["rewards", "Launch offers"],
  ["why", "Why it matters"],
  ["faq", "FAQ"],
  ["join", "Get involved"],
] as const;

const steps = [
  {
    icon: <MapPin size={26} weight="fill" />,
    title: "Drop your pin",
    body: "Stand at the court and drop your pin on the exact spot. The location is bound to where you actually are — not typed in from somewhere else.",
  },
  {
    icon: <Camera size={26} weight="fill" />,
    title: "Snap a live photo",
    body: "Take a live photo from inside the app. Camera only — no gallery uploads. That is deliberate: a live capture is much harder to fake than a screenshot or a stock image.",
  },
  {
    icon: <Check size={26} weight="fill" />,
    title: "Confirm and submit",
    body: "Our AI checks that the photo really shows a basketball or pickleball court. You get two tries; after that there is a short cooldown. Once it passes, the court appears on the map and you can check in.",
  },
] as const;

const rewards = [
  {
    mark: "01",
    title: "Starters",
    reward: "One free year of LocalPlus",
    body: "The first 100 people to download and join LocalCheck get a free year of LocalPlus. You do not need to add a court to be a Starter.",
  },
  {
    mark: "02",
    title: "Pioneers",
    reward: "One free year for you · one free month for each invite",
    body: "Add a court, then bring five invited players who each check in at least once a week for four weeks. You earn a free year of LocalPlus, and each of your invites gets one month of LocalPlus free on sign-up.",
  },
] as const;

const faqs = [
  {
    q: "What makes a court count as verified?",
    a: "A verified court is one that was added through the in-app flow: a live-location pin dropped at the court itself, plus a live photo taken on the spot that our AI confirms shows a real basketball or pickleball court. The verification date and the person who added it are recorded with the court from that moment on.",
  },
  {
    q: "Can I verify a court that's already listed?",
    a: "You can use, check in at, and help organize an already listed court. To qualify for the Pioneer launch offer, add a court that is not yet on the map and bring five invited players who each check in weekly for four weeks.",
  },
  {
    q: "How do I become a Starter?",
    a: "Be one of the first 100 people to download and join LocalCheck. The free LocalPlus year is redeemed with an Apple offer code in the app. It is a monthly subscription with the first year free, then renews at the regular monthly price unless canceled through Apple.",
  },
  {
    q: "How do you prevent fake courts?",
    a: "Several things work together. Photos must be captured live in the app, so a saved image or a screenshot won't pass. The pin is bound to your live location. Our AI checks that the photo is genuinely a court, and there are a limited number of attempts before a cooldown. Verifications are also audited against independent imagery over time, and a court that is removed or changed can be re-reported and reviewed.",
  },
  {
    q: "Does scheduling a game mean I own the court?",
    a: "No. LocalCheck coordinates your group — it does not reserve or grant ownership of public court space. Scheduling a session tells your community when people plan to show up. It is not a booking, and it does not give anyone a claim on the court. Public courts stay public.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function PioneersBrand() {
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

function PioneerCourtArt() {
  return (
    <div className="pioneers-court-art" data-court-art="basketball" aria-hidden="true">
      <svg viewBox="0 0 600 820" fill="none" role="presentation">
        <rect className="pioneers-court-art__boundary" x="36" y="36" width="528" height="748" rx="4" />
        <path className="pioneers-court-art__line" d="M36 410h528" />
        <circle className="pioneers-court-art__line" cx="300" cy="410" r="74" />
        <path className="pioneers-court-art__line" d="M219 36v166h162V36M219 784V618h162v166" />
        <circle className="pioneers-court-art__line" cx="300" cy="202" r="52" />
        <circle className="pioneers-court-art__line" cx="300" cy="618" r="52" />
        <path className="pioneers-court-art__line" d="M144 36v92c0 87 70 158 156 158s156-71 156-158V36M144 784v-92c0-87 70-158 156-158s156 71 156 158v92" />
        <circle className="pioneers-court-art__rim" cx="300" cy="91" r="9" />
        <circle className="pioneers-court-art__rim" cx="300" cy="729" r="9" />
        <path className="pioneers-court-art__route" d="M118 663c53-44 87-89 171-95 83-5 146-65 168-122" />
        <circle className="pioneers-court-art__route-end" cx="457" cy="446" r="10" />
      </svg>
      <span className="pioneers-court-art__caption">SHOW UP / BRING YOUR PEOPLE / KEEP PLAYING</span>
    </div>
  );
}

export default function PioneersPage() {
  return (
    <main className="legal-page" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="legal-header">
        <PioneersBrand />
        <Link className="legal-back" href="/" aria-label="Back to LocalCheck">
          <ArrowLeft size={16} weight="bold" /> <span className="legal-back__label">Back to LocalCheck</span>
        </Link>
      </header>

      <section className="legal-hero pioneers-hero" aria-labelledby="pioneers-title">
        <PioneerCourtArt />
        <div className="pioneers-hero__copy">
          <span className="eyebrow eyebrow--orange">Starters &amp; Pioneers · the launch programs</span>
          <h1 id="pioneers-title">
            Pioneer a court<span>.</span>
          </h1>
          <p className="pioneers-tagline">Make it a place to play.</p>
          <p className="legal-intro">
            Add the court that is missing. Bring five players who show up every week. Give your
            community one place to find the next run.
          </p>
          <div className="pioneers-hero__actions">
            <a className="button button--hero" href="#how">How it works <ArrowRight size={18} weight="bold" /></a>
            <a className="pioneers-hero__secondary" href="#rewards">See launch rewards</a>
          </div>
        </div>
      </section>

      <section className="pioneers-offer-strip" aria-label="Starter and Pioneer launch offers">
        <article>
          <span>01 / Starters</span>
          <strong>100</strong>
          <p>The first 100 people to download and join get one free year of LocalPlus.</p>
        </article>
        <article>
          <span>02 / Pioneers</span>
          <strong>5 × 4</strong>
          <p>Add a court. Bring five invited players who each check in once a week for four weeks. You get a free year; they get a free month on sign-up.</p>
        </article>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Local Pioneers sections">
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
          <section id="how">
            <span className="legal-section-number">01</span>
            <h2>How to add your court</h2>
            <p>
              Adding a court should take seconds, not a form. The whole flow happens in the app,
              in the moment, standing at the court.
            </p>
            <div className="pioneers-flow">
              <div className="pioneers-steps">
                {steps.map((step, index) => (
                  <article className="pioneers-step" key={step.title}>
                    <span className="pioneers-step__number">{String(index + 1).padStart(2, "0")}</span>
                    <div className="pioneers-step__icon">{step.icon}</div>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <figure className="pioneers-flow__screen">
                <Image src="/app-screens/add-court-start.png" alt="LocalCheck app screen showing the add-a-court flow" width={709} height={1536} unoptimized />
                <figcaption>From the LocalCheck app / Add a court</figcaption>
              </figure>
            </div>
            <p>
              Then invite five players. When each checks in at least once a week for four weeks,
              you qualify as a Pioneer. Their first month of LocalPlus is free on sign-up.
            </p>
          </section>

          <section id="rewards">
            <span className="legal-section-number">02</span>
            <h2>Two ways to start</h2>
            <p>
              Starters make the first move. Pioneers build a place where other people keep showing up.
              Both offers are built around participation, not a made-up points system.
            </p>
            <ol className="pioneers-rewards">
              {rewards.map((reward) => (
                <li className="pioneers-reward" key={reward.mark}>
                  <span className="pioneers-reward__mark" aria-hidden="true">
                    {reward.mark}
                  </span>
                  <div>
                    <h3>{reward.title}</h3>
                    <p className="pioneers-reward__value">{reward.reward}</p>
                    <p>{reward.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="pioneers-note">
              Pioneer eligibility depends on a verified new court, five invited players, and each
              player checking in at least once a week for four weeks.
            </p>
          </section>

          <section id="why">
            <span className="legal-section-number">03</span>
            <h2>Why it matters</h2>
            <p>
              A court is bigger than any one group of players. People come and go; the court stays.
              LocalCheck records that continuity instead of losing it to the group chat. When you
              verify a court, the line that stays with it reads:
            </p>
            <p className="pioneers-history">
              Verified for the LocalCheck community by <strong>[player]</strong> · <strong>[date]</strong>
            </p>
            <p>
              That record is permanent. Years later, after whole generations of players have rotated
              through, the person who first verified the court is still part of its recorded history.
            </p>
            <h3>Local Legends and persistent court history</h3>
            <p>
              At defined season and year boundaries, LocalCheck snapshots local leaderboards and
              permanently recognizes the top performers from that period as Local Legends. Over
              time, a court page stops being a location listing and becomes the record of the
              community that played there — founding and verification date, the Local Pioneer,
              historical #1 players, seasonal Local Legends, notable matches, and the eras of the
              players who made it what it was.
            </p>
            <p>
              It also gives the competition somewhere to go. Players chasing a ranking have a reason
              to seek out stronger opponents instead of farming easy wins — because the results at a
              court are the thing that lasts.
            </p>
          </section>

          <section id="faq">
            <span className="legal-section-number">04</span>
            <h2>FAQ</h2>
            <div className="pioneers-faq">
              {faqs.map((item) => (
                <article className="pioneers-faq__item" key={item.q}>
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="join">
            <span className="legal-section-number">05</span>
            <h2>Get involved</h2>
            <p>
              The Local Pioneers program is part of the LocalCheck launch. If you know a court that
              should be on the map, or you want to bring your community onto it, we would like to
              hear from you.
            </p>
            <div className="pioneers-cta">
              <UsersThree size={30} weight="fill" aria-hidden="true" />
              <div>
                <h3>Start something at your court</h3>
                <p>
                  Email <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>{" "}
                  with the court, the sport, and where you play. We read every message.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>

      <footer className="legal-footer">
        <PioneersBrand />
        <Link href="#top">Back to top</Link>
        <span>© 2026 LocalCheck</span>
      </footer>
    </main>
  );
}
