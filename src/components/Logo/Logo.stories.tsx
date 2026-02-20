import type { Meta, StoryObj } from '@storybook/react'
import { cn } from '@/utils/cn'
import { Logo } from './Logo'
import { downloadLogoSvg, type LogoExportVariant } from './logoUtils'
import { LOGO_ASPECT_RATIO } from './logoConstants'

const PREVIEW_SIZE = 120
const PREVIEW_H = Math.round(PREVIEW_SIZE / LOGO_ASPECT_RATIO)

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Particle logo for SaaS, websites, and social. Uses brand colors only: primary (charcoal), text-inverse (white), tertiary (corporate blue).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'tertiary'],
      description: 'Dark = on light backgrounds; Light = on dark backgrounds; Tertiary = brand blue.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 16, 24, 32, 48, 64, 128, 256],
      description: 'Preset (xs–2xl) or pixel size for favicon/social.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

// --- Brand-only logo collection (first = default) ---

type BgPreset =
  | 'transparent'
  | 'white'
  | 'black'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'bg-primary'
  | 'bg-secondary'

interface LogoCardOption {
  id: string
  name: string
  usage: string
  variant: LogoExportVariant
  bg: BgPreset
  /** CSS variable overrides so preview is correct in both light and dark theme */
  previewVars: React.CSSProperties
  /** Tailwind bg class for the preview (when not transparent) */
  bgClass: string
}

// Distinct combinations only: dark on light = white/surface/page bg; transparent has dark + light.
const COLLECTION_OPTIONS: LogoCardOption[] = [
  {
    id: 'dark-light-bg',
    name: 'Dark logo on light',
    usage: 'Light pages, documents, print, cards, panels, surface, page background',
    variant: 'dark',
    bg: 'white',
    previewVars: { ['--color-primary' as string]: '10 10 10', ['--color-text-primary' as string]: '10 10 10' },
    bgClass: 'bg-white',
  },
  {
    id: 'dark-transparent',
    name: 'Dark logo on transparent',
    usage: 'Overlays on light, PNG export, watermarks',
    variant: 'dark',
    bg: 'transparent',
    previewVars: { ['--color-primary' as string]: '10 10 10', ['--color-text-primary' as string]: '10 10 10' },
    bgClass: 'bg-transparent',
  },
  {
    id: 'light-transparent',
    name: 'Light logo on transparent',
    usage: 'Overlays on dark, PNG export, watermarks',
    variant: 'light',
    bg: 'transparent',
    previewVars: { ['--color-text-inverse' as string]: '255 255 255' },
    bgClass: 'bg-transparent',
  },
  {
    id: 'light-dark-bg',
    name: 'Light logo on dark',
    usage: 'Headers, nav, footer, dark mode hero, high contrast (primary or black)',
    variant: 'light',
    bg: 'primary',
    previewVars: {
      ['--color-primary' as string]: '10 10 10',
      ['--color-text-inverse' as string]: '255 255 255',
    },
    bgClass: 'bg-primary',
  },
  {
    id: 'light-tertiary',
    name: 'Light logo on tertiary',
    usage: 'CTAs, feature blocks (brand blue)',
    variant: 'light',
    bg: 'tertiary',
    previewVars: {
      ['--color-text-inverse' as string]: '255 255 255',
      ['--color-tertiary' as string]: '31 78 216',
    },
    bgClass: 'bg-tertiary',
  },
  {
    id: 'tertiary-light-bg',
    name: 'Tertiary logo on light',
    usage: 'Accent branding on light (white, surface, cards, dashboards)',
    variant: 'tertiary',
    bg: 'white',
    previewVars: {
      ['--color-tertiary' as string]: '31 78 216',
    },
    bgClass: 'bg-white',
  },
]

const CHECKERBOARD_STYLE: React.CSSProperties = {
  backgroundImage: `linear-gradient(45deg, rgb(var(--color-bg-tertiary)) 25%, transparent 25%), linear-gradient(-45deg, rgb(var(--color-bg-tertiary)) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgb(var(--color-bg-tertiary)) 75%), linear-gradient(-45deg, transparent 75%, rgb(var(--color-bg-tertiary)) 75%)`,
  backgroundSize: '12px 12px',
  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
}

function LogoCard({ option }: { option: LogoCardOption }) {
  const handleDownload = () => {
    downloadLogoSvg(
      option.variant,
      PREVIEW_SIZE,
      PREVIEW_H,
      `particle-logo-${option.variant}-${option.bg}.svg`
    )
  }
  const isTransparent = option.bg === 'transparent'
  return (
    <div className="p-4 rounded border border-border bg-bg-secondary space-y-3 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-text-primary mb-1">{option.name}</div>
          <div className="text-sm text-text-secondary mb-2">{option.usage}</div>
          <div className="text-xs font-mono text-text-tertiary space-y-1">
            <div>
              Variant: <code className="bg-bg-tertiary text-text-primary px-1 py-0.5 rounded">{option.variant}</code>
            </div>
            <div>
              Background: <code className="bg-bg-tertiary text-text-primary px-1 py-0.5 rounded">{option.bg}</code>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          className="shrink-0 rounded-md border border-border bg-bg-primary px-3 py-2 text-sm font-medium text-text-primary hover:bg-bg-tertiary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus"
        >
          Download SVG
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
        {(['none', 'square', 'circle'] as const).map((shape) => (
          <div key={shape} className="flex flex-col items-center gap-1">
            <div
              style={{
                ...(isTransparent ? CHECKERBOARD_STYLE : {}),
                ...option.previewVars,
              }}
              className={cn(
                'overflow-hidden border border-border flex items-center justify-center',
                !isTransparent && option.bgClass,
                shape === 'none' && 'rounded',
                shape === 'square' && 'rounded-lg aspect-square w-20',
                shape === 'circle' && 'rounded-full aspect-square w-20'
              )}
            >
              <Logo variant={option.variant} size={shape === 'none' ? 'md' : 'sm'} />
            </div>
            <span className="text-xs text-text-tertiary">
              {shape === 'none' ? 'No shape' : shape === 'square' ? 'Square' : 'Circle'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const LogoCollection: Story = {
  render: () => (
    <div className="p-8 space-y-10 w-full max-w-6xl min-h-screen bg-bg-primary">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Logo collection</h1>
        <p className="text-sm text-text-secondary mb-2">
          Brand logo options for SaaS and company sites. Each card shows the logo on different backgrounds and shapes (no shape, square, circle). Download SVG per option. Uses brand colors only: primary, tertiary, white.
        </p>
        <div className="rounded-lg border border-border bg-bg-secondary p-4 text-sm text-text-secondary space-y-2">
          <p><strong>Usage:</strong> Pick the card that matches your background. Previews are theme-independent so they look correct in light and dark mode.</p>
          <p><strong>Combinations:</strong> In light theme, white and surface (bg-secondary) are the same, so one “on light” card covers both. Primary (charcoal) and black are both dark for the light logo, so one “light on dark” card covers headers, nav, and footer.</p>
        </div>
      </div>
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-text-primary">By background &amp; variant</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {COLLECTION_OPTIONS.map((option) => (
            <LogoCard key={option.id} option={option} />
          ))}
        </div>
      </section>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Full logo collection with download per option. Brand colors only. Previews respect contrast in both themes.',
      },
    },
  },
}

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive logo with variant and size controls. Use default for theme-aware placement.',
      },
    },
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-tertiary">
          Preset sizes (UI)
        </h3>
        <div className="flex flex-wrap items-end gap-6 rounded-lg border border-border bg-bg-secondary p-6">
          {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Logo size={s} />
              <span className="text-xs text-text-tertiary">{s}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-text-tertiary">
          Pixel sizes (favicon, social, assets)
        </h3>
        <div className="flex flex-wrap items-end gap-6 rounded-lg border border-border bg-bg-secondary p-6">
          {([16, 24, 32, 48, 64, 128, 256] as const).map((px) => (
            <div key={px} className="flex flex-col items-center gap-2">
              <Logo size={px} />
              <span className="text-xs text-text-tertiary">
                {px}×{Math.round(px / LOGO_ASPECT_RATIO)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Preset sizes (xs–2xl) for UI; pixel sizes (e.g. 32, 64, 128, 256) for favicons and social images.',
      },
    },
  },
}

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-bg-secondary p-8">
        <Logo variant="default" size="lg" />
        <span className="text-sm text-text-secondary">Default (theme primary)</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-lg bg-primary p-8">
        <Logo variant="light" size="lg" />
        <span className="text-sm text-text-inverse">Light on dark (text-inverse)</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-bg-primary p-8">
        <Logo variant="dark" size="lg" />
        <span className="text-sm text-text-secondary">Dark on light (primary)</span>
      </div>
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-bg-secondary p-8">
        <Logo variant="tertiary" size="lg" />
        <span className="text-sm text-text-secondary">Tertiary (brand blue)</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use light on dark backgrounds; dark on light backgrounds; tertiary for brand blue accent.',
      },
    },
  },
}

export const UseCases: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-full max-w-lg">
      <section className="rounded-lg border border-border bg-bg-secondary p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          SaaS / App header
        </h4>
        <div className="flex items-center justify-between border-b border-border pb-3">
          <Logo size="sm" />
          <span className="text-sm text-text-secondary">Nav · Account</span>
        </div>
      </section>
      <section className="rounded-lg border border-border bg-bg-secondary p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Website footer
        </h4>
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <Logo size="xs" />
          <span className="text-sm text-text-tertiary">© Particle Crypto Security LTD</span>
        </div>
      </section>
      <section className="rounded-lg border border-border bg-bg-secondary p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Social / Open Graph
        </h4>
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary p-3">
            <Logo size={64} variant="light" />
          </div>
          <span className="text-sm text-text-secondary">
            Use 128×128 or 256×256; light variant on dark.
          </span>
        </div>
      </section>
      <section className="rounded-lg border border-border bg-bg-secondary p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-tertiary">
          Favicon
        </h4>
        <div className="flex items-center gap-4">
          <div className="rounded border border-border bg-bg-primary p-2">
            <Logo size={32} />
          </div>
          <span className="text-sm text-text-tertiary">32×32 or 64×64 recommended</span>
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Suggested sizes: header (sm), footer (xs), social (128/256 px), favicon (32/64 px).',
      },
    },
  },
}

