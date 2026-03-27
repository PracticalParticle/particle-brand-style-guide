import React from 'react'
import { cn } from '@/utils/cn'

const CheckIcon = () => (
  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export interface SelectableCardProps {
  /** Whether the card is currently selected */
  selected: boolean
  /** Called when the card is clicked (toggle) */
  onSelect: () => void
  /** Primary label (e.g. action or role name) */
  label: React.ReactNode
  /** Optional secondary text (e.g. phase description or role hash) */
  description?: React.ReactNode
  /** Optional right-side content (e.g. icon); when selected, Check is shown if no children */
  children?: React.ReactNode
  disabled?: boolean
  className?: string
}

/**
 * A card-style option that can be selected (multi-select). Use for wizards, settings,
 * or any list where users pick one or more options by clicking a card.
 */
export const SelectableCard: React.FC<SelectableCardProps> = ({
  selected,
  onSelect,
  label,
  description,
  children,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'w-full flex items-center justify-between gap-3 p-4 rounded-card border text-left transition-all duration-normal ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        selected
          ? 'bg-tertiary/10 border-tertiary shadow-sm'
          : 'bg-bg-secondary border-border hover:border-border-hover hover:bg-bg-tertiary',
        className
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-text-primary">{label}</div>
        {description != null && (
          <div className="text-xs text-text-secondary mt-0.5">{description}</div>
        )}
      </div>
      {children ?? (selected ? <CheckIcon /> : null)}
    </button>
  )
}

SelectableCard.displayName = 'SelectableCard'
