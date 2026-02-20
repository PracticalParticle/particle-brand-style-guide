import React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'

export interface FilterInlineRowOption {
  value: string
  label: string
}

export interface FilterInlineRowField {
  id: string
  label: string
  options: FilterInlineRowOption[]
  allLabel?: string
}

export interface FilterInlineRowProps {
  fields: FilterInlineRowField[]
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
  onClearAll?: () => void
  /** Optional label for the row (e.g. "Filters"). */
  rowLabel?: string
  className?: string
}

/** Expandable filter row: one row of label+Select per field. No popover — avoids dropdown-inside-dropdown. Theme-aware. */
export const FilterInlineRow: React.FC<FilterInlineRowProps> = ({
  fields,
  values,
  onValuesChange,
  onClearAll,
  rowLabel,
  className,
}) => {
  const handleFieldChange = (id: string, value: string) => {
    onValuesChange({ ...values, [id]: value })
  }

  const handleClearAll = () => {
    const next: Record<string, string> = {}
    fields.forEach((f) => { next[f.id] = '' })
    onValuesChange(next)
    onClearAll?.()
  }

  const hasAnyActive = fields.some((f) => (values[f.id] ?? '') !== '')

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2',
        'px-2 py-2 xs:px-3 sm:px-4 sm:py-2.5',
        'border-t border-default bg-bg-tertiary/30',
        className
      )}
      role="region"
      aria-label={rowLabel ?? 'Filter options'}
    >
      {rowLabel && (
        <span className="text-xs font-medium text-text-tertiary shrink-0 w-full sm:w-auto">
          {rowLabel}
        </span>
      )}
      {fields.map((field) => (
        <div key={field.id} className="flex items-center gap-2 shrink-0">
          <label
            htmlFor={`filter-inline-${field.id}`}
            className="text-sm font-medium text-text-secondary whitespace-nowrap"
          >
            {field.label}
          </label>
          <Select
            id={`filter-inline-${field.id}`}
            size="sm"
            value={values[field.id] ?? ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="min-w-[8.5rem] w-[9rem] sm:w-[10.5rem] [&_select]:h-9 [&_select]:text-xs [&_select]:py-1.5"
            aria-label={field.label}
          >
            <option value="">{field.allLabel ?? 'All'}</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </div>
      ))}
      {hasAnyActive && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-text-tertiary hover:text-text-primary ml-auto shrink-0"
        >
          Clear filters
        </Button>
      )}
    </div>
  )
}

FilterInlineRow.displayName = 'FilterInlineRow'
