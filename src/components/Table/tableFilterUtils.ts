import type { TableFilterField } from './TableFilters'

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
