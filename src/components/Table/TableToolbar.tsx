import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Badge } from '@/components/Badge'
import { FilterButton, FilterChip, FilterInlineRow } from '@/components/Filter'
import { type TableFilterField } from './TableFilters'
import { countActiveFilters, getActiveFilterChips } from './tableFilterUtils'

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

export interface TableToolbarFilterOption {
  value: string
  label: string
}

/** Multi-field filters: expandable inline row (no popover) + chips. */
export interface TableToolbarFiltersConfig {
  fields: TableFilterField[]
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
}

/** Sort control: key + direction. */
export interface TableToolbarSortConfig {
  sortKey: string
  sortDir: 'asc' | 'desc'
  options: { key: string; label: string }[]
  onSortChange: (key: string, dir: 'asc' | 'desc') => void
}

/** Quick filter badges: one-click filter pills (e.g. All | Completed | Pending). */
export interface TableToolbarQuickFilters {
  options: TableToolbarFilterOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  allLabel?: string
}

export interface TableToolbarProps {
  /** Search (controlled). Shown in first row with filters. */
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  /** Multi-field filters: toggle opens inline row below (no dropdown-in-dropdown). */
  filtersConfig?: TableToolbarFiltersConfig
  /** Quick filter badges. */
  quickFilters?: TableToolbarQuickFilters
  /** Sort: Sort by + direction in first row. */
  sortConfig?: TableToolbarSortConfig
  /** Legacy single filter (optional). */
  filterLabel?: string
  filterValue?: string
  onFilterChange?: (value: string) => void
  filterOptions?: TableToolbarFilterOption[]
  onClearAll?: () => void
  hasActiveFilters?: boolean
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search…',
  filtersConfig,
  quickFilters,
  sortConfig,
  filterLabel,
  filterValue,
  onFilterChange,
  filterOptions = [],
  onClearAll,
  hasActiveFilters: _hasActiveFiltersProp,
  actions,
  className,
  children,
}) => {
  const [filterRowOpen, setFilterRowOpen] = useState(false)

  const hasMultiFilters = filtersConfig && filtersConfig.fields.length > 0
  const hasLegacyFilter = filterLabel && filterOptions.length > 0 && onFilterChange !== undefined

  const handleClearAll = () => {
    onSearchChange?.('')
    if (hasMultiFilters && filtersConfig) {
      filtersConfig.onValuesChange({})
    }
    quickFilters?.onChange('')
    onClearAll?.()
  }

  const hasQuickFilters = quickFilters && quickFilters.options.length > 0
  const filterChips = hasMultiFilters ? getActiveFilterChips(filtersConfig!.fields, filtersConfig!.values) : []
  const activeFilterCount = hasMultiFilters ? countActiveFilters(filtersConfig!.values, filtersConfig!.fields) : 0

  const inlineFilterFields = hasMultiFilters
    ? filtersConfig!.fields.map((f) => ({
        id: f.id,
        label: f.label,
        options: f.options,
        allLabel: f.allLabel,
      }))
    : []

  const toolbarRowMinH = 'min-h-[2.75rem]'
  const controlHeight = 'h-9 min-h-[2.25rem]'

  return (
    <div
      className={cn(
        'table-toolbar rounded-t-lg bg-bg-secondary flex flex-col min-w-0',
        className
      )}
    >
      {/* Row 1: Search + filter button + chips + sort. Single control height (2.25rem) for alignment. */}
      <div
        className={cn(
          'flex flex-wrap items-center content-center gap-y-3 gap-x-3 min-w-0 w-full',
          'px-3 py-2.5 sm:px-4 sm:py-3',
          toolbarRowMinH,
          !hasQuickFilters && (!hasMultiFilters || !filterRowOpen) && 'border-b border-border'
        )}
      >
        <div className="flex flex-wrap items-center content-center gap-y-3 gap-x-2 min-w-0 flex-1">
          {onSearchChange !== undefined && (
            <div className="w-[12rem] min-w-0 max-w-full sm:w-[14rem] shrink-0">
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                leftIcon={<SearchIcon className="h-4 w-4 text-text-muted" />}
                className={cn(controlHeight, 'text-sm rounded-control w-full')}
                aria-label="Search table"
              />
            </div>
          )}

          {hasMultiFilters && (
            <div className="flex flex-wrap items-center gap-2 shrink-0 min-w-0 max-w-full">
              <FilterButton
                activeCount={activeFilterCount}
                ariaLabel="Show filters"
                ariaLabelActive={`Filters (${activeFilterCount} active)`}
                expanded={filterRowOpen}
                onClick={() => setFilterRowOpen((o) => !o)}
                variant="ghost"
                className={filterRowOpen ? 'ring-2 ring-border-focus ring-offset-2 ring-offset-bg-secondary' : undefined}
              />
              {filterChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                  {filterChips.map((c) => (
                    <FilterChip
                      key={c.id}
                      label={c.label}
                      valueLabel={c.valueLabel}
                      onRemove={() =>
                        filtersConfig!.onValuesChange({ ...filtersConfig!.values, [c.id]: '' })
                      }
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasMultiFilters && hasLegacyFilter && (
            <div className="min-w-0 w-[10rem] sm:w-[11rem] shrink-0">
              <Select
                value={filterValue ?? ''}
                onChange={(e) => onFilterChange?.(e.target.value)}
                size="sm"
                className="[&_select]:h-9 [&_select]:min-h-[2.25rem] [&_select]:text-xs [&_select]:py-1.5"
                aria-label={filterLabel ?? 'Filter'}
              >
                <option value="">All</option>
                {filterOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          )}

          {children}

          {sortConfig && sortConfig.options.length > 0 && (
            <div className="flex items-center shrink-0">
              <label htmlFor="toolbar-sort-by" className="sr-only">
                Sort by
              </label>
              <Select
                id="toolbar-sort-by"
                size="sm"
                value={sortConfig.sortKey}
                onChange={(e) => sortConfig.onSortChange(e.target.value, sortConfig.sortDir)}
                className="min-w-0 w-[8rem] sm:w-[9rem] [&_select]:h-9 [&_select]:min-h-[2.25rem] [&_select]:text-xs [&_select]:py-1.5"
                aria-label="Sort by"
              >
                {sortConfig.options.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>

        {actions != null && (
          <div className="flex shrink-0 items-center gap-2 ml-auto">
            {actions}
          </div>
        )}
      </div>

      {/* Row 2: Expandable filter row — same min-height as row 1, controls use h-9 for alignment */}
      {hasMultiFilters && filterRowOpen && (
        <div className={cn(toolbarRowMinH, 'flex flex-col justify-center', !hasQuickFilters && 'border-b border-border')}>
          <FilterInlineRow
            fields={inlineFilterFields}
            values={filtersConfig!.values}
            onValuesChange={filtersConfig!.onValuesChange}
            onClearAll={handleClearAll}
            rowLabel="Filters"
          />
        </div>
      )}

      {/* Row 3: Quick filter badges — border below (above column headers), not above */}
      {hasQuickFilters && (
        <div
          className={cn(
            'table-toolbar-quick flex flex-wrap items-center justify-start gap-2',
            'px-3 py-2 sm:px-4 sm:py-2.5',
            'border-b border-border'
          )}
        >
          {quickFilters.label && (
            <span className="text-xs font-medium text-text-tertiary shrink-0">
              {quickFilters.label}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-2 min-w-0 w-fit" role="group" aria-label={quickFilters.label ?? 'Quick filters'}>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => quickFilters.onChange('')}
              className="rounded-full shrink-0 min-w-[3.25rem]"
              aria-pressed={!quickFilters.value}
            >
              <Badge
                variant={!quickFilters.value ? 'primary' : 'outline'}
                size="sm"
                className={cn(
                  'cursor-pointer transition-colors hover:opacity-90 pointer-events-none',
                  !quickFilters.value && 'border-2 border-transparent'
                )}
              >
                {quickFilters.allLabel ?? 'All'}
              </Badge>
            </Button>
            {quickFilters.options.map((opt) => (
              <Button
                key={opt.value}
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => quickFilters.onChange(opt.value)}
                className="rounded-full shrink-0 min-w-[3.25rem]"
                aria-pressed={quickFilters.value === opt.value}
              >
                <Badge
                  variant={quickFilters.value === opt.value ? 'primary' : 'outline'}
                  size="sm"
                  className={cn(
                    'cursor-pointer transition-colors hover:opacity-90 pointer-events-none',
                    quickFilters.value === opt.value && 'border-2 border-transparent'
                  )}
                >
                  {opt.label}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

TableToolbar.displayName = 'TableToolbar'
