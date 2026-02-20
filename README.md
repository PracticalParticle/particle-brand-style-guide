# Particle Crypto Security LTD - Style Guide

Design system and component library for Particle Crypto Security LTD's BloxChain Protocol - a compliance framework for regulated smart accounts.

## Overview

This style guide provides a comprehensive design system that reflects enterprise security, blockchain technology, trust, and professionalism. It includes reusable React components, design tokens, and documentation built with Storybook.

## Features

- 🎨 **Enterprise Blue Theme** - Professional color palette optimized for security-focused applications
- 🌓 **Dark/Light Mode** - Full theme support with seamless switching
- 🔷 **Geometric Design** - Triangle patterns inspired by the brand logo
- ♿ **Accessible** - WCAG 2.1 AA compliant components
- 📦 **TypeScript** - Fully typed for better developer experience
- 🎯 **Tailwind CSS** - Utility-first styling with custom design tokens
- 📚 **Storybook** - Interactive component documentation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

### Build

```bash
# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

## Project Structure

```
src/
├── components/     # React components
│   └── Logo/       # logo.svg = canonical logo; no width overrides in app
├── tokens/        # Design tokens (colors, typography, spacing)
├── styles/        # Global styles
└── utils/         # Utility functions
```

## Design Tokens

### Colors

- **Tertiary (Primary CTA)**: Corporate blue (#1F4ED8) - Main brand color for CTAs and primary actions
- **Primary (Charcoal)**: Neutral dark (#0A0A0A) - For dark surfaces and high-contrast elements
- **Secondary**: Supporting surfaces (#F1F5F9 light, #1E1E1E dark)
- **Semantic**: Success, Warning, Error, Info - Status indicators

See [docs/THEME_SYSTEM.md](./docs/THEME_SYSTEM.md) for complete theme documentation.

### Typography

- **Font**: Inter (primary), system fonts (fallback)
- **Scale**: 12px - 48px
- **Weights**: 400, 500, 600, 700

### Spacing

- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96

## Usage

### Import Components

```tsx
import { Button } from '@/components/Button'

function App() {
  return <Button variant="primary">Click me</Button>
}
```

### Using Design Tokens

```tsx
import { colors, typography, spacing } from '@/tokens'

// Use tokens in your styles
```

## Development

### Adding New Components

1. Create component directory in `src/components/`
2. Add component file, stories, and index.ts
3. Export from `src/components/index.ts`
4. Document in Storybook

### Code Style

- TypeScript strict mode
- ESLint for linting
- Prettier for formatting (recommended)

## Documentation

Full component documentation is available in Storybook:

```bash
npm run storybook
```

Visit `http://localhost:6006` to view the interactive documentation.

## Consumption Guide

### Using the Theme in Other Projects

To use the Particle theme system in other applications or websites:

1. **Copy theme CSS variables**: Import `src/styles/globals.css` into your project
2. **Use Tailwind config**: Copy the theme configuration from `tailwind.config.js` or create a preset
3. **Use theme classes**: Use the same Tailwind class names (`bg-bg-primary`, `text-text-primary`, `bg-tertiary`, etc.)

**Example setup:**

```bash
# Copy globals.css to your project
cp src/styles/globals.css your-project/src/styles/
```

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
          inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
        },
        // ... see tailwind.config.js for complete mapping
      },
    },
  },
}
```

**Important**: Always use theme classes (`bg-bg-primary`, `text-text-primary`, `bg-tertiary`) instead of raw Tailwind neutrals (`bg-neutral-50`, `text-neutral-900`) to maintain brand consistency and automatic dark mode support.

### Brand Assets for Social Media & Marketing

**Primary Brand Colors:**
- **Corporate Blue (Tertiary)**: `#1F4ED8` - Use for primary CTAs, links, and brand accents
- **Charcoal (Primary)**: `#0A0A0A` - Use for dark surfaces, badges, high-contrast elements
- **White**: `#FFFFFF` - Use for text on colored backgrounds

**Theme Colors (for UI surfaces):**
- **Background Primary**: `#F1F5F9` (light) / `#18181C` (dark)
- **Background Secondary**: `#FFFFFF` (light) / `#202026` (dark)
- **Text Primary**: `#0B1220` (light) / `#F8FAFC` (dark)

**Typography:**
- **Primary Font**: Inter (weights: 400, 500, 600, 700)
- **Monospace**: JetBrains Mono

**Logo Usage:**
- See Storybook Design Tokens story for logo variants and usage guidelines
- Logo supports light and dark modes
- Maintain minimum clear space around logo

**Do's and Don'ts:**
- ✅ **Do**: Use theme tokens (`bg-tertiary`, `text-text-primary`) in product UI
- ✅ **Do**: Use brand hex colors for marketing materials and social media
- ❌ **Don't**: Use raw Tailwind neutrals (`neutral-50`, `neutral-900`) in product UI
- ❌ **Don't**: Modify theme colors without updating both light and dark modes

For complete brand guidelines, see the **Design Tokens** story in Storybook or [docs/THEME_SYSTEM.md](./docs/THEME_SYSTEM.md).

## Brand Guidelines

See [docs/BRAND_GUIDELINES.md](./docs/BRAND_GUIDELINES.md) for complete brand guidelines and usage.

## Company Information

**Particle Crypto Security LTD** (Particle CS)
- **Product**: BloxChain Protocol
- **Focus**: Compliance Framework for Regulated Smart Accounts
- **Industry**: Enterprise Security, Blockchain Technology

## License

MIT License - Copyright (c) Particle Crypto Security LTD
