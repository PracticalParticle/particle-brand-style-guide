# Particle Crypto Security LTD — Brand Guidelines

Pure monochrome design system: black, white, off-neutrals. No chromatic accent. Fits the angular, “signal-like” logo and an enterprise / AI-modern feel.

---

## Brand identity

Particle builds BloxChain Protocol — a compliance framework for regulated smart accounts. The brand is **serious, precise, system-level**: think Apple Pro / Linear / Vercel console, but fully achromatic.

---

## Color

**No chromatic brand.** Monochrome only:

- **Light**: Canvas #F6F7F9, surface #FFFFFF, surface-muted #F1F3F5. Text #0A0A0A, secondary #525252, muted #737373. Borders #E5E7EB / #404040 focus.
- **Dark**: Canvas #0B0C0E, surface #14161A, surface-muted #1B1E24. Text #FAFAFA, secondary #A3A3A3, muted #6B7280. Borders #2A2F36 / #A3A3A3 focus.

Primary actions are **strong contrast blocks**: black (#0A0A0A) in light, white in dark. Use `bg-btn-primary` and `text-text-inverse`.

---

## Hierarchy without color

- **Typography**: Size, weight, line-height. Headlines larger and semi-bold/bold; body regular, generous line-height.
- **Contrast**: Primary = solid black or white block; secondary = outline or ghost.
- **Elevation**: Cards/modals with subtle shadow and slightly different surface from page background.
- **Density**: Important areas denser and framed; secondary areas more whitespace.

---

## Shape language

- **Base**: Straight lines, diagonals, triangles from the logo.
- **Corners**: Structural (nav, sidebars) = straight. Interactive (buttons, inputs, cards) = 6–10px radius; optional **clipped corner** on primary CTAs.
- **Proportions**: Wide, low components (buttons, cards, rows) for a “system” feel.

---

## Logo & motif

The interlocking triangles define the language:

- **Logo**: Single source file `src/components/Logo/logo.svg` (viewBox, padding, stroke, currentColor). Use the `<Logo>` component or `downloadLogoSvg` / `getLogoSvgString` from `@/components/Logo`. Do not override width/height in the app — size via Tailwind classes only so theme and state don’t change how it looks.
- Use triangle pattern at **2–3% opacity** for hero/empty states.
- **Clipped corner** or small angled notch on primary CTAs or card headers.
- **Diagonal dividers** and triangle glyphs (caret, expand, warning) in line style, black/white.

---

## Buttons & states

- **Primary**: Black bg + white text (light); white bg + black text (dark). Hover: slight brightness + 1px lift. Active: pressed (1px down, shadow reduced).
- **Secondary**: Outline, hover fill with light grey (light) or dark grey (dark).
- **Disabled**: Lower opacity, no shadow, no motion.
- **Focus**: 2px neutral ring (black 60% in light, white 70% in dark). Class: `focus-ring`.

States must be clear via **thickness, shadow, and motion**, not color.

---

## Accessibility

- **Contrast**: Body text ≥ 4.5:1, large text and UI ≥ 3:1 (WCAG).
- **States**: Always combine contrast, shape, **icon**, and **text** (e.g. “Error” + icon). Never color-only.
- **Focus**: Visible outline; never `outline: none` without a replacement.
- **Motion**: Respect `prefers-reduced-motion`.

---

## Do's and don'ts

**Do**

- Use theme classes: `bg-canvas`, `bg-surface`, `text-primary`, `border-default`; `bg-btn-primary` for primary CTAs.
- Use `focus-ring` on all interactive elements.
- Test in both light and dark.
- Use icon + text for error/success/warning.

**Don't**

- Introduce chromatic accents (blue, green, red, etc.) in the core UI.
- Use pure black (#000) in dark mode (use #050509).
- Rely on color alone for state or meaning.
- Remove or weaken focus indicators.

---

## Implementation

- **Design tokens**: `src/styles/globals.css`, `tailwind.config.js`, `src/tokens/`
- **Components**: `src/components/` with Storybook
- **Logo**: `src/components/Logo/logo.svg` is the canonical logo. `Logo.tsx` uses it (no width/height overrides); `logoUtils.ts` uses it for export; `logoConstants.ts` holds path data and aspect ratio for animations only.
- **Docs**: [DESIGN_MANIFESTO.md](./DESIGN_MANIFESTO.md), [THEME_SYSTEM.md](./THEME_SYSTEM.md), [TRUST_PATTERNS.md](./TRUST_PATTERNS.md)
