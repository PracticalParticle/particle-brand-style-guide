import React, { useId } from 'react'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/Badge'

export interface ComingSoonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main heading; defaults to "Coming soon" */
  title?: React.ReactNode
  /** Supporting copy below the title */
  description?: React.ReactNode
  /** Optional primary CTA */
  primaryAction?: React.ReactNode
  /** Optional secondary CTA */
  secondaryAction?: React.ReactNode
  /**
   * Visual style (all use solid backgrounds for WCAG contrast):
   * - `gradient`: dark geometric mesh background (landing page)
   * - `muted`: soft surface
   * - `minimal`: no background
   */
  variant?: 'gradient' | 'muted' | 'minimal'
  /** Size: padding and typography scale */
  size?: 'sm' | 'md' | 'lg'
  /** Badge/chip above the title. Defaults to "Coming soon" when not provided. Pass null to hide. */
  badge?: React.ReactNode
  /** Use brand text gradient on title */
  titleGradient?: boolean
  /** Show subtle divider line at bottom */
  showDividerLine?: boolean
  /** Optional logo/mark rendered directly above the content block, visually attached to the section */
  logo?: React.ReactNode
  /** Extra content below actions */
  children?: React.ReactNode
}

/** Node positions for network mesh (abstract web/blockchain) — viewBox 0 0 1600 900, 5×9 grid */
const NETWORK_NODES: Array<[number, number]> = [
  [120, 140], [280, 100], [440, 180], [600, 120], [760, 200], [920, 140], [1080, 220], [1240, 160], [1400, 200],
  [100, 320], [260, 380], [420, 300], [580, 360], [740, 320], [900, 380], [1060, 340], [1220, 400], [1380, 320],
  [180, 520], [340, 480], [500, 560], [660, 500], [820, 540], [980, 480], [1140, 560], [1300, 520], [1460, 540],
  [140, 680], [300, 720], [460, 660], [620, 700], [780, 680], [940, 720], [1100, 660], [1260, 700], [1420, 680],
  [200, 820], [400, 780], [600, 840], [800, 800], [1000, 820], [1200, 780], [1340, 720], [1500, 780], [1460, 840],
]

/** Edges: pairs of node indices (creates web/network connections) */
const NETWORK_EDGES: Array<[number, number]> = (() => {
  const out: Array<[number, number]> = []
  const cols = 9
  const rows = 5
  const idx = (r: number, c: number) => r * cols + c
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = idx(r, c)
      if (c < cols - 1) out.push([i, idx(r, c + 1)])
      if (r < rows - 1) out.push([i, idx(r + 1, c)])
      if (r < rows - 1 && c < cols - 1) out.push([i, idx(r + 1, c + 1)])
      if (r < rows - 1 && c > 0) out.push([i, idx(r + 1, c - 1)])
    }
  }
  return out
})()

/** Theme-aware network mesh background (web/blockchain abstract). Light: light bg + dark mesh. Dark: dark bg + light mesh. */
const GeometricMeshBg: React.FC<{ className?: string }> = ({ className }) => {
  const id = useId().replace(/:/g, '-')
  const glowId = `softGlow-${id}`

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full', className)}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={`bgLight-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECEEF1" />
          <stop offset="100%" stopColor="#E2E5E9" />
        </linearGradient>
        <linearGradient id={`bgDark-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient id={`lineLight-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id={`lineDark-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
        </linearGradient>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Light theme layer */}
      <g className="dark:hidden">
        <rect width="1600" height="900" fill={`url(#bgLight-${id})`} />
      </g>
      <g className="dark:hidden" stroke={`url(#lineLight-${id})`} strokeWidth="1.1" fill="none" filter={`url(#${glowId})`}>
        {NETWORK_EDGES.map(([a, b], i) => (
          <line key={i} x1={NETWORK_NODES[a][0]} y1={NETWORK_NODES[a][1]} x2={NETWORK_NODES[b][0]} y2={NETWORK_NODES[b][1]} />
        ))}
      </g>
      <g className="dark:hidden" fill="#0A0A0A" fillOpacity="0.2">
        {NETWORK_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.5 : 1.8} />
        ))}
      </g>

      {/* Dark theme layer */}
      <g className="hidden dark:block">
        <rect width="1600" height="900" fill={`url(#bgDark-${id})`} />
      </g>
      <g className="hidden dark:block" stroke={`url(#lineDark-${id})`} strokeWidth="1.1" fill="none" filter={`url(#${glowId})`}>
        {NETWORK_EDGES.map(([a, b], i) => (
          <line key={i} x1={NETWORK_NODES[a][0]} y1={NETWORK_NODES[a][1]} x2={NETWORK_NODES[b][0]} y2={NETWORK_NODES[b][1]} />
        ))}
      </g>
      <g className="hidden dark:block" fill="#FFFFFF" fillOpacity="0.15">
        {NETWORK_NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 2.5 : 1.8} />
        ))}
      </g>
    </svg>
  )
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming soon',
  description,
  primaryAction,
  secondaryAction,
  variant = 'gradient',
  size = 'md',
  badge,
  titleGradient = false,
  showDividerLine = false,
  logo,
  className,
  children,
  ...props
}) => {
  const paddingY = {
    sm: 'py-14 sm:py-16',
    md: 'py-20 sm:py-24 lg:py-28',
    lg: 'py-24 sm:py-28 lg:py-32',
  }
  const paddingX = 'px-4 sm:px-6 lg:px-8'
  const titleSizes = {
    sm: 'text-display-lg',
    md: 'text-display-xl',
    lg: 'text-display-2xl',
  }
  const subtitleSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }

  const badgeContent =
    badge !== undefined ? badge : <Badge variant="outline">Coming soon</Badge>

  const wrapperClass = cn(
    'relative overflow-hidden rounded-card',
    paddingY[size],
    paddingX,
    variant === 'gradient' && 'edge-highlight',
    variant === 'muted' && 'bg-bg-surface-muted/80 edge-highlight',
    variant === 'minimal' && 'bg-transparent',
    className
  )

  return (
    <section
      className={wrapperClass}
      aria-labelledby="coming-soon-title"
      {...props}
    >
      {/* Geometric mesh background (gradient variant only) */}
      {variant === 'gradient' && (
        <div
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-card"
          aria-hidden
        >
          <GeometricMeshBg />
        </div>
      )}

      <div className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {logo != null && (
            <div className="mb-5 sm:mb-6 flex justify-center" aria-hidden>
              {logo}
            </div>
          )}
          {badgeContent != null && (
            <div className="mb-5 sm:mb-6 flex justify-center">
              {badgeContent}
            </div>
          )}
          <h1
            id="coming-soon-title"
            className={cn(
              'font-bold tracking-tight leading-tight text-text-primary',
              titleGradient && 'text-gradient-brand',
              titleSizes[size]
            )}
          >
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                'mt-4 sm:mt-5 max-w-2xl mx-auto leading-relaxed text-text-secondary',
                subtitleSizes[size]
              )}
            >
              {description}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {children && <div className="mt-8 sm:mt-10">{children}</div>}
        </div>
      </div>
      {showDividerLine && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px border-t border-border/60"
          aria-hidden
        />
      )}
    </section>
  )
}

ComingSoon.displayName = 'ComingSoon'
