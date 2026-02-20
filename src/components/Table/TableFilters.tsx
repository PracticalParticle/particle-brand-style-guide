import React from 'react'
import { cn } from '@/utils/cn'
import { MultiFilter } from '@/components/Filter'
import type { MultiFilterField } from '@/components/Filter'

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

function toMultiFilterFields(fields: TableFilterField[]): MultiFilterField[] {
  return fields.map((f) => ({
    id: f.id,
    label: f.label,
    options: f.options,
    allLabel: f.allLabel,
  }))
}

/** Table toolbar filters: theme-aware MultiFilter (button + count badge, popover, chips). */
export const TableFilters: React.FC<TableFiltersProps> = ({
  fields,
  values,
  onValuesChange,
  onApply,
  placement = 'bottom',
  className,
}) => {
  const multiFields = toMultiFilterFields(fields)
  return (
    <MultiFilter
      fields={multiFields}
      values={values}
      onValuesChange={onValuesChange}
      onApply={onApply}
      applyMode={!!onApply}
      placement={placement}
      className={cn('shrink-0', className)}
    />
  )
}

TableFilters.displayName = 'TableFilters'
