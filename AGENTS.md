# LocalCheck website contributor contract

This repository owns the public website, not the player app or its backend.
Read [README.md](README.md), [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md), and the
relevant [product](PRODUCT.md), [design](DESIGN.md), or
[court-data](docs/COURT_DATA_STANDARD.md) guidance before editing.

## Ground claims before writing them

- App behavior and approved intent:
  [app decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/product/DECISIONS.md).
- Release/runtime checkpoint:
  [app current state](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/CURRENT_STATE.md).
- Follow the relevant app PR when newer approved decisions have not reached
  main. Check its latest head and implementation; newer decisions supersede
  older wording. Link the exact app commit and decision in the website PR.
- Compare website main, the actual live route, and open website PRs. Preserve
  other contributors' branches. The [dated audit](docs/audits/2026-10-14-documentation.md)
  records PR #22 and app PR #67 as inspected, not permanent release truth.
- Label evidence as observed live, source-only, approved for launch, or blocked.
  Source presence and screenshots alone are not deployment evidence.
- Count only the current public court feed. Keep fallback, archived, and test
  inventory distinct. Do not fabricate presence, players, rankings, or rewards.
- Check related claims together: page copy, FAQ, metadata, legal pages,
  structured data, `/llms.txt`, and screenshots. Changes to pricing, entitlements,
  privacy, check-in guarantees, and launch offers require launch coordination.

## Keep documentation small and current

Update affected documentation in the same PR as a durable website change,
or explain specifically why it is unchanged. Every PR includes documentation
impact, linked evidence, validation, and release status using the
[PR template](.github/pull_request_template.md).
Keep the app's decision history and backend runbooks in the app repository;
link them here instead of copying them. Historical research is not authority
for current behavior. A dated audit is evidence for that date, not a new ledger.

## Work and release boundaries

Use a dedicated branch from current main; inspect status before changing files.
Do not force-push, merge someone else's PR, or overwrite another task's work.
Keep repository documentation fixes separate from coordinated public copy.

Opening a PR may trigger a hosting preview. For documentation-only work, use a
`codex/docs-*` branch: [vercel.json](vercel.json) disables automatic Vercel
deployments for that pattern. Verify the branch's deployment/check status.
For any other branch, obtain deployment authorization before a push that would
publish a preview. Do not publish through Sites as part of ordinary verification.

Merging, publishing, deployment, app-repository changes, and shared Supabase
writes require explicit task authorization. Build/test commands are local checks,
not release approval. Use proportional checks in
[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md), report failures or unavailable
checks accurately, and end with the PR and evidence links.
