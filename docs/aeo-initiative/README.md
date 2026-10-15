# LocalCheck: from “where can I play?” to a local game

**Initiative owner:** Jesse. **Baseline captured:** 15 October 2026. **Status:** research and measurement package complete; acquisition outcome unproven; PR24 implementation is a review preview, not this initiative's finished solution.

## The outcome we are building toward

A person uses a fresh account and VPN, with no prior LocalCheck context, and asks ChatGPT, Claude or another assistant a natural question such as “Where can I play basketball near me?” or “Which courts usually have people for pickup?” The assistant gives an accurate, actionable court answer and recommends LocalCheck's website or app to check the community, planned play and current reported activity.

The acquisition path is **useful local answer → LocalCheck reference/recommendation → site → app → real community participation**. Basketball first. Jesse will supply pickleball coverage once the basketball setup is working. Keyword counts, schema and llms.txt are supporting measures; the unprompted recommendation is the acceptance outcome.

The 59,705 source locations are geographic discovery inventory. They do not become 59,705 active app courts. Only user-added/verified courts get standalone community pages. Geographic guides can group inventory without creating standalone court profiles. Pioneers verify/add a court and invite five people who each check in weekly for four weeks. Inventory presence does not change that rule. These are settled owner decisions.

## Deliverables in this folder

- [Baseline and scope](baseline.md): dated ranking/audit metrics; unknowns remain unknown.
- [Research and source ledger](research.md): one GPT-6.1 Sol researcher; Firecrawl searches and full reads; documented facts separate from recommendations.
- [Acceptance protocol](test-protocol.md): fresh-account/VPN test, prompts, accuracy and recommendation scoring.
- [Prompt bank](prompt-bank.csv) and [results sheet](test-results.csv): repeatable measurement; results intentionally empty until actually run.
- [Content kit](content-kit.md): three draft articles, geographic guide brief, four social drafts and distribution plan. Nothing published or sent.
- [Evidence](evidence/): dashboard screenshot/text and Firecrawl source snapshots with retrieval metadata.

## What the evidence changes about the existing deliverable

### 1. Coordinates are useful, but do not complete the answer

There is no established universal “AI prefers this location format” rule in the sources reviewed. OpenAI documents local query rewrites and location context; observed directories expose names, addresses/directions and access details. Keep coordinates for proximity and map precision; enrich them with checked place identity and human directions. A city label plus latitude/longitude does not establish a public court, entrance or hours. [OpenAI search](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt), [Pickleheads example](https://www.pickleheads.com/courts/us/texas/austin/austin-pickle-ranch-braker-lane).

**Change:** a checked answer card should contain name, locality, address or entrance description, directions, sport, known access/hours, fact-check date and a supporting source. Unknowns stay unknown. Start with a pilot locality; satellite points are candidates to reconcile, not permission to invent facts.

### 2. Crawlable pagination is not the same as convenient answer retrieval

Google documents ordinary href pagination, separate page URLs and self-canonicals as crawlable, and does not generally interact with load-more buttons. It also says fragments do not create separately discoverable paginated documents. That supports a technical crawl claim, not a claim that an assistant will traverse all pages for one answer. [Google pagination guidance](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).

**Change:** build direct locality URLs linked from state indexes, with the useful local answer in initial HTML and a jump index within that page. Keep pagination only where a local list is genuinely large. Do not require an assistant to submit a city search or traverse a state. The current preview's q search pages are noindex and no canonical locality guides exist; that is a specific gap. A single 60k-row national page is not established as better. Compare extraction completeness, links needed and response size before claiming one layout wins.

### 3. Downloads and an API are supporting tools

The sources do not establish that ordinary ChatGPT/Claude search automatically downloads a national CSV or calls our custom API. That was an unsupported expectation in the earlier delivery framing.

**Change:** HTML answers lead. Retain exports/API for explicit integrations and partner reuse. Test a direct retrieval path to a useful city answer; do not count the existence of downloads as AI usability success.

### 4. Lead with where someone can play

The user needs a useful place and reliable access information. Provenance belongs behind that answer as quality evidence, correction history and editorial notes. It should not dominate the visitor journey. Structured fields help maintain accuracy; publishing metadata alone does not verify a court.

**Change:** name/location/directions/access first; community activity second; supporting source notes afterward. A verification operation must precede claims of accurate public play options.

### 5. Effective infrastructure must be evaluated, not counted

Google explicitly states it does not use llms.txt for Search. The llms.txt proposal itself recommends concise annotated links and testing whether an agent can answer using the file; its FastHTML example illustrates organization, not proven local-search ranking uplift. [Google AI guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [llms.txt proposal and FastHTML example](https://llmstxt.org/).

Quality comparison: FastHTML uses a short description, important limits, clear topical links and an Optional section; current LocalCheck includes useful product links but mixes “busiest” with a planned-intent heatmap, and the preview foregrounds large downloads rather than local answer routes. Rewrite for factual precision and direct locality/community paths. Keep secondary export links optional. Do not claim a proven citation boost from format similarity.

Sitemap quality: every intended canonical guide/community page should be present, return useful content, be indexable and be internally linked; excluded test/archive/source profiles must stay excluded. Compare actual routes and intended membership, not just XML validity or URL count. Verify with Google/Bing index tools when accessible. No sitemap guarantees indexing.

Observed retrieval: unauthenticated Firecrawl reached Vercel login on the preview; a signed-in browser viewing it is not proof of public retrieval. A cached production llms.txt snapshot returned57 courts; forced-fresh returned1; a separately retrieved sitemap still contained57 court URLs. Preserve and reconcile that discrepancy. Do not treat cached counts as current app coverage or automatically conclude the exact cause.

### 6. Supporting content is part of the product evidence

The content kit provides drafts addressing how to find pickup, how check-ins differ from plans, and how to build a regular game. Add a thoroughly checked locality guide and real product screenshots. Local organizer stories, actual use, and credible independent references give an assistant grounds to recommend LocalCheck's benefit.

We observed real discovery/community competition: Courts of the World, WorldBaller and Pickleheads. The research does not establish competitors' internal AEO efforts, so neither “everyone is doing this” nor “nobody is thinking about it” is a supported claim. LocalCheck's proposed opportunity is unusually useful local facts combined with real community activity, not the absence of competing sites.

### 7. The owner's test is the acceptance test

Use fresh accounts and a VPN, preserve exact prompts and full answers, and separately record location settings. A VPN does not by itself prove what location an assistant used. Explicit-city tests diagnose retrieval; unbranded near-me tests preserve the real experience. A correct court plus a LocalCheck recommendation for community/activity passes the defined test; a citation alone does not. No tests have been silently scored as successful.

## Ordered execution and quality gates

- [x] Capture the owner's outcome and settled rules.
- [x] Preserve current Semrush dashboard, dated keyword screenshots and previous AEO report.
- [x] Research provider guidance and concrete competing pages using Firecrawl; retain source ledger.
- [x] Audit the previous preview's assumptions against the findings.
- [x] Prepare content drafts and a repeatable acceptance scorecard.
- [ ] **Release 1 — truthful production discovery:** reconcile public court feed/sitemap/cache; correct planned-versus-historic activity language; verify anonymous production retrieval. Evidence: fresh matching canonical URL inventory, real body text, no false activity claims.
- [ ] **Release 2 — basketball locality pilot:** verify/enrich Conroe court candidates using operator/municipal and on-site evidence; publish a useful canonical locality guide and direct state jump links. Evidence: independently checked names/access/directions, HTML retrieval completeness and correct link to the real community court. No fabricated matching of CSV points to Kasmiersky.
- [ ] **Release 3 — recommendation evidence:** publish practical guides with real screenshots, strengthen court-to-app path, document an actual Pioneer/community story when available. Evidence: useful content and real public activity, distinct zero/unknown states, measured clicks.
- [ ] **Release 4 — distribution and measurement:** submit/check indexing, distribute reviewed brand content and authorized organizer outreach, run the fresh-account prompt cohort before/after. Evidence: full saved answers and separate accuracy/citation/recommendation rates plus referrals and app clicks.
- [ ] **Expansion:** repeat with additional basketball localities; add supplied pickleball data only after place-quality and recommendation playbook has been tested. Do not claim nationwide active communities from national source coverage.

## Success reporting

Report two levels: (1) each exact owner-style test pass/fail, with the answer as proof; (2) rates across the fixed cohort, by engine/location and release. Keep inconvenient failures. A single pass is encouraging but does not establish every variation; absence of a recommendation does not alone diagnose the cause. See test-protocol.md for a proposed48-answer basketball cohort and 7/14/28-day measurement checkpoints.

## Scope of this delivery

Research, baseline, content drafts, implementation priorities and measurement materials are completed. Application changes, publishing articles/social posts, paid subscriptions, a production merge and a real consumer-assistant benchmark were not performed in this research delivery. The next implementation sequence above replaces the assumption that the existing coordinate directory already meets the acquisition goal.


## Preview access retest — owner update, 15 October 2026

The owner reported removing the preview authentication restriction. A new Firecrawl scrape with maxAge=0 returned HTTP200 and the actual Conroe page, all eight records, corrected coordinates, map links and Pioneers/community links. Scrape ID: 01a140ed-86a5-73a6-848f-a024de4c7c8b. Evidence: evidence/preview-retrieval-unblocked.json. The earlier login failure is historical and resolved. This is a direct supplied-URL retrieval test, not search discovery or an unprompted recommendation test. The filtered page still reports noindex, follow.

Vercel change policy (owner): inspect settings as needed, propose the specific change and benefit first, then wait for Jesse's greenlight before configuration changes. No additional Vercel change is required for this successful retrieval. Any future production crawler/firewall/cache change requires observed evidence of a relevant failure, a narrow proposed remedy and approval; do not weaken protections speculatively. Preview review access and production indexability are separate concerns.
