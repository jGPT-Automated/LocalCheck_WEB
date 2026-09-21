---
name: LocalCheck
description: Live courts, planned runs, and reviewed local competition.
colors:
  signal-orange: "#fc4c02"
  signal-orange-bright: "#ff641e"
  court-night: "#0d0d10"
  heather-black: "#151519"
  raised-graphite: "#1e1e26"
  court-card: "#24242c"
  chalk-paper: "#f0efeb"
  chalk-ink: "#151519"
  line-white: "#f2f2f61f"
  muted-steel: "#9a9aaa"
typography:
  display:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(3.5rem, 9vw, 9rem)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 450
    lineHeight: 1.65
  label:
    fontFamily: "Inter Variable, Inter, Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  action: "3px"
  control: "8px"
  surface: "20px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.court-night}"
    rounded: "{rounded.action}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.heather-black}"
    textColor: "{colors.chalk-paper}"
    rounded: "{rounded.action}"
    padding: "16px 24px"
---

# Design System: LocalCheck

## Overview

**Creative North Star: "Night Game Field Guide"**

LocalCheck combines the urgency of a live scoreboard with the clarity of a field guide. Dark topographic surfaces establish place and atmosphere; signal orange is reserved for action, live state, and decisive emphasis. Warm chalk-paper sections create tactical breaks where complex ideas can be taught without making the page feel like a dark-mode wall.

The system rejects generic SaaS composition, fabricated social proof, decorative glass, and interchangeable icon-card grids. Product screens carry the narrative. Each section gets one dominant idea and enough negative space to make that idea legible.

**Key Characteristics:**

- Condensed, forceful display typography paired with quiet interface copy.
- Near-black tonal layering rather than ornamental shadows.
- Signal orange used as live energy and action, never as ambient decoration.
- Real app screens shown at useful scale.
- Alternating cinematic dark chapters and warm tactical explanations.

## Colors

The palette is a night court under warm lights: graphite blacks, chalk-white type, and one unmistakable orange signal.

### Primary

- **Signal Orange** (`#fc4c02`): Primary actions, active states, live indicators, and short emphasis.
- **Signal Orange Bright** (`#ff641e`): Hover, focus-adjacent emphasis, and small high-contrast labels.

### Neutral

- **Court Night** (`#0d0d10`): Primary dark background.
- **Heather Black** (`#151519`): Section and inset surface.
- **Raised Graphite** (`#1e1e26`): Interactive or lifted product surface.
- **Court Card** (`#24242c`): Dense UI surface.
- **Chalk Paper** (`#f0efeb`): Warm light chapter background.
- **Muted Steel** (`#9a9aaa`): Secondary copy.

**The Live Signal Rule.** Orange means action, live presence, selection, or the one phrase that must win the scan. It is not filler.

## Typography

**Display Font:** Oswald (with Arial Narrow fallback)
**Body Font:** Inter Variable (with system sans fallback)

**Character:** Oswald supplies athletic compression and poster force. Inter carries explanations, labels, and controls without competing with the product screens.

### Hierarchy

- **Display** (600, `clamp(3.5rem, 9vw, 9rem)`, `0.88`): Hero and chapter headlines.
- **Headline** (600, `clamp(2.5rem, 5vw, 5.5rem)`, `0.95`): Feature statements.
- **Title** (600, `1.5rem`, `1.1`): Component and explainer titles.
- **Body** (450, `1rem`, `1.65`): Explanatory copy, capped near 68 characters.
- **Label** (700, `0.75rem`, `0.14em`, uppercase): Navigation, chapter markers, and state labels.

**The Poster-and-Manual Rule.** Headlines feel like a court poster; explanation reads like a clear rulebook.

## Elevation

The system is flat by default. Depth comes from tonal layering, overlap, cropping, and the physical silhouette of phone screens. Shadows are reserved for product devices and active controls, where they communicate real stacking.

**The Structural Depth Rule.** If removing a shadow breaks the hierarchy, fix the layout before strengthening the shadow.

## Components

### Buttons

- **Shape:** Compact 3px radius.
- **Primary:** Signal orange, dark text, uppercase label, 16px by 24px padding.
- **Hover / Focus:** Brighten to `#ff641e`, translate upward 2px, use a 2px visible focus outline.
- **Secondary:** Transparent or heather-black with a low-contrast full border.

### Chips

- **Style:** Small uppercase label, 1px full border, compact 8px radius.
- **State:** Active uses orange; inactive stays graphite and muted.

### Cards / Containers

- **Corner Style:** 20px only where the content is truly a discrete object, such as a phone stage or data explainer.
- **Background:** Dark tonal surfaces or chalk paper, never decorative blur.
- **Border:** One-pixel full perimeter line.
- **Internal Padding:** 24px on compact surfaces, 48px on feature surfaces.

### Inputs / Fields

- **Style:** Raised graphite, one-pixel line, 8px radius.
- **Focus:** Orange border plus visible outline.

### Navigation

Uppercase labels, generous spacing, and one clear orange action. Mobile navigation uses an accessible sheet rather than an improvised floating panel.

### Phone Stage

Real app screenshots sit inside a reusable device shell. Cropping and overlap may vary by chapter, but screens remain readable and never become tiny decorative thumbnails.

## Do's and Don'ts

### Do:

- **Do** show real product screens at a scale where interface structure is legible.
- **Do** give the heatmap, score review, and Elo model full explanations.
- **Do** use orange for live state, selection, and action.
- **Do** respect reduced motion and keyboard navigation.
- **Do** let chapters change topology while keeping one visual voice.

### Don't:

- **Don't** turn LocalCheck into a generic productivity SaaS page or an endless feature-card grid.
- **Don't** use purple gradients, gradient text, glassmorphism, or decorative 3D blobs.
- **Don't** fabricate player counts, ratings, testimonials, or activity.
- **Don't** use a colored side stripe greater than 1px as a card accent.
- **Don't** shrink app screens into ornamental phone confetti.
