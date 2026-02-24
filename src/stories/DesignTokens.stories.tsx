import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardTitle, CardDescription, CardContent } from '@/components/Card'
import { Button } from '@/components/Button'

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
          name: 'bg-canvas (primary)',
          cssVar: '--color-bg-canvas',
          lightHex: '#F6F7F9',
          darkHex: '#0B0C0E',
          usage: 'App background',
          tailwindClass: 'bg-canvas / bg-bg-primary',
        },
        {
          name: 'bg-surface (secondary)',
          cssVar: '--color-bg-surface',
          lightHex: '#FFFFFF',
          darkHex: '#14161A',
          usage: 'Cards, panels, modals',
          tailwindClass: 'bg-surface / bg-bg-secondary',
        },
        {
          name: 'bg-surface-muted (tertiary)',
          cssVar: '--color-bg-surface-muted',
          lightHex: '#F1F3F5',
          darkHex: '#1B1E24',
          usage: 'Hovers, subtle surfaces',
          tailwindClass: 'bg-surface-muted / bg-bg-tertiary',
        },
        {
          name: 'bg-elevated',
          cssVar: '--color-bg-elevated',
          lightHex: '#FFFFFF',
          darkHex: '#191C22',
          usage: 'Modals, floating panels',
          tailwindClass: 'bg-elevated / bg-bg-elevated',
        },
      ],
      text: [
        {
          name: 'text-primary',
          cssVar: '--color-text-primary',
          lightHex: '#0A0A0A',
          darkHex: '#FAFAFA',
          usage: 'Main text, headings',
          tailwindClass: 'text-text-primary',
        },
        {
          name: 'text-secondary',
          cssVar: '--color-text-secondary',
          lightHex: '#525252',
          darkHex: '#A3A3A3',
          usage: 'Secondary text',
          tailwindClass: 'text-text-secondary',
        },
        {
          name: 'text-muted (tertiary)',
          cssVar: '--color-text-muted',
          lightHex: '#525252',
          darkHex: '#6B7280',
          usage: 'Helper text, placeholders (WCAG AA 4.5:1)',
          tailwindClass: 'text-text-muted / text-text-tertiary',
        },
        {
          name: 'text-inverse',
          cssVar: '--color-text-inverse',
          lightHex: '#FFFFFF',
          darkHex: '#0A0A0A',
          usage: 'Text on primary button: white in light (on black), black in dark (on white). Reverses with theme.',
          tailwindClass: 'text-text-inverse',
        },
      ],
      border: [
        {
          name: 'border-default',
          cssVar: '--color-border-default',
          lightHex: '#E5E7EB',
          darkHex: '#2A2F36',
          usage: 'Default borders',
          tailwindClass: 'border-border / border-default',
        },
        {
          name: 'border-hover / strong',
          cssVar: '--color-border-hover',
          lightHex: '#D1D5DB',
          darkHex: '#3A414A',
          usage: 'Borders on hover, emphasis',
          tailwindClass: 'border-border-hover / border-strong',
        },
        {
          name: 'border-focus',
          cssVar: '--color-border-focus',
          lightHex: '#404040',
          darkHex: '#A3A3A3',
          usage: 'Neutral focus ring (no brand color)',
          tailwindClass: 'border-border-focus',
        },
        {
          name: 'border-subtle',
          cssVar: '--color-border-subtle',
          lightHex: '#F1F5F9',
          darkHex: '#1F242B',
          usage: 'Very light dividers',
          tailwindClass: 'border-border-subtle',
        },
        {
          name: 'border-table',
          cssVar: '--color-border-table',
          lightHex: '#E5E7EB',
          darkHex: '#181C22',
          usage: 'Table row/header borders',
          tailwindClass: 'border-border-table',
        },
      ],
    }

    const brandColors = [
      {
        name: 'Brand primary (monochrome)',
        cssVar: '--color-btn-primary / --color-brand-primary',
        lightHex: '#0A0A0A',
        darkHex: '#FAFAFA',
        usage: 'Primary CTA, buttons. Black block (light) / white block (dark). No blue.',
        tailwindClass: 'bg-btn-primary',
        variants: [
          { name: 'primary-hover', cssVar: '--color-btn-primary-hover', lightHex: '#141414', darkHex: '#F3F4F6', usage: 'Hover state' },
          { name: 'primary-active', cssVar: '--color-btn-primary-active', lightHex: '#1E1E1E', darkHex: '#E5E7EB', usage: 'Active/pressed state' },
          { name: 'tertiary (alias)', cssVar: '--color-tertiary', lightHex: '#0A0A0A', darkHex: '#FAFAFA', usage: 'Same as primary button in monochrome' },
          { name: 'tertiary-light', cssVar: '--color-tertiary-light', lightHex: '#F1F3F5', darkHex: '#1B1E24', usage: 'Subtle surface, not brand tint' },
          { name: 'tertiary-lighter', cssVar: '--color-tertiary-lighter', lightHex: '#F1F3F5', darkHex: '#1B1E24', usage: 'Very subtle surface' },
        ],
      },
      {
        name: 'Surface / secondary',
        cssVar: '--color-secondary',
        lightHex: '#FFFFFF',
        darkHex: '#14161A',
        usage: 'Card/surface background, ghost button hover',
        tailwindClass: 'bg-secondary',
        variants: [
          { name: 'secondary-hover', cssVar: '--color-secondary-hover', lightHex: '#F1F3F5', darkHex: '#1B1E24', usage: 'Hover state' },
          { name: 'secondary-active', cssVar: '--color-secondary-active', lightHex: '#E5E7EB', darkHex: '#0B0C0E', usage: 'Active/pressed state' },
        ],
      },
      {
        name: 'Charcoal / primary (surfaces)',
        cssVar: '--color-primary',
        lightHex: '#0A0A0A',
        darkHex: '#FAFAFA',
        usage: 'Brand black (light) or white (dark). Use with text-inverse on buttons.',
        tailwindClass: 'bg-primary',
        variants: [
          { name: 'primary-hover', cssVar: '--color-primary-hover', lightHex: '#141414', darkHex: '#F3F4F6', usage: 'Hover state' },
          { name: 'primary-active', cssVar: '--color-primary-active', lightHex: '#1E1E1E', darkHex: '#E5E7EB', usage: 'Active/pressed state' },
        ],
      },
      {
        name: 'black',
        cssVar: '--color-black',
        lightHex: '#000000',
        darkHex: '#000000',
        usage: 'High contrast, dark elements',
        tailwindClass: 'bg-black',
        variants: [],
      },
      {
        name: 'white',
        cssVar: '--color-white',
        lightHex: '#FFFFFF',
        darkHex: '#FFFFFF',
        usage: 'High contrast, light elements',
        tailwindClass: 'bg-white',
        variants: [],
      },
    ]

    const semanticColors = [
      {
        name: 'success',
        cssVar: '--color-success',
        hex: '#166534',
        usage: 'Success messages, completed states (light mode)',
        tailwindClass: 'bg-success',
        lightVar: '--color-success-light',
        lightHex: '#DCFCE7',
        darkHex: '#34D399',
        darkLightHex: '#064E3B',
      },
      {
        name: 'error',
        cssVar: '--color-error',
        hex: '#B91C1C',
        usage: 'Errors, destructive actions (light mode)',
        tailwindClass: 'bg-error',
        lightVar: '--color-error-light',
        lightHex: '#FEE2E2',
        darkHex: '#F87171',
        darkLightHex: '#4A0C0C',
      },
      {
        name: 'warning',
        cssVar: '--color-warning',
        hex: '#B45309',
        usage: 'Warnings, caution states (light mode)',
        tailwindClass: 'bg-warning',
        lightVar: '--color-warning-light',
        lightHex: '#FEF3C7',
        darkHex: '#FBBF24',
        darkLightHex: '#4A2209',
      },
      {
        name: 'info',
        cssVar: '--color-info',
        hex: '#374151',
        usage: 'Informational messages (neutral, no blue brand)',
        tailwindClass: 'bg-info',
        lightVar: '--color-info-light',
        lightHex: '#F3F4F6',
        darkHex: '#9CA3AF',
        darkLightHex: '#1F2937',
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
      <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-4 min-w-0 min-h-0 max-h-[28rem] overflow-y-auto break-words" tabIndex={0} role="region" aria-label={`Color token: ${name}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-text-primary mb-1 break-words">{name}</div>
            <div className="text-sm text-text-secondary mb-2 break-words">{usage}</div>
            <div className="text-xs font-mono text-text-tertiary space-y-1 break-all">
              <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{cssVar}</code></div>
              <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{tailwindClass}</code></div>
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
      <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-4 min-w-0 min-h-0 max-h-[28rem] overflow-y-auto break-words" tabIndex={0} role="region" aria-label={`Brand color: ${color.name}`}>
        <div className="min-w-0">
          <div className="font-semibold text-text-primary mb-1 capitalize break-words">{color.name}</div>
          <div className="text-sm text-text-secondary mb-2 break-words">{color.usage}</div>
          <div className="text-xs font-mono text-text-tertiary space-y-1 break-all">
            <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{color.cssVar}</code></div>
            <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{color.tailwindClass}</code></div>
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
              <div key={variant.name} className="flex items-center justify-between gap-2 text-xs min-w-0">
                <div className="min-w-0 break-words flex-1">
                  <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{variant.name}</code>
                  <span className="text-text-tertiary ml-2 break-words">{variant.usage}</span>
                </div>
                <div className="font-mono text-text-secondary shrink-0">
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
      <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-4 min-w-0 min-h-0 max-h-[28rem] overflow-y-auto break-words" tabIndex={0} role="region" aria-label={`Semantic color: ${color.name}`}>
        <div className="min-w-0">
          <div className="font-semibold text-text-primary mb-1 capitalize break-words">{color.name}</div>
          <div className="text-sm text-text-secondary mb-2 break-words">{color.usage}</div>
          <div className="text-xs font-mono text-text-tertiary space-y-1 break-all">
            <div>CSS: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{color.cssVar}</code></div>
            <div>Class: <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded break-all">{color.tailwindClass}</code></div>
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
      <div className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12 w-full min-h-screen max-w-[1600px]">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-text-primary">Theme Color System</h1>
          <p className="text-sm sm:text-base text-text-secondary mb-4">
            CSS variable-based theme system with automatic light/dark mode support
          </p>
          <div className="bg-bg-secondary border border-border rounded-lg p-4 mb-8">
            <p className="text-sm text-text-primary">
              <strong>Theme System:</strong> All colors are defined as CSS variables in <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">globals.css</code> and 
              mapped to Tailwind. Use <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-canvas</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-surface</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">text-primary</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">border-default</code> 
              (or legacy <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-bg-primary</code>, <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">text-text-primary</code>). 
              Brand is monochrome: <code className="text-text-primary font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-btn-primary</code> for primary buttons (black/white block).
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {themeColors.background.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Text Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {themeColors.text.map((color) => (
                <ColorCard key={color.name} {...color} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Border Colors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
            <p className="text-sm text-text-secondary mb-6 break-words">
              Brand is monochrome: primary = black block (light) / white block (dark). No blue. Use <code className="bg-bg-tertiary px-1 py-0.5 rounded text-text-primary">bg-btn-primary</code> for CTAs; theme classes for surfaces.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            {semanticColors.map((color) => (
              <SemanticColorCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Brand palette (top 5) — identicons, contract/dapp logos */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Brand palette (identicons)</h2>
            <p className="text-sm text-text-secondary mb-6">
              Top 5 system brand colors: blue, purple, black, white, gray. Used for contract/dapp generated logos (identicons).
              CSS: <code className="bg-bg-tertiary px-1 py-0.5 rounded font-mono">--brand-palette-1</code> … <code className="bg-bg-tertiary px-1 py-0.5 rounded font-mono">--brand-palette-5</code>. Values switch automatically in light/dark mode.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: 'Blue', cssVar: '--brand-palette-1', lightHex: '#2563EB', darkHex: '#60A5FA' },
              { name: 'Purple', cssVar: '--brand-palette-2', lightHex: '#7C3AED', darkHex: '#A78BFA' },
              { name: 'Black', cssVar: '--brand-palette-3', lightHex: '#0A0A0A', darkHex: '#111827' },
              { name: 'White', cssVar: '--brand-palette-4', lightHex: '#FFFFFF', darkHex: '#FAFAFA' },
              { name: 'Gray', cssVar: '--brand-palette-5', lightHex: '#374151', darkHex: '#9CA3AF' },
            ].map((item) => (
              <div key={item.cssVar} className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-4" tabIndex={0} role="region" aria-label={`Brand palette: ${item.name}`}>
                <div className="font-semibold text-text-primary">{item.name}</div>
                <div className="text-xs font-mono text-text-tertiary">
                  <code className="bg-bg-tertiary px-1 py-0.5 rounded">{item.cssVar}</code>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Light</div>
                    <div className="h-12 rounded-md border border-border" style={{ backgroundColor: item.lightHex }} />
                    <div className="text-xs font-mono text-text-secondary mt-1">{item.lightHex}</div>
                  </div>
                  <div>
                    <div className="text-xs text-text-tertiary mb-1">Dark</div>
                    <div className="h-12 rounded-md border border-border" style={{ backgroundColor: item.darkHex }} />
                    <div className="text-xs font-mono text-text-secondary mt-1">{item.darkHex}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Backdrop, Highlight, Data, Skeleton, Glass, Layer, Focus */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary mb-2">More tokens</h2>
          <p className="text-sm text-text-secondary mb-6">
            Backdrop, highlight, data viz, skeleton, glass, layer opacities, and focus. Use for overlays, emphasis, charts, loading states, and glass panels.
          </p>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Backdrop</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary">
                <code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-backdrop</code>, <code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-backdrop-opacity-light</code> / <code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-backdrop-opacity-dark</code>
              </div>
              <p className="text-xs text-text-tertiary">Modal/overlay dim. Classes: <code className="bg-bg-tertiary px-1 rounded">bg-backdrop</code>, <code className="bg-bg-tertiary px-1 rounded">bg-backdrop-dark</code>.</p>
              <div className="flex gap-4 mt-3">
                <div className="h-14 w-24 rounded bg-backdrop border border-border" />
                <div className="h-14 w-24 rounded bg-backdrop-dark border border-border" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Highlight (emphasis)</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary">
                <code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-highlight</code>, <code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-highlight-text</code>
              </div>
              <p className="text-xs text-text-tertiary">Search match, emphasis. Classes: <code className="bg-bg-tertiary px-1 rounded">bg-highlight</code>, <code className="bg-bg-tertiary px-1 rounded">text-highlight</code>, <code className="bg-bg-tertiary px-1 rounded">.text-highlight</code>.</p>
              <p className="text-sm bg-highlight text-highlight-text px-2 py-1 rounded inline-block">Example highlight</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Data viz (1–6)</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <p className="text-xs text-text-tertiary">Charts, series. <code className="bg-bg-tertiary px-1 rounded">bg-data-1</code> … <code className="bg-bg-tertiary px-1 rounded">bg-data-6</code>, <code className="bg-bg-tertiary px-1 rounded">text-data-1</code> … <code className="bg-bg-tertiary px-1 rounded">text-data-6</code>.</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="h-8 w-12 rounded bg-data-1 border border-border" title="data-1" />
                <div className="h-8 w-12 rounded bg-data-2 border border-border" title="data-2" />
                <div className="h-8 w-12 rounded bg-data-3 border border-border" title="data-3" />
                <div className="h-8 w-12 rounded bg-data-4 border border-border" title="data-4" />
                <div className="h-8 w-12 rounded bg-data-5 border border-border" title="data-5" />
                <div className="h-8 w-12 rounded bg-data-6 border border-border" title="data-6" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Skeleton</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary"><code className="bg-bg-tertiary px-1 py-0.5 rounded">--color-skeleton</code></div>
              <p className="text-xs text-text-tertiary">Loading placeholders. Class: <code className="bg-bg-tertiary px-1 rounded">bg-skeleton</code>.</p>
              <div className="h-8 w-32 rounded bg-skeleton mt-2" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Glass</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary">
                <code className="bg-bg-tertiary px-1 py-0.5 rounded">--glass-bg-opacity</code>, <code className="bg-bg-tertiary px-1 py-0.5 rounded">--glass-blur</code>, <code className="bg-bg-tertiary px-1 py-0.5 rounded">--glass-border-opacity</code>
              </div>
              <p className="text-xs text-text-tertiary">Light/dark values. Usage: <code className="bg-bg-tertiary px-1 rounded">.surface-glass</code>, <code className="bg-bg-tertiary px-1 rounded">.card-glass</code>.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Layer opacities</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary">
                <code className="bg-bg-tertiary px-1 py-0.5 rounded">--layer-surface-overlay</code> (0.95), <code className="bg-bg-tertiary px-1 py-0.5 rounded">--layer-surface-soft</code> (0.9), <code className="bg-bg-tertiary px-1 py-0.5 rounded">--layer-muted-overlay</code> (0.8)
              </div>
              <p className="text-xs text-text-tertiary">Usage: <code className="bg-bg-tertiary px-1 rounded">opacity-layer-overlay</code>, <code className="bg-bg-tertiary px-1 rounded">bg-bg-surface/95</code>.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-text-primary mb-4">Focus ring</h3>
            <div className="p-4 sm:p-6 bg-bg-secondary rounded-lg border border-border space-y-2">
              <div className="text-sm text-text-secondary"><code className="bg-bg-tertiary px-1 py-0.5 rounded">--focus-ring</code>, <code className="bg-bg-tertiary px-1 py-0.5 rounded">--focus-ring-offset</code></div>
              <p className="text-xs text-text-tertiary">Usage: <code className="bg-bg-tertiary px-1 rounded">.focus-ring</code> on interactive elements.</p>
              <Button type="button" variant="outline" size="sm">Focus me</Button>
            </div>
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
                  <div className="text-text-primary" style={{ fontSize: size, lineHeight }}>
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
                className="h-8 bg-primary rounded"
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

export const DuotoneGradients: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Duotone Gradients</h1>
        <p className="text-text-secondary mb-4">
          Enterprise-appropriate gradient backgrounds for hero sections, marketing pages, and feature blocks.
          Use <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">bg-duotone-subtle</code> or{' '}
          <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">bg-duotone-hero</code>.
          Place cards with <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">variant=&quot;glass&quot;</code> or{' '}
          <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">variant=&quot;on-gradient&quot;</code> on top for readability.
        </p>
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">bg-duotone-subtle</h2>
          <div className="bg-duotone-subtle rounded-xl p-8 min-h-[200px] flex flex-col gap-4">
            <p className="text-text-primary">Section with subtle neutral gradient at the edges.</p>
            <Card variant="on-gradient" padding="md">
              <CardTitle>Card on gradient</CardTitle>
              <CardDescription>Use variant=&quot;on-gradient&quot; or &quot;glass&quot; for content on duotone backgrounds.</CardDescription>
              <CardContent className="mt-2">
                <Button variant="primary">Primary action</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">bg-duotone-hero</h2>
          <div className="bg-duotone-hero rounded-xl p-8 min-h-[200px] flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-text-primary">Hero section</h3>
            <p className="text-text-secondary max-w-xl">Stronger neutral gradient for marketing headers. Cards and buttons remain readable.</p>
            <div className="flex flex-wrap gap-3">
              <Card variant="glass" padding="sm">
                <CardTitle className="text-base">Glass card</CardTitle>
                <CardDescription>Translucent with backdrop blur.</CardDescription>
              </Card>
              <Card variant="on-gradient" padding="sm">
                <CardTitle className="text-base">On-gradient card</CardTitle>
                <CardDescription>Near-opaque for dense content.</CardDescription>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  ),
}

export const SurfaceOnGradient: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Surfaces on Gradient Backgrounds</h1>
        <p className="text-text-secondary mb-4">
          Card variants designed for use on <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">bg-duotone-subtle</code> /{' '}
          <code className="text-tertiary dark:text-tertiary-on-dark bg-bg-tertiary px-1 py-0.5 rounded font-mono text-sm">bg-duotone-hero</code>.
          Use <strong>glass</strong> for a lighter overlay; use <strong>on-gradient</strong> when content needs maximum readability.
        </p>
      </div>

      <section className="bg-duotone-hero rounded-xl p-8 space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Cards on bg-duotone-hero</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass" padding="lg">
            <CardTitle>Glass variant</CardTitle>
            <CardDescription>Backdrop blur, translucent. Best for short content and overlays.</CardDescription>
            <CardContent className="mt-4">
              <Button variant="secondary" size="sm">Learn more</Button>
            </CardContent>
          </Card>
          <Card variant="on-gradient" padding="lg">
            <CardTitle>On-gradient variant</CardTitle>
            <CardDescription>Near-opaque surface with light blur. Best for feature blocks and marketing copy.</CardDescription>
            <CardContent className="mt-4">
              <Button variant="primary" size="sm">Get started</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="p-6 bg-bg-secondary rounded-lg border border-border">
        <h2 className="text-lg font-semibold text-text-primary mb-2">Glass accessibility</h2>
        <p className="text-sm text-text-secondary">
          When users enable <strong>Reduce transparency</strong> (e.g. macOS Accessibility, Windows), glass and on-gradient cards
          automatically fall back to a solid background (<code className="font-mono bg-bg-tertiary px-1 py-0.5 rounded">bg-bg-secondary</code>) and
          backdrop blur is removed. See <code className="font-mono bg-bg-tertiary px-1 py-0.5 rounded">docs/THEME_SYSTEM.md</code> and{' '}
          <code className="font-mono bg-bg-tertiary px-1 py-0.5 rounded">prefers-reduced-transparency</code> in globals.css.
        </p>
      </section>
    </div>
  ),
}

export const SurfacesAndDepth: Story = {
  render: () => (
    <div className="p-8 space-y-12 w-full min-h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-text-primary">Surfaces and Depth</h1>
        <p className="text-text-secondary mb-4">
          Layer opacities, glass tokens, neutral gradients, and edge highlights. Use <strong>solid</strong> for content cards and forms;
          <strong> glass</strong> for overlays and nav; <strong>translucent</strong> layers and <strong>gradients</strong> for depth without color.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Layer opacities (translucent surfaces)</h2>
        <p className="text-sm text-text-secondary">
          Use these as <strong>background alpha modifiers</strong> (e.g. <code className="bg-bg-tertiary px-1 py-0.5 rounded font-mono">bg-bg-surface/95</code>) — not as element-level opacity — so text inside keeps full contrast.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg border border-border bg-bg-surface/95">
            <code className="text-sm font-mono text-text-secondary">--layer-surface-overlay</code>
            <p className="text-xs text-text-secondary mt-1">0.95 — cards on canvas, modals</p>
            <p className="text-xs text-text-muted mt-0.5">bg-bg-surface/95</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-bg-surface/90">
            <code className="text-sm font-mono text-text-secondary">--layer-surface-soft</code>
            <p className="text-xs text-text-secondary mt-1">0.90 — softer overlay</p>
            <p className="text-xs text-text-muted mt-0.5">bg-bg-surface/90</p>
          </div>
          <div className="p-4 rounded-lg border border-border bg-bg-surface-muted/80">
            <code className="text-sm font-mono text-text-secondary">--layer-muted-overlay</code>
            <p className="text-xs text-text-secondary mt-1">0.80 — hover, secondary panels</p>
            <p className="text-xs text-text-muted mt-0.5">bg-bg-surface-muted/80</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Glass tokens</h2>
        <div className="p-4 rounded-lg border border-border surface-glass max-w-xl">
          <code className="text-sm font-mono text-text-secondary">.surface-glass</code> / <code className="text-sm font-mono text-text-secondary">.card-glass</code>
          <p className="text-xs text-text-tertiary mt-2">
            CSS: <code>--glass-bg-opacity</code>, <code>--glass-blur</code>, <code>--glass-border-opacity</code>. Use for nav, modals, ActionSheet.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Neutral gradients</h2>
        <div className="space-y-4">
          <div className="bg-gradient-canvas rounded-xl p-6 min-h-[120px]">
            <code className="text-sm font-mono text-text-secondary">.bg-gradient-canvas</code>
            <p className="text-xs text-text-tertiary mt-1">Default page background — subtle vertical depth</p>
          </div>
          <div className="bg-gradient-hero triangle-pattern-hero rounded-xl p-6 min-h-[120px]">
            <code className="text-sm font-mono text-text-secondary">.bg-gradient-hero</code> + <code className="text-sm font-mono text-text-secondary">.triangle-pattern-hero</code>
            <p className="text-xs text-text-tertiary mt-1">Hero / intro — Particle signature look</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Edge highlight &amp; card shine</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card variant="default" padding="md">
            <CardTitle>Default card</CardTitle>
            <CardDescription>Uses <code className="bg-bg-tertiary px-1 rounded text-xs">edge-highlight</code> and <code className="bg-bg-tertiary px-1 rounded text-xs">card-shine</code> for premium feel.</CardDescription>
          </Card>
          <div className="p-4 rounded-lg border border-border bg-btn-primary text-text-inverse edge-highlight flex flex-col justify-center">
            <code className="text-sm font-mono text-text-inverse/90">.edge-highlight</code>
            <p className="text-xs text-text-inverse/80 mt-1">1px top highlight (dark mode focus)</p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-text-primary">Triangle motif &amp; signal line</h2>
        <div className="space-y-4">
          <div className="triangle-pattern rounded-xl p-6 min-h-[80px]">
            <code className="text-sm font-mono text-text-secondary">.triangle-pattern</code> — 2–3% opacity, 20px scale
          </div>
          <div className="triangle-pattern-hero rounded-xl p-6 min-h-[80px]">
            <code className="text-sm font-mono text-text-secondary">.triangle-pattern-hero</code> — 1–2% opacity, 40px scale
          </div>
          <div className="signal-line h-12 rounded-lg border border-border bg-bg-secondary flex items-center justify-center">
            <code className="text-sm font-mono text-text-secondary">.signal-line</code> — 45° diagonal accent (logo-aligned)
          </div>
        </div>
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
                  className="p-4 bg-surface-muted dark:bg-bg-tertiary rounded text-center text-sm text-text-primary"
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
