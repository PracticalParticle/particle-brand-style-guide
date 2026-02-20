# Theme System Documentation

## Overview

The Particle design system is **pure monochrome**: black, white, and off-neutrals only. No chromatic accents. Hierarchy comes from typography, contrast, elevation, and density. See [DESIGN_MANIFESTO.md](./DESIGN_MANIFESTO.md).

Theme is implemented with **CSS variables** in `src/styles/globals.css` and mapped in `tailwind.config.js`. Dark mode uses the **class strategy** (add `dark` to the root element).

---

## Palette (clean enterprise monochrome)

Naming is **surfaces** (canvas / surface / surface-muted / elevated), **text** (primary / secondary / muted / inverse), **borders** (default / subtle / strong / focus), **brand** (monochrome only). No blue or chromatic primary.

### Light mode

| Token | Hex | Usage |
|-------|-----|--------|
| **Surfaces** | | |
| `bg-canvas` | #F6F7F9 | App background |
| `bg-surface` | #FFFFFF | Cards, panels |
| `bg-surface-muted` | #F1F3F5 | Hovers, subtle |
| `bg-elevated` | #FFFFFF | Modals |
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
| `bg-canvas` | #0B0C0E | App background |
| `bg-surface` | #14161A | Cards, panels |
| `bg-surface-muted` | #1B1E24 | Hovers |
| `bg-elevated` | #191C22 | Modals |
| **Text** | | |
| `text-primary` | #FAFAFA | Primary |
| `text-secondary` | #A3A3A3 | Secondary |
| `text-muted` | #6B7280 | Muted |
| **Borders** | | |
| `border-default` | #2A2F36 | Default |
| `border-subtle` | #1F242B | Subtle |
| `border-strong` | #3A414A | Strong |
| `border-focus` | #A3A3A3 | Focus |

---

## Typography

Aligned with brand vision: **strong hierarchy**, **generous line-height for body**, **no ultra-thin or black weights** in UI.

- **Font**: Inter (400, 500, 600, 700). Mono: JetBrains Mono.
- **Scale**: xs 12px, sm 14px, base 16px, lg 18px, xl 20px, 2xl 24px, 3xl 30px, 4xl 36px.
- **Body**: line-height **≥ 1.5** (base and sm). Use `text-body`, `text-body-secondary`.
- **Headings**: Tighter line-height (snug/tight). Use `text-heading-1` … `text-heading-4`, `text-display-*`.
- **Weights**: 400 (body), 500 (medium), 600 (semibold), 700 (bold). Avoid 300 and 900 in product UI.
- **Display**: Bold (700), not extrabold, for a calmer enterprise feel.

---

## Buttons (monochrome)

- **Primary**: Black block (light) or white block (dark). Use `bg-btn-primary`, `text-text-inverse`. Brand: `#0A0A0A` / `#141414` / `#1E1E1E` (light); white in dark. Hover: slight brightness + 1px lift. Active: pressed (shadow down).
- **Secondary**: Outline (`border border-border`), fill on hover with `bg-surface-muted` or legacy `bg-bg-tertiary`.
- **Danger**: Neutral emphasis — `border-2 border-strong`, icon + “Error”/“Delete” text. No red.
- **Focus**: 2px outline + 2px offset halo (neutral). Use class `focus-ring`.

---

## Focus

All interactive elements must have a **visible focus** style. Use the utility class **`focus-ring`**, which applies:

- **Light**: `0 0 0 2px rgba(0, 0, 0, 0.6)`
- **Dark**: `0 0 0 2px rgba(255, 255, 255, 0.7)`

No brand color; focus is neutral for monochrome authority.

---

## Motion

- **Durations**: `duration-fast` 120ms, `duration-normal` 180ms, `duration-slow` 200ms.
- **Easing**: `ease-out` / `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Respect** `prefers-reduced-motion` (handled in globals.css).

---

## Radius & elevation

- **Radius**: Cards/panels `rounded-card` (10px), controls `rounded-control` (6px).
- **Shadow**: `shadow-subtle`, `shadow-elevated` for cards; no chromatic glow.

---

## Semantic color (restrained, enterprise)

Colored only for **status** (success, error, warning, info). No blue as brand.

- **Success**: Light `#166534` / `#DCFCE7`. Dark `#34D399` / `#064E3B`. `bg-success`, `bg-success-light`, `text-success`.
- **Error**: Light `#B91C1C` / `#FEE2E2`. Dark `#F87171` / `#4A0C0C`. `bg-error`, `text-error`.
- **Warning**: Light `#B45309` / `#FEF3C7`. Dark `#FBBF24` / `#4A2209`. `bg-warning`, `text-warning`.
- **Info**: Neutral tone (no blue brand). Light `#374151` / `#F3F4F6`. Dark `#9CA3AF` / `#1F2937`. `bg-info`, `text-info`.

Use with **icon + text**. Classes: `text-success`, `bg-success-light`, `border-error`, etc.

---

## Implementation

- **Tokens**: `src/tokens/colors.ts`, `src/styles/globals.css` (vars: `--color-bg-canvas`, `--color-text-primary`, `--color-border-default`, `--color-brand-primary`, etc.)
- **Tailwind**: `tailwind.config.js` — `bg.canvas`, `bg.surface`, `text.primary`, `border.default`, `brand.primary`, `btn.primary`. Legacy: `bg.primary`/`bg-secondary`/`bg.tertiary` map to same values.
- **Components**: Prefer `bg-canvas`, `bg-surface`, `text-primary`, `border-default`, `focus-ring`, `bg-btn-primary` for primary actions. Legacy `bg-bg-primary`, `text-text-primary`, `border-border` still work.
