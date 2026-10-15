# LocalCheck project guidance

## Start from project evidence

Read PRODUCT.md and DESIGN.md before changing UI or product messaging. For website work, read docs/design-references.md and choose the relevant reference pattern before implementation. Preserve the existing brand, truthful activity states, and real product screenshots.

## Reuse components and verify APIs

For component work, use the project skill at .agents/skills/shadcn/SKILL.md. Inspect components.json and components/ui before adding anything. Reuse existing components and variants; consult current documentation and registry examples before inventing APIs or writing a replacement control. Use shadcn MCP/CLI and Context7 when available.

This is an existing Radix-based shadcn project. Do not run a fresh init, change presets/base libraries, add every component, or replace DESIGN.md tokens as an incidental step. Add only needed components. Custom layout and LocalCheck domain logic are appropriate when existing primitives do not express them; explain that choice briefly.

Use existing Motion for motion and existing Mapbox code for maps. Prefer the configured Lucide icon family for new shared components. Check installed versions and preserve the Vinext/Vite/Cloudflare runtime; package scripts are authoritative.

## Design and review

The three reference roles are Kickbase for athletic composition, Playtomic for court discovery, and Strava for community/product evidence. Adapt patterns, not their assets, claims, or exact layouts. See docs/design-references.md for screenshots and limits.

Use the available impeccable skill for a focused design/critique/polish task when helpful, and vercel:react-best-practices for React work. Do not load several overlapping design workflows for every small edit. For UI review, use .agents/skills/web-design-guidelines/SKILL.md and fetch its current rules.

## Completion evidence

Check desktop and narrow layouts, keyboard focus/navigation, reduced motion, and appropriate loading/empty/error states in a real browser. Run relevant lint/build/tests from package.json and report actual results. Do not claim live activity, player counts, ratings, or verified results without their real data sources.

For substantive UI work, the handoff should state: reference pattern used; existing/library components reused; why any custom code was needed; and what was verified.

## Work budget

Use subagents only when useful and authorized. At most two, both GPT-6.1 Sol; never Astra. Prefer direct execution for small tasks. Keep significant research progress in firecrawl-skill-project/PROGRESS.md.

