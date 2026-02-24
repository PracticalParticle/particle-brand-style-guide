import React, { useId } from 'react'
import { cn } from '../../utils/cn'
import { Badge } from '../Badge'

export interface ComingSoonProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Main heading; defaults to "Coming soon" */
  title?: React.ReactNode
  /** Supporting copy below the title */
  description?: React.ReactNode
  /** Optional primary CTA */
  primaryAction?: React.ReactNode
  /** Optional secondary CTA */
  secondaryAction?: React.ReactNode
  /** Optional CTA — used as primary when primaryAction/secondaryAction not set */
  action?: React.ReactNode
  /**
   * Layout (solid backgrounds for WCAG contrast):
   * - `section`: dark geometric mesh background (landing)
   * - `card`: card container
   * - `minimal`: no background
   */
  variant?: 'section' | 'card' | 'minimal'
  /** Size: padding and typography scale */
  size?: 'sm' | 'md' | 'lg'
  /** Badge/chip above the title. Defaults to "Coming soon" when not provided. Pass null to hide. */
  badge?: React.ReactNode
  /** Use brand text gradient on title */
  titleGradient?: boolean
  /** Show subtle divider line at bottom (section only) */
  showDividerLine?: boolean
  /** Extra content below actions */
  children?: React.ReactNode
}

/** Node positions for network mesh — viewBox 0 0 1600 900, even 4×7 grid, symmetric top/bottom */
const COLS = 7
const ROWS = 4
const MARGIN_X = 120
const MARGIN_Y = 100
const VIEWBOX_WIDTH = 1600
const VIEWBOX_HEIGHT = 900
const NETWORK_NODES: Array<[number, number]> = (() => {
  const xMin = MARGIN_X
  const xMax = VIEWBOX_WIDTH - MARGIN_X
  const yMin = MARGIN_Y
  const yMax = VIEWBOX_HEIGHT - MARGIN_Y
  const stepX = COLS > 1 ? (xMax - xMin) / (COLS - 1) : 0
  const stepY = ROWS > 1 ? (yMax - yMin) / (ROWS - 1) : 0
  const out: Array<[number, number]> = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = c === 0 ? xMin : c === COLS - 1 ? xMax : xMin + c * stepX
      const y = r === 0 ? yMin : r === ROWS - 1 ? yMax : yMin + r * stepY
      out.push([x, y])
    }
  }
  return out
})()

/** Edges: horizontal, vertical, and one diagonal for even angles; no second diagonal to reduce line count */
const NETWORK_EDGES: Array<[number, number]> = (() => {
  const out: Array<[number, number]> = []
  const idx = (r: number, c: number) => r * COLS + c
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = idx(r, c)
      if (c < COLS - 1) out.push([i, idx(r, c + 1)])
      if (r < ROWS - 1) out.push([i, idx(r + 1, c)])
      if (r < ROWS - 1 && c < COLS - 1) out.push([i, idx(r + 1, c + 1)])
    }
  }
  return out
})()

/** Theme-aware network mesh (web/blockchain abstract). Light: light bg + dark mesh. Dark: dark bg + light mesh. */
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

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'Coming soon',
  description,
  primaryAction,
  secondaryAction,
  action,
  variant = 'section',
  size = 'md',
  badge,
  titleGradient = false,
  showDividerLine = false,
  className,
  children,
  ...props
}) => {
  const titleId = useId().replace(/:/g, '-')
  const hasActions = primaryAction ?? secondaryAction ?? action
  const badgeContent =
    badge !== undefined ? badge : <Badge variant="outline">Coming soon</Badge>

  const content = (
    <div className="relative z-10 w-full">
      <div className="max-w-3xl mx-auto text-center">
        {badgeContent != null && (
          <div className="mb-5 sm:mb-6 flex justify-center">
            {badgeContent}
          </div>
        )}
        <h1
          id={titleId}
          className={cn(
            'font-bold tracking-tight text-text-primary leading-tight',
            titleGradient && 'text-gradient-brand',
            titleSizes[size]
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              'mt-4 sm:mt-5 text-text-secondary max-w-2xl mx-auto leading-relaxed',
              subtitleSizes[size]
            )}
          >
            {description}
          </p>
        )}
        {hasActions && (
          <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 justify-center">
            {primaryAction ?? action}
            {secondaryAction}
          </div>
        )}
        {children && <div className="mt-8 sm:mt-10">{children}</div>}
      </div>
    </div>
  )

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center text-center',
          paddingY[size],
          paddingX,
          className
        )}
        aria-labelledby={titleId}
        {...props}
      >
        {content}
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-card',
          'bg-bg-secondary edge-highlight border border-border shadow-subtle',
          paddingY[size],
          paddingX,
          className
        )}
        aria-labelledby={titleId}
        {...props}
      >
        {content}
      </div>
    )
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-card',
        'edge-highlight',
        paddingY[size],
        paddingX,
        className
      )}
      aria-labelledby={titleId}
      {...props}
    >
      {/* Geometric mesh background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-card"
        aria-hidden
      >
        <GeometricMeshBg />
      </div>
      <div className="relative z-10 text-text-primary [&_p]:text-text-secondary">
        {content}
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
