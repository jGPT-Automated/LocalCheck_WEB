# LocalCheck SEO audit and release

Audited on October 4, 2026 against `https://localchecksports.com` and repository
commit `529b7fb`. Search rankings and Google's indexing decisions cannot be
verified from page HTML. Search Console access is needed to diagnose exclusions.

## Live findings before this change

- All 65 sitemap URLs returned HTTP 200 with one H1, descriptions and canonicals.
- Googlebot and the wildcard crawler were allowed in robots.txt. The sitemap URL
  was advertised. No noindex directive was found on these successful pages.
- No broken internal destinations were found. Unknown pages and courts returned
  real 404s. Those 404s should remain; do not redirect unknown URLs to the homepage.
- The explorer linked to UUIDs, while 55 canonical slug URLs lacked direct internal
  links. UUID pages returned 200 with a different canonical rather than redirecting.
- Home, app and how-it-works used the same broad meta description.
- Several pages lacked visible breadcrumbs, and the app FAQ lacked FAQ schema.
- App content initially had `opacity: 0`, making visibility depend on JavaScript.
- The hero PNG was 1,666,507 bytes and omitted intrinsic dimensions.
- HTTP apex to HTTPS apex took one redirect. `/courts/` redirects directly to
  `/courts`. The audit proxy denied the www hostname; that is not evidence that
  Googlebot is denied. Verify its DNS, certificate and edge redirect separately.

## Changes

- Explorer cards link straight to court slugs. Known aliases and UUIDs permanently
  redirect to the listing's slug; missing courts still return 404.
- Visible breadcrumbs on public subpages, with BreadcrumbList schema.
- Distinct descriptions for home, app, how-it-works and support; existing unique
  descriptions and court-specific metadata retained.
- App FAQ text and JSON-LD share one source, with answers in server HTML. Native
  disclosure controls work without JavaScript. FAQ schema does not guarantee a
  Google rich result; Google restricts FAQ rich results primarily to authoritative
  government and health sites.
- App sections and homepage count are visible on first render. Existing explicit
  image sizes retained, incorrect screenshot sizes corrected, hero dimensions added.
- WebP artwork and screenshots. Hero is now 75,864 bytes (95.4% smaller); QR uses
  lossless WebP. Original PNGs remain available for existing external links.
- Several promotional app headlines rewritten as concrete actions. Court pages
  link to their supplied listing source and advise checking current access/hours.
  Unverified courts no longer get an unconditional “Verified place” map label.
- JSON-LD serialization escapes `<` to prevent source text ending script elements.
- Optional Cloudflare imports stay external in the Node webpack build, preserving
  the process.env fallback. Sites continues to build with vinext. An explicit
  empty `turbopack` configuration also preserves Vercel's default `next build`
  command: Next.js 16 otherwise rejects a webpack-only configuration.

## Verify and deploy

```bash
npm ci
npm run lint
npm test
npm run build:next
npx next build
node scripts/seo-audit.mjs https://localchecksports.com audit.json
```

`npm run build` creates the Sites Worker artifact. Vercel's existing `next build`
command uses Turbopack and creates `.next`. `npm run build:next` is an optional
webpack build for Node; `next start` runs either Next.js artifact locally.
Do not deploy the Sites artifact as a Next.js build.
Use the existing production host and environment configuration. This repository
change does not move the domain or change hosting-account settings.

The reusable audit checks sitemap status and URLs, response metadata, one H1,
JSON-LD syntax, image alt attributes/dimensions, internal links, homepage reachability,
and unknown-route 404 responses. HTTP times are not browser load times.

Local unthrottled Chromium measurements: desktop homepage load approximately
600 ms; a warm 390px mobile navigation had LCP approximately 240 ms and observed
CLS 0. These measurements do not establish a universal two-second load guarantee.
After deployment, measure cold mobile loads with network/CPU throttling and check
Search Console field data. Target LCP <= 2 seconds for the requested performance
goal and CLS <= 0.1, across home, explorer, app and a court page.

## Search Console handoff

No Search Console connection is available in this session, and no sitemap
submission has been made. Once signed in as an owner of the verified property:

1. Open the Domain property `localchecksports.com` or URL-prefix property
   `https://localchecksports.com/`. If missing, verify ownership using Google's
   supplied DNS TXT value or another supported method; never invent a token.
2. In Sitemaps, submit `https://localchecksports.com/sitemap.xml` and confirm its
   fetched status. Robots discovery already advertises this URL.
3. Inspect the homepage, explorer and representative canonical court URLs. Use
   “Test live URL” to check Google's access, rendered content and canonical.
4. Review Page indexing exclusions and Google's selected canonical. Request
   indexing for a small representative set after the release is live.
5. Check Manual actions and Security issues, then track indexed canonical pages,
   impressions, clicks and queries. Recheck after Google's next crawls.

Google documentation: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
and https://support.google.com/webmasters/answer/9012289.

## Author and backlinks

An author bio has not been published because the person's identity, role,
experience and profile URL have not been supplied. Existing brand attribution is
retained. Add a factual bio after receiving those details; do not manufacture a
person, credentials, playing history or testimonials.

`SEO_BACKLINK_PROSPECTS.csv` lists six relevant venues from the existing source
catalog. They are research candidates, not confirmed partners or earned links.
No outreach has been sent. First verify each venue's current information and
identify the appropriate public contact. A useful pitch can read:

> LocalCheck has a basketball/pickleball listing for [venue] at [court URL].
> Could you check its access and court details? The page lets players view
> check-ins and weekly plans. If that is useful for your players, would you
> consider including it on your court or player resources page?

Only make claims that are currently true. Prioritize accurate listings, useful
local guides and actual relationships with organizers. Record accepted placements
and verify the published referring URL before counting a backlink. Links and
editorial placement depend on the publisher; no placement or ranking is promised.

The requested Friday is October 9, 2026. No target query/location was supplied.
Ranking #1 by that date cannot be promised from these fixes.
