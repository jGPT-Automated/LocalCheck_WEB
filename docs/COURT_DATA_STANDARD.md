# LocalCheck court data standard

The public court name is an identity, not a row number. Every launch court has
two human-readable names and keeps machine provenance in separate fields.

## Naming convention

| Field | Purpose | Example |
| --- | --- | --- |
| `name` | Canonical, source-backed facility or court name | `West 4th Street Courts` |
| `short_name` | Compact Explore-card label or well-known alias | `The Cage` |
| `slug` | Stable URL/import key, prefixed by market and sport | `new-york-city-basketball-the-cage` |
| `raw_source_name` | Original imported label for audit only | `Court 440055116` |

Short names follow this order:

1. Use an established cultural alias when it is unambiguous (`The Cage`).
2. Otherwise keep the distinctive facility name and remove generic suffixes
   such as “Recreation Center,” “Basketball Courts,” or “Pickleball Courts.”
3. For an unnamed satellite detection, use a shortened street label plus the
   sport (`W 155th Court`).
4. Never display a detector ID, database UUID, or sequential number as a name.

Canonical names are used on detail pages and for search. Short names are used
on map cards and markers. Both remain searchable.

## Verification and provenance

`source_verified` means a court/facility and its address were confirmed by an
official, venue, community, or editorial source. Basketball rows also retain
the nearest record from the original satellite-detection CSV as QA metadata;
distance bands are evidence for review, not proof that the source venue and
detection are the same object. Pickleball rows are source-verified independently
because the original detection run did not cover that sport.

## Launch scope

The MVP catalog contains 56 courts: four basketball and four pickleball venues
in each of New York City, Washington DC, Miami, Los Angeles, Houston, Austin,
and Denver. Access is explicit (`public_free`, `public_paid`, or
`private_paid`) so a polished map never implies that every venue is free.

