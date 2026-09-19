import { ArrowLeft, Check, CornersOut } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, jsonLd } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Terms of Service — LocalCheck",
  description:
    "The terms that govern use of the LocalCheck mobile app, website, and services, including account rules, community standards, court submissions, and safety disclaimers.",
  alternates: { canonical: "/terms" },
};

const sections = [
  ["acceptance", "Acceptance of these terms"],
  ["eligibility", "Eligibility"],
  ["account", "Your account"],
  ["acceptable-use", "Acceptable use"],
  ["content", "Your content"],
  ["submissions", "Court submissions"],
  ["moderation", "Community standards and enforcement"],
  ["safety", "Play at your own risk"],
  ["third-party", "Third-party services"],
  ["ip", "Our intellectual property"],
  ["termination", "Termination"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["app-store", "Apple App Store terms"],
  ["changes", "Changes to these terms"],
  ["contact", "Contact us"],
] as const;

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

export default function TermsPage() {
  return (
    <main className="legal-page" id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "LocalCheck", path: "/" },
            { name: "Terms of Service", path: "/terms" },
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
          <span className="eyebrow eyebrow--orange">LocalCheck legal</span>
          <h1 id="page-title">
            Terms of
            <br />
            Service<span>.</span>
          </h1>
        </div>
        <div className="legal-meta" aria-label="Document metadata">
          <p>
            <span>Effective date</span>
            <strong>September 19, 2026</strong>
          </p>
          <p>
            <span>Operator</span>
            <strong>Jesse Herrig</strong>
          </p>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Document sections">
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
          <p>
            LocalCheck is operated by Jesse Herrig (&ldquo;LocalCheck,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Service govern your use of the
            LocalCheck mobile application, the localchecksports.com website, and related services
            (together, the &ldquo;Service&rdquo;).
          </p>

          <section id="acceptance">
            <span className="legal-section-number">01</span>
            <h2>Acceptance of these terms</h2>
            <p>
              By downloading, accessing, or using the Service, you agree to these terms and to our{" "}
              <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the
              Service.
            </p>
          </section>

          <section id="eligibility">
            <span className="legal-section-number">02</span>
            <h2>Eligibility</h2>
            <p>
              You must be at least 13 years old to use LocalCheck. The Service is not directed to
              children under 13, and we do not knowingly collect personal information from them. If
              you are under the age of majority where you live, you may use the Service only with
              the involvement of a parent or guardian.
            </p>
          </section>

          <section id="account">
            <span className="legal-section-number">03</span>
            <h2>Your account</h2>
            <p>
              You are responsible for the activity that happens under your account and for keeping
              your sign-in method secure. Provide accurate information, and keep it current. Do not
              impersonate another person, create an account on someone else&apos;s behalf without
              permission, or share your account.
            </p>
            <p>
              You can permanently delete your account at any time from inside the app. Deletion is
              described in the <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </section>

          <section id="acceptable-use">
            <span className="legal-section-number">04</span>
            <h2>Acceptable use</h2>
            <p>You agree not to:</p>
            <p>
              Falsify check-ins, court activity, scores, or ratings, including checking in where you
              are not physically present or manipulating the geofence; harass, threaten, stalk, or
              abuse another user; post content that is unlawful, defamatory, hateful, sexually
              explicit, or violent; submit courts that do not exist, are on private property without
              permission, or are misrepresented; scrape, crawl, or bulk-extract data from the
              Service except as permitted by our robots.txt; reverse engineer, decompile, or
              interfere with the Service or its infrastructure; use the Service for commercial
              solicitation without our written permission; or use the Service in violation of any
              law, park rule, or facility policy.
            </p>
          </section>

          <section id="content">
            <span className="legal-section-number">05</span>
            <h2>Your content</h2>
            <p>
              You keep ownership of the content you submit — profile details, court submissions,
              check-ins, planned times, logged games, and photos. By submitting content, you grant
              us a non-exclusive, worldwide, royalty-free license to host, store, reproduce, and
              display it for the purpose of operating and improving the Service.
            </p>
            <p>
              Some content is designed to be visible to other users. The app identifies public
              information at the point where you share it. Do not submit content you do not have the
              right to share.
            </p>
          </section>

          <section id="submissions">
            <span className="legal-section-number">06</span>
            <h2>Court submissions</h2>
            <p>
              Adding a court requires a live location lock at the court and a photo captured with
              your camera at that moment. Photos selected from your library are not accepted.
              Submitted photos are analyzed to verify the court and are not retained by the current
              verification flow after that analysis.
            </p>
            <p>
              We may accept, reject, edit, merge, or remove any submission. Acceptance of a court
              does not mean we have verified that it is open to the public, safe, or accurately
              described.
            </p>
          </section>

          <section id="moderation">
            <span className="legal-section-number">07</span>
            <h2>Community standards and enforcement</h2>
            <p>
              Every player profile includes Report Player and Block Player controls. We review
              reports and may remove content, limit features, suspend, or permanently terminate
              accounts that violate these terms — with or without notice, at our discretion.
            </p>
            <p>
              To report content or conduct outside the app, email{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>.
            </p>
          </section>

          <section id="safety">
            <span className="legal-section-number">08</span>
            <h2>Play at your own risk</h2>
            <p>
              LocalCheck helps you find courts and other players. It does not organize, supervise,
              insure, or vet anything that happens at a court. Athletic activity carries risk of
              injury, and meeting people you do not know carries risk.
            </p>
            <p>
              You are solely responsible for your own safety, for assessing whether a court and its
              conditions are safe, for complying with facility rules and posted hours, and for your
              conduct toward others. We do not conduct background checks on users. Use common sense:
              meet in public, tell someone where you are going, and leave a situation that does not
              feel right.
            </p>
            <p>
              Court information — including access type, hours, surface, court counts, and live
              counts — is provided on a best-effort basis from public sources and community input,
              and may be incomplete, outdated, or wrong. Verify before you travel.
            </p>
          </section>

          <section id="third-party">
            <span className="legal-section-number">09</span>
            <h2>Third-party services</h2>
            <p>
              The Service relies on third parties including Supabase, Mapbox, Google Gemini, Apple,
              and Expo. Their services are governed by their own terms, and we are not responsible
              for them. Links to external sites and map providers are offered for convenience only.
            </p>
          </section>

          <section id="ip">
            <span className="legal-section-number">10</span>
            <h2>Our intellectual property</h2>
            <p>
              The LocalCheck name, logo, app, website, design, and underlying software are owned by
              us and protected by intellectual property law. We grant you a limited, personal,
              non-transferable, revocable license to use the Service for its intended purpose. You
              may not copy, modify, distribute, sell, or create derivative works from it.
            </p>
          </section>

          <section id="termination">
            <span className="legal-section-number">11</span>
            <h2>Termination</h2>
            <p>
              You may stop using the Service and delete your account at any time. We may suspend or
              terminate your access if you violate these terms, if we are required to by law, or if
              we discontinue the Service. Sections that by their nature should survive termination —
              including content licenses already granted, disclaimers, and limitation of liability —
              will survive.
            </p>
          </section>

          <section id="disclaimers">
            <span className="legal-section-number">12</span>
            <h2>Disclaimers</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
              warranties of any kind, express or implied, including merchantability, fitness for a
              particular purpose, and non-infringement. We do not warrant that the Service will be
              uninterrupted, error-free, secure, or that any information in it is accurate or
              current.
            </p>
          </section>

          <section id="liability">
            <span className="legal-section-number">13</span>
            <h2>Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, LocalCheck and its operator are not liable for
              any indirect, incidental, special, consequential, or punitive damages, or for lost
              profits, data, goodwill, or personal injury, arising out of or related to your use of
              the Service — including anything that happens at a court.
            </p>
            <p>
              Our total liability for any claim relating to the Service will not exceed one hundred
              US dollars ($100). Some jurisdictions do not allow certain limitations, so parts of
              this section may not apply to you.
            </p>
          </section>

          <section id="app-store">
            <span className="legal-section-number">14</span>
            <h2>Apple App Store terms</h2>
            <p>
              These terms are between you and LocalCheck, not Apple. Apple is not responsible for
              the app or its content, has no obligation to provide support for it, and is not
              responsible for addressing any claim relating to it. Apple and its subsidiaries are
              third-party beneficiaries of these terms and may enforce them against you. Your use of
              the app must comply with the Apple Media Services Terms and Conditions.
            </p>
          </section>

          <section id="changes">
            <span className="legal-section-number">15</span>
            <h2>Changes to these terms</h2>
            <p>
              We may update these terms as LocalCheck changes. We will post the revised terms here
              and update the effective date. If a change is material, we will provide additional
              notice where required. Continuing to use the Service after a change means you accept
              the revised terms.
            </p>
          </section>

          <section id="contact">
            <span className="legal-section-number">16</span>
            <h2>Contact us</h2>
            <p>
              Questions about these terms:
              <br />
              Jesse Herrig
              <br />
              LocalCheck
              <br />
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>
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
