import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Logo } from '@/components/Logo'
import { downloadLogoSvg, type LogoExportVariant } from '@/components/Logo'

const meta: Meta = {
  title: 'Brand/Social and Open Graph',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Recommended dimensions and usage for social sharing and link previews. Pick size, logo variant, and background — preview updates live. Download logo SVG at the chosen size.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const DIMENSIONS = [
  { id: '1200x630', width: 1200, height: 630, label: 'Universal (Facebook, LinkedIn, Discord, Slack)', ratio: '1.91:1' },
  { id: '1200x675', width: 1200, height: 675, label: 'Twitter / X (summary_large_image)', ratio: '1.78:1' },
  { id: '600x315', width: 600, height: 315, label: 'Minimum (all platforms)', ratio: '1.91:1' },
] as const

const VARIANTS: { value: LogoExportVariant; label: string }[] = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
  { value: 'tertiary', label: 'Tertiary' },
]

const BACKGROUNDS: { value: string; label: string; bgClass: string; previewVars?: React.CSSProperties }[] = [
  { value: 'primary', label: 'Primary', bgClass: 'bg-primary', previewVars: { ['--color-text-inverse' as string]: '255 255 255' } },
  { value: 'white', label: 'White', bgClass: 'bg-white', previewVars: { ['--color-primary' as string]: '10 10 10' } },
  { value: 'black', label: 'Black', bgClass: 'bg-black', previewVars: { ['--color-text-inverse' as string]: '255 255 255' } },
  { value: 'tertiary', label: 'Tertiary', bgClass: 'bg-tertiary', previewVars: { ['--color-text-inverse' as string]: '255 255 255' } },
  { value: 'bg-secondary', label: 'Surface', bgClass: 'bg-bg-secondary', previewVars: { ['--color-primary' as string]: '10 10 10', ['--color-bg-secondary' as string]: '255 255 255' } },
]

function SocialOpenGraphPlayground() {
  const [dimensionId, setDimensionId] = useState<string>('1200x630')
  const [variant, setVariant] = useState<LogoExportVariant>('light')
  const [backgroundId, setBackgroundId] = useState<string>('primary')

  const dim = DIMENSIONS.find((d) => d.id === dimensionId) ?? DIMENSIONS[0]
  const bg = BACKGROUNDS.find((b) => b.value === backgroundId) ?? BACKGROUNDS[0]

  const handleDownload = () => {
    const logoW = Math.min(dim.width, dim.height * (92 / 70))
    const logoH = Math.round(logoW / (92 / 70))
    downloadLogoSvg(variant, logoW, logoH, `particle-og-${dim.width}x${dim.height}-${variant}.svg`)
  }

  return (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Dimensions</h2>
        <p className="text-sm text-text-secondary mb-3">
          Choose size for <code className="bg-bg-tertiary px-1 rounded">og:image</code> / <code className="bg-bg-tertiary px-1 rounded">twitter:image</code>. Preview and download update to match.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="text-left p-3 font-medium text-text-primary">Platform</th>
                <th className="text-right p-3 font-medium text-text-primary">Width × Height</th>
                <th className="text-right p-3 font-medium text-text-primary">Aspect</th>
                <th className="w-24 p-3 text-center font-medium text-text-primary">Use</th>
              </tr>
            </thead>
            <tbody>
              {DIMENSIONS.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-border last:border-0 cursor-pointer hover:bg-bg-tertiary ${dimensionId === row.id ? 'bg-bg-tertiary' : ''}`}
                  onClick={() => setDimensionId(row.id)}
                >
                  <td className="p-3 text-text-secondary">{row.label}</td>
                  <td className="p-3 text-right font-mono text-text-primary">
                    {row.width} × {row.height} px
                  </td>
                  <td className="p-3 text-right text-text-tertiary">{row.ratio}</td>
                  <td className="p-3 text-center">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setDimensionId(row.id); }}
                      className="text-xs font-medium text-primary dark:text-text-primary hover:underline"
                    >
                      {dimensionId === row.id ? 'Selected' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <div className="flex-1 w-full">
          <h3 className="text-sm font-semibold text-text-primary mb-2">Preview</h3>
          <p className="text-xs text-text-tertiary mb-2">
            {dim.width}×{dim.height} (scaled). Logo centered on selected background.
          </p>
          <div
            style={{
              aspectRatio: `${dim.width}/${dim.height}`,
              maxWidth: 420,
              ...bg.previewVars,
            }}
            className={`rounded-lg border border-border overflow-hidden flex items-center justify-center ${bg.bgClass}`}
          >
            <Logo variant={variant} size="xl" />
          </div>
        </div>
        <div className="flex flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownload}
            className="rounded-md border border-border bg-bg-primary px-4 py-2 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-colors"
          >
            Download logo SVG
          </button>
          <span className="text-xs text-text-tertiary">
            Logo at {dim.width}×{dim.height} (SVG). For full OG image, use in design tools.
          </span>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = {
  render: () => <SocialOpenGraphPlayground />,
  parameters: {
    docs: {
      description: {
        story: 'Select dimension, logo variant, and background. Preview updates; download exports the logo SVG at the chosen size.',
      },
    },
  },
}
