# Particle Design System — Design Manifesto

**Pure monochrome. Black, white, off-neutrals. Enterprise SaaS with an AI/OS feel.**

---

## Positioning

- **Achromatic only** — No chromatic accents. Black, white, and a deliberate neutral scale create depth and hierarchy.
- **Enterprise / control-panel** — Think Apple Pro, Linear, Vercel console: sober, minimal, precise. “System-level” control, not flashy app UI.
- **Logo-led** — The interlocking triangles define the visual language: clipped corners, diagonal dividers, triangle glyphs. Shape and structure are the brand.
- **High signal, low noise** — Typography, contrast, elevation, and density do the work. No color to lean on.

---

## Palette

**Light**

- Base background: **#F5F5F7** (soft off-white).
- Pure surfaces (cards, modals, sheets): **#FFFFFF**.
- Text primary: **#050509**. Muted: **#6B7280**.
- Borders: **#E5E7EB**. Depth: **#F3F4F6**, **#E5E7EB**.

**Dark**

- Base background: **#050509** or **#050608** (near-black, low blue).
- Text primary: **#F9FAFB**. Muted: **#9CA3AF**.
- Borders: **#1F2933**. Depth: **#111827**, **#1F2937**, **#374151**.

Optional: very subtle warm or cool neutrals so it doesn’t feel sterile—still read as grey.

---

## Hierarchy Without Color

- **Typography**: Headlines larger, semi-bold/bold; body regular, generous line-height.
- **Contrast**: Primary actions = strong blocks (black on off-white, or white on near-black). Secondary = outline or ghost.
- **Elevation**: Cards/modals = subtle shadow + slightly different surface from page background.
- **Density**: Important areas = denser layout and clear framing; secondary = more whitespace.

---

## Shape Language

- **Base**: Straight lines, diagonals, subtle triangles from the mark.
- **Corners**: Structural containers (nav, sidebars) = straight. Interactive (buttons, inputs, cards) = gentle radius **6–10px**, with **clipped (angled) corners** for primary CTAs.
- **Proportions**: Wide, low components (buttons, cards, table rows) = “system”, not “marketing”.
- **Vibe**: OS-level control panel with a hint of sci‑fi triangle motif.

---

## Buttons & States (Monochrome but Clear)

- **Primary (light)**: Black background, white text. Hover: slight brightness shift or inner highlight; optional 1px lift. Active: pressed (shadow down, 1px translate).
- **Primary (dark)**: White / **#F9FAFB** background, near-black text. Hover: slightly darker neutral, subtle outer glow.
- **Secondary**: Outline (1px border, transparent fill). Hover: light grey fill (**#F3F4F6** light / dark grey dark).
- **Disabled**: Lower opacity, no shadow, no motion.
- **Focus**: Strong 2px outline + 2px offset halo (lighter/darker neutral). Never rely on subtle grey alone.

States are distinct via **thickness, shadow, and motion**, not color.

---

## Inputs, Tables, Cards

- **Inputs**: Soft radius (6–8px), 1px neutral border. Focus: 2px halo + mild shadow.
- **Tables**: Zebra striping with **#FFFFFF** / **#F9FAFB**. Headers semi-bold, slightly different background. Row hover = one step darker/lighter.
- **Cards**: 8–10px radius, slender border, soft shadow. Header = thin top border or small **angled notch** in one corner (triangle motif).

---

## Motion

- **Timing**: Short, snappy (**120–200ms**), mostly **ease-out**.
- **Hover**: Small elevation and contrast shifts, no big color fades.
- **Feedback**: Loading = thin diagonal or triangular loop; success = soft glow + triangle “check”; error = slight shake + clear text.
- **Respect** `prefers-reduced-motion`; animations optional and non-blocking.

---

## Semantic color (very subtle)

- **Muted color** only for success, warning, error, info (teal, amber, red, deep navy). Kept subtle so the view stays clean; rest of the UI is monochrome.
- **Always pair** with icon + text where possible; don’t rely on color alone.

## Accessibility

- **Contrast**: Body text ≥ 4.5:1, large text and UI ≥ 3:1 (WCAG).
- **States**: Combine contrast, shape, **icon**, and **text** (e.g. “Error” badge with icon + bold label).
- **Focus**: Clearly visible outline; don’t rely on subtle grey differences.

---

## Summary

- **Look**: Sober, minimal, lots of air, monochrome.
- **Feel**: Precise, responsive, “system-level” control.
- **Brand hooks**: Triangles in corners, indicators, icons; clipped corners; diagonal separators; monochrome focus on shape, structure, and typography.

*Particle Crypto Security LTD — BloxChain Protocol*
