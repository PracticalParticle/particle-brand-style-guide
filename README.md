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
├── tokens/        # Design tokens (colors, typography, spacing)
├── styles/        # Global styles
└── utils/         # Utility functions
```

## Design Tokens

### Colors

- **Primary**: Enterprise blue (#0066CC)
- **Secondary**: Complementary grays and blues
- **Semantic**: Success, Warning, Error, Info

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

## Brand Guidelines

See [docs/BRAND_GUIDELINES.md](./docs/BRAND_GUIDELINES.md) for complete brand guidelines and usage.

## Company Information

**Particle Crypto Security LTD** (Particle CS)
- **Product**: BloxChain Protocol
- **Focus**: Compliance Framework for Regulated Smart Accounts
- **Industry**: Enterprise Security, Blockchain Technology

## License

MIT License - Copyright (c) Particle Crypto Security LTD
