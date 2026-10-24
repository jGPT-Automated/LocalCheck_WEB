# LocalCheck launch hub
Last consolidated: October 24, 2026. Status: working draft for founder alignment.

## Outcome
Get LocalCheck into the App Store, then prove recurring use at a small number of real courts. The founder asked for high-level coordination, shared priorities, and material launch progress. This hub is the proposed cross-repository entry point; it does not replace technical references.

## Where we stand
Launch readiness is **unverified**. This consolidation inspected repository files and open PRs, not a running app, production database, Expo dashboard, or App Store Connect. No release date or completion percentage is justified yet.

The shipping app is [LocalCheck_Expo](https://github.com/agenticjess-star/LocalCheck_Expo); [LocalCheck_WEB](https://github.com/jGPT-Automated/LocalCheck_WEB) supplies public discovery, product explanation, and launch support. June mobile docs are stale against current main. September strategy and October website PRs describe broader scope than the June MVP. See [evidence](EVIDENCE.md) and [decisions](DECISIONS.md).

## Proposed next three outcomes
These are recommendations, not founder-approved scope or assignments.

| Order | Outcome | Why it advances launch | Completion evidence |
|---|---|---|---|
| 1 | Agree the release scope and identify the release candidate branch/build | Prevent conflicting agents and copy from defining different launches | Founder confirms included/deferred features; exact commit and build recorded |
| 2 | Establish actual readiness of that candidate | Replace stale checkboxes with observed facts | Dated device walkthrough and build checks; blockers recorded with owner and next action |
| 3 | Close verified submission blockers and align public promises | Turn remaining work into a finite path to submission | Candidate passes agreed gates; website/listing match behavior; submission receipt recorded |

## Work lanes
| Lane | Current assessment | Next useful action | Owner |
|---|---|---|---|
| Product/release scope | Conflicting historical definitions | Resolve D1–D3 in decision log | Founder decision; coordinator prepares |
| Mobile/core loop | Backend services present; device behavior unverified | Verify browse → auth → check-in → restart → check-out on candidate | Unassigned |
| Data/trust | Web curated catalog and older mobile DB totals differ | Confirm shared source, real counts, fallback/QA behavior | Unassigned |
| Build/TestFlight/submission | EAS groundwork appears in open mobile PR #3; no eas.json in inspected main tree | Establish existing Expo/App Store build and submission status | Unassigned |
| Privacy/safety/support | Web pages exist; mobile enforcement not verified | Match public promises to implemented deletion, visibility, report/block, support | Unassigned |
| Billing/offers | June defers billing; newer web work describes subscriptions | Confirm launch inclusion and exact offers before implementation | Founder decision |
| Web/distribution | Several overlapping open PRs | Triage for launch need, overlap, and current relevance | Unassigned |
| Court activation/business | September brief favors concentrated cohorts | Name first basketball courts and Austin pickleball pocket; define activated court | Founder + coordinator |

## Proposed release gates
Each is an evidence requirement to assess, not a claim of a current defect or an exhaustive App Store policy checklist.
- Exact release scope, commit, build number, and environment recorded.
- Core user journey passes on a real iPhone with real accounts and persistence.
- No demo/QA activity presented as real public activity; error/offline states are honest.
- Signed-out writes, account/session transitions, privacy choices, and deletion verified.
- Included social/billing/contribution features verified end to end, or removed/deferred consistently.
- Production configuration, permissions, sign-in, support/privacy URLs, screenshots, listing and disclosures checked for the actual build.
- TestFlight feedback triaged; submission blockers closed with evidence.
- Submission, review outcome, release availability and first-cohort activation tracked separately.

## How to maintain this
At the start of a working session: read this hub and the decisions log; reconcile fresh repo/PR/build evidence before starting work. Pick at most three current outcomes. Every execution task needs a launch reason, owner, dependency, done criterion and evidence link.

At the end: record what materially changed, the exact evidence, remaining blocker, and next action. A plan is not implementation; merged code is not a verified build; a verified build is not an App Store release. Keep dated history in evidence rather than silently rewriting old claims.

Founder choices stay marked proposed until confirmed. Do not open new feature lanes or change business commitments silently. Park ideas without losing them. Refresh these docs whenever new evidence or a decision changes scope, readiness or the next three outcomes. Updates occur during active work; no unattended monitoring has been set up.

## Progress record
| Date | Material change | Evidence | Next step |
|---|---|---|---|
| 2026-10-24 | Consolidated two repositories, stale status docs, strategy and open PR inventory | EVIDENCE.md | Confirm intended launch experience and locate actual release candidate |
