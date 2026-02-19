import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import { Select } from '@/components/Select'
import { Popover } from '@/components/Popover'

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
)

export interface TableFilterOption {
  value: string
  label: string
}

export interface TableFilterField {
  id: string
  label: string
  options: TableFilterOption[]
  /** Optional placeholder for the "all" option. Default "All". */
  allLabel?: string
}

export interface TableFiltersProps {
  /** Filter field definitions. */
  fields: TableFilterField[]
  /** Current values keyed by field id. Empty string = no filter. */
  values: Record<string, string>
  /** Called when any filter value changes. */
  onValuesChange: (values: Record<string, string>) => void
  /** Optional: called when popover Apply is clicked (if you use apply mode). By default changes are live. */
  onApply?: () => void
  /** Placement of the filters popover. */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

/** Returns the number of filters that have a non-empty value. */
export function countActiveFilters(values: Record<string, string>): number {
  return Object.values(values).filter((v) => v !== '').length
}

/** Returns active filter entries for chip display: { id, label, valueLabel }. */
export function getActiveFilterChips(
  fields: TableFilterField[],
  values: Record<string, string>
): { id: string; label: string; valueLabel: string }[] {
  return fields
    .filter((f) => values[f.id] !== '')
    .map((f) => {
      const opt = f.options.find((o) => o.value === values[f.id])
      return { id: f.id, label: f.label, valueLabel: opt?.label ?? values[f.id] }
    })
}

export const TableFilters: React.FC<TableFiltersProps> = ({
  fields,
  values,
  onValuesChange,
  onApply,
  placement = 'bottom',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const count = countActiveFilters(values)
  const chips = getActiveFilterChips(fields, values)

  const handleFieldChange = (id: string, value: string) => {
    onValuesChange({ ...values, [id]: value })
  }

  const handleClearAll = () => {
    const next: Record<string, string> = {}
    fields.forEach((f) => { next[f.id] = '' })
    onValuesChange(next)
    setOpen(false)
  }

  const handleRemoveChip = (id: string) => {
    onValuesChange({ ...values, [id]: '' })
  }

  const popoverContent = (
    <div className="flex flex-col gap-4 min-w-[12rem] max-w-[18rem] bg-bg-secondary text-text-primary">
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              {field.label}
            </label>
            <Select
              value={values[field.id] ?? ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full [&_select]:h-9"
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
      </div>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-default">
        <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-text-secondary">
          Clear all
        </Button>
        {onApply ? (
          <Button variant="primary" size="sm" onClick={() => { onApply(); setOpen(false) }}>
            Apply
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={() => setOpen(false)}>
            Done
          </Button>
        )}
      </div>
    </div>
  )

  return (
    <div className={cn('flex items-center gap-1.5 shrink-0', className)}>
      <Popover
        placement={placement}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        content={popoverContent}
        className="p-4"
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          iconOnly
          className="relative h-9 w-9 shrink-0"
          aria-label={count > 0 ? `Filters (${count} active)` : 'Filters'}
        >
          <FilterIcon className="h-4 w-4" />
          {count > 0 && (
            <Badge
              variant="primary"
              size="sm"
              className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center px-1"
            >
              {count}
            </Badge>
          )}
        </Button>
      </Popover>
      {chips.length > 0 && (
        <div className="flex items-center gap-1.5 min-w-0 overflow-x-auto">
          {chips.map((c) => (
            <span
              key={c.id}
              className="inline-flex shrink-0 items-center gap-1 rounded-full border-2 border-default bg-bg-secondary text-text-primary pl-2 pr-1 py-0.5 text-xs font-medium"
            >
              <span className="text-text-secondary">{c.label}:</span>
              <span className="truncate max-w-[6rem]">{c.valueLabel}</span>
              <button
                type="button"
                onClick={() => handleRemoveChip(c.id)}
                className="rounded-full p-0.5 text-text-tertiary hover:text-text-primary hover:bg-bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                aria-label={`Remove ${c.label} filter`}
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

TableFilters.displayName = 'TableFilters'
