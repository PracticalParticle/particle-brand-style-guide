import React from 'react'
import { cn } from '@/utils/cn'

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
)

export interface FilterChipProps {
  label: string
  valueLabel: string
  onRemove: () => void
  className?: string
}

/** Single active filter chip: "Label: value" with remove button. Theme-aware. */
export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  valueLabel,
  onRemove,
  className,
}) => (
  <span
    className={cn(
      'inline-flex shrink-0 items-center gap-1.5 rounded-full',
      'border border-default bg-bg-secondary text-text-primary',
      'pl-2.5 pr-1 py-1 text-xs font-medium',
      className
    )}
  >
    <span className="text-text-tertiary">{label}:</span>
    <span className="truncate max-w-[7rem]">{valueLabel}</span>
    <button
      type="button"
      onClick={onRemove}
      className="rounded-full p-0.5 text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-bg-secondary"
      aria-label={`Remove ${label} filter`}
    >
      <CloseIcon className="h-3.5 w-3.5" />
    </button>
  </span>
)

FilterChip.displayName = 'FilterChip'
