# LocalCheck Web

LocalCheck's public website explains the iOS app and provides a read-only
basketball and pickleball court explorer. The player app and its product
decisions live in [LocalCheck_Expo](https://github.com/jGPT-Automated/LocalCheck_Expo).

## Start here

- [AGENTS.md](AGENTS.md): contributor scope, evidence, and release boundaries.
- [Contributor workflow](docs/CONTRIBUTING.md): setup, checks, and PR requirements.
- [Documentation audit](docs/audits/2026-10-14-documentation.md): dated live/source
  comparison, corrections, and launch-copy follow-ups.
- [Product guidance](PRODUCT.md) and [design system](DESIGN.md).
- [Court naming and provenance](docs/COURT_DATA_STANDARD.md).

## What this repository serves

- Product overview, how-it-works, launch-program, support, privacy, and terms pages.
- Responsive Mapbox explorer with sport, market, and text filters.
- Court detail pages with public counts and a read-only weekly planning heatmap.
  Check-ins, local-court changes, and plan edits belong in the app.
- Machine-readable discovery through `/llms.txt`, sitemap, and structured data.
- Sites build/artifact helpers; the canonical public URL is
  [localchecksports.com](https://localchecksports.com/).

Public court inventory comes from the anonymous court feed, subject to backend
visibility and caching. The bundled catalog is a maintenance fallback, not a
count of courts available to ordinary app users. See the dated audit for observed
counts; do not turn a seed count into a public coverage claim.

The app has free core court features and optional LocalPlus subscriptions.
Plan availability, paid gates, launch rewards, and release readiness must be
verified against the app's latest approved decisions and runtime evidence.
An approved launch plan, open PR, screenshot, or passing build does not prove
that a feature is deployed.

## Run locally

Requires Node.js `>=22.13.0` (CI uses Node 24).

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Configure `MAPBOX_ACCESS_TOKEN`, `SUPABASE_URL`, and
`SUPABASE_PUBLISHABLE_KEY` in the ignored `.env.local`.
Without court-feed configuration the explorer falls back to the bundled catalog.
The optional heatmap server key and its read-only boundary are documented in
[the contributor workflow](docs/CONTRIBUTING.md). Never expose a secret in a
browser bundle.

## Court data

- `data/launch-courts.json`: historical bundled catalog and seed input.
- `data/launch-courts.csv` and `docs/data/localcheck-launch-courts.xlsx`:
  historical review/export artifacts, not a live inventory.
- `supabase/migrations/` and `supabase/seed.sql`: historical website catalog
  artifacts. They do not establish the current shared backend schema.
- `npm run data:seed` regenerates a local SQL file; it does not apply it.
  Applying a seed or migration to the shared backend requires separate approval.

The public name is never a detector number. `name` is the canonical venue
identity, `short_name` is its compact label, and `raw_source_name` is audit-only.

## Verification

```bash
npm run check:docs
npm run lint
npm test
git diff --check
```

`npm test` builds the Worker, validates the Sites artifact, and runs the Node
tests. CI runs the dependency-free documentation checks and existing court-stat/spotlight
unit tests, plus lint and the full build/test suite. Neither CI job deploys.

