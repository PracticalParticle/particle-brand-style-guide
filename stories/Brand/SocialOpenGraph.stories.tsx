import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from '../../src/components/Logo/Logo'

const meta: Meta = {
  title: 'Brand/Social & Open Graph',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Recommended dimensions and usage for social sharing and link previews (Open Graph, Twitter/X, LinkedIn). Use the Logo and brand colors from this design system.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const SPECS = [
  { platform: 'Universal (Facebook, LinkedIn, Discord, Slack)', width: 1200, height: 630, ratio: '1.91:1' },
  { platform: 'Twitter / X (summary_large_image)', width: 1200, height: 675, ratio: '1.78:1' },
  { platform: 'Minimum (all platforms)', width: 600, height: 315, ratio: '1.91:1' },
] as const

export const Default: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-text-primary mb-2">Recommended dimensions</h2>
        <p className="text-sm text-text-secondary mb-4">
          Use these sizes for <code className="bg-bg-tertiary px-1 rounded">og:image</code> and{' '}
          <code className="bg-bg-tertiary px-1 rounded">twitter:image</code>. Keep focal content centered; prefer &lt; 1MB file size.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="text-left p-3 font-medium text-text-primary">Platform</th>
                <th className="text-right p-3 font-medium text-text-primary">Width × Height</th>
                <th className="text-right p-3 font-medium text-text-primary">Aspect ratio</th>
              </tr>
            </thead>
            <tbody>
              {SPECS.map((row) => (
                <tr key={row.platform} className="border-b border-border last:border-0">
                  <td className="p-3 text-text-secondary">{row.platform}</td>
                  <td className="p-3 text-right font-mono text-text-primary">
                    {row.width} × {row.height} px
                  </td>
                  <td className="p-3 text-right text-text-tertiary">{row.ratio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-2">Preview (1200×630 scaled)</h3>
        <p className="text-xs text-text-tertiary mb-3">
          Example layout using Logo on primary. Export from design tools at full size.
        </p>
        <div
          className="rounded-lg border border-border overflow-hidden bg-primary flex items-center justify-center"
          style={{ aspectRatio: '1200/630', maxWidth: 400 }}
        >
          <Logo variant="light" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Universal 1200×630 works across most platforms; use 1200×675 for Twitter summary_large_image. Source logo from Brand/Logo.',
      },
    },
  },
}
