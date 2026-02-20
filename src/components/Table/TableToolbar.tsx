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

const ClearIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
)

const SortAscIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m18 15-6-6-6 6" />
  </svg>
)
const SortDescIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m6 9 6 6 6-6" />
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

const CLEAR_BUTTON_MIN_WIDTH = '2.5rem'

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
  hasActiveFilters: hasActiveFiltersProp,
  actions,
  className,
  children,
}) => {
  const [filterRowOpen, setFilterRowOpen] = useState(false)

  const hasMultiFilters = filtersConfig && filtersConfig.fields.length > 0
  const hasLegacyFilter = filterLabel && filterOptions.length > 0 && onFilterChange !== undefined

  const activeFromSearch = (searchValue?.trim() ?? '') !== ''
  const activeFromMultiFilters = hasMultiFilters ? countActiveFilters(filtersConfig!.values) > 0 : false
  const activeFromLegacy = hasLegacyFilter && (filterValue ?? '') !== ''
  const activeFromQuick = quickFilters && (quickFilters.value ?? '') !== ''

  const hasActiveFilters =
    hasActiveFiltersProp ??
    (activeFromSearch || activeFromMultiFilters || activeFromLegacy || activeFromQuick)

  const showClearSlot = (onClearAll !== undefined || hasMultiFilters || quickFilters) && true
  const handleClearAll = () => {
    onSearchChange?.('')
    if (hasMultiFilters && filtersConfig) {
      const next: Record<string, string> = {}
      filtersConfig.fields.forEach((f) => { next[f.id] = '' })
      filtersConfig.onValuesChange(next)
    }
    quickFilters?.onChange('')
    onClearAll?.()
  }

  const hasQuickFilters = quickFilters && quickFilters.options.length > 0
  const filterChips = hasMultiFilters ? getActiveFilterChips(filtersConfig!.fields, filtersConfig!.values) : []
  const activeFilterCount = hasMultiFilters ? countActiveFilters(filtersConfig!.values) : 0

  const inlineFilterFields = hasMultiFilters
    ? filtersConfig!.fields.map((f) => ({
        id: f.id,
        label: f.label,
        options: f.options,
        allLabel: f.allLabel,
      }))
    : []

  return (
    <div
      className={cn(
        'table-toolbar rounded-t-lg border-b border-default dark:border-subtle bg-bg-secondary',
        'flex flex-col gap-0',
        className
      )}
    >
      {/* Row 1: Search, Filter toggle, chips, Clear, Sort, actions */}
      <div
        className={cn(
          'flex flex-nowrap items-center gap-2 min-w-0',
          'px-2 py-2 xs:px-3 sm:px-4 sm:py-2.5',
          'min-h-[2.75rem] sm:min-h-[3rem]',
          'overflow-x-auto overflow-y-hidden'
        )}
      >
        {/* Search */}
        {onSearchChange !== undefined && (
          <div className="w-[8.5rem] min-w-[8.5rem] xs:w-[10rem] sm:w-[12rem] shrink-0">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<SearchIcon className="h-4 w-4 text-text-tertiary" />}
              className="h-9 text-sm"
              aria-label="Search"
            />
          </div>
        )}

        {/* Filter toggle (opens inline row below) + chips */}
        {hasMultiFilters && (
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <FilterButton
              activeCount={activeFilterCount}
              ariaLabel="Show filters"
              ariaLabelActive={`Filters (${activeFilterCount} active)`}
              expanded={filterRowOpen}
              onClick={() => setFilterRowOpen((o) => !o)}
              className={filterRowOpen ? 'border-border-focus' : ''}
            />
            {filterChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 min-w-0 overflow-x-auto">
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
          <div className="min-w-[9rem] w-[10rem] sm:w-[11rem] shrink-0">
            <Select
              value={filterValue ?? ''}
              onChange={(e) => onFilterChange?.(e.target.value)}
              size="sm"
              className="[&_select]:h-9 [&_select]:text-xs [&_select]:py-1.5"
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

        {showClearSlot && (
          <div className="flex items-center shrink-0" style={{ minWidth: CLEAR_BUTTON_MIN_WIDTH }}>
            {hasActiveFilters && (onClearAll !== undefined || hasMultiFilters || quickFilters) && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                onClick={handleClearAll}
                className="h-9 w-9 text-text-tertiary hover:text-text-primary"
                aria-label="Clear all filters"
              >
                <ClearIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {children}

        {/* Sort */}
        {sortConfig && sortConfig.options.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            <label htmlFor="toolbar-sort-by" className="text-xs font-medium text-text-tertiary whitespace-nowrap sr-only sm:not-sr-only">
              Sort by
            </label>
            <Select
              id="toolbar-sort-by"
              size="sm"
              value={sortConfig.sortKey}
              onChange={(e) => sortConfig.onSortChange(e.target.value, sortConfig.sortDir)}
              className="min-w-[8rem] w-[8.5rem] sm:w-[9rem] [&_select]:h-9 [&_select]:text-xs [&_select]:py-1.5"
              aria-label="Sort by"
            >
              {sortConfig.options.map((opt) => (
                <option key={opt.key} value={opt.key}>
                  {opt.label}
                </option>
              ))}
            </Select>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconOnly
              onClick={() =>
                sortConfig.onSortChange(
                  sortConfig.sortKey,
                  sortConfig.sortDir === 'asc' ? 'desc' : 'asc'
                )
              }
              className="h-8 w-8 text-text-tertiary hover:text-text-primary"
              aria-label={sortConfig.sortDir === 'asc' ? 'Sort descending' : 'Sort ascending'}
              title={sortConfig.sortDir === 'asc' ? 'Descending' : 'Ascending'}
            >
              {sortConfig.sortDir === 'asc' ? (
                <SortAscIcon className="h-4 w-4" />
              ) : (
                <SortDescIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        <div className="flex-1 min-w-2 shrink-0" aria-hidden />

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Row 2: Expandable inline filters (no popover) */}
      {hasMultiFilters && filterRowOpen && (
        <FilterInlineRow
          fields={inlineFilterFields}
          values={filtersConfig!.values}
          onValuesChange={filtersConfig!.onValuesChange}
          onClearAll={handleClearAll}
          rowLabel="Filters"
        />
      )}

      {/* Row 3: Quick filter badges */}
      {hasQuickFilters && (
        <div
          className={cn(
            'table-toolbar-quick flex flex-wrap items-center gap-x-2 gap-y-1.5',
            'px-2 py-2 xs:px-3 sm:px-4 sm:py-3',
            'border-t border-default dark:border-subtle'
          )}
        >
          {quickFilters.label && (
            <span className="text-xs font-medium text-text-tertiary shrink-0">
              {quickFilters.label}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-1.5 min-w-0" role="group" aria-label={quickFilters.label ?? 'Quick filters'}>
            <button
              type="button"
              onClick={() => quickFilters.onChange('')}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-full shrink-0 min-w-[3.25rem] inline-flex justify-center"
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
            </button>
            {quickFilters.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => quickFilters.onChange(opt.value)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary rounded-full shrink-0 min-w-[3.25rem] inline-flex justify-center"
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
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

TableToolbar.displayName = 'TableToolbar'
