import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Logo, downloadLogoSvg, type LogoExportVariant } from '@/components/Logo'

const LOGO_RATIO = 92 / 70
const FAVICON_SIZES = [16, 32, 48, 64] as const
type FaviconSize = (typeof FAVICON_SIZES)[number]

const meta: Meta = {
  title: 'Brand/Favicon',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Favicon sizes for browser tabs and bookmarks. Pick size, logo variant, and background — preview updates. Download SVG on click.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const VARIANTS: { value: LogoExportVariant; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'tertiary', label: 'Tertiary' },
]

const BACKGROUNDS: { value: string; label: string; bgClass: string; previewVars?: React.CSSProperties }[] = [
  { value: 'bg-primary', label: 'Page', bgClass: 'bg-bg-primary', previewVars: { ['--color-primary' as string]: '10 10 10', ['--color-bg-primary' as string]: '241 245 249' } },
  { value: 'white', label: 'White', bgClass: 'bg-white', previewVars: { ['--color-primary' as string]: '10 10 10' } },
  { value: 'primary', label: 'Primary', bgClass: 'bg-primary', previewVars: { ['--color-text-inverse' as string]: '255 255 255' } },
  { value: 'transparent', label: 'Transparent', bgClass: 'bg-transparent', previewVars: { ['--color-primary' as string]: '10 10 10' } },
]

function FaviconPlayground() {
  const [size, setSize] = useState<FaviconSize>(32)
  const [variant, setVariant] = useState<LogoExportVariant>('dark')
  const [backgroundId, setBackgroundId] = useState<string>('bg-primary')

  const bg = BACKGROUNDS.find((b) => b.value === backgroundId) ?? BACKGROUNDS[0]
  const heightPx = Math.round(size / LOGO_RATIO)

  const handleDownload = () => {
    downloadLogoSvg(variant, size, heightPx, `favicon-${size}-${variant}.svg`)
  }

  const isTransparent = backgroundId === 'transparent'
  const previewStyle = isTransparent
    ? {
        backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
      }
    : undefined

  return (
    <div className="space-y-8 w-full max-w-lg">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Size</h2>
        <div className="flex flex-wrap gap-2">
          {FAVICON_SIZES.map((px) => (
            <button
              key={px}
              type="button"
              onClick={() => setSize(px)}
              className={`rounded-md border px-3 py-2 text-sm font-medium font-mono transition-colors ${
                size === px
                  ? 'border-border bg-bg-tertiary text-text-primary'
                  : 'border-border bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
              }`}
            >
              {px}×{Math.round(px / LOGO_RATIO)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-2">Logo variant</h3>
          <div className="flex flex-wrap gap-2">
            {VARIANTS.map((v) => (
              <button
                key={v.value}
                type="button"
                onClick={() => setVariant(v.value)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  variant === v.value
                    ? 'border-border bg-bg-tertiary text-text-primary'
                    : 'border-border bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-2">Background</h3>
          <div className="flex flex-wrap gap-2">
            {BACKGROUNDS.map((b) => (
              <button
                key={b.value}
                type="button"
                onClick={() => setBackgroundId(b.value)}
                className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  backgroundId === b.value
                    ? 'border-border bg-bg-tertiary text-text-primary'
                    : 'border-border bg-bg-secondary text-text-secondary hover:bg-bg-tertiary'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-text-primary mb-2">Preview</h3>
          <p className="text-xs text-text-tertiary mb-2">
            {size}×{heightPx} px (scaled up for visibility).
          </p>
          <div
            style={{
              ...previewStyle,
              ...bg.previewVars,
            }}
            className={`rounded-lg border border-border flex items-center justify-center w-24 h-24 shrink-0 ${!isTransparent ? bg.bgClass : ''}`}
          >
            <div className="scale-[2] origin-center">
              <Logo variant={variant} size={size} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-md border border-border bg-bg-primary px-4 py-2 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-colors"
          >
            Download SVG
          </button>
          <span className="text-xs text-text-tertiary">
            favicon-{size}-{variant}.svg
          </span>
        </div>
      </div>

      <p className="text-xs text-text-tertiary">
        Convert to .ico or PNG in design tools or a favicon generator for <code className="bg-bg-tertiary px-1 rounded">favicon.ico</code> in your site root.
      </p>
    </div>
  )
}

export const Default: Story = {
  render: () => <FaviconPlayground />,
  parameters: {
    docs: {
      description: {
        story: 'Select size, logo variant, and background. Preview updates; download exports the logo SVG at the chosen size.',
      },
    },
  },
}
