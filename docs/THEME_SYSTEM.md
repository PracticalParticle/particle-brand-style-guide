# Theme System Documentation

## Overview

The Particle Crypto Security LTD design system uses a **CSS variable-based theme system** for professional, dynamic theming. This system provides centralized control over colors, supports light/dark modes, and enables runtime theme customization.

## Architecture

### CSS Variables

All theme colors are defined as CSS variables in `src/styles/globals.css`:

- **Background Colors**: `--color-bg-primary`, `--color-bg-secondary`, `--color-bg-tertiary`
- **Text Colors**: `--color-text-primary`, `--color-text-secondary`, `--color-text-tertiary`, `--color-text-inverse`
- **Border Colors**: `--color-border`, `--color-border-hover`, `--color-border-focus`
- **Brand Colors**: `--color-primary`, `--color-primary-hover`, `--color-primary-active`, etc.
- **Semantic Colors**: `--color-success`, `--color-error`, `--color-warning`, `--color-info`

All colors are defined as **RGB values (space-separated)** to support Tailwind's opacity modifiers.

### Tailwind Integration

The theme system integrates with Tailwind CSS through `tailwind.config.js`:

```javascript
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
  border: {
    DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
    hover: 'rgb(var(--color-border-hover) / <alpha-value>)',
    focus: 'rgb(var(--color-border-focus) / <alpha-value>)',
  },
  // ... brand and semantic colors
}
```

## Theme Colors

### Background Colors

- **`bg-primary`**: Main page background (neutral-50 in light, neutral-950 in dark)
- **`bg-secondary`**: Card/surface background (white in light, neutral-900 in dark)
- **`bg-tertiary`**: Subtle background (neutral-100 in light, neutral-800 in dark)

**Usage:**
```tsx
<div className="bg-primary">Main background</div>
<Card className="bg-secondary">Card content</Card>
<div className="bg-tertiary">Subtle section</div>
```

### Text Colors

- **`text-primary`**: Main text color (neutral-900 in light, neutral-50 in dark)
- **`text-secondary`**: Secondary text (neutral-700 in light, neutral-300 in dark)
- **`text-tertiary`**: Tertiary text (neutral-500 in both modes)
- **`text-inverse`**: Text on dark backgrounds (white in light, neutral-900 in dark)

**Usage:**
```tsx
<h1 className="text-primary">Main heading</h1>
<p className="text-secondary">Secondary text</p>
<span className="text-tertiary">Helper text</span>
<button className="bg-primary text-inverse">Button</button>
```

### Border Colors

- **`border`** or **`border-default`**: Default border color
- **`border-hover`**: Border color on hover
- **`border-focus`**: Border color on focus (primary color)

**Usage:**
```tsx
<input className="border border-default hover:border-hover focus:border-focus" />
```

### Brand Colors

- **`primary`**: Main brand color (#0066CC)
- **`primary-hover`**: Hover state
- **`primary-active`**: Active/pressed state
- **`primary-light`**: Light variant for backgrounds
- **`primary-lighter`**: Lighter variant for subtle backgrounds
- **`secondary`**: Secondary brand color (#627D98)
- Similar variants for secondary color

**Usage:**
```tsx
<button className="bg-primary hover:bg-primary-hover active:bg-primary-active">
  Primary Button
</button>
<div className="bg-primary-lighter">Subtle primary background</div>
```

### Semantic Colors

- **`success`**: Success state (#22C55E)
- **`error`**: Error state (#E85D5D)
- **`warning`**: Warning state (#F59E0B)
- **`info`**: Info state (#3B82F6)
- Each has a `-light` variant for backgrounds

**Usage:**
```tsx
<div className="bg-success-light text-success">Success message</div>
<div className="bg-error-light text-error">Error message</div>
```

## Dark Mode

Dark mode is automatically handled through CSS variable overrides in `.dark` selector:

```css
.dark {
  --color-bg-primary: 31 41 51;  /* neutral-950 */
  --color-bg-secondary: 50 63 75; /* neutral-900 */
  /* ... other overrides */
}
```

To enable dark mode, add the `dark` class to your root element:

```tsx
<html className="dark">
  {/* ... */}
</html>
```

## Usage Examples

### Component Styling

**Before (direct Tailwind colors):**
```tsx
<div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
  Content
</div>
```

**After (theme classes):**
```tsx
<div className="bg-secondary text-primary">
  Content
</div>
```

### Card Component

```tsx
<Card className="bg-secondary border-default">
  <CardTitle className="text-primary">Title</CardTitle>
  <CardDescription className="text-secondary">Description</CardDescription>
</Card>
```

### Button Component

```tsx
<Button variant="primary" className="bg-primary hover:bg-primary-hover">
  Click me
</Button>
```

### Input Component

```tsx
<Input 
  className="bg-secondary border-default focus:border-focus"
  placeholder="Enter text..."
/>
```

## TypeScript Support

The theme system includes TypeScript definitions in `src/tokens/theme.ts`:

```typescript
import { theme, getThemeVar, setThemeVar } from '@/tokens/theme'

// Access theme tokens
const primaryColor = theme.brand.primary

// Get CSS variable value
const bgPrimary = getThemeVar('--color-bg-primary')

// Set CSS variable value (for runtime customization)
setThemeVar('--color-primary', '0 102 204')
```

## Customization

### Runtime Theme Customization

You can customize theme colors at runtime using CSS variables:

```typescript
import { setThemeVar } from '@/tokens/theme'

// Change primary color
setThemeVar('--color-primary', '59 130 246') // Blue-500

// Change background
setThemeVar('--color-bg-primary', '255 255 255') // White
```

### Custom Theme Variants

To add custom theme variants, update `globals.css`:

```css
:root {
  --color-custom-accent: 255 0 0; /* Red */
}

.dark {
  --color-custom-accent: 255 100 100; /* Lighter red */
}
```

Then add to `tailwind.config.js`:

```javascript
colors: {
  custom: {
    accent: 'rgb(var(--color-custom-accent) / <alpha-value>)',
  },
}
```

## Migration Guide

### From Direct Tailwind Colors to Theme Classes

1. **Backgrounds:**
   - `bg-white dark:bg-neutral-900` → `bg-secondary`
   - `bg-neutral-50 dark:bg-neutral-950` → `bg-primary`
   - `bg-neutral-100 dark:bg-neutral-800` → `bg-tertiary`

2. **Text:**
   - `text-neutral-900 dark:text-neutral-50` → `text-primary`
   - `text-neutral-700 dark:text-neutral-300` → `text-secondary`
   - `text-neutral-500` → `text-tertiary`

3. **Borders:**
   - `border-neutral-200 dark:border-neutral-800` → `border-default`
   - `border-neutral-300 dark:border-neutral-700` → `border-hover`
   - `border-primary-500` → `border-focus`

4. **Brand Colors:**
   - `bg-primary-500` → `bg-primary`
   - `bg-primary-600` → `bg-primary-hover`
   - `bg-primary-700` → `bg-primary-active`

## Benefits

1. **Centralized Control**: All colors defined in one place (`globals.css`)
2. **Dynamic Theming**: Easy runtime customization via CSS variables
3. **Dark Mode Support**: Automatic dark mode through CSS variable overrides
4. **Type Safety**: TypeScript definitions for theme tokens
5. **Consistency**: Enforces consistent color usage across components
6. **Maintainability**: Easy to update colors globally
7. **Performance**: CSS variables are performant and cached by browsers

## Best Practices

1. **Always use theme classes** instead of direct Tailwind color classes
2. **Use semantic names** (`bg-primary`, `text-primary`) rather than color names (`bg-blue-500`)
3. **Leverage opacity modifiers** with theme classes: `bg-primary/50`
4. **Test in both light and dark modes** to ensure proper contrast
5. **Use `text-inverse`** for text on colored backgrounds
6. **Prefer theme classes** over inline styles for consistency

## Troubleshooting

### Colors not updating

- Ensure CSS variables are defined in `globals.css`
- Check that Tailwind config maps variables correctly
- Verify the `dark` class is applied to root element for dark mode

### Opacity not working

- Ensure CSS variables use space-separated RGB values (not hex)
- Use Tailwind's opacity modifier syntax: `bg-primary/50`

### TypeScript errors

- Import theme types from `@/tokens/theme`
- Use `getThemeVar()` and `setThemeVar()` helpers for type safety
