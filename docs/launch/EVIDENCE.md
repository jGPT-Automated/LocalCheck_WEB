# Evidence and open-work register
Inspected October 24, 2026 through GitHub. Repository reads are current snapshots; historic docs and PR claims are not live-service verification.

## Source map
| Source | Authority/use | Limitation |
|---|---|---|
| [Mobile main](https://github.com/agenticjess-star/LocalCheck_Expo/tree/main) | Current checked-in app source | Not proof of deployed build |
| [Mobile PROJECT_STATE](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/docs/PROJECT_STATE.md) | Historical technical context, dated June 30 | Calls main a demo and foundation unmerged; current main has AuthContext and backend services |
| [Mobile APP_STORE_READINESS](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/docs/APP_STORE_READINESS.md) | Historical milestone/checklist structure | June scope and checkboxes need revalidation |
| [Mobile README](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/README.md) | Demo design and feature reference | AsyncStorage-first description is incomplete against current code |
| [BACKEND_STATUS](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/docs/BACKEND_STATUS.md) | Historical only | Explicitly superseded |
| [Web PRODUCT](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/main/PRODUCT.md) | Product promises, trust rules and launch offers | Describes intended features, not proof they work |
| [Web README](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/main/README.md) | Web/data setup; reports 56-court launch catalog | Different scope from historical mobile DB totals |
| [Growth working brief](https://github.com/jGPT-Automated/LocalCheck_WEB/blob/main/strategy/launch-growth-working-brief.md) | September 12 strategy, distribution, metrics and open questions | Strategy and historical research, not current readiness |

## Code observations
[AppContext](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/artifacts/mobile/context/AppContext.tsx) imports Supabase-facing court/check-in/friend/profile services, derives current user from auth, and initializes sample courts, runs and feed. Thus neither “entirely local demo” nor “fully production ready” is supported. Fallback and demo exposure need runtime verification.
[app.json](https://github.com/agenticjess-star/LocalCheck_Expo/blob/main/artifacts/mobile/app.json) contains bundle ID com.realjess.localcheck and usesAppleSignIn; slug remains mobile. No eas.json appeared in the inspected main tree. Open PR #3 proposes EAS configuration. This does not establish whether an external build already exists.

Inspected main tree SHAs:
- Mobile: 6b7434303ef84e9bf6110f671f379272b333689c
- Web: 529b7fbd2e6870a682bd2a8e5bf45b22c37c16ae

## Open PR inventory
This is inventory, not merge advice. Review relevance, overlap, dependencies and verification against the selected candidate first. Open issue searches returned no standalone open issues in either repository; open PRs were fetched separately.

| PR | Work | Interpretation |
|---|---|---|
| [LocalCheck_WEB #26](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/26) | Add SessionStart hook for cloud sessions | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #25](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/25) | Add unlisted /growth SEO and AEO handoff | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #24](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/24) | Add court discovery data resource and polish community pages | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #22](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/22) | Align website copy with the launch app contract | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #21](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/21) | Fix canonical court discovery and improve SEO rendering and image performance | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #5](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/5) | Use app court data and prepare website launch pages | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #3](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/3) | Animate the LocalCheck landing hero with a Remotion-style scroll timeline | Open; not evidence of shipped behavior |
| [LocalCheck_WEB #2](https://github.com/jGPT-Automated/LocalCheck_WEB/pull/2) | Add live court weather and shared planning heatmap | Open; not evidence of shipped behavior |
| [LocalCheck_Expo #6](https://github.com/agenticjess-star/LocalCheck_Expo/pull/6) | Add 'improve' advisor skill, audit playbook, and 3 mobile improvement plans | Open; not evidence of shipped behavior |
| [LocalCheck_Expo #3](https://github.com/agenticjess-star/LocalCheck_Expo/pull/3) | Stage 3 groundwork: EAS setup, applied seed, auth/profile hardening, social service | Open; not evidence of shipped behavior |

## Unverified external state
Latest Expo/EAS and TestFlight builds; App Store Connect listing/review status; production backend schema and policies; production website deployment; subscription products/entitlements; founder's other threads, business commitments, budget and contributors. Historical row counts, applied migrations and passed-test statements remain attributed to their source until rechecked.

## Evidence entry format
Date; environment; repository commit/build; exact journey/check; observed outcome; evidence URL; owner; follow-up. Use Verified / Source-reported / Proposed / Unknown. Never carry a historical green checkbox forward without checking its relevance.
