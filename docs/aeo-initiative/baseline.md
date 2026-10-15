# LocalCheck discovery baseline — captured 15 October 2026

This is a dated starting point, not evidence of improvement from PR #24. Production and preview are separate. All numerical results below are observations from the named vendor report, not independently measured visitor traffic.

## Current Semrush dashboard

Source: https://www.semrush.com/seo/31264434/?fid=13492460 . Read in the signed-in browser on 15 October; dashboard data date 14 October 2026; Worldwide selected. Evidence: `evidence/semrush-dashboard-2026-10-15.txt` and PNG.

| Signal | Baseline | Scope/interpretation |
|---|---:|---|
| Organic keywords | 196 | Semrush estimated keyword coverage |
| Organic traffic | 0 | Vendor estimate; not actual analytics sessions |
| Authority Score | 2 | Vendor composite |
| Referring domains | 98 | Domain count, not endorsement quality |
| AI visibility | n/a | Unavailable, not zero |
| AI citations | n/a | Unavailable, not zero |
| ChatGPT/AI Overview/AI Mode/Gemini mentions | n/a | No usable measurement in this dashboard |
| Site health | 96% | Older audit dated 17 September |
| Errors / warnings | 1 / 184 | Older audit, 100 pages |
| Tracked keywords in top 3 / top 10 | 0 / 0 | Position Tracking tile, US Google English, 5–11 October, shown as updated 108 hours ago |

The AI Visibility page displayed an upsell/trial modal, not a LocalCheck result. Opening Organic Rankings today hit the account daily-request limit and displayed unrelated placeholder rows; those rows were excluded. No subscription/trial was started. Per-keyword baseline uses the owner's earlier screenshots below rather than claiming a refreshed export.

## Keyword snapshot from supplied screenshots

Scope: US desktop, 14 October 2026. All listed ranking URLs were https://localchecksports.com/courts . Search volume is Semrush's estimate. Preserve the same database/device/date basis in comparisons.

| Keyword | Position | Volume | KD |
|---|---:|---:|---:|
| outdoor courts near me basketball | 41 | 70 | 15 |
| eden park basketball court | 48 | 110 | 13 |
| outdoor handball courts near me | 64 | 50 | 22 |
| cherokee park basketball court | 80 | 320 | 18 |
| crossroads park pickleball and tennis | 67 | 480 | 8 |

Position-change screenshot: 13–14 October, eight changes; several terms lost ranking, beechwood courts moved 50→75. This establishes a baseline, not the cause. Handball is incidental ranking coverage, not a LocalCheck sport target.

## Technical audit baseline

17 September 2026, 100/100 pages, JavaScript rendering disabled: site health 96%; AI search health 88%; 3 healthy pages, 2 broken, 95 with issues; 91 low-word-count pages; 93 low text/HTML; 91 pages with one internal link; one DNS-resolution issue; missing llms.txt on one page. Current llms.txt exists, so that older warning cannot be described as current. Bot access panel showed ChatGPT-User, OAI-SearchBot, Googlebot and Google-Extended as allowed. This is access evidence, not indexing/citation evidence.

Saved original audit evidence: evidence/semrush-audit-2026-10-15.txt .

## AEOChecker baseline

Report generated 14 October 2026: https://www.aeochecker.ai/webapp/report?url=https%3A%2F%2Flocalchecksports.com%2F&jobId=d91fdc80-e5f7-41dc-af0f-a506796efdc5

Overall 24/100; AI presence13; answerability27; structured data100; crawler accessibility95. Two broad category/product prompts: 0% brand mentions in the report's key-prompt summary. Google AI Overviews: two checks, 0% brand mentions, 0% site citations. Perplexity's source list included LocalCheck for the live-check-in question, but the answer recommended RecLynk. Source inclusion is not recommendation.

These were NOT nearby-location tests. No fresh-account ChatGPT/Claude nearby-query pass rate has been measured. The correct initial value is **not measured**, not 0%. Vendor model labels and generated competitor descriptions are not independently verified product facts.

Original PDF/text/screenshot: evidence/AEO-Report-2026-10-14.pdf and aeochecker-report-2026-10-14.{txt,png}.

## Product and release baseline

PR24: https://github.com/jGPT-Automated/LocalCheck_WEB/pull/24 . Preview branch: codex/court-resource-launch; implementation commit b706609. Not merged by this initiative.

59,705 source basketball locations; 54 state/territory codes; 11,085 locality strings. Names, street addresses, entrance details, hours, fees, source observation dates absent. Normalized coordinates are valid ranges, not proof every location is playable. Production public feed previously captured one community court (Kasmiersky Park, Conroe), 0 check-ins and 3 locals at capture time; these counts are not a current live claim.

Baseline missing measurements: Search Console indexed URLs/impressions/clicks by query, Bing indexing, real AI referral sessions, app outbound clicks and attributed installs, consumer-assistant acceptance tests. Record unknowns explicitly; do not infer them from Semrush.


## Preview access retest — owner update, 15 October 2026

The owner reported removing the preview authentication restriction. A new Firecrawl scrape with maxAge=0 returned HTTP200 and the actual Conroe page, all eight records, corrected coordinates, map links and Pioneers/community links. Scrape ID: 01a140ed-86a5-73a6-848f-a024de4c7c8b. Evidence: evidence/preview-retrieval-unblocked.json. The earlier login failure is historical and resolved. This is a direct supplied-URL retrieval test, not search discovery or an unprompted recommendation test. The filtered page still reports noindex, follow.

Vercel change policy (owner): inspect settings as needed, propose the specific change and benefit first, then wait for Jesse's greenlight before configuration changes. No additional Vercel change is required for this successful retrieval. Any future production crawler/firewall/cache change requires observed evidence of a relevant failure, a narrow proposed remedy and approval; do not weaken protections speculatively. Preview review access and production indexability are separate concerns.
