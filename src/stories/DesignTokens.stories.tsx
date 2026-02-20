import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta = {
  title: 'Design System/Design Tokens',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  render: () => {
    // Theme color definitions with CSS variables, hex codes, and usage
    const themeColors = {
      background: [
        {
          name: 'bg-primary',
          cssVar: '--color-bg-primary',
          lightHex: '#F1F5F9',
          darkHex: '#0A0A0A',
          usage: 'Main page background',
          tailwindClass: 'bg-bg-primary',
        },
        {
          name: 'bg-secondary',
          cssVar: '--color-bg-secondary',
          lightHex: '#FFFFFF',
          darkHex: '#141414',
          usage: 'Card/surface background',
          tailwindClass: 'bg-bg-secondary',
        },
        {
          name: 'bg-tertiary',
          cssVar: '--color-bg-tertiary',
          lightHex: '#F8FAFC',
          darkHex: '#1E1E1E',
          usage: 'Subtle background sections',
          tailwindClass: 'bg-bg-tertiary',
        },
      ],
      text: [
        {
          name: 'text-primary',
          cssVar: '--color-text-primary',
          lightHex: '#0B1220',
          darkHex: '#F8FAFC',
          usage: 'Main text, headings',
          tailwindClass: 'text-text-primary',
        },
        {
          name: 'text-secondary',
          cssVar: '--color-text-secondary',
          lightHex: '#334155',
          darkHex: '#CBD5E1',
          usage: 'Secondary text, descriptions',
          tailwindClass: 'text-text-secondary',
        },
        {
          name: 'text-tertiary',
          cssVar: '--color-text-tertiary',
          lightHex: '#475569',
          darkHex: '#CBD5E1',
          usage: 'Helper text, placeholders',
          tailwindClass: 'text-text-tertiary',
        },
        {
          name: 'text-inverse',
          cssVar: '--color-text-inverse',
          lightHex: '#FFFFFF',
          darkHex: '#FFFFFF',
          usage: 'Text on colored backgrounds',
          tailwindClass: 'text-text-inverse',
        },
      ],
      border: [
        {
          name: 'border',
          cssVar: '--color-border',
          lightHex: '#F1F5F9',
          darkHex: '#191919',
          usage: 'Default borders',
          tailwindClass: 'border-border',
        },
        {
          name: 'border-hover',
          cssVar: '--color-border-hover',
          lightHex: '#E9EDF1',
          darkHex: '#232323',
          usage: 'Borders on hover',
          tailwindClass: 'border-border-hover',
        },
        {
          name: 'border-focus',
          cssVar: '--color-border-focus',
          lightHex: '#1F4ED8',
          darkHex: '#1F4ED8',
          usage: 'Focus borders (corporate blue)',
          tailwindClass: 'border-border-focus',
        },
      ],
    }

    const brandColors = [
      {
        name: 'primary (brand)',
        cssVar: '--color-tertiary',
        lightHex: '#1F4ED8',
        darkHex: '#2F52E0',
        usage: 'Primary brand color: main CTAs, primary buttons, links (WCAG AA: white text on this)',
        tailwindClass: 'bg-tertiary',
        variants: [
          { name: 'tertiary-hover', cssVar: '--color-tertiary-hover', lightHex: '#1A42C0', darkHex: '#3A6AFF', usage: 'Hover state' },
          { name: 'tertiary-active', cssVar: '--color-tertiary-active', lightHex: '#1536A8', darkHex: '#1F4ED8', usage: 'Active/pressed state' },
          { name: 'tertiary-light', cssVar: '--color-tertiary-light', lightHex: '#E2E8F0', darkHex: '#2A2A32', usage: 'Neutral light / elevated surface' },
          { name: 'tertiary-lighter', cssVar: '--color-tertiary-lighter', lightHex: '#F8FAFC', darkHex: '#373A40', usage: 'Subtle neutral (no blue tint)' },
        ],
      },
      {
        name: 'secondary',
        cssVar: '--color-secondary',
        lightHex: '#F1F5F9',
        darkHex: '#1E1E1E',
        usage: 'Secondary actions, supporting surfaces (light: theme bg; dark: dark gray, distinct from black)',
        tailwindClass: 'bg-secondary',
        variants: [
          { name: 'secondary-hover', cssVar: '--color-secondary-hover', lightHex: '#E2E8F0', darkHex: '#191919', usage: 'Hover state' },
          { name: 'secondary-active', cssVar: '--color-secondary-active', lightHex: '#FFFFFF', darkHex: '#141414', usage: 'Active/pressed state' },
          { name: 'secondary-light', cssVar: '--color-secondary-light', lightHex: '#CBD5E1', darkHex: '#333333', usage: 'Light backgrounds' },
          { name: 'secondary-lighter', cssVar: '--color-secondary-lighter', lightHex: '#F8FAFC', darkHex: '#666666', usage: 'Subtle backgrounds' },
        ],
      },
      {
        name: 'neutral (charcoal)',
        cssVar: '--color-primary',
        lightHex: '#0A0A0A',
        darkHex: '#0A0A0A',
        usage: 'Neutral dark surfaces, badges, high-contrast elements (use text-inverse on this)',
        tailwindClass: 'bg-primary',
        variants: [
          { name: 'primary-hover', cssVar: '--color-primary-hover', lightHex: '#080808', darkHex: '#141414', usage: 'Hover state' },
          { name: 'primary-active', cssVar: '--color-primary-active', lightHex: '#060606', darkHex: '#1E1E1E', usage: 'Active/pressed state' },
          { name: 'primary-light', cssVar: '--color-primary-light', lightHex: '#333333', darkHex: '#333333', usage: 'Light backgrounds' },
          { name: 'primary-lighter', cssVar: '--color-primary-lighter', lightHex: '#999999', darkHex: '#666666', usage: 'Subtle backgrounds' },
        ],
      },
      {
        name: 'black',
        cssVar: '--color-black',
        lightHex: '#000000',
        darkHex: '#000000',
        usage: 'High contrast text, dark elements',
        tailwindClass: 'bg-black',
        variants: [],
      },
      {
        name: 'white',
        cssVar: '--color-white',
        lightHex: '#FFFFFF',
        darkHex: '#FFFFFF',
        usage: 'High contrast backgrounds, light elements',
        tailwindClass: 'bg-white',
        variants: [],
      },
    ]

    const semanticColors = [
      {
        name: 'success',
        cssVar: '--color-success',
        hex: '#14532D',
        usage: 'Success messages, completed states (light mode)',
        tailwindClass: 'bg-success',
        lightVar: '--color-success-light',
        lightHex: '#BBF7D0',
        darkHex: '#34D399',
        darkLightHex: '#064E3B',
      },
      {
        name: 'error',
        cssVar: '--color-error',
        hex: '#991B1B',
        usage: 'Errors, destructive actions (light mode)',
        tailwindClass: 'bg-error',
        lightVar: '--color-error-light',
        lightHex: '#FECACA',
        darkHex: '#F87171',
        darkLightHex: '#7F1D1D',
      },
      {
        name: 'warning',
        cssVar: '--color-warning',
        hex: '#92400E',
        usage: 'Warnings, caution states (light mode)',
        tailwindClass: 'bg-warning',
        lightVar: '--color-warning-light',
        lightHex: '#FDE68A',
        darkHex: '#FBBF24',
        darkLightHex: '#78350F',
      },
      {
        name: 'info',
        cssVar: '--color-info',
        hex: '#1E40AF',
        usage: 'Informational messages, tips (light mode)',
        tailwindClass: 'bg-info',
        lightVar: '--color-info-light',
        lightHex: '#F1F5F9',
        darkHex: '#2F52E0',
        darkLightHex: '#1E3A5F',
      },
    ]

    interface ColorCardProps {
      name: string
      cssVar: string
      lightHex: string
      darkHex: string
      usage: string
      tailwindClass: string
    }

    const ColorCard = ({ name, cssVar, lightHex, darkHex, usage, tailwindClass }: ColorCardProps) => (
      <div className="p-6 bg-bg-secondary rounded-lg border border-border space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="font-semibold text-text-primary mb-1">{name}</div>
            <div className="text-sm text-text-secondary mb-2">{usage}</div>
            <div className="text-xs font-mono text-text-tertiary space-y-1">
              <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{cssVar}</code></div>
              <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{tailwindClass}</code></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-text-tertiary mb-2">Light Mode</div>
            <div className="h-16 rounded-md border border-border" style={{ backgroundColor: lightHex }} />
            <div className="text-xs font-mono text-text-secondary mt-1">{lightHex}</div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-2">Dark Mode</div>
            <div className="h-16 rounded-md border border-border" style={{ backgroundColor: darkHex }} />
            <div className="text-xs font-mono text-text-secondary mt-1">{darkHex}</div>
          </div>
        </div>
      </div>
    )

    interface BrandColor {
      name: string
      cssVar: string
      lightHex: string
      darkHex: string
      usage: string
      tailwindClass: string
      variants?: Array<{
        name: string
        cssVar: string
        lightHex: string
        darkHex: string
        usage: string
      }>
    }

    const BrandColorCard = ({ color }: { color: BrandColor }) => (
      <div className="p-6 bg-bg-secondary rounded-lg border border-border space-y-4">
        <div>
          <div className="font-semibold text-text-primary mb-1 capitalize">{color.name}</div>
          <div className="text-sm text-text-secondary mb-2">{color.usage}</div>
          <div className="text-xs font-mono text-text-tertiary space-y-1">
            <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{color.cssVar}</code></div>
            <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{color.tailwindClass}</code></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-text-tertiary mb-2">Light Mode</div>
            <div className="h-16 rounded-md border border-border" style={{ backgroundColor: color.lightHex }} />
            <div className="text-xs font-mono text-text-secondary mt-1">{color.lightHex}</div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-2">Dark Mode</div>
            <div className="h-16 rounded-md border border-border" style={{ backgroundColor: color.darkHex }} />
            <div className="text-xs font-mono text-text-secondary mt-1">{color.darkHex}</div>
          </div>
        </div>
        {color.variants && color.variants.length > 0 && (
          <div className="pt-4 border-t border-border space-y-3">
            <div className="text-xs font-semibold text-text-secondary uppercase">Variants</div>
            {color.variants.map((variant) => (
              <div key={variant.name} className="flex items-center justify-between text-xs">
                <div>
                  <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{variant.name}</code>
                  <span className="text-text-tertiary ml-2">{variant.usage}</span>
                </div>
                <div className="font-mono text-text-secondary">
                  <span className="mr-2">{variant.lightHex}</span>
                  <span className="text-text-tertiary">/</span>
                  <span className="ml-2">{variant.darkHex}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )

    interface SemanticColor {
      name: string
      cssVar: string
      hex: string
      usage: string
      tailwindClass: string
      lightVar: string
      lightHex: string
      darkHex: string
      darkLightHex: string
    }

    const SemanticColorCard = ({ color }: { color: SemanticColor }) => (
      <div className="p-6 bg-bg-secondary rounded-lg border border-border space-y-4">
        <div>
          <div className="font-semibold text-text-primary mb-1 capitalize">{color.name}</div>
          <div className="text-sm text-text-secondary mb-2">{color.usage}</div>
          <div className="text-xs font-mono text-text-tertiary space-y-1">
            <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{color.cssVar}</code></div>
            <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded">{color.tailwindClass}</code></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-text-tertiary mb-2">Light Mode</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-tertiary mb-1">Main Color</div>
                <div className="h-12 rounded-md border border-border" style={{ backgroundColor: color.hex }} />
                <div className="text-xs font-mono text-text-secondary mt-1">{color.hex}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary mb-1">Light Variant</div>
                <div className="h-10 rounded-md border border-border" style={{ backgroundColor: color.lightHex }} />
                <div className="text-xs font-mono text-text-secondary mt-1">{color.lightHex}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs text-text-tertiary mb-2">Dark Mode</div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-tertiary mb-1">Main Color</div>
                <div className="h-12 rounded-md border border-border" style={{ backgroundColor: color.darkHex }} />
                <div className="text-xs font-mono text-text-secondary mt-1">{color.darkHex}</div>
              </div>
              <div>
                <div className="text-xs text-text-tertiary mb-1">Light Variant</div>
                <div className="h-10 rounded-md border border-border" style={{ backgroundColor: color.darkLightHex }} />
                <div className="text-xs font-mono text-text-secondary mt-1">{color.darkLightHex}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-xs text-text-tertiary pt-2 border-t border-border">
          CSS: <code className="bg-bg-tertiary px-1 py-0.5 rounded">{color.lightVar}</code> (light variant for backgrounds)
        </div>
      </div>
    )

    return (
      <div className="p-8 space-y-12 w-full min-h-screen">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-text-primary">Theme Color System</h1>
          <p className="text-text-secondary mb-4">
            CSS variable-based theme system with automatic light/dark mode support
          </p>
          <div className="bg-bg-secondary border border-border rounded-lg p-4 mb-8">
            <p className="text-sm text-text-primary">
              <strong>Theme System:</strong> All colors are defined as CSS variables in <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">globals.css</code> and 
              mapped to Tailwind classes. Use theme classes for UI surfaces (e.g., <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-bg-primary</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">text-text-primary</code>) 
              and brand classes for accents (e.g., <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-tertiary</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">text-tertiary</code>) 
              for automatic dark mode support.
            </p>
          </div>
        </div>

        {/* Theme Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Theme Colors</h2>
            <p className="text-sm text-text-secondary mb-6">
              Use these semantic theme classes for backgrounds, text, and borders. They automatically adapt to light/dark mode.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Background Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeColors.background.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Text Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {themeColors.text.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Border Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themeColors.border.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Brand Colors</h2>
            <p className="text-sm text-text-secondary mb-6">
              Primary (blue) for main CTAs and buttons; secondary (gray) for supporting surfaces; neutral (charcoal) for dark surfaces. Use theme classes for automatic light/dark.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandColors.map((color) => (
              <BrandColorCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Semantic Colors</h2>
            <p className="text-sm text-text-secondary mb-6">
              Use for status indicators and feedback. Always combine with icons/text - don't rely on color alone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {semanticColors.map((color) => (
              <SemanticColorCard key={color.name} color={color} />
            ))}
          </div>
        </section>
      </div>
    )
  },
}

export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Typography</h1>
        <p className="text-text-secondary mb-8">
          Typography scale and font families
        </p>
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Font Families</h2>
          <div className="space-y-4">
            <div className="p-6 bg-bg-secondary rounded-lg border border-border">
              <div className="text-sm text-text-secondary mb-2">Sans Serif (Primary)</div>
              <div className="text-2xl font-sans">Inter, system-ui, -apple-system</div>
            </div>
            <div className="p-6 bg-bg-secondary rounded-lg border border-border">
              <div className="text-sm text-text-secondary mb-2">Monospace</div>
              <div className="text-2xl font-mono">JetBrains Mono, Menlo, Monaco</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Font Sizes</h2>
          <div className="space-y-6">
            {[
              { name: '5xl', size: '3rem', lineHeight: '1' },
              { name: '4xl', size: '2.25rem', lineHeight: '2.5rem' },
              { name: '3xl', size: '1.875rem', lineHeight: '2.25rem' },
              { name: '2xl', size: '1.5rem', lineHeight: '2rem' },
              { name: 'xl', size: '1.25rem', lineHeight: '1.75rem' },
              { name: 'lg', size: '1.125rem', lineHeight: '1.75rem' },
              { name: 'base', size: '1rem', lineHeight: '1.5rem' },
              { name: 'sm', size: '0.875rem', lineHeight: '1.25rem' },
              { name: 'xs', size: '0.75rem', lineHeight: '1rem' },
            ].map(({ name, size, lineHeight }) => (
              <div key={name} className="p-6 bg-bg-secondary rounded-lg border border-border">
                <div className="flex items-baseline gap-4">
                  <div className="text-sm text-text-secondary font-mono w-20">{name}</div>
                  <div className={`text-${name} text-text-primary`}>
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
                <div className="text-xs text-text-tertiary mt-2 font-mono">
                  {size} / {lineHeight}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Font Weights</h2>
          <div className="space-y-4">
            {[
              { weight: '400', name: 'Regular' },
              { weight: '500', name: 'Medium' },
              { weight: '600', name: 'Semibold' },
              { weight: '700', name: 'Bold' },
            ].map(({ weight, name }) => (
              <div key={weight} className="p-6 bg-bg-secondary rounded-lg border border-border">
                <div className="text-sm text-text-secondary mb-2">{name} ({weight})</div>
                <div className="text-2xl" style={{ fontWeight: parseInt(weight) }}>
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ),
}

export const Spacing: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Spacing Scale</h1>
        <p className="text-text-secondary mb-8">
          Consistent spacing system based on 4px base unit
        </p>
      </div>

      <section className="space-y-6">
        {[
          { name: '0.5', value: '0.125rem', px: '2px' },
          { name: '1', value: '0.25rem', px: '4px' },
          { name: '2', value: '0.5rem', px: '8px' },
          { name: '3', value: '0.75rem', px: '12px' },
          { name: '4', value: '1rem', px: '16px' },
          { name: '5', value: '1.25rem', px: '20px' },
          { name: '6', value: '1.5rem', px: '24px' },
          { name: '8', value: '2rem', px: '32px' },
          { name: '10', value: '2.5rem', px: '40px' },
          { name: '12', value: '3rem', px: '48px' },
          { name: '16', value: '4rem', px: '64px' },
          { name: '20', value: '5rem', px: '80px' },
          { name: '24', value: '6rem', px: '96px' },
        ].map(({ name, value, px }) => (
          <div key={name} className="flex items-center gap-6">
            <div className="w-16 text-sm font-medium text-text-primary">{name}</div>
            <div className="w-32 text-xs text-text-secondary font-mono">{value}</div>
            <div className="w-20 text-xs text-text-tertiary">{px}</div>
            <div className="flex-1">
              <div
                className="h-8 bg-primary-500 rounded"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
}

export const BorderRadius: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Border Radius</h1>
        <p className="text-text-secondary mb-8">
          Consistent border radius values
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'xs', value: '0.125rem' },
          { name: 'sm', value: '0.25rem' },
          { name: 'base', value: '0.375rem' },
          { name: 'md', value: '0.5rem' },
          { name: 'lg', value: '0.625rem' },
          { name: 'xl', value: '0.75rem' },
          { name: '2xl', value: '0.875rem' },
          { name: '3xl', value: '1rem' },
        ].map(({ name, value }) => (
          <div key={name} className="p-6 bg-bg-secondary rounded-lg border border-border">
            <div className="text-sm font-medium text-text-primary mb-2">{name}</div>
            <div className="text-xs text-text-secondary font-mono mb-4">{value}</div>
            <div
              className="w-full h-24 bg-primary-500"
              style={{ borderRadius: value }}
            />
          </div>
        ))}
      </section>
    </div>
  ),
}

export const Shadows: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Shadows</h1>
        <p className="text-text-secondary mb-8">
          Elevation and depth system
        </p>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: 'sm', class: 'shadow-sm' },
          { name: 'base', class: 'shadow' },
          { name: 'md', class: 'shadow-md' },
          { name: 'lg', class: 'shadow-lg' },
          { name: 'xl', class: 'shadow-xl' },
          { name: '2xl', class: 'shadow-2xl' },
        ].map(({ name, class: shadowClass }) => (
          <div key={name} className="space-y-4">
            <div className="text-sm font-medium text-text-primary">{name}</div>
            <div className={`p-8 bg-bg-secondary rounded-lg ${shadowClass}`}>
              <div className="text-text-secondary text-sm">Content with {name} shadow</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  ),
}

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Responsive Breakpoints</h1>
        <p className="text-text-secondary mb-8">
          Mobile-first responsive design system
        </p>
      </div>

      <section className="space-y-6">
        <div className="p-6 bg-bg-secondary rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'xs', size: '475px', description: 'Extra small devices' },
              { name: 'sm', size: '640px', description: 'Small devices (phones)' },
              { name: 'md', size: '768px', description: 'Medium devices (tablets)' },
              { name: 'lg', size: '1024px', description: 'Large devices (desktops)' },
              { name: 'xl', size: '1280px', description: 'Extra large devices' },
              { name: '2xl', size: '1536px', description: '2X large devices' },
            ].map(({ name, size, description }) => (
              <div key={name} className="p-4 border border-border rounded-md">
                <div className="font-semibold text-text-primary mb-1">{name}</div>
                <div className="text-sm text-text-secondary font-mono mb-1">{size}</div>
                <div className="text-xs text-text-tertiary">{description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-bg-secondary rounded-lg border border-border">
          <h3 className="font-semibold mb-4 text-text-primary">Grid System</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className="p-4 bg-tertiary-lighter dark:bg-bg-tertiary rounded text-center text-sm text-text-primary"
                >
                  Col {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
}
