# Color Usage Guidelines

## Overview

The Particle Crypto Security LTD design system uses a **simplified professional color palette** with **5 core brand colors** optimized for enterprise security applications and modern web3 interfaces. This guide outlines when and how to use each color category.

## Core Brand Colors (5 Main Colors)

1. **Primary Blue** (#0066CC) - Main brand color
2. **Secondary Blue** (#627D98) - Supporting elements  
3. **Neutral Grays** - Structure & hierarchy
4. **Success Green** (#22C55E) - Positive feedback
5. **Error Red** (#E85D5D) - Errors & destructive actions

**Additional semantic colors:**
- Warning Amber (#F59E0B) - Warnings
- Info Blue (#3B82F6) - Informational messages

## Color Categories

### 1. Brand Colors

**Primary Blue** (`primary-500: #0066CC`)
- **Usage**: Primary actions, CTAs, links, active states, brand elements
- **When to use**: 
  - Main call-to-action buttons
  - Active navigation items
  - Links and interactive elements
  - Brand logos and icons
  - Focus states
- **When NOT to use**: 
  - Background colors (use neutral instead)
  - Text on light backgrounds (use neutral-900)
  - Error states (use error colors)

**Secondary Blue** (`secondary-500: #627D98`)
- **Usage**: Secondary actions, supporting elements, subtle accents
- **When to use**:
  - Secondary buttons
  - Supporting UI elements
  - Subtle backgrounds
  - Less prominent actions
- **When NOT to use**:
  - Primary CTAs (use primary instead)
  - Critical actions (use primary or error)

### 2. Neutral Colors

**Purpose**: Structure, hierarchy, and readability

**Light Mode Usage**:
- `neutral-50`: Page backgrounds
- `neutral-100`: Subtle backgrounds, hover states
- `neutral-200`: Borders, dividers
- `neutral-300`: Disabled states, subtle borders
- `neutral-500`: Placeholder text, icons
- `neutral-700`: Secondary text
- `neutral-900`: Primary text

**Dark Mode Usage**:
- `neutral-950`: Page backgrounds
- `neutral-900`: Card backgrounds
- `neutral-800`: Elevated surfaces
- `neutral-700`: Borders, dividers
- `neutral-500`: Placeholder text, icons
- `neutral-300`: Secondary text
- `neutral-50`: Primary text

**Guidelines**:
- Always maintain sufficient contrast (WCAG AA minimum)
- Use neutral colors for structure, not for emphasis
- Text colors should contrast with backgrounds by at least 4.5:1

### 3. Semantic Colors

Use semantic colors to communicate status, feedback, and system states.

#### Success (`success-500: #22C55E`)
- **Usage**: Success messages, completed states, positive feedback
- **When to use**:
  - Success notifications
  - Completed checkmarks
  - Positive status indicators
  - Confirmation messages
- **Examples**: "Transaction completed", "Saved successfully"

#### Warning (`warning-500: #F59E0B`)
- **Usage**: Warnings, caution states, pending actions
- **When to use**:
  - Warning alerts
  - Pending transactions
  - Caution indicators
  - Non-critical errors
- **Examples**: "Transaction pending", "Low balance warning"

#### Error (`error-500: #E85D5D`)
- **Usage**: Errors, destructive actions, critical alerts
- **When to use**:
  - Error messages
  - Failed transactions
  - Destructive actions (delete, remove)
  - Critical alerts
- **Examples**: "Transaction failed", "Delete account"
- **Note**: Use sparingly - errors should be noticeable but not alarming

#### Info (`info-500: #3B82F6`)
- **Usage**: Informational messages, tips, neutral feedback
- **When to use**:
  - Information alerts
  - Help text
  - Neutral notifications
  - Tooltips and hints
- **Examples**: "New feature available", "Did you know?"

### 4. Color Usage Rules

#### ✅ DO:
- Use brand colors (primary/secondary) for interactive elements
- Use semantic colors for status and feedback
- Use neutral colors for structure and hierarchy
- Maintain consistent color meaning across the application
- Test color contrast for accessibility
- Use color + icon/text for clarity (don't rely on color alone)

#### ❌ DON'T:
- Use semantic colors for decorative purposes
- Mix color meanings (e.g., don't use error color for success)
- Use too many colors at once (max 2-3 colors per component)
- Use low contrast combinations
- Use color as the only indicator (add icons/text)
- Create new color combinations outside the palette

### 5. Component-Specific Guidelines

#### Buttons
- **Primary actions**: `primary` or `primary-gradient`
- **Secondary actions**: `secondary`, `outline`, or `ghost`
- **Destructive actions**: `danger`
- **Links**: `link` variant

#### Alerts/Notifications
- **Success**: `success` variant
- **Warning**: `warning` variant
- **Error**: `error` variant
- **Info**: `info` variant

#### Badges
- **Status indicators**: Use semantic colors
- **Categories**: Use primary or secondary
- **Neutral**: Use neutral colors

#### Inputs
- **Default**: Neutral borders
- **Focus**: Primary color
- **Error**: Error color
- **Disabled**: Neutral-300

### 6. Dark Mode Considerations

- All colors adapt automatically in dark mode
- Maintain contrast ratios in both modes
- Test readability in both light and dark themes
- Use lighter shades in dark mode for better visibility
- Avoid pure black (#000000) - use neutral-950 instead

### 7. Accessibility

- **Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color blindness**: Don't rely on color alone - use icons, text, or patterns
- **Focus states**: Always visible, use primary color
- **Error states**: Use color + icon + text

### 8. Web3 Considerations

- **Trust**: Use professional, muted colors (avoid bright, flashy colors)
- **Security**: Error colors should be noticeable but not alarming
- **Modern**: Gradient buttons for CTAs add modern web3 aesthetic
- **Consistency**: Maintain brand colors across all touchpoints

## Color Palette Reference

### Core Brand Colors (5 Main Colors)
1. **Primary Blue**: `#0066CC` (primary-500) - Main brand color
2. **Secondary Blue**: `#627D98` (secondary-500) - Supporting elements
3. **Neutral Grays**: Full scale for structure
4. **Success Green**: `#22C55E` (success-500) - Positive feedback
5. **Error Red**: `#E85D5D` (error-500) - Errors & destructive actions

### Additional Semantic Colors
- **Warning**: `#F59E0B` (warning-500) - Warnings
- **Info**: `#3B82F6` (info-500) - Informational

### Simplified Color Scale
Each color category includes only essential shades:
- **50, 100**: Light backgrounds, subtle accents
- **500**: Main color
- **600, 700**: Hover states, darker variants
- **900**: Darkest variant (for primary/secondary)

### Neutral Scale (Extended for Structure)
- Light backgrounds: `neutral-50` to `neutral-200`
- Borders: `neutral-200` to `neutral-300`
- Placeholders/Icons: `neutral-400` to `neutral-500`
- Secondary text: `neutral-600` to `neutral-700`
- Primary text: `neutral-900` (light mode)
- Dark backgrounds: `neutral-800` to `neutral-950` (dark mode)

## Examples

### Good Examples ✅
```tsx
// Primary CTA
<Button variant="primary-gradient">Get Started</Button>

// Success feedback
<Alert variant="success">Transaction completed successfully</Alert>

// Error state
<Input error="Please enter a valid email" />
```

### Bad Examples ❌
```tsx
// Don't use error color for success
<Alert variant="error">Success! Your order is confirmed</Alert>

// Don't use primary for errors
<Button variant="primary">Delete Account</Button>

// Don't use too many colors
<div className="bg-primary-500 text-error-500 border-success-500">
  Confusing color combination
</div>
```

## Quick Reference

| Purpose | Color | Variant |
|---------|-------|---------|
| Primary CTA | Primary | `primary` or `primary-gradient` |
| Secondary action | Secondary | `secondary` or `outline` |
| Success message | Success | `success` |
| Warning message | Warning | `warning` |
| Error message | Error | `error` |
| Info message | Info | `info` |
| Destructive action | Error | `danger` |
| Link | Primary | `link` |
| Background | Neutral | `neutral-50` (light) / `neutral-950` (dark) |
| Text | Neutral | `neutral-900` (light) / `neutral-50` (dark) |
