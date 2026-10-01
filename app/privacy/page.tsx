import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Privacy Policy — LocalCheck",
  description: "Clear answers about what LocalCheck collects, why it is used, and the controls available to you.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  ["overview", "At a glance"],
  ["information", "Information we collect"],
  ["visibility", "What other players see"],
  ["use", "How we use information"],
  ["sharing", "When information is shared"],
  ["retention", "Retention and deletion"],
  ["choices", "Your controls and rights"],
  ["security", "Security"],
  ["children", "Children's privacy"],
  ["updates", "Updates and contact"],
] as const;

const privacySummary = [
  {
    label: "Your permissions",
    title: "You choose what the app can access.",
    body: "Location, camera, and notifications use device permissions you can change at any time.",
  },
  {
    label: "Your activity",
    title: "You choose how visible you are.",
    body: "Public, Friends Only, and Private controls are available in the app's Settings.",
  },
  {
    label: "Your account",
    title: "You can delete it in the app.",
    body: "Delete Account starts permanent deletion without requiring a support request.",
  },
] as const;

export default function PrivacyPolicy() {
  return (
    <main className="legal-page" id="top">
      <SiteHeader />

      <section className="legal-hero" aria-labelledby="privacy-title">
        <div>
          <span className="eyebrow eyebrow--orange">Clear by design</span>
          <h1 id="privacy-title">Privacy<br />Policy<span>.</span></h1>
        </div>
        <div className="legal-meta" aria-label="Policy publication details">
          <p><span>Effective date</span><strong>October 1, 2026</strong></p>
          <p>
            <span>Questions or requests</span>
            <strong><a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a></strong>
          </p>
        </div>
      </section>

      <div className="legal-layout">
        <aside className="legal-index" aria-label="Privacy policy sections">
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
            LocalCheck helps people find courts, see local activity, and play together. This
            policy explains the information needed to make that work, the services that process
            it, and the controls available to you.
          </p>

          <section id="overview">
            <span className="legal-section-number">01</span>
            <h2>Privacy at a glance</h2>
            <div className="privacy-summary" aria-label="Privacy summary">
              {privacySummary.map((item) => (
                <div className="privacy-summary__item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
            <div className="privacy-plain-language">
              <p><strong>LocalCheck does not sell your personal information.</strong></p>
              <p>LocalCheck does not use personal information for third-party advertising or cross-app tracking.</p>
            </div>
          </section>

          <section id="information">
            <span className="legal-section-number">02</span>
            <h2>Information we collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li><strong>Account and profile.</strong> Email address, display name, username, profile image, sign-in provider, preferred sport, postal code, local court, and visibility preference.</li>
              <li><strong>Court and play activity.</strong> Court submissions, check-ins, planned visits, friendships, invitations, games, reviewed results, rankings, blocks, reports, and other activity you choose to create.</li>
              <li><strong>Live court photos.</strong> The add-a-court flow accepts a photo captured with the in-app camera. It does not offer photo-library upload. The photo is sent through LocalCheck&apos;s backend to Google Gemini for court verification with storage disabled for that analysis. The current verification flow does not retain the photo afterward.</li>
              <li><strong>Support messages.</strong> The information you include when you contact LocalCheck.</li>
            </ul>

            <h3>Information created when you use LocalCheck</h3>
            <ul>
              <li><strong>Location.</strong> If you grant permission, LocalCheck uses foreground precise location to find nearby courts and support location-based features. Court submissions also include the court&apos;s location.</li>
              <li><strong>Notifications.</strong> A device push token and your notification preference when you enable alerts.</li>
              <li><strong>Purchases and access.</strong> Apple and RevenueCat provide purchase, subscription, and entitlement information used to activate or restore LocalPlus. LocalCheck does not receive your full payment-card details.</li>
              <li><strong>Technical information.</strong> Device, browser, IP address, diagnostics, security events, and service-usage information generated by LocalCheck and the providers that operate it.</li>
            </ul>
            <p>
              This policy covers the LocalCheck mobile app, website, and related services that
              link here. Third-party products have their own privacy practices.
            </p>
          </section>

          <section id="visibility">
            <span className="legal-section-number">03</span>
            <h2>What other players see</h2>
            <p>
              LocalCheck is a community product, so some profile, court, check-in, game, and
              ranking information is intended to be shared with other players. The app provides
              three visibility choices in Settings:
            </p>
            <ul>
              <li><strong>Public.</strong> Your profile and activity can appear in community surfaces such as court rosters and leaderboards.</li>
              <li><strong>Friends Only.</strong> Friends can identify your activity; players who are not your friends see an anonymous check-in where the app indicates one.</li>
              <li><strong>Private.</strong> Your profile is hidden from court rosters and leaderboards where the app indicates that control applies.</li>
            </ul>
            <p>
              Your selected setting does not turn public court facts into private information.
              For example, a verified court&apos;s name, location, and facilities may remain visible
              as part of the shared court directory.
            </p>
          </section>

          <section id="use">
            <span className="legal-section-number">04</span>
            <h2>How we use information</h2>
            <p>LocalCheck uses information to:</p>
            <ul>
              <li>create, authenticate, and protect your account;</li>
              <li>show nearby courts, maps, live activity, planned visits, and local players;</li>
              <li>operate friends, invitations, games, result review, rankings, and LocalPlus;</li>
              <li>verify submitted courts and keep shared court information trustworthy;</li>
              <li>deliver notifications you choose to receive;</li>
              <li>respond to support, safety, and privacy requests;</li>
              <li>prevent abuse, investigate reports, troubleshoot problems, and improve reliability; and</li>
              <li>meet legal obligations and enforce LocalCheck&apos;s terms.</li>
            </ul>
          </section>

          <section id="sharing">
            <span className="legal-section-number">05</span>
            <h2>When information is shared</h2>
            <p>
              LocalCheck shares information with other players when you use a community feature,
              and with providers only where needed to run the product:
            </p>
            <div className="privacy-providers" role="list" aria-label="Service providers">
              <div role="listitem"><strong>Supabase</strong><span>Accounts, database, and backend functions</span></div>
              <div role="listitem"><strong>Mapbox</strong><span>Maps and court discovery</span></div>
              <div role="listitem"><strong>Google Gemini</strong><span>Court-photo verification</span></div>
              <div role="listitem"><strong>Apple</strong><span>Sign in, purchases, and app distribution</span></div>
              <div role="listitem"><strong>RevenueCat</strong><span>LocalPlus purchase and entitlement status</span></div>
              <div role="listitem"><strong>Expo</strong><span>App updates and push-notification delivery</span></div>
              <div role="listitem"><strong>Vercel</strong><span>Website hosting and delivery</span></div>
            </div>
            <p>
              LocalCheck may also disclose information when required by law; to protect users,
              rights, property, or safety; to investigate abuse; or as part of a merger,
              financing, acquisition, or sale of assets. Where appropriate, LocalCheck requires
              service providers to use information only to perform their services.
            </p>
          </section>

          <section id="retention">
            <span className="legal-section-number">06</span>
            <h2>Retention and deletion</h2>
            <p>
              LocalCheck keeps personal information only as long as reasonably necessary to
              provide the service, protect users, meet legal obligations, resolve disputes, and
              enforce agreements. The period depends on the type of information and why it is
              needed.
            </p>
            <p>
              You can start permanent deletion from <strong>Settings → Delete Account</strong> in
              the app. The deletion flow removes your LocalCheck account and information tied to
              it. Limited information may be retained when required for legal, security,
              fraud-prevention, or backup purposes. If you use Sign in with Apple, the deletion
              flow also initiates revocation of the related Apple authorization.
            </p>
          </section>

          <section id="choices">
            <span className="legal-section-number">07</span>
            <h2>Your controls and rights</h2>
            <ul>
              <li><strong>Visibility.</strong> Choose Public, Friends Only, or Private in the app&apos;s Settings.</li>
              <li><strong>Profile.</strong> Update available account details, primary sport, and local court in the app.</li>
              <li><strong>Device permissions.</strong> Change location, camera, and notification access in iOS Settings.</li>
              <li><strong>Notifications.</strong> Turn LocalCheck push notifications on or off in the app&apos;s Settings.</li>
              <li><strong>Account deletion.</strong> Use Settings → Delete Account to start permanent deletion.</li>
              <li><strong>Privacy requests.</strong> Depending on where you live, you may ask to access, correct, delete, or receive a copy of personal information, or object to or restrict certain processing.</li>
            </ul>
            <p>
              Email <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a> for
              a privacy request. Please use the email address associated with your account when
              possible. LocalCheck may need to verify your identity before completing a request.
            </p>
          </section>

          <section id="security">
            <span className="legal-section-number">08</span>
            <h2>Security</h2>
            <p>
              LocalCheck uses administrative, technical, and organizational safeguards designed
              to protect personal information. No service can guarantee absolute security. If you
              believe your account or information is at risk, contact LocalCheck promptly.
            </p>
          </section>

          <section id="children">
            <span className="legal-section-number">09</span>
            <h2>Children&apos;s privacy</h2>
            <p>
              LocalCheck is not directed to children under 13 and does not knowingly collect
              personal information from children under 13. If you believe a child has provided
              personal information, email LocalCheck so the situation can be investigated and
              addressed.
            </p>
          </section>

          <section id="updates">
            <span className="legal-section-number">10</span>
            <h2>Updates and contact</h2>
            <p>
              This policy may change as LocalCheck changes. The revised policy will be posted here
              with a new effective date, and additional notice will be provided when required.
            </p>
            <p>
              Questions about this policy or LocalCheck&apos;s privacy practices can be sent to:
            </p>
            <address>
              <span>LocalCheck</span>
              <a href="mailto:localchecksports@gmail.com">localchecksports@gmail.com</a>
            </address>
          </section>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
