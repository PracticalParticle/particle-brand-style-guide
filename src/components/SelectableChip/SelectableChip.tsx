import React from 'react'
import { cn } from '@/utils/cn'

const CheckIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

const XIcon = () => (
  <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export interface SelectableChipProps {
  /** Whether the chip is currently selected */
  selected: boolean
  /** Called when the chip is clicked (toggle) */
  onSelect: () => void
  children: React.ReactNode
  disabled?: boolean
  className?: string
  /** When true, show check when selected and X when not (useful for permission toggles) */
  showIcon?: boolean
}

/**
 * A small pill/chip that can be toggled on or off. Use for tags, permissions,
 * or inline multi-select (e.g. Request / Approve / Execute per role).
 */
export const SelectableChip: React.FC<SelectableChipProps> = ({
  selected,
  onSelect,
  children,
  disabled = false,
  className,
  showIcon = true,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-control text-xs font-semibold uppercase tracking-wide border transition-all duration-normal',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        selected
          ? 'bg-tertiary/10 text-tertiary border-tertiary/30'
          : 'bg-bg-tertiary text-text-secondary border-border hover:border-border-hover',
        className
      )}
    >
      {showIcon && (selected ? <CheckIcon /> : <XIcon />)}
      <span>{children}</span>
    </button>
  )
}

SelectableChip.displayName = 'SelectableChip'
