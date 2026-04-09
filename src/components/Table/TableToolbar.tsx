import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import { Input, SearchInput } from '@/components/Input'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { Badge } from '@/components/Badge'
import { FilterButton, FilterChip, FilterInlineRow } from '@/components/Filter'
import { type TableFilterField } from './TableFilters'
import { countActiveFilters, getActiveFilterChips } from './tableFilterUtils'
import {
  tableRegistrySearchInputClassName,
  tableRegistryToolbarStripClassName,
  tableToolbarSelectMatchSearchClassName,
} from './tableRegistryTokens'

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
  /** Optional visible prefix (only shown on the second-row quick-filter strip). */
  label?: string
  allLabel?: string
  /** `aria-label` for the pill group when `label` is not shown (e.g. inline mode). */
  groupAriaLabel?: string
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
  /**
   * When true, the search field grows within the toolbar row (generous min width)
   * so registries and wide layouts can use a single professional primary row.
   */
  searchFlexible?: boolean
  /** Tighter quick-filter pill spacing (default true). */
  quickFiltersCompact?: boolean
  /**
   * When true, quick-filter pills render on the primary row next to search instead of a separate row below.
   */
  quickFiltersInline?: boolean
  /**
   * Visual style for the toolbar wrapper.
   * - `attached`: default; compact controls; sits above `Table` `containerVariant="attached"`
   * - `card`: self-contained rounded panel (e.g. operations registry toolbar)
   * - `registry`: muted strip + pill search (allowlist workspace); use inside `TableRegistryShell` above `Table` `containerVariant="registry"`
   */
  variant?: 'attached' | 'card' | 'registry'
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
  searchFlexible = false,
  quickFiltersCompact = true,
  /** When quick filters are set, they sit beside search unless set to `false` (second row). Default: inline. */
  quickFiltersInline = true,
  variant = 'attached',
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

  const quickFiltersResolved =
    quickFilters && quickFilters.options.length > 0 ? quickFilters : null
  const quickFiltersOnSecondRow = Boolean(quickFiltersResolved && !quickFiltersInline)
  const filterChips = hasMultiFilters ? getActiveFilterChips(filtersConfig!.fields, filtersConfig!.values) : []
  const activeFilterCount = hasMultiFilters ? countActiveFilters(filtersConfig!.values, filtersConfig!.fields) : 0

  /** Omit row 1 when it would be empty (e.g. only quick filters) — avoids a tall blank strip above the pills. */
  const showPrimaryRow =
    onSearchChange !== undefined ||
    Boolean(hasMultiFilters) ||
    Boolean(hasLegacyFilter) ||
    Boolean(sortConfig?.options?.length) ||
    children != null ||
    actions != null ||
    Boolean(quickFiltersResolved && quickFiltersInline)

  const inlineFilterFields = hasMultiFilters
    ? filtersConfig!.fields.map((f) => ({
        id: f.id,
        label: f.label,
        options: f.options,
        allLabel: f.allLabel,
      }))
    : []

  /** Card/registry use 48px search (`tableRegistrySearchInputClassName`); attached uses compact 36px controls. */
  const tallToolbar = variant === 'card' || variant === 'registry'
  const toolbarRowMinH = tallToolbar ? 'min-h-12' : 'min-h-[2.75rem]'
  const controlHeight = 'h-9 min-h-[2.25rem]'
  /** `ms-auto` aligns actions to the toolbar end on every breakpoint (fixes wrapped rows on mobile). */
  const actionsRowClass = tallToolbar
    ? 'flex h-12 shrink-0 items-center gap-1.5 ms-auto pl-2 sm:gap-2'
    : 'flex min-h-[2.75rem] shrink-0 items-center gap-1.5 md:ml-auto md:pl-2 sm:gap-2'
  const quickFiltersInlineWrapClass = tallToolbar
    ? 'flex h-12 shrink-0 items-center border-l border-border/50 pl-2 sm:h-auto sm:min-h-0 sm:pl-2.5'
    : 'flex min-h-[2.75rem] shrink-0 items-center border-l border-border/50 pl-2 sm:min-h-0 sm:pl-2.5'
  const legacyFilterWrapClass = tallToolbar
    ? 'flex h-12 min-w-0 shrink-0 items-center sm:h-auto'
    : 'flex min-h-[3rem] min-w-0 shrink-0 items-center sm:min-h-0'
  const legacySelectClass =
    variant === 'attached'
      ? '[&_select]:h-9 [&_select]:min-h-[2.25rem] [&_select]:text-xs [&_select]:py-1.5'
      : tableToolbarSelectMatchSearchClassName
  const sortSelectClass =
    variant === 'attached'
      ? 'min-w-0 w-[8rem] sm:w-[9rem] [&_select]:h-9 [&_select]:min-h-[2.25rem] [&_select]:text-xs [&_select]:py-1.5'
      : cn('min-w-0 w-[10rem] sm:w-[11rem]', tableToolbarSelectMatchSearchClassName)

  const quickFiltersAriaLabel =
    quickFiltersResolved?.groupAriaLabel ?? quickFiltersResolved?.label ?? 'Filter list'

  const quickFilterPillGroup =
    quickFiltersResolved != null ? (
      <div
        className={cn(
          'flex flex-wrap items-center shrink-0',
          quickFiltersInline
            ? quickFiltersCompact
              ? 'gap-1'
              : 'gap-1.5'
            : quickFiltersCompact
              ? 'gap-1.5'
              : 'gap-2'
        )}
        role="group"
        aria-label={quickFiltersAriaLabel}
      >
        <Button
          type="button"
          variant="ghost"
          size="xs"
          focusRing="none"
          onClick={() => quickFiltersResolved.onChange('')}
          className={cn(
            'group rounded-full shrink-0 !p-0 !min-h-0 h-auto leading-none',
            'hover:bg-transparent active:bg-transparent active:scale-100 focus-visible:bg-transparent shadow-none'
          )}
          aria-pressed={!quickFiltersResolved.value}
        >
          <Badge
            variant={!quickFiltersResolved.value ? 'primary' : 'outline'}
            size="sm"
            className={cn(
              'ring-offset-1 ring-offset-bg-secondary group-focus-visible:ring-2 group-focus-visible:ring-border-focus',
              quickFiltersInline && quickFiltersCompact && 'px-2 py-0.5 text-xs'
            )}
          >
            {quickFiltersResolved.allLabel ?? 'All'}
          </Badge>
        </Button>
        {quickFiltersResolved.options.map((opt) => (
          <Button
            key={opt.value}
            type="button"
            variant="ghost"
            size="xs"
            focusRing="none"
            onClick={() => quickFiltersResolved.onChange(opt.value)}
            className={cn(
              'group rounded-full shrink-0 !p-0 !min-h-0 h-auto leading-none',
              'hover:bg-transparent active:bg-transparent active:scale-100 focus-visible:bg-transparent shadow-none'
            )}
            aria-pressed={quickFiltersResolved.value === opt.value}
          >
            <Badge
              variant={quickFiltersResolved.value === opt.value ? 'primary' : 'outline'}
              size="sm"
              className={cn(
                'ring-offset-1 ring-offset-bg-secondary group-focus-visible:ring-2 group-focus-visible:ring-border-focus',
                quickFiltersInline && quickFiltersCompact && 'px-2 py-0.5 text-xs'
              )}
            >
              {opt.label}
            </Badge>
          </Button>
        ))}
      </div>
    ) : null

  /** Second toolbar strip (expandable filters or quick filters row) — primary omits bottom border so we don’t double lines. */
  const hasSecondaryToolbarSection =
    quickFiltersOnSecondRow || (Boolean(hasMultiFilters) && filterRowOpen)

  return (
    <div
      className={cn(
        'table-toolbar flex flex-col min-w-0',
        variant === 'card'
          ? 'rounded-2xl border border-border-subtle bg-bg-secondary shadow-sm'
          : variant === 'registry'
            ? 'w-full min-w-0 bg-transparent'
            : 'rounded-t-lg bg-bg-secondary',
        className
      )}
    >
      {/* Row 1: Search + filter button + chips + sort. Skipped when empty so quick-filters-only toolbars stay compact. */}
      {showPrimaryRow && (
      <div
        className={cn(
          'flex flex-wrap items-center gap-y-2 gap-x-2 min-w-0 w-full sm:gap-x-3 md:flex-nowrap md:items-center',
          variant === 'registry'
            ? tableRegistryToolbarStripClassName
            : variant === 'card'
              ? 'px-4 py-3 sm:px-5 sm:py-4'
              : 'px-3 py-2.5 sm:px-4 sm:py-3',
          toolbarRowMinH,
          variant === 'registry'
            ? undefined
            : variant === 'card'
              ? !hasSecondaryToolbarSection
                ? 'border-b border-border-subtle'
                : undefined
              : !hasSecondaryToolbarSection
                ? 'border-b border-border'
                : undefined
        )}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-y-2 gap-x-1.5 sm:gap-x-2 md:min-w-0 md:flex-nowrap md:items-center">
          {onSearchChange !== undefined && (
            <div
              className={cn(
                'min-w-0',
                variant === 'registry' &&
                  (searchFlexible
                    ? 'w-full max-w-full flex-1 sm:max-w-lg lg:max-w-xl'
                    : 'relative max-w-md flex-1'),
                variant !== 'registry' &&
                  (searchFlexible
                    ? 'w-full min-w-0 flex-1 basis-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl'
                    : 'max-w-full w-[12rem] shrink-0 sm:w-[14rem]')
              )}
            >
              {variant === 'attached' ? (
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  leftIcon={<SearchIcon className="h-4 w-4 text-text-muted" />}
                  className={cn(controlHeight, 'text-sm rounded-control w-full')}
                  aria-label="Search table"
                />
              ) : (
                <SearchInput
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  fullWidth
                  className={cn(tableRegistrySearchInputClassName, 'w-full')}
                  aria-label="Search table"
                />
              )}
            </div>
          )}

          {quickFiltersResolved && quickFiltersInline ? (
            <div className={quickFiltersInlineWrapClass}>{quickFilterPillGroup}</div>
          ) : null}

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
            <div className={legacyFilterWrapClass}>
              <Select
                value={filterValue ?? ''}
                onChange={(e) => onFilterChange?.(e.target.value)}
                size={variant === 'attached' ? 'sm' : 'md'}
                className={legacySelectClass}
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
            <div className={cn('flex shrink-0 items-center', tallToolbar ? 'h-12 sm:h-auto' : '')}>
              <label htmlFor="toolbar-sort-by" className="sr-only">
                Sort by
              </label>
              <Select
                id="toolbar-sort-by"
                size={variant === 'attached' ? 'sm' : 'md'}
                value={sortConfig.sortKey}
                onChange={(e) => sortConfig.onSortChange(e.target.value, sortConfig.sortDir)}
                className={sortSelectClass}
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

        {actions != null && <div className={actionsRowClass}>{actions}</div>}
      </div>
      )}

      {/* Row 2: Expandable filter row — same min-height as row 1, controls use h-9 for alignment */}
      {hasMultiFilters && filterRowOpen && (
        <div
          className={cn(
            toolbarRowMinH,
            'flex flex-col justify-center',
            variant === 'registry' && 'border-t border-border-subtle bg-bg-secondary/40 px-5 sm:px-6',
            variant === 'card' && 'border-t border-border-subtle',
            variant === 'attached' && 'border-t border-border-subtle',
            !quickFiltersOnSecondRow &&
              (variant === 'card'
                ? 'border-b border-border-subtle'
                : variant === 'registry'
                  ? 'border-b border-border-subtle'
                  : 'border-b border-border')
          )}
        >
          <FilterInlineRow
            fields={inlineFilterFields}
            values={filtersConfig!.values}
            onValuesChange={filtersConfig!.onValuesChange}
            onClearAll={handleClearAll}
            rowLabel="Filters"
          />
        </div>
      )}

      {/* Row below primary: quick filters when not inline */}
      {quickFiltersOnSecondRow ? (
        <div
          className={cn(
            'table-toolbar-quick flex flex-wrap items-center justify-start',
            quickFiltersCompact ? 'gap-x-1.5 gap-y-1' : 'gap-2',
            variant === 'registry'
              ? 'border-b border-border-subtle bg-bg-secondary/40 px-5 py-2 sm:px-6 sm:py-3'
              : variant === 'card'
                ? 'border-y border-border-subtle px-4 py-2 sm:px-5 sm:py-3'
                : 'border-y border-border px-3 py-1.5 sm:px-4 sm:py-2'
          )}
        >
          {quickFiltersResolved!.label ? (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-text-tertiary shrink-0 pr-0.5">
              {quickFiltersResolved!.label}
            </span>
          ) : null}
          {quickFilterPillGroup}
        </div>
      ) : null}
    </div>
  )
}

TableToolbar.displayName = 'TableToolbar'
