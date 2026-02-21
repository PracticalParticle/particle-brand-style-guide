# Theme System Documentation

## Overview

The Particle design system is **pure monochrome**: black, white, and off-neutrals only. No chromatic accents. Hierarchy comes from typography, contrast, elevation, and density. Depth is created through **light physics simulation** — rim lights, glass, shadows, and surface layering — not color.

Theme is implemented with **CSS variables** in `src/styles/globals.css` and mapped in `tailwind.config.js`. Dark mode uses the **class strategy** (add `dark` to the root element).

---

## Core Depth Philosophy

Light and dark modes require **different physics models** for depth to read correctly:

| Mechanism | Light Mode | Dark Mode |
|-----------|------------|-----------|
| **Primary elevation cue** | Drop shadow (sun from above) | Rim light: `inset 0 1px 0 white/7%` |
| **Glass border** | High opacity border (white bg = low contrast) | Low opacity white rim (dark bg = rim defines edge) |
| **Ambient shadow** | `0 8px 24px black/7%` | `0 8px 40px black/55%` |
| **Card top edge** | Faint dark veil (shadow from sun) | White rim (light source overhead) |
| **Hero gradient** | Radial vignette (bright center, dark edges) | Radial bloom (light source in darkness) |

Never apply the same shadow/rim values to both modes — each mode needs values calibrated for its lighting environment.

---

## Palette (clean enterprise monochrome)

Naming is **surfaces** (canvas / surface / surface-muted / elevated), **text** (primary / secondary / muted / inverse), **borders** (default / subtle / strong / focus), **brand** (monochrome only). No blue or chromatic primary.

### Light mode

| Token | Hex | Usage |
|-------|-----|--------|
| **Surfaces** | | |
| `bg-canvas` | #F6F7F9 | App background |
| `bg-surface` | #FFFFFF | Cards, panels |
| `bg-surface-muted` | #ECEEF1 | Hovers, subtle (wider step from canvas) |
| `bg-elevated` | #FFFFFF | Modals (shadow provides elevation) |
| **Text** | | |
| `text-primary` | #0A0A0A | Primary text |
| `text-secondary` | #525252 | Secondary |
| `text-muted` | #737373 | Muted |
| `text-inverse` | #FFFFFF | On dark blocks |
| **Borders** | | |
| `border-default` | #E5E7EB | Default |
| `border-subtle` | #F1F5F9 | Subtle |
| `border-strong` | #D1D5DB | Emphasis |
| `border-focus` | #404040 | Focus ring |

### Dark mode

| Token | Hex | Usage |
|-------|-----|--------|
| **Surfaces** | | |
| `bg-canvas` | #0B0C0E | App background — near-black, trace warmth |
| `bg-surface` | #14161A | Cards, panels |
| `bg-surface-muted` | #1B1E24 | Hovers |
| `bg-elevated` | #202430 | Modals, floating panels — cooler blue tint, clearly above surface-muted |
| **Text** | | |
| `text-primary` | #FAFAFA | Primary |
| `text-secondary` | #A3A3A3 | Secondary |
| `text-muted` | #6B7280 | Muted |
| **Borders** | | |
| `border-default` | #2A2F36 | Default |
| `border-subtle` | #1F242B | Subtle |
| `border-strong` | #3A414A | Strong |
| `border-focus` | #A3A3A3 | Focus |

### Surface layer hierarchy (dark mode)

```
bg-canvas    #0B0C0E  ← floor (deepest)
bg-surface   #14161A  ← content level (+9 RGB units)
bg-surface-muted #1B1E24  ← hover/subtle (+7 units) 
bg-elevated  #202430  ← floating: modals, panels (+~12 units, cooler blue tint)
```

Each step is perceptible. `bg-elevated` has a slight cool blue temperature shift — floating surfaces in a dark room appear cooler because they're closer to the (overhead) light source.

---

## Typography

- **Font**: Inter (400, 500, 600, 700) for all product UI. Mono: JetBrains Mono.
- **Scale**: xs 12px → 5xl 48px display.
- **Body**: line-height **≥ 1.5** (base and sm).
- **Headings**: Tighter line-height (snug/tight). Use `text-heading-1` … `text-heading-4`, `text-display-*`.
- **Display**: Bold (700), tight negative tracking (`-0.04em` at 5xl, `-0.055em` at clamp display).
- **Weights**: 400 (body), 500 (medium), 600 (semibold), 700 (bold). Avoid 300 and 900 in product UI.
- **Optical sizing**: `font-optical-sizing: auto` and `font-variation-settings` on all display classes.
- **Letter-spacing rule**: The larger the type, the tighter the tracking. Display = very tight. Body = 0. Labels/overlines = loose (`0.08em`).

---

## Buttons (monochrome)

- **Primary**: Black block (light) or white block (dark). `bg-btn-primary`, `text-text-inverse`. Hover: slight brightness + `hover:-translate-y-px`. Active: pressed (`translate-y-0`, shadow reduced). Uses `edge-highlight` for 1px top rim.
- **Secondary**: Outline (`border border-border`), fill on hover.
- **Danger**: Semantic error colors — `bg-error-light text-error`.
- **Focus**: 2px outline + 2px offset halo (neutral). Use class `focus-ring`.

---

## Focus

All interactive elements must have a **visible focus** style. Use the utility class **`focus-ring`**:

- **Light**: `0 0 0 2px rgba(0, 0, 0, 0.6)`
- **Dark**: `0 0 0 2px rgba(255, 255, 255, 0.7)`

---

## Motion

- **Durations**: `duration-fast` 120ms, `duration-normal` 180ms, `duration-slow` 200ms.
- **Easing**: `ease-out` / `cubic-bezier(0.4, 0, 0.2, 1)`. Brand entrance: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Respect** `prefers-reduced-motion` (handled in globals.css).

---

## Radius — Full Grammar

The system has a formal radius scale from sharp (structural authority) to pill:

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-structural` | `2px` | Nav, sidebar, table headers — system-level, sharp |
| `rounded-inset` | `4px` | Tags, inline badges, inset controls |
| `rounded-control` | `6px` | Buttons, inputs, checkboxes |
| `rounded-card` | `10px` | Cards, panels |
| `rounded-overlay` | `12px` | Modals, drawers — floating, slightly softer |
| `rounded-pill` | `9999px` | Pill shapes |

**Clip-corner accent** (logo-aligned): `clip-corner-tr` clips the top-right corner at 8px, directly echoing the logo's angular triangle geometry. Use on primary hero CTAs and featured card headers. Variants: `clip-corner-tr-sm` (5px), `clip-corner-tr-lg` (12px).

---

## Glass System

Glass is used for surfaces that **float above content**: nav, modals, action sheets, tooltips, floating panels. Content cards, forms, and tables use solid surfaces.

### Glass tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--glass-blur` | `18px` | `20px` | Stronger in dark — blur reads against bright backdrop |
| `--glass-bg-opacity` | `0.65` | `0.70` | Light more transparent — needs room for blur to show |
| `--glass-border-opacity` | `0.75` | `0.08` | Light: visible border. Dark: nearly invisible — rim light does the work |
| `--glass-saturate` | `1.6` | `2.0` | Compensates desaturation from blur |

### Glass box-shadow (light mode)
```
inset 0 1px 0 0 rgb(255 255 255 / 0.85)   /* bright rim — glass catching sky-light */
inset 0 -1px 0 0 rgb(0 0 0 / 0.04)         /* gravity edge */
0 2px 8px rgb(0 0 0 / 0.06)                /* contact shadow */
0 8px 24px rgb(0 0 0 / 0.07)              /* ambient depth */
```

### Glass box-shadow (dark mode)
```
inset 0 1px 0 0 rgb(255 255 255 / 0.07)   /* subtle white rim — single overhead light */
inset 0 -1px 0 0 rgb(0 0 0 / 0.25)         /* gravity edge */
0 2px 8px rgb(0 0 0 / 0.30)                /* contact shadow */
0 8px 40px rgb(0 0 0 / 0.55)             /* deep ambient — dark room depth */
```

### Dark mode glass background
Glass in dark mode uses `rgb(32 36 48 / 0.70)` — a **cool blue-tinted dark** instead of the standard surface color. This subtle temperature shift (cooler = higher, like macOS glass) makes floating panels feel physically elevated above the warm-neutral canvas.

### Glass usage rule
- One layer of glass per Z-level. Never stack two glass surfaces.
- Glass: nav, modals, action sheets, tooltips, popovers.
- Solid: content cards, forms, tables, main panels.

---

## Shadow System

### Shadow tokens

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-subtle` | `0 1px 2px / 0.04` | Flat cards, inline elements |
| `shadow-elevated` | `0 8px 30px / 0.08, 0 2px 8px / 0.04` | Raised cards |
| `shadow-modal` | `0 0 0 1px / 0.06, 0 4px 16px / 0.10, 0 24px 64px / 0.16` | Modals (light) |
| `shadow-modal-dark` | `0 0 0 1px white/7%, inset 0 1px white/7%, 0 4px 48px black/65%` | Modals (dark) |
| `shadow-card-featured` | `0 4px 16px / 0.10, 0 1px 4px / 0.06` | Featured/highlighted cards |

### Dark mode shadow principle
Drop shadows are effectively invisible on dark backgrounds (`rgb(0,0,0,0.08)` on `#0B0C0E`). In dark mode, elevation is communicated through:
1. **Rim light**: `inset 0 1px 0 0 rgb(255 255 255 / 0.07)` — the card's top edge catches the overhead light
2. **Outer ring**: `0 0 0 1px rgb(255 255 255 / 0.05–0.09)` — thin bright halo defines boundary against dark canvas
3. **Deep ambient**: `0 8px 40px rgb(0 0 0 / 0.55)` — large spread, dark, adds mass

Use `border-elevated` in dark mode (updated values) for this effect.

---

## Surfaces and Depth

When to use each surface type:

| Use case | Surface type | Class/Variant |
|----------|--------------|---------------|
| Content cards, forms, tables | **Solid** | `bg-bg-surface`, Card default/elevated/outlined |
| Nav, modals, action sheets, tooltips | **Glass** | `.surface-glass`, `.card-glass`, Card variant="glass" |
| Hero, marketing sections | **Gradient + pattern** | `.bg-gradient-radial-hero` + `.triangle-pattern-hero` |
| Cards on gradient backgrounds | **Glass or on-gradient** | Card variant="glass" or variant="on-gradient" |

### New gradient utilities

| Class | Usage |
|-------|-------|
| `.bg-gradient-radial-hero` | Signature Particle hero: radial bloom (dark) / vignette (light). Pair with `.triangle-pattern-hero`. |
| `.bg-gradient-canvas` | Subtle vertical depth for page backgrounds. |
| `.bg-gradient-hero` | Diagonal gradient for section headers. |
| `.bg-duotone-subtle` / `.bg-duotone-hero` | Diagonal duotone for feature sections. |

### Noise texture
`.texture-noise` adds imperceptible surface grain (SVG fractal noise, 3.5–4.5% opacity) that elevates monochrome surfaces from "flat digital" to "premium handcrafted." Use on hero sections and glass panels only.

### Card shine
`.card-shine` adds a directional light gradient to the top edge of cards:
- **Light mode**: faint dark veil (shadow cast from sun above) — `rgb(0 0 0 / 0.025)`
- **Dark mode**: white rim light (overhead light source) — `rgb(255 255 255 / 0.06)`

### Triangle pattern
`.triangle-pattern` and `.triangle-pattern-hero` use CSS variable `--triangle-opacity` / `--triangle-hero-opacity` for per-mode calibration:
- **Light**: 4% / 5% — needs higher opacity (dark text on near-white canvas)
- **Dark**: 2.5% / 3% — lower threshold (white on black reaches perception faster)

---

## Semantic color (restrained, enterprise)

Colored only for **status** (success, error, warning, info). No blue as brand.

- **Success**: Light `#166534` / `#DCFCE7`. Dark `#34D399` / `#064E3B`.
- **Error**: Light `#B91C1C` / `#FEE2E2`. Dark `#F87171` / `#4A0C0C`.
- **Warning**: Light `#B45309` / `#FEF3C7`. Dark `#FBBF24` / `#4A2209`.
- **Info**: Neutral tone. Light `#374151` / `#F3F4F6`. Dark `#9CA3AF` / `#1F2937`.

Use with **icon + text**. Classes: `text-success`, `bg-success-light`, `border-error`, etc.

---

## Accessibility

- All new effects respect **prefers-reduced-motion** (animations collapse to near-zero).
- All new effects respect **prefers-reduced-transparency** (glass → solid fallback).
- Contrast: body text ≥ 4.5:1, large text and UI ≥ 3:1 (WCAG 2.1 AA).

---

## Implementation

- **Tokens**: `src/styles/globals.css` (CSS variables), `tailwind.config.js` (Tailwind mappings).
- **Components**: `src/components/` — use `bg-canvas`, `bg-surface`, `text-primary`, `border-default`, `focus-ring`, `bg-btn-primary` for primary actions. Use `surface-glass` for Modal and ActionSheet.
- **Legacy aliases**: `bg-bg-primary`, `text-text-primary`, `border-border` still work; prefer new semantic names.
