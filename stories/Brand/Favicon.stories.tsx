import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Logo } from '../../src/components/Logo/Logo'
import { downloadLogoSvg } from '../../src/components/Logo/logoUtils'

const LOGO_RATIO = 92 / 70
const FAVICON_SIZES = [16, 32, 48, 64] as const

const meta: Meta = {
  title: 'Brand/Favicon',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Favicon sizes for browser tabs and bookmarks. Use 32×32 or 64×64 as primary. Source: Brand/Logo; export SVG then convert to ICO/PNG if needed.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-lg">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Recommended sizes</h2>
        <p className="text-sm text-text-secondary mb-4">
          Provide at least 32×32 and 64×64 for modern browsers and high-DPI. 16×16 and 48×48 cover legacy and some contexts.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {FAVICON_SIZES.map((px) => {
            const h = Math.round(px / LOGO_RATIO)
            return (
              <div
                key={px}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-bg-secondary p-4"
              >
                <div className="rounded border border-border bg-bg-primary p-2 flex items-center justify-center">
                  <Logo size={px} />
                </div>
                <span className="text-xs font-mono text-text-tertiary">
                  {px}×{h}
                </span>
                <button
                  type="button"
                  onClick={() => downloadLogoSvg('dark', px, h, `favicon-${px}.svg`)}
                  className="text-xs font-medium text-text-primary hover:text-tertiary border border-border rounded px-2 py-1 hover:bg-bg-tertiary transition-colors"
                >
                  Download SVG
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <p className="text-xs text-text-tertiary">
        Use the SVG from Brand/Logo or the download above; convert to .ico or PNG in design tools or with a favicon generator for <code className="bg-bg-tertiary px-1 rounded">favicon.ico</code> in your site root.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Favicon at 16, 32, 48, 64 px. Download SVG per size; convert to ICO/PNG for production.',
      },
    },
  },
}
