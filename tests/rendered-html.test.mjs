import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function sharedHeader(html) {
  const match = html.match(/<header[^>]*data-site-header=["']true["'][^>]*>[\s\S]*?<\/header>/i);
  assert.ok(match, "shared site header is present");
  return match[0];
}

test("renders development preview metadata", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders the app overview with the real product story", async () => {
  const response = await render("/app");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /THE LOCALCHECK APP/i);
  assert.match(html, /WHO'S GOING/i);
  assert.match(html, /HOW ELO MOVES/i);
  assert.match(html, /VERIFY A COURT/i);
  assert.match(html, /data-app-overview=["']true["']/i);
});

test("renders the launch-ready support identity without a personal operator", async () => {
  const response = await render("/support");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /one shared platform for their courts, activity, and competition/i);
  assert.match(html, /href=["']https:\/\/x\.com\/LocalCheckSport["']/i);
  assert.match(html, /@LocalCheckSport/i);
  assert.match(html, /data-support-footer=["']balanced["']/i);
  assert.doesNotMatch(html, /Jesse Herrig/i);
});

test("renders the court explorer with a mobile horizontal result rail", async () => {
  const response = await render("/courts");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /data-mobile-court-rail=["']true["']/i);
  assert.match(html, /Your courts, activity, and competition in one shared place/i);
});

test("renders court details as a read-only view of the app schedule", async () => {
  const response = await render("/courts/los-angeles-basketball-rancho-cienega");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /8 AM/i);
  assert.match(html, /10 PM/i);
  assert.match(html, /View only/i);
  assert.match(html, /Open the LocalCheck app to add or change plans/i);
  assert.doesNotMatch(html, /Check in now|Make this local|Make this my local court|I(?:&apos;|')m going|Remove my time/i);
});

test("renders the canonical community platform message on the homepage", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /one shared platform for local courts, activity, and competition/i);
});

test("keeps the homepage hero focused on useful destinations", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.doesNotMatch(html, /aria-label=["']LocalCheck launch court summary["']/i);
  assert.doesNotMatch(html, /<button[^>]*>[^<]*Explore competition/i);
  assert.match(html, /data-live-market-count=["']true["']/i);
  assert.match(html, /class=["']hero__activity["']/i);

  const qrCard = html.match(/<a[^>]*class=["'][^"']*qr-card[^"']*["'][^>]*>[\s\S]*?<\/a>/i)?.[0] ?? "";
  assert.match(qrCard, /Scan to preview the app/i);
  assert.doesNotMatch(qrCard, /<svg/i);
});

test("renders an intentional homepage footer with real destinations", async () => {
  const response = await render("/");
  const html = await response.text();
  const footer = html.match(/<footer[^>]*data-site-footer=["']true["'][^>]*>[\s\S]*?<\/footer>/i)?.[0] ?? "";

  assert.equal(response.status, 200);
  assert.doesNotMatch(footer, /href=["']\/(courts|app|how-it-works|pioneers)["']/i);
  assert.match(footer, /href=["']\/support["'][^>]*>Help</i);
  assert.match(footer, /href=["']\/privacy["'][^>]*>Privacy</i);
  assert.match(footer, /href=["']\/terms["'][^>]*>Terms</i);
});

test("keeps the privacy contact brand-level", async () => {
  const response = await render("/privacy");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /localchecksports@gmail\.com/i);
  assert.match(html, /Privacy at a glance/i);
  assert.match(html, /Public, Friends Only, and Private/i);
  assert.match(html, /Settings → Delete Account/i);
  assert.match(html, /RevenueCat/i);
  assert.match(html, /does not sell your personal information/i);
  assert.doesNotMatch(html, /health data|address book|contacts permission/i);
  assert.doesNotMatch(html, /Jesse Herrig/i);
});

test("renders product-accurate, human-readable terms", async () => {
  const response = await render("/terms");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /Terms at a glance/i);
  assert.match(html, /automatically renews/i);
  assert.match(html, /manage or cancel through your Apple subscriptions/i);
  assert.match(html, /Restore Purchases/i);
  assert.match(html, /RevenueCat/i);
  assert.match(html, /does not reserve a court/i);
  assert.match(html, /LocalCheck does not conduct background checks/i);
  assert.match(html, /data-site-footer=["']true["']/i);
  assert.doesNotMatch(html, /Jesse Herrig/i);
});

test("renders one consistent site header on every public page", async () => {
  const routes = [
    "/",
    "/app",
    "/how-it-works",
    "/pioneers",
    "/support",
    "/privacy",
    "/terms",
    "/courts",
    "/courts/los-angeles-basketball-rancho-cienega",
  ];

  for (const route of routes) {
    const response = await render(route);
    const html = await response.text();

    assert.equal(response.status, 200, route);
    const header = sharedHeader(html);
    assert.match(header, /href=["']\/courts["'][^>]*>Courts</i, route);
    assert.match(header, /href=["']\/how-it-works["'][^>]*>How it works</i, route);
    assert.doesNotMatch(header, />Heatmap</i, route);
    assert.doesNotMatch(header, />Competition</i, route);
    assert.doesNotMatch(header, />Add a court</i, route);
    assert.doesNotMatch(header, />Pioneers</i, route);
  }
});

test("uses one CTA component with intentional page-specific text and destinations", async () => {
  const homeHeader = sharedHeader(await (await render("/")).text());
  const appHeader = sharedHeader(await (await render("/app")).text());

  assert.match(homeHeader, /href=["']\/app["'][^>]*>Explore the app/i);
  assert.doesNotMatch(homeHeader, /href=["']\/courts["'][^>]*>Find a court/i);
  assert.match(appHeader, /href=["']\/courts["'][^>]*>Find a court/i);
  assert.doesNotMatch(appHeader, /href=["']\/app["'][^>]*>Explore the app/i);
});

test("renders the shared site header on the custom not-found page", async () => {
  const response = await render("/this-page-does-not-exist");
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(html, /data-site-header=["']true["']/i);
  assert.match(html, /Page not found/i);
  assert.match(html, /href=["']\/courts["'][^>]*>Find a court/i);
});

test("promotes Starters and Pioneers on the homepage without sample rankings", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /first 100/i);
  assert.match(html, /five invited players/i);
  assert.match(html, /global leaderboard/i);
  assert.match(html, /public global standings are not available on the web yet/i);
  assert.doesNotMatch(html, /Jordan Miles|Alex Rivera|Taylor Kim|Morgan Chen/i);
});

test("explains the current launch reward rules on the Pioneers page", async () => {
  const response = await render("/pioneers");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /first 100/i);
  assert.match(html, /five invited players/i);
  assert.match(html, /once a week for four weeks/i);
  assert.match(html, /one month of LocalPlus/i);
  assert.match(html, /Apple offer code/i);
  assert.match(html, /renews at the regular monthly price unless canceled/i);
  assert.doesNotMatch(html, /\+3 months of LocalPlus|\+1 month per player/i);
});

test("shows court-specific artwork and the actual add-court flow on Pioneers", async () => {
  const response = await render("/pioneers");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /data-court-art="basketball"/);
  assert.match(html, /src="\/app-screens\/add-court-start\.png"/);
  assert.match(html, /alt="LocalCheck app screen showing the add-a-court flow"/);
});

test("describes a free core app without contradicting the LocalPlus launch offers", async () => {
  const how = await (await render("/how-it-works")).text();
  const llms = await (await render("/llms.txt")).text();

  assert.match(how, /core court features for free/i);
  assert.match(how, /LocalPlus launch offers/i);
  assert.doesNotMatch(how, /no in-app purchases, no subscription/i);
  assert.match(llms, /LocalPlus launch offers/i);
  assert.doesNotMatch(llms, /no purchases, no subscription|no in-app purchases/i);
});
