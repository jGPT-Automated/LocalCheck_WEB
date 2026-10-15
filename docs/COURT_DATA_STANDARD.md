# LocalCheck court data standard

## Geographic resource
The source dataset makes locations discoverable. Preserve source ID, locality, state and normalized WGS84 coordinates. Locality is not a court name. Source records never generate standalone court pages. Do not invent names, addresses, hours, access or amenities.

Owner-provided provenance: web scraping plus Gemini satellite analysis/finding. Row-level sources and observation dates were not supplied. The manifest records this. Original latitude/longitude labels were reversed; the preparation script applies one documented transform and rejects invalid coordinates or duplicate IDs.

## Community courts
Only user-added/verified app courts receive standalone pages. Public selection excludes archived, test, deleted, private and explicitly unconfirmed records. Unknown activity stays null, distinct from zero. Source verification alone does not turn imported seeds into community courts.

Names and stable IDs come from the app. Do not auto-merge source rows by locality or coordinates. Directory membership, detail pages and sitemap share the public eligibility rule. Empty/error responses never restore the bundled seed catalog.

## Pioneers
Directory inclusion makes a location findable, not app-verified. A Pioneer verifies/adds the court and invites five people who each check in weekly for four weeks. Directory inclusion does not determine eligibility. This is settled; see [owner decisions](court-discovery-release.md).

## Historical catalog
The former 56-court/seven-market seed is historical, not the current public inventory. Seed files must not be restored as an outage fallback.
