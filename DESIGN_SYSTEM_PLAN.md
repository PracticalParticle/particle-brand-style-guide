# Particle Brand Style Guide — Design System Plan

A structured plan to align the style guide with enterprise SaaS, company website, and social media needs. Covers missing components, story organization, section patterns, and compliance.

---

## 1. Current State Summary

### What You Have

- **Design tokens**: Colors, typography, spacing, shadows (`Design System/Design Tokens`).
- **Theming**: Light/dark via CSS variables + Tailwind (Theme B “Regulated Finance”).
- **Brand**: Logo (with animated variants), Favicon, Social/Open Graph specs.
- **Animations**: Popover/sheet, spinner, logo animations, subtle backgrounds (shimmer, pulse, geometric).

### Components (exported in `src/components/index.ts`)

| Category     | Components |
|-------------|------------|
| Actions     | Button |
| Surfaces    | Card, Modal, ActionSheet, Popover, Tooltip, Accordion |
| Forms       | Input, FileInput, Select, DropdownSelect, Combobox, MultiSelect, Checkbox, Radio, Switch |
| Selection   | SegmentedControl, DropdownMenu |
| Feedback    | Alert, Badge, Spinner, Skeleton, EmptyState, Progress, Toast (ToastProvider, useToast) |
| Navigation  | Breadcrumbs, Stepper, Tabs |
| Data        | Table (Toolbar, Pagination, CardView, Filters), Divider, Avatar, Filter |
| Other       | Logo, Rating |

### Not Yet Exported

- **DataView** — story-only composition (Table + Card + filters); no component export.

### Story Organization

- Introduction; Design System/Design Tokens; Brand (Logo, Animated Logos, Favicon, Social/Open Graph).
- Components under `Components/` with mixed grouping (e.g. Selection has Overview, Select, DropdownSelect, etc.; others flat).

### Duplicates

- Favicon and Social/Open Graph exist in both `stories/Brand/` and `src/brand/`; consolidate to single source.

---

## 2. Gaps vs. Enterprise / SaaS / Marketing Standards

### 2.1 Missing or Weak Components

| Priority | Component        | Use case |
|----------|------------------|----------|
| High     | **Tabs**         | Section switching (product details, settings). |
| High     | **Toast/Snackbar** | Non-blocking success/error/info. |
| High     | **Avatar**       | User display, testimonials, nav. |
| Medium   | **Accordion**    | FAQs, settings groups, long forms. |
| Medium   | **Progress**     | Uploads, steps, quotas (linear/radial). |
| Low      | **Divider**      | Visual separation. |
| Optional | **Drawer/Sidebar** | App nav, filters (you have ActionSheet). |
| Optional | **Slider/Range** | Numeric ranges. |

### 2.2 Story Sidebar Order (Target)

1. **Introduction**
2. **Design System** — Design Tokens (and optional Style Guide doc).
3. **Brand** — Introduction (MDX) → Logo → Animated Logos → Favicon → Social & Open Graph.
4. **Components** (by category):
   - **Actions**: Button
   - **Forms**: Input, FileInput, Checkbox, Radio, Switch, Select, DropdownSelect, Combobox, MultiSelect
   - **Selection**: SegmentedControl, DropdownMenu
   - **Surfaces**: Card, Modal, ActionSheet, Popover, Tooltip
   - **Data display**: Badge, Table, Data View, EmptyState
   - **Feedback**: Alert, Spinner, Skeleton
   - **Navigation**: Breadcrumbs, Stepper
   - **Data display**: Filter (with Table/Data View)
   - **Other**: Logo, Rating, FileInput

### 2.3 Website Sections (for plug-and-play)

Document or provide story patterns for:

- **Hero** — Headline, subhead, primary/secondary CTA (Button), optional visual (Logo/Card).
- **Features** — Grid of Cards (icon + title + description).
- **Testimonials** — Quote + Avatar + name/role (needs Avatar).
- **CTA** — Strip or card with heading, short text, Button(s).
- **Footer** — Links, contact, social, newsletter (Input + Button).
- **Nav** — Header with Logo, links, CTA.

### 2.4 Animation, Responsiveness, Accessibility, Compliance

- **Animation**: Keep light motion; document `prefers-reduced-motion` and respect it.
- **Responsiveness**: Add Storybook viewport presets (mobile, tablet, desktop).
- **Accessibility**: Add `@storybook/addon-a11y`; document keyboard/screen-reader for complex components.
- **Compliance**: Document WCAG 2.1 AA; optional short “Compliance” page (contrast, focus, semantics).

---

## 3. Implementation Plan (Phased)

### Phase 1 — Consistency and Exports (Quick Wins)

| # | Task | Status |
|---|------|--------|
| 1.1 | **Single source for Brand** — Keep only `src/brand/` for Favicon and Social/Open Graph; remove duplicate `stories/Brand/Favicon.stories.tsx` and `SocialOpenGraph.stories.tsx`. | Done |
| 1.2 | **Export Filter** — Add `export * from './Filter'` in `src/components/index.ts`. | Done |
| 1.3 | **Data View** — Document as pattern (composition of Table + Toolbar + Pagination + CardView + Filter); optional thin `DataView` component later. | Documented |
| 1.4 | **Reorder story titles** — Apply sidebar hierarchy via `title` in meta (Actions, Forms, Selection, Surfaces, Data display, Feedback, Navigation). | Done |
| 1.5 | **Add @storybook/addon-a11y** — Installed `@storybook/addon-a11y@8.6.17` and added to `.storybook/main.ts`. | Done |

### Phase 2 — Missing Components (By Impact)

| # | Component   | Notes | Status |
|---|------------|--------|--------|
| 2.1 | Tabs       | Keyboard (arrow keys), `role="tablist"`, `aria-selected`. | Done |
| 2.2 | Toast      | Provider + `useToast()` for plug-and-play. | Done |
| 2.3 | Avatar     | Image + fallback (initials). | Done |
| 2.4 | Accordion  | Single/multi expand, keyboard, `aria-expanded`. | Done |
| 2.5 | Divider    | Use tokens for color/weight. | Done |
| 2.6 | Progress   | Linear (and optionally circular). | Done |
| 2.7 | Drawer     | Optional; for persistent side nav. | Pending |
| 2.8 | Slider     | Optional; for range inputs. | Pending |

### Phase 3 — Sections and Plug-and-Play

| # | Task |
|---|------|
| 3.1 | Add **Patterns / Website Sections** (or **Templates**) with stories/MDX for Hero, Features, Testimonials, CTA, Footer, Nav. |
| 3.2 | Ensure Social/OG is linked from Introduction and Brand overview. |

### Phase 4 — Hardening and Docs

| # | Task |
|---|------|
| 4.1 | Add **@storybook/addon-a11y**; fix critical violations; run in CI. |
| 4.2 | Configure **viewport** addon (mobile/tablet/desktop). |
| 4.3 | **Reduced motion** — Use `prefers-reduced-motion` in CSS/animations; document in Design System. |
| 4.4 | **Compliance doc** — One page: WCAG 2.1 AA, contrast, keyboard, focus; link from Introduction. |

---

## 4. Plug-and-Play Checklist (Other Projects)

- [ ] Single, clear Storybook hierarchy (Introduction → Design System → Brand → Components).
- [ ] All public components exported from `src/components/index.ts` (including Filter).
- [ ] Data View documented as pattern (or exported as composite).
- [ ] No duplicate Brand stories; single Favicon and Social/OG story.
- [ ] Tabs, Toast, Avatar, Accordion, Divider, Progress added as needed.
- [ ] Website section patterns (Hero, Features, Testimonials, CTA, Footer) as stories/MDX.
- [ ] @storybook/addon-a11y enabled and violations addressed.
- [ ] Viewport presets and “responsive” noted in docs.
- [ ] Reduced motion and WCAG/compliance documented.

---

---

## 5. Note on Story Links (MDX)

After reordering, story IDs changed (e.g. `components-button--default` → `components-actions-button--default`). If `stories/Brand/Introduction.stories.mdx` or `stories/StyleGuide.stories.mdx` link to stories by path, update them to the new IDs or use Storybook’s link format.

---

## 6. Build Note

`npm run build-storybook` may report “No matching indexer found” for MDX files in `stories/`. If that occurs, either ensure `@storybook/addon-docs` (or the MDX story indexer) is configured for your Storybook version, or temporarily limit the stories glob to `../src/**/*.stories.@(js|jsx|ts|tsx)` to build from `src` only. TypeScript and `npm run storybook` (dev) are unchanged by this plan.

*Last updated: Phase 1 implemented (plan doc created; Brand consolidated; Filter exported; story titles reordered; a11y addon added).*
