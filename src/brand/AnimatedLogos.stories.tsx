import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Spinner } from '@/components/Spinner'

/** Logo paths (same as Logo / Spinner) — two triangles */
const LOGO_TOP =
  'M58.0121 4.88998L61.1256 0.695557L64.2391 4.88999L79.9978 26.12H73.7709L61.1256 9.08441L40.3915 37.0172H81.8597L77.4823 31.12H83.7093L88.0867 37.0172L91.7981 42.0172H85.5712H36.6801H30.4531L34.1646 37.0172L58.0121 4.88998Z'
const LOGO_BOTTOM =
  'M33.7859 65.1965L30.6725 69.3909L27.559 65.1965L11.8001 43.9663H18.0271L30.6725 61.0021L51.4066 33.0693H9.93837L14.3156 38.9663H8.08869L3.71143 33.0693L0 28.0693H6.22694H55.118H61.345L57.6335 33.0693L33.7859 65.1965Z'
/** Logo in 0,0 to 92,70. Padded viewBox centers it with equal margin so animations don't clip. */
const PAD = 50
const VB_MIN = -PAD
const VB_W = 92 + PAD * 2
const VB_H = 70 + PAD * 2
const VB_PADDED = `${VB_MIN} ${VB_MIN} ${VB_W} ${VB_H}`
const CENTER = '46,35'

/** Same as Brand/Logo: primary (theme), light (on dark bgs), tertiary (brand blue) */
export type LogoVariant = 'default' | 'dark' | 'light' | 'tertiary'
export type LogoSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const FILL_BY_VARIANT: Record<LogoVariant, string> = {
  default: 'fill-primary',
  dark: 'fill-primary',
  light: 'fill-text-inverse',
  tertiary: 'fill-tertiary',
}

const SIZE_CLASS: Record<LogoSize, string> = {
  xs: 'w-20',
  sm: 'w-28',
  md: 'w-36',
  lg: 'w-44',
  xl: 'w-48',
  '2xl': 'w-56',
}

interface LogoMarkProps {
  className?: string
  pathTopClassName?: string
  pathBottomClassName?: string
  scale?: number
  /** Use fill-primary, fill-tertiary, or fill-text-inverse (overridden by variant if set) */
  fillClass?: string
  /** Logo color variant (like Brand/Logo) */
  variant?: LogoVariant
  /** Logo size preset */
  size?: LogoSize
}

function LogoMark({
  className,
  pathTopClassName,
  pathBottomClassName,
  scale = 0.88,
  fillClass,
  variant = 'default',
  size = 'lg',
}: LogoMarkProps) {
  const fill = fillClass ?? FILL_BY_VARIANT[variant]
  const sizeClass = SIZE_CLASS[size]
  return (
    <svg
      viewBox={VB_PADDED}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(sizeClass, 'shrink-0 overflow-visible', className)}
      style={{ aspectRatio: `${VB_W}/${VB_H}` }}
      aria-hidden
    >
      {/* Logo centered in padded viewBox; no extra translate so (0,0)-(92,70) is centered */}
      <g transform={`translate(${CENTER}) scale(${scale}) translate(-${CENTER})`}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={LOGO_TOP}
          className={cn(fill, pathTopClassName)}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d={LOGO_BOTTOM}
          className={cn(fill, pathBottomClassName)}
        />
      </g>
    </svg>
  )
}

/** Card for one animation + label + use case. Preview area is large with overflow visible so motion isn't clipped. */
function AnimCard({
  title,
  useCase,
  children,
}: { title: string; useCase: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-bg-secondary border border-border min-h-[240px] justify-between overflow-visible">
      <div className="flex items-center justify-center min-h-[200px] w-full overflow-visible py-4">
        {children}
      </div>
      <div className="text-center">
        <div className="font-medium text-text-primary">{title}</div>
        <div className="text-xs text-text-tertiary">{useCase}</div>
      </div>
    </div>
  )
}

/** Card for run-once intro/outro animations: Play button remounts so animation can replay. */
function PlayableAnimCard({
  title,
  useCase,
  children,
}: { title: string; useCase: string; children: React.ReactNode }) {
  const [playKey, setPlayKey] = useState(0)
  return (
    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-bg-secondary border border-border min-h-[240px] justify-between overflow-visible">
      <div className="flex flex-col items-center justify-center min-h-[200px] w-full overflow-visible py-4">
        <div key={playKey} className="flex items-center justify-center">
          {children}
        </div>
        <button
          type="button"
          onClick={() => setPlayKey((k: number) => k + 1)}
          className="mt-5 text-xs font-medium text-tertiary dark:text-tertiary-on-dark hover:text-tertiary-hover px-3 py-1.5 rounded-md border border-tertiary/30 hover:border-tertiary/50 transition-colors"
        >
          Play animation
        </button>
      </div>
      <div className="text-center">
        <div className="font-medium text-text-primary">{title}</div>
        <div className="text-xs text-text-tertiary">{useCase}</div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Brand/Animated Logos',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Professional logo animations for SaaS, video intro/outro, social, and enterprise. Motion, reveal, bounce, background-only. Use the two triangle shapes on-brand. Use individual stories to customize variant and size.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light', 'tertiary'],
      description: 'Logo color: default/primary, light (on dark bgs), tertiary (brand blue).',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Logo size preset.',
    },
  },
}

export default meta

type Story = StoryObj<{ variant: LogoVariant; size: LogoSize; animation?: string }>

export const Collection: Story = {
  render: () => (
    <div className="space-y-12 max-w-6xl p-6 overflow-visible">
      <p className="text-sm text-text-secondary">
        Use for hero, loading, video intro/outro, social, and CTAs. Shapes stay on-brand; durations and easing can be tuned in your theme.
      </p>

      {/* ——— Motion: bounce, stumble, float, pulse, breathe, expand ——— */}
      <section className="overflow-visible">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Motion (looping)</h2>
        <p className="text-xs text-text-tertiary mb-4">Bounce, stumble, float, pulse, breathe, expand — enterprise &amp; SaaS</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-visible">
          <AnimCard title="Bounce" useCase="Hero, CTA, landing" >
            <LogoMark pathTopClassName="animate-logo-bounce" pathBottomClassName="animate-logo-bounce" />
          </AnimCard>
          <AnimCard title="Stumble" useCase="Playful, social, video" >
            <LogoMark pathTopClassName="animate-logo-stumble" pathBottomClassName="animate-logo-stumble" />
          </AnimCard>
          <AnimCard title="Float" useCase="Footer, splash, ambient" >
            <LogoMark pathTopClassName="animate-logo-float" pathBottomClassName="animate-logo-float" />
          </AnimCard>
          <AnimCard title="Pulse" useCase="Hero, subtle emphasis" >
            <LogoMark pathTopClassName="animate-logo-pulse" pathBottomClassName="animate-logo-pulse" />
          </AnimCard>
          <AnimCard title="Breathe" useCase="Focus, app shell" >
            <LogoMark pathTopClassName="animate-logo-breathe" pathBottomClassName="animate-logo-breathe" scale={0.82} />
          </AnimCard>
          <AnimCard title="Expand" useCase="Notification, modal" >
            <LogoMark scale={0.65} pathTopClassName="animate-logo-expand-left" pathBottomClassName="animate-logo-expand-right" />
          </AnimCard>
        </div>
      </section>

      {/* ——— Reveal / intro: fade from outside, slide, scale pop, stagger (run once — use Play to replay) ——— */}
      <section className="overflow-visible">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Reveal &amp; intro (run once)</h2>
        <p className="text-xs text-text-tertiary mb-4">Video intro, page load, product launch. Click &quot;Play animation&quot; to replay.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 overflow-visible">
          <PlayableAnimCard title="Fade from outside" useCase="Video intro, hero" >
            <LogoMark pathTopClassName="animate-logo-fade-in-outside" pathBottomClassName="animate-logo-fade-in-outside" />
          </PlayableAnimCard>
          <PlayableAnimCard title="Stagger (top then bottom)" useCase="Intro, reveal" >
            <LogoMark pathTopClassName="animate-logo-fade-in-outside-top opacity-0" pathBottomClassName="animate-logo-fade-in-outside-bottom opacity-0" />
          </PlayableAnimCard>
          <PlayableAnimCard title="Scale pop" useCase="Outro lockup, CTA" >
            <LogoMark pathTopClassName="animate-logo-scale-pop opacity-0" pathBottomClassName="animate-logo-scale-pop-bottom opacity-0" />
          </PlayableAnimCard>
          <PlayableAnimCard title="Slide up" useCase="Page load, modal" >
            <LogoMark pathTopClassName="animate-logo-slide-up opacity-0" pathBottomClassName="animate-logo-slide-up opacity-0" />
          </PlayableAnimCard>
          <PlayableAnimCard title="Slide down" useCase="Header, dropdown" >
            <LogoMark pathTopClassName="animate-logo-slide-down opacity-0" pathBottomClassName="animate-logo-slide-down opacity-0" />
          </PlayableAnimCard>
          <PlayableAnimCard title="Reveal (stagger)" useCase="Classic intro" >
            <LogoMark pathTopClassName="animate-logo-reveal-top opacity-0" pathBottomClassName="animate-logo-reveal-bottom opacity-0" />
          </PlayableAnimCard>
        </div>
      </section>

      {/* ——— Color / fade ——— */}
      <section className="overflow-visible">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Color &amp; fade</h2>
        <p className="text-xs text-text-tertiary mb-4">Accent, highlight, tertiary</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 overflow-visible">
          <AnimCard title="Color fade" useCase="Accent, link hover" >
            <LogoMark pathTopClassName="animate-logo-color-fade" pathBottomClassName="animate-logo-color-fade" fillClass="fill-tertiary" />
          </AnimCard>
          <AnimCard title="Pulse (tertiary)" useCase="Brand highlight" >
            <LogoMark pathTopClassName="animate-logo-pulse" pathBottomClassName="animate-logo-pulse" fillClass="fill-tertiary" />
          </AnimCard>
        </div>
      </section>

      {/* ——— Background animated, logo static (video / enterprise) ——— */}
      <section className="overflow-visible">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Background animated, logo static</h2>
        <p className="text-xs text-text-tertiary mb-4">Video outro, presentation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-visible">
          <AnimCard title="Shimmer bg" useCase="Video outro, premium" >
            <div className="relative flex items-center justify-center w-44 h-44 rounded-xl overflow-hidden">
              <div
                className="absolute inset-0 animate-bg-shimmer"
                style={{
                  background: 'linear-gradient(90deg, rgb(var(--color-bg-tertiary)) 0%, rgb(var(--color-primary) / 0.12) 50%, rgb(var(--color-bg-tertiary)) 100%)',
                  backgroundSize: '200% 100%',
                }}
                aria-hidden
              />
              <LogoMark scale={0.7} className="relative z-10" />
            </div>
          </AnimCard>
          <AnimCard title="Pulse bg" useCase="Loading, waiting" >
            <div className="relative flex items-center justify-center w-44 h-44 rounded-xl bg-bg-tertiary overflow-hidden">
              <div
                className="absolute inset-0 rounded-xl animate-bg-pulse-subtle"
                style={{ backgroundColor: 'rgb(var(--color-primary) / 0.15)' }}
                aria-hidden
              />
              <LogoMark scale={0.72} className="relative z-10" />
            </div>
          </AnimCard>
        </div>
      </section>

      {/* ——— Outro / hold then fade (run once — use Play to replay) ——— */}
      <section className="overflow-visible">
        <h2 className="text-lg font-semibold text-text-primary mb-1">Outro (hold then fade)</h2>
        <p className="text-xs text-text-tertiary mb-4">Video end card, presentation end. Click &quot;Play animation&quot; to replay.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-visible">
          <PlayableAnimCard title="Hold then fade out" useCase="Video outro, end card" >
            <LogoMark pathTopClassName="animate-logo-hold-fade-out" pathBottomClassName="animate-logo-hold-fade-out" />
          </PlayableAnimCard>
        </div>
      </section>

      {/* ——— Loading (spinner) ——— */}
      <section className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-2">Loading</h3>
        <p className="text-sm text-text-secondary mb-4">
          Branded spinner: sides then spin when connected. Use <code className="bg-bg-tertiary px-1 rounded text-xs">Spinner variant=&quot;branded&quot;</code> — same as Button loading state.
        </p>
        <div className="flex items-center gap-4">
          <Spinner variant="branded" size="lg" />
          <span className="text-sm text-text-tertiary">Sides → spin (Components/Spinner)</span>
        </div>
      </section>
    </div>
  ),
}

// Individual stories — use Controls to change variant and size (same as Brand/Logo)
export const Bounce: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-bounce" pathBottomClassName="animate-logo-bounce" />,
}
export const Stumble: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-stumble" pathBottomClassName="animate-logo-stumble" />,
}
export const Float: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-float" pathBottomClassName="animate-logo-float" />,
}
export const Pulse: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-pulse" pathBottomClassName="animate-logo-pulse" />,
}
export const Breathe: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} scale={0.82} pathTopClassName="animate-logo-breathe" pathBottomClassName="animate-logo-breathe" />,
}
export const Expand: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} scale={0.65} pathTopClassName="animate-logo-expand-left" pathBottomClassName="animate-logo-expand-right" />,
}
export const FadeInFromOutside: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-fade-in-outside" pathBottomClassName="animate-logo-fade-in-outside" />,
}
export const ScalePop: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-scale-pop opacity-0" pathBottomClassName="animate-logo-scale-pop-bottom opacity-0" />,
}
export const HoldFadeOut: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => <LogoMark {...args} pathTopClassName="animate-logo-hold-fade-out" pathBottomClassName="animate-logo-hold-fade-out" />,
}
export const BackgroundShimmer: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => (
    <div className="relative flex items-center justify-center w-44 h-44 rounded-xl overflow-hidden">
      <div className="absolute inset-0 animate-bg-shimmer" style={{ background: 'linear-gradient(90deg, rgb(var(--color-bg-tertiary)) 0%, rgb(var(--color-primary) / 0.12) 50%, rgb(var(--color-bg-tertiary)) 100%)', backgroundSize: '200% 100%' }} aria-hidden />
      <LogoMark {...args} scale={0.7} className="relative z-10" />
    </div>
  ),
}
export const BackgroundPulse: Story = {
  args: { variant: 'default', size: 'lg' },
  render: (args) => (
    <div className="relative flex items-center justify-center w-44 h-44 rounded-xl bg-bg-tertiary overflow-hidden">
      <div
        className="absolute inset-0 rounded-xl animate-bg-pulse-subtle"
        style={{ backgroundColor: 'rgb(var(--color-primary) / 0.15)' }}
        aria-hidden
      />
      <LogoMark {...args} scale={0.72} className="relative z-10" />
    </div>
  ),
}
