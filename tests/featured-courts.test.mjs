import assert from "node:assert/strict";
import test from "node:test";
import { selectFeaturedCourts } from "../lib/featured-courts.ts";

const court = (slug, sport, localCount, liveCount, priority = 0, verified = true) => ({
  slug,
  sport,
  localCount,
  liveCount,
  priority,
  verified,
});

test("selects the verified court with the most locals in each sport", () => {
  const featured = selectFeaturedCourts([
    court("basketball-low", "basketball", 3, 9),
    court("pickleball-high", "pickleball", 11, 0),
    court("basketball-high", "basketball", 12, 1),
    court("pickleball-low", "pickleball", 2, 8),
    court("unverified", "basketball", 99, 99, 0, false),
  ]);

  assert.equal(featured.basketball?.slug, "basketball-high");
  assert.equal(featured.pickleball?.slug, "pickleball-high");
});

test("breaks equal-local ties with live presence, launch priority, then name", () => {
  const featured = selectFeaturedCourts([
    court("basketball-a", "basketball", 5, 1, 1),
    court("basketball-b", "basketball", 5, 3, 1),
    court("pickleball-z", "pickleball", 0, 0, 5),
    court("pickleball-a", "pickleball", 0, 0, 5),
  ]);

  assert.equal(featured.basketball?.slug, "basketball-b");
  assert.equal(featured.pickleball?.slug, "pickleball-a");
});

test("keeps unavailable locals distinct from an observed zero and leaves missing sports empty", () => {
  const featured = selectFeaturedCourts([
    court("unknown", "basketball", null, 9),
    court("observed-zero", "basketball", 0, 0),
  ]);

  assert.equal(featured.basketball?.slug, "observed-zero");
  assert.equal(featured.pickleball, null);
});
