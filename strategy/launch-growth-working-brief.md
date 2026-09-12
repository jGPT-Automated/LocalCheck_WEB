# LocalCheck — Launch & Growth Working Brief

**Status:** Living strategy document  
**Last updated:** September 12, 2026

> Purpose: capture launch thinking, research findings, competitive lessons, open questions, experiments, and decisions without letting strategy work delay launch.

## Current thesis

LocalCheck should not try to win by having the largest-looking map or by being a generic sports social network. The wedge is **trusted local court activity**: verified places, real local players, credible scheduled activity, persistent competitive history, and a reason for a court community to keep using the product.

The product has two related but distinct opportunities:

- **Basketball:** weaker direct software competition, stronger founder knowledge, and existing warm launch pockets.
- **Pickleball:** stronger incumbent competition, but potentially stronger willingness to pay and established behavior around organized recurring play.

The immediate goal is not national breadth. It is proving that LocalCheck can make a small number of courts feel meaningfully more alive and useful than they were without it.

---

## 1. The density principle

A map with thousands of courts but no reliable activity is not the same product as a smaller set of courts where players trust what they see.

LocalCheck should optimize early for **court density and confidence**, not vanity coverage.

A successful launch court should answer:

1. Is this actually a playable court?
2. Who plays here?
3. When are people planning to play?
4. Can I trust that activity enough to show up?
5. Who are the strongest / most established players here?
6. What has happened at this court over time?

The strongest early metric is therefore not simply accounts or courts added. It is something closer to **activated courts**: courts with enough recurring local behavior that the product changes a player's decision about whether or when to go.

---

## 2. Court verification as a product primitive

Verification is not a badge applied later. It is the admission gate for user-added courts.

Proposed contribution flow:

**Go to court → drop immutable live-location pin → take live photo → AI confirms basketball/pickleball court → court enters database → contributor reward unlocks.**

The intent is to reduce contribution from a traditional submission/review workflow to seconds while preserving provenance.

Additional hygiene concept:

- Limit court-add attempts per account to reduce abuse.
- Preserve verification date/provenance.
- Periodically audit newly added courts against independent imagery/data sources.
- If a court is later removed or materially changed, users can submit fresh location-bound evidence and trigger a review/removal process.

The public court database and LocalCheck app should share this provenance model. The public data layer can become useful independently of whether someone has installed the app.

---

## 3. Pioneer mechanic

Adding a legitimate court should feel historically meaningful, not like filling out a database form.

### Local Pioneer

The person who first verifies a court becomes its **Local Pioneer**.

Their contribution should remain attached to the court's history. The presentation needs to feel permanent and prestigious rather than gimmicky.

Possible court-history language:

> Verified for the LocalCheck community by [player] · [date]

The underlying idea is powerful because the court persists while generations of players rotate through it. Years later, the first verified contributor is still part of that court's recorded history.

### Incentive concept

A successfully verified new court can immediately unlock a period of LocalPlus. Rate limits and verification gates matter because rewards should correspond to genuinely useful additions, not raw submissions.

A second incentive can reward **creating an actual community rather than merely creating a record**: bring enough genuinely active players onto that court and earn a substantially larger LocalPlus reward. Invited players can also receive an initial Plus period so the first cohort experiences the full product together.

Exact thresholds and anti-abuse rules remain to be finalized.

---

## 4. Local Legends and persistent court history

LocalCheck can capture something that currently lives mostly as oral history.

Players already say things like:

> "Back when I played here, I was the best player at this court."

A persistent match/ranking system makes that claim inspectable years later.

### Local Legend concept

At defined season/year boundaries, snapshot leaderboards and permanently recognize the top performers from that period.

A court history could eventually show:

- founding / verification date
- Local Pioneer
- historical #1 players
- seasonal Local Legends
- notable matches
- eras of highly active players
- changes in the local player population

This turns a court page from a location listing into a **record of the community that played there**.

It also creates a competitive loop: players seeking ranking gains have a reason to find and challenge stronger players rather than farming low-rated opponents. Cross-court player discovery then has natural paid value.

---

## 5. Scheduling: coordinate people, don't imply ownership

Public courts create a product-language problem: LocalCheck cannot promise that scheduling a session reserves physical space.

Avoid **Book Court** or **Reserve Court** unless LocalCheck actually controls inventory.

Prefer language such as **Schedule a session**, **Plan a run**, or equivalent sport-specific language.

The UI can communicate unobtrusively:

> Coordinates your group. Does not reserve the court.

The goal is to remove a false promise without adding enough warning friction to discourage scheduling.

More importantly, LocalCheck's advantage can become **confidence in activity**. If the people scheduling are members of the same recurring court community, the event is not an anonymous internet listing. Players recognize one another and build a reputation for showing up.

---

## 6. Why local identity matters

Do not build the social layer around a national feed of strangers.

The useful social graph is local:

**player ↔ court ↔ recurring players ↔ matches ↔ scheduled sessions**

People may be willing to check in, compete, banter, schedule, and build reputation when the audience is the same group they physically encounter at their court. That is materially different from asking them to post publicly to a broad sports network.

The court is the organizing object. The community grows around it.

---

## 7. Basketball vs. pickleball

Do **not** turn this into a pre-launch binary decision.

### Basketball advantages

- Strong founder/domain familiarity.
- Less obvious direct competition for the exact court-centric product.
- Existing warm pockets already provide a path to initial density.
- Ranking, head-to-head records, court reputation and one-on-one challenges fit basketball culture naturally.

### Pickleball advantages

- Strong recurring-play behavior.
- Players already use software to coordinate groups, games, leagues and skill-matched play.
- Potentially attractive paid-user economics should be tested rather than assumed.

### Pickleball disadvantage: the incumbent is real

Pickleheads cannot be dismissed as merely a court directory. As of 2026 it offers courts, games, groups, organizer tools, leagues, ladders, round robins and tournaments. USA Pickleball made it its official court/game finder in 2024 and expanded the relationship in 2026 by naming it an Official Technology Partner for Rec Play.

That means LocalCheck should **not** attack pickleball by reproducing Pickleheads feature-for-feature.

The differentiation to test is narrower:

**verified local place + trusted recurring local activity + persistent player/court identity + competitive history.**

### Launch decision

Launch both sports, but run them as **separate local experiments** rather than splitting effort evenly.

Use basketball as the fastest route to proving the core court-community loop. Use one concentrated pickleball pocket to test whether the same loop produces stronger retention or monetization.

Do not delay shipping while trying to determine theoretically which sport has the higher LTV. Let cohorts answer it.

---

## 8. Culture courts

Not all courts have equal distribution value.

Identify **culture courts**: places that carry disproportionate identity, competition, content, history or influence within their sport.

These courts matter because activating one can create more cultural legitimacy than adding dozens of low-activity locations.

Build a target list by city containing:

- court
- sport
- why it matters culturally
- recurring organizers / recognizable regulars
- creators who film there
- local leagues/groups
- current digital coordination method
- LocalCheck activation hypothesis
- warm introduction path

The objective is not merely "get this court on the map." It is **make LocalCheck part of what happens at this court.**

---

## 9. Creator / athlete partnership thesis

A particularly strong partner archetype is a creator whose existing content already expresses LocalCheck's product loop:

**travel to courts → identify strong local players → challenge them → establish who's best → draw a crowd → move to the next court.**

That creator does not need to awkwardly insert an unrelated sponsor. LocalCheck can become infrastructure for the content itself:

- find highly ranked players at the next court
- publish the challenge beforehand
- record the result
- update rankings
- leave behind an activated court community
- give viewers a way to follow that court after the video

This is much stronger than a generic paid shoutout.

### Partnership structure to explore

Do not lead with permanent equity before learning what the creator actually values.

Possible progression:

1. pilot one court/challenge activation
2. tracked creator/referral economics
3. performance-based revenue share or campaign fee
4. deeper ambassador/advisor relationship if the creator repeatedly drives activated courts and retained users
5. equity only if the relationship becomes strategically important enough to justify permanent dilution

The creator mentioned in current brainstorming needs to be positively identified before outreach research begins; do not guess from a partial name.

---

## 10. What competitor reviews are actually useful for

Negative reviews are not just competitive ammunition. They are **user research written by people who already understand the category**.

For every important competitor, maintain a pain-point ledger:

| Evidence | User job | Failure | LocalCheck implication | Product / GTM action |
|---|---|---|---|---|
| App review | coordinate play | workflow breaks / delays | reliability matters more than feature count | test exact failure path |
| App review | recruit local players | friends won't install | single-user utility must precede network density | strengthen court/public-data wedge |
| App review | find appropriate game | uncertain crowd/skill | confidence is core value | expose credible local activity |

One current Pickleheads review explicitly says the user's biggest difficulty is getting fellow players to install the app. Another complains about delayed DUPR updates and round-robin workflow limitations. Those are useful signals, but individual reviews are anecdotes, not market-size evidence.

---

## 11. Pickleheads: what must be respected

Verified current facts from Pickleheads / USA Pickleball research:

- Pickleheads became USA Pickleball's official court and game finder in April 2024.
- At that announcement, Pickleheads reported roughly 14,000 court listings, more than 60,000 crowdsourced edits, and access to USA Pickleball's network of 2,200 ambassadors for maintaining court/schedule data.
- In May 2026 the relationship expanded: Pickleheads became an Official Technology Partner for Rec Play, with USA Pickleball using its league software.
- Pickleheads currently markets court discovery, games, groups, leagues, ladders, round robins and tournaments—not just discovery.

Strategic conclusion: LocalCheck's pickleball story cannot simply be "our court finder is better." It needs a differentiated behavioral loop and a concentrated distribution strategy.

---

## 12. Public court data / AI discovery wedge

A public, crawlable court database can become an acquisition surface independent of the app.

The objective should be to make the source genuinely useful to humans and machines:

- stable canonical court pages
- precise coordinates
- sport/court attributes
- verification provenance/date where publishable
- structured data
- clean crawl/index behavior
- machine-readable documentation / APIs where useful
- an MCP interface if it materially improves agent access

The long-term acquisition hypothesis is:

**court query → trustworthy LocalCheck public answer → app value proposition: see the actual local community/activity around that court.**

Authority should be earned through useful data, third-party use, citations and backlinks—not manufactured through disguised independent endorsements.

---

## 13. The launch sequence

The product has been in development long enough that strategy work must now have a stopping rule.

### Phase A — Ship

Do not wait for national court density, a major creator partnership, the full historical-prestige system, or proof of which sport has the best LTV.

Launch the usable product and preserve the already-defined founding-user offer.

### Phase B — Activate a tiny number of courts

Concentrate on the warmest existing pockets rather than spreading users across a city.

For each launch court, personally drive:

**install → favorite/home court → first scheduled session → attendance → match/result → return session → invite.**

### Phase C — Run one pickleball cohort in parallel

Use the known Austin pickleball relationship/court as a concentrated test rather than attempting a broad pickleball launch.

Measure the same behaviors as basketball so the comparison is meaningful.

### Phase D — Creator pilot

Once the core loop survives ordinary users, approach a culture-setting basketball creator with a concrete activation concept—not "please promote my app."

The pitch should be a piece of content that LocalCheck makes better.

### Phase E — Expand only from dense nodes

When a court becomes self-sustaining, move to the next culturally connected court. Use Pioneers, invitations, creators and public court discovery to create adjacent nodes.

---

## 14. What to measure before changing direction

Keep the first dashboard brutally small:

- **Activated courts:** courts meeting a minimum recurring-activity definition.
- **Weekly active players per activated court.**
- **Scheduled-session reliability:** scheduled sessions that produce actual participation/activity.
- **Week-4 retention by court and sport.**
- **Invites → activated users**, not merely installs.
- **Matches/results per active player** for competitive communities.
- **Free → paid conversion** only after users have had enough density to experience the paid value.

Compare basketball and pickleball at the **court-cohort level**, not from anecdotes or raw signup totals.

---

## 15. Decisions vs. open questions

### Decisions / strong direction

- Court-centric rather than national-feed-centric.
- Verification is an admission gate for user-added courts.
- Court contribution should be radically low-friction.
- Reward useful contribution and community creation, not raw submissions.
- Scheduling coordinates players; it does not imply reservation rights at public courts.
- Preserve court history and make early/community contributions prestigious.
- Launch rather than waiting for every GTM question to be resolved.
- Basketball and pickleball should be tested as distinct cohorts inside the same core product.

### Open questions

- Exact definition of an **activated court**.
- Exact Local Pioneer visual treatment and permanence rules.
- Exact Local Legend cadence: season, year, or both.
- Exact reward thresholds / anti-abuse economics for adding and activating courts.
- Which culture courts to target first in Houston and Austin.
- Identity and fit of the traveling 1v1 basketball creator mentioned in brainstorming.
- Whether pickleball cohorts actually produce higher retention / willingness to pay than basketball cohorts.
- Which Pickleheads complaints are widespread enough to prioritize versus isolated anecdotes.

---

## 16. Immediate priority

**Do not redesign the launch around pickleball before launch.**

The next highest-value sequence is:

1. finish the launch-blocking product work;
2. activate the warm basketball courts already available;
3. activate the known Austin pickleball pocket as a deliberately comparable cohort;
4. capture baseline retention/activity data;
5. research and approach the strongest culture-setting creator with a court-activation pilot;
6. expand from whichever court nodes demonstrate repeat behavior.

The strategic question is no longer "basketball or pickleball?"

It is:

> **Can LocalCheck make one real court measurably more useful and culturally sticky—and then reproduce that node?**

If yes, sport prioritization becomes an allocation problem informed by real retention, activation and monetization data instead of a reason to postpone launch.
