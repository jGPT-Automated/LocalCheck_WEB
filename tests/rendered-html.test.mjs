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

test("renders the canonical community platform message on the homepage", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /one shared platform for local courts, activity, and competition/i);
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
