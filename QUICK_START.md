# Quick Start Guide

## Installation

```bash
# Install all dependencies
npm install
```

## Development

### Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Start Storybook
```bash
npm run storybook
```
Opens at `http://localhost:6006`

## Project Structure

```
particle-style-guide/
├── src/
│   ├── components/      # React components
│   │   └── Button/      # Example component
│   ├── tokens/          # Design tokens
│   │   ├── colors.ts    # Color system
│   │   ├── typography.ts # Typography scale
│   │   ├── spacing.ts   # Spacing system
│   │   └── shadows.ts   # Shadow tokens
│   ├── styles/          # Global styles
│   │   └── globals.css  # CSS with triangle patterns
│   └── utils/           # Utilities
│       └── cn.ts        # Class name merger
├── .storybook/          # Storybook config
├── docs/                # Documentation
└── stories/             # Storybook stories
```

## Key Features Implemented

✅ Design token system (colors, typography, spacing, shadows)
✅ Button component with variants
✅ Dark/light theme support
✅ Triangle geometric patterns
✅ Storybook documentation
✅ TypeScript configuration
✅ Tailwind CSS integration

## Next Steps

1. **Add More Components**
   - Card
   - Input
   - Badge
   - Alert
   - Modal

2. **Set Up Figma Integration**
   - Install Figma Tokens plugin
   - Configure token sync

3. **Add Brand Assets**
   - Logo files (SVG, PNG)
   - Icon library
   - Image assets

4. **Build Templates**
   - Social media templates
   - Email templates
   - Video templates

## Usage Examples

### Using Components
```tsx
import { Button } from '@/components/Button'

<Button variant="primary" size="md">
  Click me
</Button>
```

### Using Design Tokens
```tsx
import { colors } from '@/tokens'

const primaryColor = colors.primary[500] // #0066CC
```

### Theme Toggle
```tsx
// Add 'dark' class to html element
document.documentElement.classList.toggle('dark')
```

## Troubleshooting

### TypeScript Errors
Run type checking:
```bash
npm run type-check
```

### Linting Issues
Run linter:
```bash
npm run lint
```

## Resources

- [Storybook Documentation](http://localhost:6006)
