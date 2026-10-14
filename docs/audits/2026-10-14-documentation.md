# Documentation and contributor audit — 2026-10-14

This is a dated evidence snapshot, not another app decision history.
Repository documentation and contributor checks are corrected in this PR.
Public wording and runtime/data changes below are proposed for a separate,
coordinated release. No app or Supabase changes are included.

## Sources and status

- Website main: [`529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae`](https://github.com/jGPT-Automated/LocalCheck_WEB/commit/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae).
- Website [PR #22](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/22):
  open, unmerged, head `214c279639203ba010ac339cabce139faff0df1c`; six changed files, no submitted reviews
  at inspection. Its copy is approved-launch intent with an explicit hidden-score
  release hold. Its branch, files, PR body, and deployment were left untouched.
- App main: [`541632c05488c0cd02e1997b58feaa6534ccf1f3`](https://github.com/jGPT-Automated/LocalCheck_Expo/commit/541632c05488c0cd02e1997b58feaa6534ccf1f3).
  Its [decision document](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/541632c05488c0cd02e1997b58feaa6534ccf1f3/docs/product/DECISIONS.md) still describes
  September billing; source main and those documents are not the same checkpoint.
- App [PR #67](https://github.com/jGPT-Automated/LocalCheck_Expo/pull/67):
  open, unmerged, head `1ead7f7647c1c92d84b5ea3183c29ac81f619aa1`. Latest approved intent is in its
  [decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/product/DECISIONS.md), with implementation at that
  same SHA. App #66 remains open and is superseded in the recorded #67 checkpoint.
- App [current state](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/CURRENT_STATE.md) and
  [Oct 13 handoff](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/handoffs/2026-10-13-frontend-timers-and-auto-check-in.md)
  record installed TestFlight 1.0.3 and a required new 1.0.4 binary for auto
  check-in. Backend work is recorded as applied, but this audit did not query the
  database or independently exercise a device. Even #67's current-state wording
  contains older hidden-score and arrival-notice text; use newer D49/D52 and code
  for approved intent, and release evidence for availability.
- Live pages were fetched on October 14 using Firecrawl `maxAge: 0`; status,
  scrape IDs, selected exact passages, the complete public API response, and
  source SHAs are retained in [live evidence](2026-10-14-live-evidence.json).
  Record saved at 2026-10-14 07:37:11 UTC. All nine routes returned 200.
  The live HTML includes `codex-preview=development`; domain availability
  does not establish an App Store launch or the exact deployed website commit.

## Repository documentation: before and after

| Before, with immutable source | After in this PR | Evidence and reason |
| --- | --- | --- |
| [README](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/README.md): “This MVP ships … 56 courts” across seven cities. | [README](../../README.md) describes the current website and public-feed/fallback distinction; inventory is kept in this dated audit. | Bundled JSON has **57 listings** (29 basketball, 28 pickleball, seven markets); [public API](https://localchecksports.com/api/courts) returned **one**. Neither 56 nor 57 is current public app coverage. |
| [README](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/README.md): detail pages include “check-in, local-court state, and weekly planning UI.” | [README](../../README.md) describes public counts and a read-only heatmap; player actions belong in the app. | [Court client](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/app/courts/%5Bid%5D/court-page-client.tsx) labels the page “View only”; [existing rendered test](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/tests/rendered-html.test.mjs) rejects check-in/local-court/plan-edit buttons. |
| [README](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/README.md): bundled JSON is the “canonical seed source,” migrations/seed can be rerun; counters “start … at zero.” | [README](../../README.md) names historical seed/review artifacts and local SQL generation; shared-backend writes need separate approval. | [Loader](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/app/courts/supabase-courts.ts) prefers the anonymous feed and uses bundled rows with zero counters only on fallback. A fallback zero is not observed live presence. App sources own the current backend contract. |
| [Court standard](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/docs/COURT_DATA_STANDARD.md): “The MVP catalog contains 56 courts” and fixed seven-city launch scope. | [Court standard](../COURT_DATA_STANDARD.md) keeps naming/provenance and access rules, but identifies historical catalog scope and links app visibility authority. | [App court runbook](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/runbooks/ACCOUNT_TAGS.md) and D34 separate real, test, and archived courts. The ordinary public feed agrees with that distinction. |
| [PRODUCT](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/PRODUCT.md): website is the “canonical source for verified courts”; app features and Starter/Pioneer rewards are locally restated as current promises. | [PRODUCT](../../PRODUCT.md) states website/app ownership, links app authorities, and requires verification of paid gates/reward fulfillment before promising them. | App owns durable court/player state. D0/D4/D12/D34 revise billing, rewards, and visibility; website should not preserve a second product decision ledger. |
| [Growth brief](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/strategy/launch-growth-working-brief.md): “Living strategy document,” with proposed flows, rewards, and “Decisions / strong direction.” | [Growth brief](../../strategy/launch-growth-working-brief.md) is labeled historical September research and hypotheses with a current-authority warning. | Its research can remain useful, but it predates October decisions and contains proposals rather than deployed proof. Original research is preserved. |
| No root AGENTS.md, contributor workflow, PR template, or checked-in GitHub Actions. | [AGENTS](../../AGENTS.md), [workflow](../CONTRIBUTING.md), [template](../../.github/pull_request_template.md), and [CI](../../.github/workflows/ci.yml). | The old README asks for lint/tests but gives no documentation impact, claim-evidence, or launch-status requirement. The new contract fills that gap without copying app decisions. |
| No documentation-link/command check; default Vercel Git integration can deploy a new review branch. | [Documentation tests](../../tests/documentation.test.mjs), `npm run check:docs`, and [Vercel branch suppression](../../vercel.json) for `codex/docs-*`. | Checks catch broken local links and nonexistent npm commands. [Official Vercel configuration](https://vercel.com/docs/project-configuration/git-configuration#git.deploymentenabled) allows branch-pattern deployment suppression; other branches remain governed by their existing configuration. |

DESIGN.md already prohibits invented activity and remains unchanged.
No pages, app screenshots, court datasets, migrations, seeds, dependencies, or
lockfile contents are changed by this PR.

## Live inventory reconciliation

[Homepage](https://localchecksports.com/), [explorer](https://localchecksports.com/courts),
[how-it-works](https://localchecksports.com/how-it-works), and
[`/api/courts`](https://localchecksports.com/api/courts) showed one listing:
Kasmiersky Park, basketball, Conroe TX, Houston market, `source: supabase`.
The API reported zero live check-ins and one local; the physical
`courtCount` is unknown. These are listing/market totals, not a count of
physical playing surfaces or distinct municipalities.

[`/llms.txt`](https://localchecksports.com/llms.txt) instead said:
“LocalCheck covers 57 source-backed courts across 7 US cities at launch:
29 basketball and 28 pickleball,” and listed historical venues.
The bundled [JSON](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/data/launch-courts.json) matches those totals.
The [loader](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/app/courts/supabase-courts.ts) can substitute that catalog
on failure or an empty result, and [llms route](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/app/llms.txt/route.ts)
allows hour-long shared caching plus a day of stale revalidation. Its source
comment claiming the catalog “never drifts” is disproven by the live observation.

The observed mismatch is proven; its exact runtime cause is not. Fallback,
environment/build state, and cache behavior need investigation on the reviewed
deployment. Reusing the same loader does not guarantee contemporaneous responses.
Do not “fix” it by replacing 57 with a hard-coded 1 or by removing archived/test
visibility in the backend.

## Public changes held for launch coordination

These are concrete proposed corrections, not changes included in this PR.
They must be reconciled with PR #22's owner without overwriting its work.

| Current public or PR #22 wording | Proposed after / acceptance criterion | Evidence and release prerequisite |
| --- | --- | --- |
| Live how-it-works: “It is free, iOS-only, and there is nothing to buy inside it.” Its FAQ, terms, and llms summary describe optional LocalPlus. | “LocalCheck is free to download on iOS. Core court features are free, with optional LocalPlus subscriptions.” Add monthly/yearly availability only with verified billing/release status. | Live [how-it-works](https://localchecksports.com/how-it-works), [terms](https://localchecksports.com/terms); D0 in [latest decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/product/DECISIONS.md). PR #22 already replaces this passage; preserve its work and coordinate availability. |
| llms.txt advertises 57 courts/seven cities; spotlight copy promises one court for each sport even though no public pickleball listing was returned. | All current-coverage surfaces describe the same anonymous visible inventory and its freshness/source. Suggested summary: “Browse the current public LocalCheck court catalog.” Spotlight: “Verified courts, selected by local community size.” Missing sports stay empty. | Live evidence above; D34 and [court runbook](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/runbooks/ACCOUNT_TAGS.md). Review fallback visibility and cache/environment behavior, then verify API, homepage, explorer, sitemap, structured data, and llms against the same public data. |
| Live Pioneers FAQ says Starter is an Apple offer code and renews at the regular monthly price after the free year. PR #22 intentionally leaves it unchanged. | Once fulfilled and launch-ready: “The first 100 eligible accounts receive one free year of LocalPlus automatically. No offer code is needed, and the free offer does not auto-renew.” Do not claim an active automatic grant before it exists. | D4/D12 supersede September offer-code decisions; [current state](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/CURRENT_STATE.md) explicitly says automatic Starter is **not built yet**. Verify eligibility, fulfillment, and all promotional renewal disclosures before release. Keep paid subscription renewal terms distinct from free grants. |
| PR #22 says **any participant** can hide a counted game's score and participants keep seeing it; it changes privacy, app overview, how-it-works, and llms. | Approved intent: “A score is hidden when at least half the participants choose Hide score. Hidden results show Win/Loss in feeds and profiles; participants can still see numbers on the game score page and during review. Records, Elo, rankings, and head-to-head still count.” | D49 revises D47/D40/D30; [scoreVisibility.ts](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/lib/scoreVisibility.ts) implements the threshold and surface distinction. #22's release hold remains; app merge, backend contract, installed-build/device behavior, and legal copy must align. |
| Live how-it-works and llms promise every check-in is geofenced and “only works when you are physically at the court.” PR #22 retains this guarantee. | Describe manual check-in separately from opt-in automatic check-in at the local court. Do not imply every manual check-in is location-enforced. For launch auto copy, reference the latest model: local court only, 150m region, notice after one minute, public post at five minutes, leave checkout, 1.5-hour backstop. | Main [manual action](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/541632c05488c0cd02e1997b58feaa6534ccf1f3/context/AppContext.tsx#L576) and [service](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/541632c05488c0cd02e1997b58feaa6534ccf1f3/services/checkInService.ts) send court/privacy without location proof. PR #67's original body still says three minutes/three hours, superseded by D52 and [model](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/lib/autoCheckInModel.ts). Requires 1.0.4 native build and device tests; [privacy location disclosure](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae/app/privacy/page.tsx) currently describes foreground location only and needs coordinated review. |
| PR #22 adds casual invitations, game visibility, review timing, and head-to-head as launch copy. | Keep casual as scheduling only, with no scored result or competitive effect; require current court/day/time wording where explained. Public game visibility requires every participant Public. State review deadlines precisely without presenting pending app work as installed. | D25–D27r/D31/D50/D51 in [decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/product/DECISIONS.md), plus the [handoff](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/1ead7f7647c1c92d84b5ea3183c29ac81f619aa1/docs/handoffs/2026-10-13-frontend-timers-and-auto-check-in.md). Installed 1.0.3 is recorded as lacking challenges/auto check-in. Verify build, backend, and affected screens before releasing #22. |
| PR #22 sets privacy/terms effective date to October 7, although it remains unmerged. | Select effective dates with the coordinated policy release; approved draft dates must not be described as deployed dates. Review privacy disclosures for the new background-location flow. | [PR #22](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/22) is open. Policy changes need approval and actual website publication coordination. |

## Tests, CI, and checks

Before this PR, the three test files contain 21 cases: one stat calculation,
three spotlight selections, and 17 built-Worker rendering checks.
The source tree contains no `.github/` workflow/template. The recorded GitHub
main check-run read returned none. A separate branch read reports main as
unprotected with required status checks off. This PR changes no protection or
external hosting settings; enabling required checks is a maintainer follow-up.

The existing “free core” rendered check rejects “no in-app purchases,” but misses
“nothing to buy inside it,” so it passes despite the live contradiction.
The Pioneers test currently **requires** Apple offer-code/renewal language that
D4/D12 supersede. Update those assertions together with coordinated public-copy
changes; turning them red in this documentation PR would conflate the releases.

This PR adds two dependency-free checks for inline local documentation links and
literal npm script names. Negative probes verify that a missing link and an
unknown script fail. CI also runs existing unit tests and lint/full build/tests.
It does not mechanically approve product wording or require artificial edits to
a state-history file on every push.

Useful follow-up checks with the public correction:

- Render how-it-works/FAQ/terms/llms together and reject all contradictory
  no-purchase phrasing, including “nothing to buy inside.”
- Test API and generated summaries with an injected visible inventory, including
  empty data and one missing sport. Preserve unknown physical court counts.
- Perform a timestamped, read-only live comparison after an authorized release:
  API, homepage, explorer, sitemap, structured data, and llms. Investigate
  caching/fallback discrepancies instead of pinning a mutable expected total.
- Exercise hidden scores with 1v1 and team thresholds, participant versus outside
  views, and review versus final results in the app's existing tests/device matrix.

## Verification boundaries

Source was retrieved through the GitHub connector into an isolated local snapshot
because this executor's shell proxy was unreachable. The complete remote tree is
preserved when publishing the review commit; only this PR's named files change.
The local snapshot lacks binary screenshots/workbook and installed dependencies.
No dependency versions or package-lock contents are changed.

Local verification: six documentation/stat/spotlight cases pass; broken-link
and unknown-command negative probes fail as expected; workflow/config parsing
and `git diff --check` pass. `npm run lint` cannot run here (`eslint: not found`,
exit 127); `npm test` stops before tests (`vinext is unavailable`, exit 69).
These are missing-dependency boundaries, not passing full-suite results.
GitHub CI results are recorded in the PR. No app or
Supabase write, merge, release, or manual hosting deployment is authorized here.
The review branch carries Vercel deployment suppression before its first push.
