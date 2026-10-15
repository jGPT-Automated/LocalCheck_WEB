# Court discovery release — settled decisions, 15 October 2026

## Product decision record (Jesse)
- The approximately 60k records are a public, LLM-findable and usable geographic resource. They make locations findable; they do not create app courts, grant Pioneer eligibility, or become standalone court pages.
- LocalCheck is primarily community and activity. Only user-added/verified app courts have standalone pages, with real public activity presented well.
- Pioneers verify/add a court and invite five people who each check in at least once per week for four weeks. Source-directory presence does not change this rule. Do not ask this again.
- The resource was assembled through web scraping and Gemini satellite analysis/finding (owner-provided provenance). Row-level sources and observation dates were not supplied; publish that limitation, not invented sources or verification dates.
- Website describes the final public release. LocalLite is free; LocalPlus is optional. Both Starter and Pioneer offers are approved. App Store destination is added on approval; do not reopen that question.
- Main deploys production. Deliver via a PR preview; do not merge automatically.

## Implementation checklist
- [x] Record settled decisions and Semrush baseline.
- [x] Normalize all source records; publish CSV/JSON with data dictionary and provenance.
- [x] Build national/state geographic resource with searchable, paginated HTML and links to every record.
- [x] Keep verified community pages separate; remove bundled seed fallback.
- [x] Polish court detail with Playtomic place/action hierarchy and Strava community/product evidence, using existing shadcn components and Mapbox.
- [x] Connect navigation, geographic sitemap, Dataset/Breadcrumb markup, llms.txt and app context.
- [ ] Validate data, routes, accessibility/responsive behavior and build; open preview PR.

## Semrush baseline
Reviewed browser dashboard and supplied screenshots on 15 October. Organic snapshot: US desktop, 14 October 2026, 196 ranking keywords; estimated traffic 0 (not measured analytics). Examples: “outdoor courts near me basketball” position 41 and “eden park basketball court” position 48, both targeting /courts. Position-change screenshot shows lost terms and beechwood courts dropping 50→75; it does not establish the cause.
Site Audit snapshot is older: 17 September 2026; 100-page crawl cap, JavaScript disabled. Health96%, AI health88%, 1error/184warnings; 91low-word-count pages, 93low-text/HTML, 91with one internal link, one DNS issue and missing llms.txt at that time. Current llms.txt already exists. Resolve actual content/navigation issues and rerun after deployment; do not claim old warnings are current or cured merely by code changes.

## Reference/component contract
- Playtomic https://playtomic.com: place-first discovery and obvious primary actions. Court detail: existing Badge/Button/Separator, existing Mapbox.
- Strava https://www.strava.com: actual community and product evidence. Court detail: existing Accordion/Button and real app screens; unknown activity distinct from zero.
- Kickbase https://us.kickbase.com/en-us: athletic type hierarchy. Preserve DESIGN.md tokens.
- Resource controls: official shadcn Input and Button; server-rendered GET search and normal link pagination. Custom code limited to data normalization, geographic lookup and page composition.
Reference captures and transfer notes: docs/design-references.md. No copied brand assets.

## Data contract
Stable source IDs, normalized WGS84 latitude/longitude; sport basketball inferred from supplied dataset label. Location is a locality label, not a court name. No invented address, opening hours, amenities, occupancy or source URL. Directory pages link to source-record anchors, not synthetic court-detail routes. App courts retain their own IDs and source of truth; no coordinate-only automatic merge.

## Verification evidence
- Build and artifact validation passed; TypeScript passed; lint passed after using the existing Next Image component for the app screen.
- 26 tests pass, including all 59,705 unique IDs, coordinate correction, source/community exclusion, geographic HTML and nearby API validation/distance ordering.
- Browser: directory search Conroe → eight locations; desktop and 390px layout inspected. Court detail uses a local-only fixture captured from the public API (Kasmiersky: 0 public check-ins, 3 locals), not a claimed production backend verification. The fixture is outside the repository.
- Third-party Semrush and AEO scores require a new crawl after deployment. No claim of achieved search rankings or AI citations.
