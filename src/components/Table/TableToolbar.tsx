import React from 'react'
import { cn } from '@/utils/cn'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Badge } from '@/components/Badge'
import { TableFilters, countActiveFilters, type TableFilterField } from './TableFilters'

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const FilterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
)

const ClearIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 6 6 18" /><path d="m6 6 12 12" />
  </svg>
)

export interface TableToolbarFilterOption {
  value: string
  label: string
}

/** Multi-field filters config (popover + chips). */
export interface TableToolbarFiltersConfig {
  fields: TableFilterField[]
  values: Record<string, string>
  onValuesChange: (values: Record<string, string>) => void
}

/** Quick filter badges: one-click filter pills (e.g. All | Completed | Pending). */
export interface TableToolbarQuickFilters {
  /** Options for the quick filter (value '' = "All" or use allLabel). */
  options: TableToolbarFilterOption[]
  /** Current value. Empty = all. */
  value: string
  /** Called when a badge is clicked. */
  onChange: (value: string) => void
  /** Optional label before the badges (e.g. "Status"). */
  label?: string
  /** Label for the "all" option when value is empty. Default "All". */
  allLabel?: string
}

export interface TableToolbarProps {
  /** Search query (controlled). */
  searchValue?: string
  /** Called when search input changes. */
  onSearchChange?: (value: string) => void
  /** Placeholder for search input. */
  searchPlaceholder?: string
  /** Multi-field filters (icon button + popover + chips). */
  filtersConfig?: TableToolbarFiltersConfig
  /** Quick filter badges (e.g. All | Completed | Pending). */
  quickFilters?: TableToolbarQuickFilters
  /** Legacy: single filter. */
  filterLabel?: string
  filterValue?: string
  onFilterChange?: (value: string) => void
  filterOptions?: TableToolbarFilterOption[]
  /** Called when user clicks "Clear all". */
  onClearAll?: () => void
  hasActiveFilters?: boolean
  /** Right-side actions. */
  actions?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const CLEAR_BUTTON_MIN_WIDTH = '2.5rem' // reserve space for icon-only Clear so layout doesn't jump

export const TableToolbar: React.FC<TableToolbarProps> = ({
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Search…',
  filtersConfig,
  quickFilters,
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

  return (
    <div
      className={cn(
        'rounded-t-lg border-b border-default bg-bg-secondary',
        'flex flex-col gap-0',
        className
      )}
    >
      {/* Row 1: Search, filters, clear, actions — single line; overflow-x-auto on small so table width is not impacted */}
      <div
        className={cn(
          'flex flex-nowrap items-center gap-2',
          'px-2 py-2 xs:px-3 sm:px-4 sm:py-2.5',
          'min-h-[2.75rem] sm:min-h-[3rem]',
          'overflow-x-auto overflow-y-hidden'
        )}
      >
        {onSearchChange !== undefined && (
          <div className="w-[10rem] xs:w-[11rem] sm:w-[12rem] shrink-0">
            <Input
              type="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<SearchIcon className="h-4 w-4 text-text-tertiary" />}
              className="h-9 text-sm"
              aria-label="Search table"
            />
          </div>
        )}

        {hasMultiFilters && (
          <TableFilters
            fields={filtersConfig!.fields}
            values={filtersConfig!.values}
            onValuesChange={filtersConfig!.onValuesChange}
            className="shrink-0"
          />
        )}

        {!hasMultiFilters && hasLegacyFilter && (
          <div className="w-[10rem] sm:w-[11rem] shrink-0">
            <Select
              value={filterValue ?? ''}
              onChange={(e) => onFilterChange?.(e.target.value)}
              leftIcon={<FilterIcon className="h-4 w-4 text-text-tertiary" />}
              size="sm"
              className="[&_select]:h-9"
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
          <div
            className="flex items-center shrink-0"
            style={{ minWidth: CLEAR_BUTTON_MIN_WIDTH }}
          >
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

        <div className="flex-1 min-w-2 shrink-0" aria-hidden />

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Row 2: Quick filter badges — own row below; wrap; fixed-size badges so selection doesn't change width */}
      {hasQuickFilters && (
        <div
          className={cn(
            'flex flex-wrap items-center gap-x-2 gap-y-1.5',
            'px-2 pb-2 pt-0 xs:px-3 sm:px-4 sm:pb-3 sm:pt-0',
            'border-t border-default/60'
          )}
        >
          {quickFilters.label && (
            <span className="text-xs font-medium text-text-tertiary shrink-0 w-full xs:w-auto mb-0.5 xs:mb-0">
              {quickFilters.label}
            </span>
          )}
          <div className="flex flex-wrap items-center gap-1.5 min-w-0" role="group" aria-label={quickFilters.label ?? 'Quick filters'}>
            <button
              type="button"
              onClick={() => quickFilters.onChange('')}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full shrink-0 min-w-[3.25rem] inline-flex justify-center"
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
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full shrink-0 min-w-[3.25rem] inline-flex justify-center"
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
