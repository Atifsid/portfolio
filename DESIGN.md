---
name: Atif Siddiqui
description: A clean engineer portfolio where the projects are small working exhibits in quiet frames.
colors:
  ground: "#0f0f10"
  surface: "#161618"
  surface-raised: "#1d1d20"
  hairline: "#27272b"
  ink: "#ededee"
  muted: "#a1a1a7"
  faint: "#818189"
  live: "#4cc38a"
  ground-light: "#fbfbfa"
  surface-light: "#f3f3f1"
  surface-raised-light: "#e9e9e6"
  hairline-light: "#e0e0dc"
  ink-light: "#161618"
  muted-light: "#55555c"
  faint-light: "#6c6c73"
  live-light: "#1a8a55"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.6
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  data:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "tnum"
  data-label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  sm: "6px"
  md: "8px"
  frame: "12px"
  full: "999px"
spacing:
  gutter: "20px"
  caption-gap: "16px"
  heading-gap: "20px"
  exhibit-gap: "80px"
  section-gap: "112px"
  column: "720px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-primary-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  button-quiet:
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
  button-icon:
    textColor: "{colors.muted}"
    rounded: "{rounded.full}"
    size: "32px"
  input-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  exhibit-frame:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.frame}"
  exhibit-node:
    backgroundColor: "{colors.surface-raised}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  data-row:
    backgroundColor: "{colors.surface-raised}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  status-dot:
    backgroundColor: "{colors.live}"
    rounded: "{rounded.full}"
    size: "6px"
---

# Design System: Atif Siddiqui

## Overview

**Creative North Star: "The Working Bench"**

An engineer's portfolio played straight, in the register of rauno.me, paco.me and brittanychiang.com. One narrow left-aligned column (720px) on a near-black ground. Nothing is decorated; the work itself is the visual. Each major project is a small working exhibit inside a quiet 12px frame that runs while it is on screen and responds to input, with a plain caption underneath.

The palette is a neutral grey ramp with a single green reserved for status. Type is Geist Sans for everything a person reads and Geist Mono only for things a machine would print. Depth comes from one or two tonal surface steps and hairline borders, not shadows. A light theme exists via toggle and is the same token set inverted, not a second identity.

Density is relaxed between sections and tight inside exhibits: generous vertical gaps (80 to 112px) frame compact, 13px-scale instrument panels.

**Key Characteristics:**
- Single 720px column, left-aligned, 20px gutters.
- Near-black ground (not pure black), off-white ink, two muted greys, hairline dividers.
- No accent colour; green appears only as a status dot.
- Geist Sans throughout; Geist Mono strictly for real data.
- Exhibits in 12px frames, live only while in view, fully static under reduced motion.
- Dark by default, light by toggle, same tokens.

## Colors

A restrained neutral ramp with one functional green; colour never carries decoration.

### Primary
- **Off-White Ink** (`ink`): headings, names, active values inside exhibits, and the fill of the primary button (with ground-coloured text). In light theme it becomes the near-black `ink-light`.

### Secondary
- **Status Green** (`live`, `live-light` in light theme): the 6px status dot only. Used beside the live clock (with a soft pulse ring), beside the current role's date, and as the success dot in the SMTP result.

### Neutral
- **Near-Black Ground** (`ground`): page and scrollbar track background; text colour on ink-filled buttons.
- **Soft Surface** (`surface`): the exhibit frame fill and the cursor preview card.
- **Raised Surface** (`surface-raised`): nodes, rows, inputs and log panes inside an exhibit; the second and last tonal step.
- **Hairline** (`hairline`): 1px borders and list dividers; skeleton bars.
- **Muted Grey** (`muted`): body paragraphs, descriptions, nav links at rest.
- **Faint Grey** (`faint`): captions, stack lines, meta, dt labels, icons, link underline colour. Holds roughly 5:1 on the ground in both themes.

### Named Rules
**The Green Is a Signal Rule.** `live` is used only on status dots. Never on text, links, buttons, borders, or fills larger than a dot.

**The Two-Step Surface Rule.** Ground, surface, raised surface: three levels, no more. A new container picks one of these; it never invents a tint.

**The Inverted Twin Rule.** Every colour has a light-theme twin under `:root[data-theme="light"]`. New tokens ship in pairs or not at all.

## Typography

**Display Font:** Geist (with system-ui, sans-serif)
**Body Font:** Geist (with system-ui, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace, monospace), tabular numerals

**Character:** One humanist-neutral sans doing every job through weight (400 and 500 only) and grey value, with a mono that reads as instrument output.

### Hierarchy
- **Display** (500, clamp(1.5rem, 4vw, 2rem), 1.25, -0.02em): the footer contact line only. There is no visible hero headline; the page h1 is screen-reader only.
- **Headline** (500, 17px, -0.01em): section headings ("More work", "Experience", "Skills"), optionally followed by a 400-weight faint aside on the same line.
- **Title** (500, 15px): exhibit titles, index row titles, role names, the name in the header.
- **Body** (400, 15px, 1.6): paragraphs in `muted`, capped at 56 to 64ch.
- **Caption** (400, 13px, Geist Sans, `faint`): exhibit meta and notes, index stack lines, node labels, helper text inside exhibits.
- **Data** (400, 12px Geist Mono): protocol lines, dates, the clock.
- **Data label** (400, 11px Geist Mono, `faint`): pane labels and sub-lines inside exhibits (endpoints, record counts, order ids).

### Named Rules
**The Mono Means Machine Rule.** Geist Mono only for real data: ids, protocol lines, dates, the clock, pane data labels. Captions, stack lines and prose stay in Geist Sans, even when they look technical.

**The Two Weights Rule.** 400 and 500. No bold, no light, no uppercase, no letterspaced labels.

## Layout

One centred 720px column with 20px side padding; content is left-aligned within it. The header sits 40px (48px from sm) from the top, the intro paragraph 56px (80px) below it, and the first exhibit follows immediately at full column width. Exhibits are separated by 80px; the two smaller exhibits sit side by side from md (24px gap) and stack below. Later sections open 112px apart, headings sit 20px above their content, and the footer starts 128px down behind a hairline.

Lists (work index, experience) are full-width rows between hairlines: title left, faint meta right on a baseline grid, collapsing to a stacked description on mobile. Skills use a 10rem label column from sm. Exhibit internals use 16 to 20px padding (28px horizontal for the gateway flow) and 6 to 10px gaps.

## Elevation & Depth

Flat. Depth is tonal (ground, surface, raised surface) plus 1px hairlines. No glows, no gradients.

### Shadow Vocabulary
- **Floating preview** (`box-shadow: 0 12px 32px -12px rgba(0,0,0,0.5)`): only on the cursor-following screenshot card in the work index, the one element that floats above content.
- **Live pulse** (`box-shadow` ring of `live` at 55% expanding to 6px, 2.4s ease-out): animation on the clock's status dot only.

### Named Rules
**The Flat Page Rule.** Nothing at rest has a shadow. Only things that literally float over content (the preview card) may have one.

## Shapes

Soft, small corners that scale with container size: 12px for exhibit frames, 8px for primary buttons, nodes and the preview card, 6px for inputs, rows and small buttons, full rounding for dots, the switch and the icon button. Borders are always 1px `hairline`, brightening to `faint` on hover; the one dashed border is the gateway's in-transit slot. Experience bullets use an 8px hairline dash instead of a dot.

## Components

### Buttons
- **Shape:** gently rounded (8px primary, 6px compact).
- **Primary:** ink fill, ground text, 14px medium, 8px 16px padding ("Copy email"); compact variant 13px at 6px 12px inside exhibits ("Verify").
- **Hover / Focus:** opacity to 0.85, press scales to 0.98; focus is a 2px ink outline offset 3px. Copy confirmation swaps label with a 4px vertical slide.
- **Quiet:** transparent, 1px hairline border, muted 13px text; border and text step up to faint/ink on hover; disabled at 40% opacity.
- **Icon:** 32px circle, hairline border, muted 14px stroke icon (theme toggle).

### Inputs / Fields
- **Style:** raised surface, 1px hairline, 6px radius, Geist Mono 13px ink text with ink caret.
- **Focus:** border shifts to faint; global focus-visible outline applies.
- **Error:** a 13px muted message below, wired with aria-invalid; no red.

### Switch
- 36 x 20px pill with hairline border; on is ink fill with a ground-coloured knob at right, off is raised surface with a faint knob; 300ms ease-out slide.

### Navigation
- Header: name (500, ink) and " · role at Localwell" (muted) over the live clock; right side holds 14px muted section links that turn ink on hover, then the theme toggle. Wraps on narrow screens; no mobile menu.

### Exhibit (signature)
- A 12px-radius frame (surface fill, hairline border, overflow clipped) holding a working piece of a project, captioned beneath with a 500 title (external-link icon when linked), a muted description, and right-aligned faint 13px meta and provenance note ("sample data", "simulated session"). Exhibits tick only while intersecting the viewport, never loop off-screen, and render a meaningful static state under prefers-reduced-motion.

### Index Row
- Hairline-divided rows; hovering the list dims all rows to faint and lifts the hovered one to ink with a 6px indent (300ms ease-out). On mouse pointers a 320px preview card follows the cursor via a 0.5s eased follow.

### Disclosure Row (Experience)
- Full-width button row: role (500) · company (muted), mono date at right with a plus icon that rotates 45 degrees when open. Body expands with a 0.45s expo-out height and opacity tween, instant under reduced motion.

## Do's and Don'ts

### Do:
- **Do** put new work inside the exhibit frame (12px radius, surface, hairline) with a caption below, not a thumbnail card.
- **Do** keep `live` green on 6px status dots only.
- **Do** set captions and stack lines in Geist Sans 13px `faint`, and reserve Geist Mono for ids, protocol lines, dates, the clock and pane data labels.
- **Do** use 17px medium for section headings, with an optional faint aside.
- **Do** run exhibit motion only while in view, with short exponential ease-out (cubic-bezier(0.16, 1, 0.3, 1)), and provide a static reduced-motion state.
- **Do** ship every new colour with its light-theme twin.
- **Do** label sample or simulated data in the exhibit note.

### Don't:
- **Don't** add an accent colour, gradients, or glow shadows.
- **Don't** use pure black (#000) for the ground.
- **Don't** use a centred hero over a row of equal cards.
- **Don't** add eyebrows, kickers, uppercase letterspaced labels, or bold weights.
- **Don't** set prose, captions or stack lists in mono to make them look technical.
- **Don't** let any animation loop while its exhibit is off-screen.
