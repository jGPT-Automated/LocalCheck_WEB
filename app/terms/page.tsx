import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { breadcrumbSchema, jsonLd } from "../../lib/structured-data";

export const metadata: Metadata = {
  title: "Terms of Service — LocalCheck",
  description:
    "Plain-language terms for the LocalCheck app and website, including community rules, court information, safety, and LocalPlus subscriptions.",
  alternates: { canonical: "/terms" },
};

const sections = [
  ["overview", "At a glance"],
  ["agreement", "Your agreement"],
  ["accounts", "Accounts and eligibility"],
  ["community", "Play fair"],
  ["content", "Your content and visibility"],
  ["courts", "Courts, check-ins, and results"],
  ["localplus", "LocalPlus and purchases"],
  ["safety", "Safety and real-world play"],
  ["moderation", "Reports and enforcement"],
  ["services", "Third-party services"],
  ["ownership", "LocalCheck ownership"],
  ["ending", "Ending access"],
  ["disclaimers", "Disclaimers and liability"],
  ["apple", "Apple terms"],
  ["changes", "Changes and contact"],
] as const;

const termsSummary = [
  {
    label: "On the court",
    title: "You are responsible for your safety.",
    body: "LocalCheck helps people find courts and each other; it does not organize or supervise play.",
  },
  {
    label: "In the community",
    title: "Keep activity honest and respectful.",
    body: "Do not fake check-ins, results, court details, identities, or reports.",
  },
  {
    label: "LocalPlus",
    title: "Apple handles purchases.",
    body: "The app shows the price before purchase and provides controls to manage, cancel, or restore access.",
  },
] as const;

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

      <SiteHeader />

      <section className="legal-hero" aria-labelledby="terms-title">
        <div>
          <span className="eyebrow eyebrow--orange">Clear ground rules</span>
          <h1 id="terms-title">Terms of<br />Service<span>.</span></h1>
        </div>
        <div className="legal-meta" aria-label="Terms publication details">
          <p><span>Effective date</span><strong>October 1, 2026</strong></p>
          <p><span>Applies to</span><strong>LocalCheck app + website</strong></p>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Terms sections">
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
          <p className="legal-intro">
            These terms are the rules for using the LocalCheck mobile app,
            localchecksports.com, and related services (together, the &ldquo;Service&rdquo;).
            They are meant to protect the players, courts, and community that make LocalCheck work.
          </p>

          <section id="overview">
            <span className="legal-section-number">01</span>
            <h2>Terms at a glance</h2>
            <div className="privacy-summary" aria-label="Terms summary">
              {termsSummary.map((item) => (
                <div className="privacy-summary__item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <p>
              This summary highlights the practical rules. The complete terms below control if
              there is a conflict.
            </p>
          </section>

          <section id="agreement">
            <span className="legal-section-number">02</span>
            <h2>Your agreement</h2>
            <p>
              By downloading, accessing, or using the Service, you agree to these terms and the{" "}
              <Link href="/privacy">Privacy Policy</Link>. If you do not agree, do not use the
              Service.
            </p>
            <p>
              You may use the Service only where it is lawful to do so. These terms do not limit
              consumer rights that cannot legally be waived.
            </p>
          </section>

          <section id="accounts">
            <span className="legal-section-number">03</span>
            <h2>Accounts and eligibility</h2>
            <p>
              You must be at least 13 years old to use LocalCheck. If you are under the age of
              majority where you live, use the Service only with a parent or guardian&apos;s
              involvement and permission.
            </p>
            <p>
              Keep your account information accurate and your sign-in method secure. You are
              responsible for activity under your account. Do not impersonate someone, create an
              account for them without permission, sell or transfer an account, or share access in
              a way that puts the account or community at risk.
            </p>
            <p>
              You can start permanent account deletion from <strong>Settings → Delete Account</strong>
              in the app. Deleting an account or uninstalling the app does not cancel an active
              Apple subscription; see LocalPlus below.
            </p>
          </section>

          <section id="community">
            <span className="legal-section-number">04</span>
            <h2>Play fair</h2>
            <p>Do not use LocalCheck to:</p>
            <ul>
              <li>fake or manipulate a check-in, planned visit, score, result, rating, ranking, court, review, report, or identity;</li>
              <li>harass, threaten, stalk, exploit, discriminate against, or endanger another person;</li>
              <li>post unlawful, defamatory, hateful, sexually explicit, violent, deceptive, or rights-infringing content;</li>
              <li>submit a private or restricted court as publicly accessible, bypass a geofence, or ignore a facility&apos;s rules;</li>
              <li>scrape, bulk-extract, reverse engineer, disrupt, probe, or misuse the Service or another account; or</li>
              <li>use the Service for spam, unauthorized advertising, fraud, or anything illegal.</li>
            </ul>
          </section>

          <section id="content">
            <span className="legal-section-number">05</span>
            <h2>Your content and visibility</h2>
            <p>
              You keep ownership of content you submit, such as profile information, court details,
              check-ins, planned visits, game results, reports, and photos. You confirm that you
              have the rights and permissions needed to submit it.
            </p>
            <p>
              You give LocalCheck a non-exclusive, worldwide, royalty-free license to host, store,
              reproduce, format, display, and share that content as needed to operate, secure, and
              improve the Service. This includes making community activity visible according to
              the choices and product behavior described in the <Link href="/privacy">Privacy Policy</Link>.
            </p>
            <p>
              Some activity is designed to be seen by other players. Review your Public, Friends
              Only, or Private setting before posting or checking in. Removing content or deleting
              your account may not remove copies that others already received, records LocalCheck
              must keep for legal or safety reasons, or de-identified community information.
            </p>
          </section>

          <section id="courts">
            <span className="legal-section-number">06</span>
            <h2>Courts, check-ins, and results</h2>
            <p>
              Adding a court requires a live location lock and a photo captured with the in-app
              camera at the court. LocalCheck may accept, reject, edit, merge, reclassify, or remove
              a court submission. Verification helps reduce bad data; it is not a promise that a
              court is public, open, available, safe, permitted for your use, or accurately described.
            </p>
            <p>
              LocalCheck does not reserve a court, grant access, or create ownership or priority
              over public space. Check facility rules, posted hours, permits, closures, and local
              conditions yourself before traveling or playing.
            </p>
            <p>
              Check-ins, planned visits, scores, reviews, and rankings are community-provided
              records, not official results. Follow the in-app review and dispute flow honestly.
              LocalCheck may correct or remove activity when it is unreliable, abusive, duplicated,
              or inconsistent with these terms.
            </p>
          </section>

          <section id="localplus">
            <span className="legal-section-number">07</span>
            <h2>LocalPlus and purchases</h2>
            <p>
              LocalCheck offers core court features for free and may offer optional LocalPlus
              features through an auto-renewing monthly subscription. The app shows the current
              price, billing period, and included access before you confirm a purchase. Apple
              processes payment to your Apple ID; LocalCheck does not receive your full payment-card details.
            </p>
            <p>
              A paid subscription automatically renews for another billing period unless you
              cancel at least 24 hours before the current period ends. Apple may charge your account
              for renewal within 24 hours before that period ends. You can manage or cancel through
              your Apple subscriptions. Cancellation stops the next renewal and access continues
              through the already-paid period unless Apple states otherwise.
            </p>
            <p>
              Use <strong>Restore Purchases</strong> in the app to restore eligible access. RevenueCat
              helps LocalCheck confirm purchase and entitlement status. Refund requests and billing
              disputes are handled by Apple under its rules, except where applicable law requires otherwise.
            </p>
            <p>
              LocalCheck may offer trials, Apple offer codes, Starter access, Founder access, or
              other promotions. The specific offer controls its length, eligibility, renewal, and
              expiration. Promotions have no cash value, may not be transferred, and may be changed
              or withdrawn where allowed by law. A complimentary period does not become paid unless
              the offer or purchase screen clearly says it will.
            </p>
          </section>

          <section id="safety">
            <span className="legal-section-number">08</span>
            <h2>Safety and real-world play</h2>
            <p>
              Sports can cause serious injury. Meeting people you do not know and visiting public
              places also carry risk. LocalCheck helps players discover courts and activity; it
              does not organize, supervise, officiate, insure, or control what happens at a court.
            </p>
            <p>
              LocalCheck does not conduct background checks on players. You are responsible for
              deciding whether, where, when, and with whom to play; using suitable equipment;
              following laws and facility rules; assessing weather and court conditions; and
              leaving any situation that feels unsafe. In an emergency, contact local emergency services.
            </p>
          </section>

          <section id="moderation">
            <span className="legal-section-number">09</span>
            <h2>Reports and enforcement</h2>
            <p>
              Player profiles include Report Player and Block Player controls. LocalCheck may
              investigate reports, preserve relevant records, remove or limit content, correct
              activity, restrict features, or suspend or terminate accounts to protect the Service
              and community or enforce these terms.
            </p>
            <p>
              Not every disagreement violates these terms, and LocalCheck cannot guarantee a
              specific outcome or response time. For urgent physical danger, contact emergency
              services first. For other safety or conduct concerns, use the in-app tools or email{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>.
            </p>
          </section>

          <section id="services">
            <span className="legal-section-number">10</span>
            <h2>Third-party services</h2>
            <p>
              LocalCheck relies on providers including Supabase, Mapbox, Google Gemini, Apple,
              RevenueCat, Expo, and Vercel. Their products and external links are governed by their
              own terms and policies. LocalCheck is not responsible for a third party&apos;s service,
              availability, content, or decisions. The <Link href="/privacy">Privacy Policy</Link>{" "}
              explains how these providers support LocalCheck.
            </p>
          </section>

          <section id="ownership">
            <span className="legal-section-number">11</span>
            <h2>LocalCheck ownership</h2>
            <p>
              LocalCheck and its licensors own the Service, including the LocalCheck name, logo,
              software, design, and original content. Subject to these terms, LocalCheck gives you
              a limited, personal, non-exclusive, non-transferable, revocable license to use the
              Service for its intended purpose. No other rights are granted.
            </p>
            <p>
              Feedback about LocalCheck may be used without restriction or payment to you, but you
              are not required to provide feedback.
            </p>
          </section>

          <section id="ending">
            <span className="legal-section-number">12</span>
            <h2>Ending access</h2>
            <p>
              You may stop using LocalCheck and delete your account at any time. LocalCheck may
              suspend or end access when you violate these terms, create risk or legal exposure,
              misuse the Service, or when the Service or a feature is discontinued. Where practical,
              LocalCheck may provide notice, but immediate action may be necessary for safety,
              security, fraud, or legal reasons.
            </p>
            <p>
              Terms that reasonably need to continue—such as content licenses already used,
              ownership, disclaimers, liability limits, and payment obligations—survive the end of access.
            </p>
          </section>

          <section id="disclaimers">
            <span className="legal-section-number">13</span>
            <h2>Disclaimers and liability</h2>
            <p>
              To the maximum extent allowed by law, the Service is provided &ldquo;as is&rdquo; and
              &ldquo;as available.&rdquo; LocalCheck disclaims warranties of merchantability, fitness
              for a particular purpose, non-infringement, and uninterrupted, accurate, secure, or
              error-free operation. Court, player, activity, and ranking information may be
              incomplete, delayed, outdated, or wrong.
            </p>
            <p>
              To the maximum extent allowed by law, LocalCheck is not liable for indirect,
              incidental, special, consequential, exemplary, or punitive damages; lost data,
              profits, goodwill, or opportunities; or injury, loss, or disputes arising from a
              court, game, player, third-party service, or use of the Service.
            </p>
            <p>
              LocalCheck&apos;s total liability for all claims relating to the Service will not exceed
              the greater of the amount you paid LocalCheck through Apple during the 12 months
              before the event giving rise to the claim or US $100. Some places do not allow
              certain exclusions or limits, so parts of this section may not apply to you.
            </p>
          </section>

          <section id="apple">
            <span className="legal-section-number">14</span>
            <h2>Apple terms</h2>
            <p>
              These terms are between you and LocalCheck, not Apple. The app license is limited to
              use on Apple-branded products you own or control as permitted by Apple&apos;s usage rules,
              including eligible Family Sharing or volume purchasing. Apple has no obligation to
              maintain or support the app.
            </p>
            <p>
              If the app fails to conform to an applicable warranty, you may notify Apple, and
              Apple may refund the purchase price, if any, as required by its rules. To the maximum
              extent permitted by law, Apple has no other warranty obligation. LocalCheck, not
              Apple, is responsible for addressing claims about the app, including product
              liability, legal or regulatory compliance, and intellectual-property claims.
            </p>
            <p>
              Apple and its subsidiaries are third-party beneficiaries of these terms and may
              enforce them. You represent that you are not in a country subject to a US government
              embargo and are not on a US government prohibited or restricted-party list. Your use
              of the app must also comply with applicable third-party terms.
            </p>
          </section>

          <section id="changes">
            <span className="legal-section-number">15</span>
            <h2>Changes and contact</h2>
            <p>
              LocalCheck may update these terms as the Service changes. The revised terms and a new
              effective date will be posted here, with additional notice when required. If you do
              not agree to a revised version, stop using the Service. Continuing to use the Service
              after the revised terms take effect means you accept them.
            </p>
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>.
            </p>
          </section>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
