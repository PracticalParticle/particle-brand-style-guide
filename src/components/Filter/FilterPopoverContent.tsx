import React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'

export interface FilterPopoverFieldOption {
  value: string
  label: string
}

export interface FilterPopoverField {
  id: string
  label: string
  options: FilterPopoverFieldOption[]
  allLabel?: string
}

export interface FilterPopoverContentProps {
  fields: FilterPopoverField[]
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
  onClose?: () => void
  onApply?: () => void
  /** When set, show Apply button and call onApply; otherwise show Done and just onClose. */
  applyMode?: boolean
  className?: string
}

/** Theme-aware popover panel: one Select per field, then Clear all + Done/Apply. */
export const FilterPopoverContent: React.FC<FilterPopoverContentProps> = ({
  fields,
  values,
  onValuesChange,
  onClose,
  onApply,
  applyMode = false,
  className,
}) => {
  const handleFieldChange = (id: string, value: string) => {
    onValuesChange({ ...values, [id]: value })
  }

  const handleClearAll = () => {
    const next: Record<string, string> = {}
    fields.forEach((f) => { next[f.id] = '' })
    onValuesChange(next)
    onClose?.()
  }

  const handleDone = () => {
    if (applyMode && onApply) onApply()
    onClose?.()
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-4 min-w-[12rem] max-w-[18rem]',
        'bg-bg-secondary text-text-primary rounded-lg',
        'border border-default shadow-lg',
        className
      )}
    >
      <div className="p-4 space-y-3">
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={`filter-${field.id}`}
              className="block text-sm font-medium text-text-primary mb-1.5"
            >
              {field.label}
            </label>
            <Select
              id={`filter-${field.id}`}
              value={values[field.id] ?? ''}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="w-full [&_select]:h-9 [&_select]:text-sm"
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
      <div
        className={cn(
          'flex items-center justify-between gap-2 px-4 py-3',
          'border-t border-default bg-bg-tertiary/30'
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-text-secondary hover:text-text-primary"
        >
          Clear all
        </Button>
        <Button variant="primary" size="sm" onClick={handleDone}>
          {applyMode ? 'Apply' : 'Done'}
        </Button>
      </div>
    </div>
  )
}

FilterPopoverContent.displayName = 'FilterPopoverContent'
