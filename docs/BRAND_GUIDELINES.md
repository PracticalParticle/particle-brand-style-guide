# Particle Crypto Security LTD — Brand Guidelines

Pure monochrome design system: black, white, off-neutrals. No chromatic accent. Hierarchy comes from typography, contrast, elevation, and **light physics** (glass, rim lights, shadows). Fits the angular, "signal-like" logo and an enterprise / AI-modern feel.

---

## Brand identity

Particle builds BloxChain Protocol — a compliance framework for regulated smart accounts. The brand is **serious, precise, system-level**: think Apple Pro / Linear / Vercel console, but fully achromatic and architecturally distinct through depth, glass, and surface layering.

---

## Color

**No chromatic brand.** Monochrome only:

- **Light**: Canvas #F6F7F9, surface #FFFFFF, surface-muted #ECEEF1. Text #0A0A0A, secondary #525252, muted #737373. Borders #E5E7EB / #404040 focus.
- **Dark**: Canvas #0B0C0E, surface #14161A, surface-muted #1B1E24. Elevated #202430 (cool blue-tinted). Text #FAFAFA, secondary #A3A3A3, muted #6B7280. Borders #2A2F36 / #A3A3A3 focus.

Primary actions are **strong contrast blocks**: black (#0A0A0A) in light, white in dark. Use `bg-btn-primary` and `text-text-inverse`.

---

## Multidimensional Depth (No Color)

The brand differentiates through **light physics**, not color. Each surface has a physical position in the scene — floor, table, floating — communicated through:

### 1. Rim lights
Every elevated surface has a 1px top-edge highlight simulating a light source above:
- Light mode: `inset 0 1px 0 0 rgb(0 0 0 / 0.05)` — faint shadow from overhead sun
- Dark mode: `inset 0 1px 0 0 rgb(255 255 255 / 0.07)` — white rim catching overhead artificial light
Class: `edge-highlight`. Also used on glass panels and primary buttons.

### 2. Glass surfaces
Glass panels simulate frosted physical glass — blurred, slightly translucent, with rim light and ambient shadow. Values are mode-calibrated because the physics differ:
- Light: `backdrop-blur(18px) saturate(1.6)`, strong white rim, soft drop shadow
- Dark: `backdrop-blur(20px) saturate(2.0)`, subtle white rim, deep ambient shadow (`0 8px 40px black/55%`)
Dark glass uses a **cool blue-tinted background** (`rgb(32 36 48 / 0.70)`) — floating surfaces in a dark room appear cooler/lighter because they're closer to the overhead light source.

### 3. Noise texture
`.texture-noise` adds imperceptible SVG fractal noise (3.5–4.5% opacity) to hero sections and glass panels. This is imperceptible consciously but strongly perceived as "premium handcrafted" vs "flat digital." Use on hero backgrounds and marketing glass panels only.

### 4. Directional gradients
- **Radial hero** (`.bg-gradient-radial-hero`): Light = bright center fading to vignette. Dark = radial bloom from top-center. This is the Particle signature hero moment — pair with `.triangle-pattern-hero`.
- **Card shine** (`.card-shine`): Top-edge directional light per mode. Light = dark veil (shadow from sun). Dark = white rim (overhead light).

---

## Hierarchy without color

- **Typography**: Size, weight, line-height, letter-spacing. Headlines larger, bold, very tight tracking; body regular, generous line-height.
- **Contrast**: Primary = solid black or white block; secondary = outline or ghost.
- **Elevation**: Cards/modals with shadow (light) or rim light (dark) and slightly different surface from page background.
- **Density**: Important areas denser and framed; secondary areas more whitespace.

---

## Shape language

- **Base**: Straight lines, diagonals, triangles from the logo.
- **Corners — full radius grammar**:
  - Structural (nav, sidebars, table headers): `rounded-structural` (2px) — sharp, system authority
  - Interactive controls (buttons, inputs): `rounded-control` (6px) — slightly softened
  - Content cards, panels: `rounded-card` (10px) — balanced
  - Floating overlays (modals, drawers): `rounded-overlay` (12px) — slightly softer, matches floating feel
  - Pills (tags, filter chips): `rounded-pill` (9999px)
- **Clipped corner**: `clip-corner-tr` clips the top-right corner at 8px, directly echoing the logo's interlocking triangle geometry. Use on primary hero CTAs and featured card headers. This is the Particle signature angular accent.
- **Proportions**: Wide, low components (buttons, cards, rows) for a "system" feel.

---

## Logo & motif

The interlocking triangles define the brand language:

- **Logo**: Single source file `src/components/Logo/logo.svg`. Use the `<Logo>` component or `downloadLogoSvg` / `getLogoSvgString` from `@/components/Logo`. Do not override width/height in the app — size via Tailwind classes only.
- **Triangle pattern**: `.triangle-pattern` (20px scale) or `.triangle-pattern-hero` (40px scale). Triangle opacity is mode-calibrated: light 4%/5%, dark 2.5%/3%.
- **Radial hero gradient**: `.bg-gradient-radial-hero` — the Particle hero signature. Combines with `.triangle-pattern-hero` for the full brand moment.
- **Signal line**: `.signal-line` — 45° diagonal accent strip (logo-aligned) for dividers.
- **Clipped corner**: `clip-corner-tr` / `clip-corner-tr-sm` / `clip-corner-tr-lg` — angular top-right CTA accent.
- **Diagonal dividers** and triangle glyphs (caret, expand, warning) in line style.

---

## Surfaces and depth

| Use case | Surface type | Examples |
|----------|--------------|----------|
| Content cards, forms, tables | **Solid** | `bg-bg-surface`, Card default/elevated/outlined |
| Nav, modals, action sheets, tooltips | **Glass** | `.surface-glass`, `.card-glass`, Card variant="glass", Modal, ActionSheet |
| Hero, marketing sections, intro | **Gradient + pattern + noise** | `.bg-gradient-radial-hero` + `.triangle-pattern-hero` + `.texture-noise` |
| Cards on gradient backgrounds | **Glass or on-gradient** | Card variant="glass" (lighter), variant="on-gradient" (more readable) |
| Translucent stacking | **Layer opacities** | `bg-bg-surface/95`, `opacity-layer-overlay` |

All effects respect **prefers-reduced-transparency** (glass → solid) and **prefers-reduced-motion**.

---

## Buttons & states

- **Primary**: Black bg + white text (light); white bg + black text (dark). Hover: brightness + 1px lift. Active: pressed (1px down, shadow reduced). Has `edge-highlight` rim.
- **Secondary**: Outline, hover fill.
- **Disabled**: Lower opacity, no shadow, no motion.
- **Focus**: 2px neutral ring. Class: `focus-ring`.

States must be clear via **thickness, shadow, and motion**, not color.

---

## Accessibility

- **Contrast**: Body text ≥ 4.5:1, large text and UI ≥ 3:1 (WCAG 2.1 AA).
- **States**: Always combine contrast, shape, **icon**, and **text** (e.g. "Error" + icon). Never color-only.
- **Focus**: Visible outline; never `outline: none` without a replacement.
- **Motion**: Respect `prefers-reduced-motion`.
- **Transparency**: Respect `prefers-reduced-transparency` (glass → solid).

---

## Do's and don'ts

**Do**

- Use theme classes: `bg-canvas`, `bg-surface`, `text-primary`, `border-default`; `bg-btn-primary` for primary CTAs.
- Use `focus-ring` on all interactive elements.
- Test in both light and dark.
- Use icon + text for error/success/warning.
- Use `surface-glass` for floating/overlay surfaces (nav, modals, sheets).
- Use `rounded-structural` for nav/sidebar/table headers, `rounded-control` for inputs/buttons.
- Use `.clip-corner-tr` for primary hero CTAs to echo the logo geometry.
- Use `.bg-gradient-radial-hero` + `.triangle-pattern-hero` for hero sections.
- Add `.texture-noise` to hero sections and marketing glass panels.

**Don't**

- Introduce chromatic accents (blue, green, red, etc.) in the core UI.
- Use pure black (#000) in dark mode (use #0B0C0E).
- Rely on color alone for state or meaning.
- Remove or weaken focus indicators.
- Stack two glass surfaces on the same Z-level.
- Use `edge-highlight` on flat/inline elements (only elevated surfaces).
- Use `.texture-noise` on form controls, tables, or dense data views.

---

## Single source of truth

This system is the single source of truth for:
- **Product applications** — use components and Tailwind tokens
- **Marketing websites** — use gradient + pattern + noise hero system
- **Social media content** — use radial hero gradient, logo motifs, triangle patterns, and monochrome depth effects at brand scale
- **Documentation and design specs** — see `THEME_SYSTEM.md` for full token reference

All surfaces, shadows, and effects are defined once as CSS variables and consumed everywhere through Tailwind utility classes and component APIs.

---

## Implementation

- **Design tokens**: `src/styles/globals.css`, `tailwind.config.js`
- **Components**: `src/components/` with Storybook
- **Logo**: `src/components/Logo/logo.svg` canonical. `Logo.tsx` renders it. `logoUtils.ts` for export.
- **Docs**: [THEME_SYSTEM.md](./THEME_SYSTEM.md), [COMPONENT_UPDATE_PLAN.md](./COMPONENT_UPDATE_PLAN.md)
