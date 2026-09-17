import { ArrowLeft, Camera, Check, CornersOut, EnvelopeSimple, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Local Pioneers — LocalCheck",
  description:
    "Become a Local Pioneer: verify your court with a live photo, earn LocalPlus, and leave your name in that court's permanent history.",
  alternates: { canonical: "/pioneers" },
  openGraph: {
    title: "Local Pioneers — LocalCheck",
    description:
      "Become a Local Pioneer: verify your court with a live photo, earn LocalPlus, and leave your name in that court's permanent history.",
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
      "Become a Local Pioneer: verify your court with a live photo, earn LocalPlus, and leave your name in that court's permanent history.",
    images: ["/localcheck-logo-final-preview.png"],
  },
};

const sections = [
  ["how", "How to become a Pioneer"],
  ["rewards", "The reward ladder"],
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
    title: "Verify a court",
    reward: "+3 months of LocalPlus",
    body: "Confirm a court that is not on the map yet and you unlock three months of LocalPlus for yourself — plus your name on that court's history for good.",
  },
  {
    mark: "02",
    title: "Bring players",
    reward: "+1 month per player you bring",
    body: "Every player you bring who checks in on 7 different days earns you another month. That is the part that matters: a record on a map is easy, a court with real regulars is the whole point.",
  },
  {
    mark: "03",
    title: "Become a Legend",
    reward: "1 year of LocalPlus + the Legend emblem",
    body: "Get 5 of your players checking in weekly for a month and that court is running on its own. You keep the Legend emblem on your profile box — whether you stay paid or drop back to free.",
  },
] as const;

const faqs = [
  {
    q: "What makes a court count as verified?",
    a: "A verified court is one that was added through the in-app flow: a live-location pin dropped at the court itself, plus a live photo taken on the spot that our AI confirms shows a real basketball or pickleball court. The verification date and the person who added it are recorded with the court from that moment on.",
  },
  {
    q: "Can I verify a court that's already listed?",
    a: "The Local Pioneer recognition goes to the person who first verifies a court that isn't on the map yet. If a court is already listed, you can still use it, check in, and help keep its activity picture accurate — but the pioneer credit for that court has already been claimed.",
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
        <div>
          <span className="eyebrow eyebrow--orange">The Local Pioneers launch program</span>
          <h1 id="pioneers-title">
            Pioneer a court<span>.</span>
          </h1>
          <p className="pioneers-tagline">Start something.</p>
          <p className="legal-intro">
            A Local Pioneer is the first person to verify a court on LocalCheck. You drop the pin,
            take a live photo, and put that court on the map for everyone who plays there. Your name
            stays attached to it — permanently. The court outlasts generations of players; the
            record of who found it does not change.
          </p>
        </div>
        <div className="legal-meta" aria-label="Launch program details">
          <p>
            <span>What you do</span>
            <strong>Verify a court with a live photo</strong>
          </p>
          <p>
            <span>What you get</span>
            <strong>LocalPlus, and a permanent place in the court&rsquo;s history</strong>
          </p>
          <p>
            <span>Questions</span>
            <strong>
              <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>
            </strong>
          </p>
        </div>
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
            <h2>How to become a Local Pioneer</h2>
            <p>
              Adding a court should take seconds, not a form. The whole flow happens in the app,
              in the moment, standing at the court.
            </p>
            <div className="pioneers-steps">
              {steps.map((step, index) => (
                <article className="pioneers-step" key={step.title}>
                  <span className="pioneers-step__number">{String(index + 1).padStart(2, "0")}</span>
                  <div className="pioneers-step__icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="rewards">
            <span className="legal-section-number">02</span>
            <h2>The reward ladder</h2>
            <p>
              The launch program rewards two different things: putting a real court on the map, and
              building a community that actually uses it. The further you take it, the more you
              earn — capped by what you build, not by what you submit.
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
            <p>
              <strong>Players you bring get a starting period of LocalPlus too</strong>, so the
              first crew on a new court gets the full product together instead of half of it.
            </p>
            <p className="pioneers-note">
              Rewards go to genuinely useful additions, not raw submissions — that is what the live
              photo and the rate limits are for. Launch program terms may be adjusted as the first
              courts and communities come in.
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
