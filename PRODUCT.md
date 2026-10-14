# Website product guidance

## Purpose and audience

The public website helps basketball and pickleball players understand LocalCheck
and browse public court information before opening the iOS app. It explains court
discovery, planned attendance, live check-ins, scheduled play, and reviewed
competition. The app and shared backend own player actions and durable state;
the website is a read-only presentation of public data and app information.

## Product authority

The app's [product decisions](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/product/DECISIONS.md)
define approved intent; its [current state](https://github.com/jGPT-Automated/LocalCheck_Expo/blob/main/docs/CURRENT_STATE.md)
records release evidence. Follow newer approved app PR decisions when these
files on main lag behind. See [the contributor workflow](docs/CONTRIBUTING.md)
and [dated audit](docs/audits/2026-10-14-documentation.md) for that distinction.

Do not maintain another app roadmap, billing contract, or launch-reward history
here. Verify subscription periods, free/paid feature boundaries, Starter/Pioneer
qualification and fulfillment, privacy, and check-in behavior in the app sources
before changing any public promise. Free core features and optional LocalPlus
can coexist; a free download does not mean there are no purchases.

## Voice and presentation

Athletic, local, and truthful. Write plainly and show product screens at a useful
scale. Follow [DESIGN.md](DESIGN.md). Avoid generic SaaS copy, decorative glass,
invented ratings, testimonials, or court activity.

1. Clearly distinguish planned attendance, public presence, scheduled play, and
   finalized results.
2. Treat screenshots as evidence for their captured version, not proof of the
   current installed app. Review their captions when behavior changes.
3. Public coverage comes from the current anonymous feed; the historical bundled
   catalog is not the app's available inventory.
4. Court spotlights follow [the selection helper](lib/featured-courts.ts):
   verified courts ranked by local count (unknown below known), then live
   presence, priority, and slug. Leave missing sports empty.
5. Public global standings need a privacy-safe feed of reviewed results. Preserve
   the honest unavailable state until that feed is ready.
6. Do not advertise live remaining Starter spots or earned benefits without a
   verified fulfillment source.

## Accessibility

Target WCAG 2.2 AA contrast and keyboard behavior. Respect reduced motion,
do not rely on color alone, maintain 44px touch targets, and keep copy readable
at narrow widths.

