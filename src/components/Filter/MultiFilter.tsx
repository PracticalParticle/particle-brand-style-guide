import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Popover } from '@/components/Popover'
import { FilterButton } from './FilterButton'
import { FilterChip } from './FilterChip'
import { FilterPopoverContent } from './FilterPopoverContent'

export interface MultiFilterOption {
  value: string
  label: string
}

export interface MultiFilterField {
  id: string
  label: string
  options: MultiFilterOption[]
  allLabel?: string
}

export interface MultiFilterProps {
  fields: MultiFilterField[]
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
  /** Optional: call on Apply (when applyMode is true). */
  onApply?: () => void
  applyMode?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

function countActive(values: Record<string, string>): number {
  return Object.values(values).filter((v) => v !== '').length
}

function getChips(
  fields: MultiFilterField[],
  values: Record<string, string>
): { id: string; label: string; valueLabel: string }[] {
  return fields
    .filter((f) => values[f.id] !== '')
    .map((f) => {
      const opt = f.options.find((o) => o.value === values[f.id])
      return { id: f.id, label: f.label, valueLabel: opt?.label ?? values[f.id] }
    })
}

/** Multi-field filter: button with count badge, popover with selects, and removable chips. Theme-aware. */
export const MultiFilter: React.FC<MultiFilterProps> = ({
  fields,
  values,
  onValuesChange,
  onApply,
  applyMode = false,
  placement = 'bottom',
  className,
}) => {
  const [open, setOpen] = useState(false)
  const activeCount = countActive(values)
  const chips = getChips(fields, values)

  const popoverContent = (
    <FilterPopoverContent
      fields={fields}
      values={values}
      onValuesChange={onValuesChange}
      onClose={() => setOpen(false)}
      onApply={onApply}
      applyMode={applyMode}
    />
  )

  return (
    <div className={cn('flex items-center gap-2 shrink-0', className)}>
      <Popover
        placement={placement}
        trigger="click"
        open={open}
        onOpenChange={setOpen}
        content={popoverContent}
        className="p-0 overflow-hidden"
      >
        <FilterButton
          activeCount={activeCount}
          ariaLabel="Filters"
          ariaLabelActive={`Filters (${activeCount} active)`}
          onClick={() => setOpen(!open)}
        />
      </Popover>
      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 min-w-0 overflow-x-auto">
          {chips.map((c) => (
            <FilterChip
              key={c.id}
              label={c.label}
              valueLabel={c.valueLabel}
              onRemove={() => onValuesChange({ ...values, [c.id]: '' })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

MultiFilter.displayName = 'MultiFilter'
