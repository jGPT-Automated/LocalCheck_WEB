# Website contributor workflow

## Before changing a claim

Read [AGENTS.md](../AGENTS.md). Start from current website main and inspect open
PRs before creating a dedicated branch. Do not reuse an existing copy branch
without its owner's authorization.

For an app claim, use:

- [Approved app decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/product/DECISIONS.md)
  and the implementation at the same commit.
- [App current state](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/CURRENT_STATE.md)
  for recorded deployment/device evidence.
- [App release procedure](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/RELEASE.md)
  and [backend procedure](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/SUPABASE.md)
  when a claim depends on a binary, migration, or function.
- The newest approved PR decision when main's documents are stale. Record the
  PR, head SHA, decision ID, and any conflicting older text. Resolve conflicts
  with the latest dated decision and implementation; do not silently choose an
  old summary. Keep unresolved runtime questions explicit.

Record live observations with UTC date/time, URL, and response/source.
Compare `/`, `/courts`, `/api/courts`, `/llms.txt`, and the affected product,
FAQ, or legal route. Cached routes may disagree even when they share a loader.
A deployment's commit cannot be inferred from matching text.

Use these evidence labels in the PR:

- **Observed live:** fetched or exercised on the identified deployment/build.
- **Source-only:** implemented at a named commit; runtime unverified.
- **Approved launch:** agreed behavior with release prerequisites outstanding.
- **Blocked/unverified:** identify the missing evidence and exact next check.

## Data and local development

See [README.md](../README.md) for Node and setup commands.
The anonymous loader is [supabase-courts.ts](../app/courts/supabase-courts.ts).
It falls back to the historical bundled catalog on errors, missing configuration,
or an empty normalized feed. This can show archived/test-era venues even while
the live public feed is intentionally small. Document the fallback honestly;
changing its public behavior belongs in a separate reviewed change.

Court detail plans are read-only. `loadCourtPlannedTimes` optionally uses
`SUPABASE_SECRET_KEY` (or legacy `SUPABASE_SERVICE_ROLE_KEY`) on the server to
read the app's aggregate `court_planned_times` RPC; no key goes to the browser.
Without it the heatmap is unavailable. Do not obtain or change production
credentials to complete a documentation task.

Website migrations/seeds are historical artifacts. For the current shared
schema and visibility rules, consult the app sources. A local regeneration
command is not permission to apply SQL.

## Proportional verification

Documentation-only changes:

```bash
npm run check:docs
node --experimental-strip-types --test tests/court-stats.test.mjs tests/featured-courts.test.mjs
git diff --check
```

Website code, public copy, configuration affecting rendering, or dependency changes:

```bash
npm ci
npm run check:docs
npm run lint
npm test
git diff --check
```

The [documentation tests](../tests/documentation.test.mjs) check inline relative
file links and literal `npm run` commands in repository guidance. They do not
validate external links, fragments, app decisions, or deployment truth.
Existing unit tests validate stat calculation and spotlight selection;
rendered tests exercise the built Worker. CI runs documentation/unit checks and
the existing lint/build/test suite, without production credentials or deployment.

For public changes, inspect affected rendered routes and cross-surface wording.
Add a focused regression only for an objective failure: for example, rejecting
a contradictory no-purchase claim, or comparing counts using the same injected
court feed. Do not freeze changing product wording or seed totals in tests.
Live checks are separate and read-only; cached-route discrepancies require
deployment/cache investigation, not a hard-coded replacement number.

## PR and release

Use [the PR template](../.github/pull_request_template.md). Link before/after
passages, app authority, checks, and unresolved prerequisites. Update affected
guidance in the same PR; an unchanged-docs explanation must name what was checked.
CI cannot determine whether a product promise is approved.

Use `codex/docs-*` branches for documentation-only work. The
[Vercel branch rule](../vercel.json) prevents automatic deployments for these
branches; it does not disable other branches or manual deployments. Confirm no
preview was created. CI contains no publishing step, production secrets, or
database writes. No branch protection or required-check settings are changed
by this PR; maintainers can make the CI checks required after review.

Keep launch-sensitive copy in its own coordinated PR. Identify app merge,
backend, binary/device, billing/reward, legal effective-date, and website-release
prerequisites as applicable. Approval to review a PR is not approval to merge or
publish it.
