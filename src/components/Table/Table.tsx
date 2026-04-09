import React from 'react'
import { cn } from '@/utils/cn'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  /** Wrap table in a rounded container (use with TableToolbar/TablePagination). */
  container?: boolean
  /**
   * Container appearance when `container` is enabled.
   * - `card`: rounded border + subtle shadow (standalone table)
   * - `attached`: flat edges meant to attach to a `TableToolbar` above (classic)
   * - `registry`: table body inside `TableRegistryShell` (shell provides the outer border)
   */
  containerVariant?: 'card' | 'attached' | 'registry'
  /** Use table-fixed layout for stable column widths (no content-based reflow). */
  fixed?: boolean
  /** Keep header row visible when scrolling vertically. Requires scroll container. */
  stickyHeader?: boolean
  /** Max height of the scroll area when stickyHeader (e.g. "60vh", "400px"). Enables vertical scroll. */
  scrollMaxHeight?: string
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  (
    {
      className,
      children,
      container = false,
      containerVariant = 'card',
      fixed = false,
      stickyHeader = false,
      scrollMaxHeight,
      ...props
    },
    ref
  ) => {
    const scrollWrapperClass = cn(
      'w-full min-w-0 overflow-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]',
      stickyHeader &&
        '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:border-b [&_thead]:border-border-subtle [&_thead]:bg-brand-primary/[0.07] [&_thead]:shadow-sm dark:[&_thead]:bg-brand-primary/[0.14]'
    )
    const scrollStyle = scrollMaxHeight ? { maxHeight: scrollMaxHeight } : undefined
    const tableEl = (
      <div
        className={scrollWrapperClass}
        style={scrollStyle}
        tabIndex={scrollMaxHeight ? 0 : undefined}
        role={scrollMaxHeight ? 'region' : undefined}
        aria-label={scrollMaxHeight ? 'Scrollable table content' : undefined}
      >
        <table
          ref={ref}
          className={cn(
            'w-full caption-bottom text-sm',
            fixed && 'table-fixed',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    )
    if (container) {
      const containerClass =
        containerVariant === 'attached'
          ? 'min-w-0 w-full border-x border-b border-border bg-bg-primary'
          : containerVariant === 'registry'
            ? 'min-w-0 w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-primary shadow-sm'
            : 'min-w-0 w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-primary shadow-sm'
      return (
        <div className={cn('table-container', containerClass)}>
          {tableEl}
        </div>
      )
    }
    return tableEl
  }
)

Table.displayName = 'Table'

export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead
        ref={ref}
        className={cn(
          'table-header border-b border-border-subtle bg-brand-primary/[0.07] text-left dark:bg-brand-primary/[0.14]',
          className
        )}
        {...props}
      >
        {children}
      </thead>
    )
  }
)

TableHeader.displayName = 'TableHeader'

export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children: React.ReactNode
}

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={cn(
          'bg-bg-secondary/[0.35] dark:bg-bg-secondary/20 [&_tr:last-child]:border-0',
          className
        )}
        {...props}
      >
        {children}
      </tbody>
    )
  }
)

TableBody.displayName = 'TableBody'

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  hover?: boolean
  /** Show pointer and hover state (e.g. clickable row). */
  interactive?: boolean
  /** Applies the branded selection state (left-accent bar + tinted background). */
  selected?: boolean
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover = false, interactive = false, selected = false, children, onClick, onKeyDown, ...props }, ref) => {
    const handleKeyDown = interactive
      ? (e: React.KeyboardEvent<HTMLTableRowElement>) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(e as unknown as React.MouseEvent<HTMLTableRowElement>) }
          onKeyDown?.(e)
        }
      : onKeyDown

    return (
      <tr
        ref={ref}
        aria-selected={selected || undefined}
        tabIndex={interactive ? 0 : undefined}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'table-row border-b border-border-subtle transition-colors duration-brand ease-brand',
          hover && 'hover:bg-bg-secondary/50 dark:hover:bg-bg-secondary/40',
          interactive &&
            'cursor-pointer hover:bg-bg-secondary/50 dark:hover:bg-bg-secondary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus',
          selected && 'row-selected',
          className
        )}
        {...props}
      >
        {children}
      </tr>
    )
  }
)

TableRow.displayName = 'TableRow'

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
const SortBothIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m7 15 5 5 5-5" />
    <path d="m7 9 5-5 5 5" />
  </svg>
)

export type SortDirection = 'asc' | 'desc' | null

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  /** Enable sort indicator and click handler. */
  sortable?: boolean
  /** Current sort direction (asc/desc) or null for unsorted. */
  sortDirection?: SortDirection
  /** Called when sortable column header is clicked. */
  onSort?: () => void
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, sortable, sortDirection = null, onSort, ...props }, ref) => {
    const isButton = sortable && onSort
    const content = (
      <span className="inline-flex items-center gap-1.5 min-w-0">
        <span className="truncate">{children}</span>
        {sortable && (
          <span
            className="inline-flex shrink-0 items-center justify-center w-4 h-4 text-brand-primary/90 dark:text-brand-primary/85"
            aria-hidden
          >
            {sortDirection === 'asc' && <SortAscIcon className="h-4 w-4" />}
            {sortDirection === 'desc' && <SortDescIcon className="h-4 w-4" />}
            {sortDirection === null && <SortBothIcon className="h-4 w-4 opacity-50" />}
          </span>
        )}
      </span>
    )
    const ariaSort =
      sortable && sortDirection !== null
        ? sortDirection === 'asc'
          ? 'ascending'
          : 'descending'
        : sortable
          ? 'other'
          : undefined

    return (
      <th
        ref={ref}
        className={cn(
          'h-10 sm:h-12 px-2 sm:px-4 text-left align-middle text-[11px] font-semibold uppercase tracking-wide text-text-primary whitespace-nowrap',
          isButton &&
            'cursor-pointer select-none hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition-colors duration-brand ease-brand',
          className
        )}
        {...(isButton
          ? {
              onClick: onSort,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onSort?.()
                }
              },
              tabIndex: 0,
              'aria-sort': ariaSort,
            }
          : {})}
        {...props}
      >
        {content}
      </th>
    )
  }
)

TableHead.displayName = 'TableHead'

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td
        ref={ref}
        className={cn('px-2 py-2 sm:px-4 sm:py-3 align-middle text-sm text-text-primary', className)}
        {...props}
      >
        {children}
      </td>
    )
  }
)

TableCell.displayName = 'TableCell'

export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  children: React.ReactNode
}

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <caption
        ref={ref}
        className={cn('mt-4 text-sm text-text-secondary', className)}
        {...props}
      >
        {children}
      </caption>
    )
  }
)

TableCaption.displayName = 'TableCaption'
