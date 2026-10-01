import assert from "node:assert/strict";
import test from "node:test";
import { deriveCourtStats } from "../lib/court-stats.ts";

test("derives mapped cities and sport totals from the court feed", () => {
  const stats = deriveCourtStats([
    { sport: "basketball", market: "Austin" },
    { sport: "pickleball", market: "Austin" },
    { sport: "basketball", market: "Houston" },
    { sport: "pickleball", market: "Denver" },
    { sport: "basketball", market: "" },
  ]);

  assert.deepEqual(stats, {
    total: 5,
    basketball: 3,
    pickleball: 2,
    markets: 3,
  });
});
