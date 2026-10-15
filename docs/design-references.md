# LocalCheck: three references and a focused development toolkit

Reviewed October 13, 2026. Scope: research and agent setup; no website redesign or dependency changes.

**Recommended combination:** Kickbase’s athletic composition + Playtomic’s practical court-discovery journey + Strava’s connection between real sport and app evidence. Preserve LocalCheck’s existing PRODUCT.md and DESIGN.md.

All three live homepages were read and visually inspected in the browser. Firecrawl supplied discovery/page content and the captures below. Desktop inspection only; these are design references, not full accessibility or mobile audits. Captures use signed URLs that can expire; the source links and notes remain useful, and a future agent can recapture the same URLs. Firecrawl’s separate session may show a cookie notice or a different animation frame.

## 1. Kickbase — Visual direction

[Open website](https://us.kickbase.com/en-us)

Oversized condensed/italic headline, dark field, one orange accent, readable phone presentation, and a single download action. Closest visual fit for LocalCheck’s existing Night Game Field Guide direction.

**Use for LocalCheck:** Use a strong headline plus one real LocalCheck phone screen. Build chapter transitions around live presence, planned runs, and reviewed results. Keep LocalCheck’s own typography and tokens.

**Adapt carefully:** Do not copy their MLS imagery, award badges, February promotion, competitive taunting, or scarcity claims. The main domain redirected to this US page; Curated’s preview may depict a different revision.

![Kickbase desktop capture](https://storage.googleapis.com/firecrawl-scrape-media/screenshot-7c91d653-5fd3-47de-8a4d-7bc5958aee94.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1792548690&Signature=Zzoq1wTuWnUufZQ5pcLU1OrlOdhU9Q9J415%2BOJ6pgAgGXx0S%2F3YDDY8GcCXMcc%2FO4o3IA0AyX0d2e0s25TqBssVGgz4OwGAiy%2FgCx%2B5Xdz2FHMaJ0cirW0HqxHGqu9xzrGSkuEYQ7KFB5379l%2FEToaKIv6VDcT8hsp7%2BAENRLiQscD%2Fah6tDY%2B03wQo%2FTgZt0K%2BvpNPxIYs2UAxP%2FSwcLTrrI4tC80QjEyMruCH8srSLUUpzBuWDo9TYieUSSxya96cLTm%2Fh0LfIen7AJv8dCpsz%2B%2F14%2FI1i%2Fl8pccGotlBtIObrTsACrr%2BN%2BOtBED4yHMn%2FTpk3UNe5EQaNo9iw1A%3D%3D)

## 2. Playtomic — Court discovery and explanation

[Open website](https://playtomic.com)

The hero leads with finding courts and players, a prominent location search, and real people on court. The page connects venue discovery to finding matches and using the app.

**Use for LocalCheck:** Make Explore courts immediately useful. Pair court identity with verified location and honest activity state. Explain Find a court → Check in/plan → Join a run with real app screens.

**Adapt carefully:** Do not imply LocalCheck supports paid reservations or copy their blue/lime palette, testimonials, or global scale. LocalCheck’s live check-ins and planned attendance must remain distinct.

![Playtomic desktop capture](https://storage.googleapis.com/firecrawl-scrape-media/screenshot-185a76aa-9417-48dd-8a7e-735ec3226175.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1792548700&Signature=WB7TdjHCCCrLGd5Gz1WjKJ0rgODjfUwxxFPBlm6qJ3l7sQ7DD3rfxVyC%2F8QimJ1NAF37U4kjTQbElAu6vD9d2pBbgZowDIm7BRsyjoxDByD7RSoBSrRG3a8Q21gCaQMZJbybfPa6koP3bMpiX8oCb3f04sCqRZdE2b9cRoZLqgkrgjQAaJCFgiIed2D%2B6NVPpalVJs1W0SEq5gQpmfNKWCOTwLN%2BT10OqFJvyebNetFMU3MT%2FC%2ByrP6herzV%2B2hFCqu9aUc5c4knFok%2F5h%2FnJYOqENXgdNYziwxzxgcDJaRMek2bmimeoWsgsKJiqP%2FUN44%2BC9ARGTm%2BGprxgjjchA%3D%3D)

## 3. Strava — Community value and product evidence

[Open website](https://www.strava.com)

Real sporting photography frames a concise community promise, with visible phone/watch UI and a clearly emphasized primary conversion action. The inspected public homepage is conversion-led.

**Use for LocalCheck:** Connect actual court life to LocalCheck’s map/check-in screens. Explain the benefit of community before listing features; retain a clear primary action and a secondary product walkthrough.

**Adapt carefully:** Do not import their user-count claims, authentication choices, or exact signup-first layout. LocalCheck visitors should understand court availability and the app before being asked to commit.

![Strava desktop capture](https://storage.googleapis.com/firecrawl-scrape-media/screenshot-1728e6e6-e735-4d54-8514-2bad40ac7245.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1792548712&Signature=kCrARq974SBliVSE%2Fyg4Lwj57Li6GqJdZufDoV%2FqNsnRQeFp7IPW90GuWrFoDW2qeAAGEPQBCzMOvRIRZDDhYE5MvoF5XZelJqySyHaO62wbY2fgfB4bYQz8gI%2F1ILss5ISKtVgrFgd%2BuvmAgqffhQqlVNGyyYkdEGt26vSr5wU92v8qpb1O6lgnPGGKMguNNrTuxVoN7JyPjmszGlbIk3ylO0aSZsiVOFSBOV8cyBQz5XTdP1zJpPNVhUHu%2FyzC94XezCZL9epWK8gUoVF%2B1Rt4vdX%2Fx58pFFPiEL4cLxbJ4jAKskVzwoYj2C0Qr3LufSABYB3aTSS8PljGQEtU4Q%3D%3D)

## Skills and tools attached to this project

| Skill / tool | State | Purpose |
| --- | --- | --- |
| Official shadcn skill | Installed at .agents/skills/shadcn | Inspect existing components; search registries; read docs/examples; compose accessible primitives; review imports and variants |
| Vercel Web Interface Guidelines | Installed at .agents/skills/web-design-guidelines | Review keyboard behavior, semantics, focus, forms, motion, and general web UI quality against current guidelines |
| impeccable | Already available in this Codex environment | Use shape/critique/polish as needed, grounded in PRODUCT.md and DESIGN.md |
| vercel:react-best-practices | Already available in this Codex environment | React composition, render behavior, bundle size, loading/data boundaries |
| browser-use:browser / Playwright | Already available | Verify actual responsive behavior, keyboard navigation, and core interactions |
| Firecrawl + shadcn MCP + Context7 | Connected tools, not extra skill installs | Find references, retrieve registry examples, and verify current library APIs |

Use one design workflow at a time. Adding several overlapping frontend generators would add conflicting defaults. These two new skills fill specific gaps and bring their upstream supporting files with them.

Sources: [shadcn skill](https://github.com/shadcn-ui/ui/tree/main/skills/shadcn), [Vercel review skill](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines). Inspected the actual SKILL.md files before installing; preserved upstream contents. Installed from main on the date above; no immutable commit was pinned. The skill catalog at [skills.sh](https://skills.sh) and Firecrawl developer search were discovery aids, not substitutes for source review.

## Reference-led implementation workflow

1. Read PRODUCT.md, DESIGN.md, this document, and the affected code. Identify the actual user task and existing behavior.
2. Name the reference pattern being adapted and the specific LocalCheck screen/content it serves. Decide what to keep from the existing design.
3. Inspect components/ui and components.json. Reuse installed Button, Sheet, Tabs, Accordion, Badge, Tooltip and Separator where appropriate. Read component docs before adding another primitive.
4. Use the configured Radix-based shadcn system, Tailwind tokens, existing Motion dependency, and Mapbox implementation. Keep custom code for LocalCheck-specific composition and domain behavior. Do not reinitialize the app, switch component bases, or overwrite brand tokens as a side effect of adding a component.
5. Show real screenshots from app-store-submission/screenshots. Keep live presence, planned intent and reviewed results semantically distinct. No fabricated social proof or activity.
6. Verify the result at narrow and desktop widths, with keyboard navigation, reduced motion and meaningful empty/error states. Run checks appropriate to the edit: npm run lint, npm run build, and npm test for relevant behavior changes. This project uses Vinext/Vite and Cloudflare; inspect its scripts rather than assuming a conventional Next.js deployment.
7. Report the reference used, component reused, custom code rationale, and validation result.

## Simple Firecrawl workflow demonstrated

Curated sports search → reject off-topic hits → get the selected site’s detail/live URL → inspect live pages → capture screenshots → write specific transfer notes. Known direct sources filled the court-discovery and community roles. Firecrawl developer search → inspect official skill source → check existing stack → install only missing skills → attach a project guide.

The broader Firecrawl skill is still unfinished. These two small workflows have now produced a usable project handoff without requiring an autonomous research job or a Codex subagent.

