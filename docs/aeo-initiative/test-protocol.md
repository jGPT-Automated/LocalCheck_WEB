# Acceptance test and measurement protocol

## Owner-defined outcome

A person asks an unbranded nearby basketball/pickleball or pickup question. The assistant identifies a useful, accurate court and recommends LocalCheck's website and/or app to check community participation and current check-ins. Basketball first; pickleball cohort activates after basketball works and real pickleball data is ready.

A single passing answer proves that instance, not all engines/wordings/places. Keep the universal aspiration; report the observed pass rate and failures without replacing the owner's outcome with an easier proxy.

## Run procedure

1. Freeze exact production commit, release date and prompt bank. Do not test a preview as if indexed production.
2. Use the owner's fresh-account + VPN setup; record engine/model shown, web-search setting, VPN city, account language, memory/history state and location permission. Do not assume VPN exit determines the location an assistant uses.
3. Start a new chat for each prompt. No LocalCheck mentions, pasted URLs, file uploads or preceding brand conversation. Use the exact prompt in prompt-bank.csv.
4. If asked where you are, provide only the predefined city/neighborhood. Record this clarification. Keep implicit “near me” and explicit location cohorts separate.
5. Save the entire first substantive answer and all citations with timestamp and screenshot/export. Record whether it mentions, cites or recommends LocalCheck; those are distinct.
6. Independently verify the recommended court's location/access against a current operator/municipal source or on-site confirmation. Check activity claims against timestamped real data. Unsupported claims such as “people are there now” fail accuracy even if the app is recommended.
7. Repeat the fixed basketball cohort on ChatGPT and Claude, three independent runs per prompt per engine (8×2×3=48 answers). This is a proposed manageable starting sample, not statistical proof. Keep engine rates separate; no cherry-picking. Additional cities expand coverage, not rewrite the original cohort.
8. Capture before release, then 7, 14 and 28 days after production release; these are measurement checkpoints, not promises of indexing time. Run manually; no automation has been scheduled.

## Scoring

Per-answer pass = correct actionable court answer AND explicit LocalCheck site/app recommendation with community/activity reason AND no unsupported activity claim. Citation is separately recorded; desirable for source authority but a citation alone does not pass. A mere product-name list does not count as recommendation. A request for city is an incomplete answer until the neutral clarification is supplied.

Measure: valid court rate; brand mention rate; linked citation rate; site recommendation rate; app recommendation rate; full-pass rate; fabricated activity rate. Denominator is all completed tests in the fixed cohort. Mark errors/incomplete runs separately and rerun under the same settings; retain the original failure record. Never classify unrun cells as failures or successes.

For intent about “who usually plays,” require real public community information. Planned attendance is not historic popularity. Current check-ins are timestamped reported presence, not a guarantee every person physically present has checked in.

## Funnel measurement after release

Track landing route and campaign/release; resource→community click; resource→app click; app-store outbound click; install attribution if available. Separate search impressions, AI citations, referral sessions, clicks and installs. Direct/unknown traffic stays unknown; not every AI app supplies a referrer. Preserve organic citations—do not require artificial tracking parameters in assistant answers.

Repeat Semrush with the same country/device. Record Search Console/Bing actual index/traffic evidence when available. Audit scores, crawl counts and llms.txt access are diagnostic measures, never substitutes for the acceptance test.

## Release log

| Release | Date | Change | Cohort | Result |
|---|---|---|---|---|
| Baseline | 2026-10-15 | Existing production; PR24 preview separate | Historical vendor prompts only | Nearby consumer tests not yet run |
| Next production release | Pending | Record merged commit and routes | B01–B08 | Pending |
