import type { TableFilterField } from './TableFilters'

/** Returns true if this value means "no filter" (empty or matches field's allLabel). */
function isNoFilterValue(field: TableFilterField, value: string): boolean {
  const v = (value ?? '').trim()
  if (v === '') return true
  const opt = field.options.find((o) => (o.value ?? '').trim() === v)
  const allLabel = (field.allLabel ?? 'All').trim().toLowerCase()
  const optLabel = (opt?.label ?? '').trim().toLowerCase()
  return optLabel === allLabel
}

/** Returns the number of filters that have a selected value (excludes empty and "All"/allLabel). */
export function countActiveFilters(
  values: Record<string, string>,
  fields?: TableFilterField[]
): number {
  if (!fields || fields.length === 0) {
    return Object.entries(values).filter(([, v]) => (v ?? '').trim() !== '').length
  }
  return fields.filter((f) => !isNoFilterValue(f, values[f.id] ?? '')).length
}

/** Returns active filter entries for chip display. Only when a real value is selected (non-empty, not All/allLabel). Never returns chips on load or after clear. */
export function getActiveFilterChips(
  fields: TableFilterField[],
  values: Record<string, string>
): { id: string; label: string; valueLabel: string }[] {
  return fields
    .filter((f) => {
      const val = (values[f.id] ?? '').trim()
      if (val === '') return false
      return !isNoFilterValue(f, val)
    })
    .map((f) => {
      const val = (values[f.id] ?? '').trim()
      const opt = f.options.find((o) => (o.value ?? '').trim() === val)
      const valueLabel = (opt?.label ?? val).trim()
      return { id: f.id, label: f.label, valueLabel }
    })
    .filter((c) => (c.valueLabel ?? '').trim() !== '')
}
