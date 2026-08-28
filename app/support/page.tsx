import { ArrowLeft, Check, CornersOut, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support — LocalCheck",
  description:
    "Get help with LocalCheck. Contact our support team, report an issue, request a feature, or read answers to common questions about finding live basketball and pickleball courts near you.",
  alternates: { canonical: "/support" },
};

const sections = [
  ["contact", "Contact us"],
  ["report", "Report an issue"],
  ["requests", "Feature requests"],
  ["faq", "Common questions"],
  ["resources", "Helpful links"],
] as const;

function SupportBrand() {
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

export default function SupportPage() {
  return (
    <main className="legal-page" id="top">
      <header className="legal-header">
        <SupportBrand />
        <Link className="legal-back" href="/" aria-label="Back to LocalCheck">
          <ArrowLeft size={16} weight="bold" /> <span className="legal-back__label">Back to LocalCheck</span>
        </Link>
      </header>

      <section className="legal-hero" aria-labelledby="support-title">
        <div>
          <span className="eyebrow eyebrow--orange">LocalCheck help</span>
          <h1 id="support-title">
            Support<span>.</span>
          </h1>
          <p className="legal-intro">
            LocalCheck helps nearby basketball and pickleball players find and organize local runs.
            Need help with the app, want to report a problem, or have an idea to make it better?
            You&rsquo;re in the right place.
          </p>
        </div>
        <div className="legal-meta" aria-label="Support contact details">
          <p>
            <span>Email</span>
            <strong>
              <EnvelopeSimple size={16} weight="bold" aria-hidden="true" />{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>
            </strong>
          </p>
          <p>
            <span>Response time</span>
            <strong>We reply within 1 business day</strong>
          </p>
          <p>
            <span>Operator</span>
            <strong>Jesse Herrig</strong>
          </p>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Support sections">
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
          <section id="contact">
            <span className="legal-section-number">01</span>
            <h2>Contact us</h2>
            <p>
              The fastest way to reach the LocalCheck team is email. Send bug reports, account
              questions, privacy requests, court corrections, or general feedback to{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>. We
              reply within one business day.
            </p>
            <p>
              For privacy or data requests (access, correction, deletion, copy of personal
              information), please email from the address on your account so we can verify your
              identity before completing the request.
            </p>
          </section>

          <section id="report">
            <span className="legal-section-number">02</span>
            <h2>Report an issue</h2>
            <p>To help us fix a problem quickly, include the following in your message:</p>
            <ul>
              <li>
                <strong>App version.</strong> Find it under <em>Settings &rarr; About</em> in the
                LocalCheck app.
              </li>
              <li>
                <strong>Device and iOS version.</strong> Example: iPhone 14, iOS 17.5.
              </li>
              <li>
                <strong>Steps to reproduce.</strong> What you tapped, what you expected to happen,
                and what actually happened.
              </li>
              <li>
                <strong>Screenshots or a short screen recording</strong> when you can include
                them.
              </li>
            </ul>
            <p>
              Court information issues (wrong surface type, missing lines, court not at the
              pinned location) are the most actionable reports &mdash; they help your whole local
              community.
            </p>
          </section>

          <section id="requests">
            <span className="legal-section-number">03</span>
            <h2>Feature requests</h2>
            <p>
              LocalCheck is built around real, in-person play. If there&rsquo;s a feature that
              would help you find your run, organize your group, or keep the live picture honest,
              email <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>{" "}
              with the subject line <em>Feature request</em>. We read every message.
            </p>
          </section>

          <section id="faq">
            <span className="legal-section-number">04</span>
            <h2>Common questions</h2>
            <h3>Using the app</h3>
            <ul>
              <li>
                <strong>How do I check in at a court?</strong> Open the LocalCheck app, find the
                court on the Explore map, tap the court card, and tap Check in. Your local
                community sees the court light up in real time.
              </li>
              <li>
                <strong>A court on the map is wrong or missing.</strong> Tap the court card in
                the app and use Report an issue, or email us at localchecksports@gmail.com with
                the court name, city, and what&rsquo;s wrong (missing lines, wrong surface type,
                etc.).
              </li>
              <li>
                <strong>Why does the app need my location?</strong> LocalCheck uses your location
                to show courts near you and keep the live activity picture honest. Location is
                only used while the app is in use. You can deny or withdraw location permission
                in your device Settings at any time.
              </li>
            </ul>
            <h3>Account and data</h3>
            <ul>
              <li>
                <strong>How do I delete my LocalCheck account?</strong> In the LocalCheck app,
                open Settings and choose Delete account. Deletion removes your profile, activity,
                and check-ins. If you signed in with Apple, LocalCheck also revokes the Apple
                authorization automatically.
              </li>
              <li>
                <strong>Does LocalCheck sell my data?</strong> No. LocalCheck does not sell
                personal information and does not use personal data for third-party advertising
                or cross-app tracking. See our{" "}
                <Link href="/privacy">Privacy Policy</Link> for the full picture.
              </li>
            </ul>
            <h3>Courts and verification</h3>
            <ul>
              <li>
                <strong>How do courts get verified and added to the map?</strong> Local court
                submissions go through a verification flow. Photos are sent to Google Gemini for
                analysis during verification; the current verification flow does not retain
                those photos after analysis. A court only lights up on the map once verification
                is complete.
              </li>
            </ul>
          </section>

          <section id="resources">
            <span className="legal-section-number">05</span>
            <h2>Helpful links</h2>
            <ul>
              <li>
                <Link href="/">Back to LocalCheck home</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>
              </li>
            </ul>
          </section>
        </article>
      </div>

      <footer className="legal-footer">
        <SupportBrand />
        <Link href="#top">Back to top</Link>
        <span>© 2026 LocalCheck</span>
      </footer>
    </main>
  );
}
