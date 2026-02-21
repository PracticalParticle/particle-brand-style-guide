import React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

export interface FilterButtonProps {
  /** Number of active filters; when > 0, badge is shown. */
  activeCount?: number
  /** Accessible label when no filters. */
  ariaLabel?: string
  /** Accessible label when filters active (e.g. "Filters (2 active)"). */
  ariaLabelActive?: string
  /** When true, indicates expandable panel is open (e.g. aria-expanded). */
  expanded?: boolean
  onClick?: () => void
  className?: string
  /** Button variant. Default outline for toolbar. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md'
}

export const FilterButton = React.forwardRef<HTMLButtonElement, FilterButtonProps>(
  (
    {
      activeCount = 0,
      ariaLabel = 'Filters',
      ariaLabelActive,
      expanded,
      onClick,
      className,
      variant = 'outline',
      size = 'sm',
    },
    ref
  ) => {
    const hasActive = activeCount > 0
    const label = hasActive ? (ariaLabelActive ?? `Filters (${activeCount} active)`) : ariaLabel

    return (
      <Button
      ref={ref}
      type="button"
      variant={variant}
      size={size}
      iconOnly
      onClick={onClick}
      className={cn('relative shrink-0', size === 'sm' && 'h-9 w-9', className)}
      aria-label={label}
      aria-expanded={expanded}
    >
      <FilterIcon className="h-4 w-4" />
      {hasActive && (
        <Badge
          variant="primary"
          size="sm"
          className="absolute -top-1 -right-1 min-w-[1rem] h-4 flex items-center justify-center px-1 rounded-full text-[10px] font-semibold leading-none"
        >
          {activeCount > 99 ? '99+' : String(activeCount)}
        </Badge>
      )}
    </Button>
    )
  }
)

FilterButton.displayName = 'FilterButton'
