import React from 'react'
import { cn } from '@/utils/cn'

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
  /** Wrap table in a rounded container (use with TableToolbar/TablePagination). */
  container?: boolean
  /** Use table-fixed layout for stable column widths (no content-based reflow). */
  fixed?: boolean
  /** Keep header row visible when scrolling vertically. Requires scroll container. */
  stickyHeader?: boolean
  /** Max height of the scroll area when stickyHeader (e.g. "60vh", "400px"). Enables vertical scroll. */
  scrollMaxHeight?: string
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, container = false, fixed = false, stickyHeader = false, scrollMaxHeight, ...props }, ref) => {
    const scrollWrapperClass = cn(
      'w-full min-w-0 overflow-auto',
      stickyHeader && '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-bg-secondary [&_thead]:shadow-sm'
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
      return (
        <div className="table-container border-x border-b border-border bg-bg-secondary min-w-0 w-full">
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
          'table-header border-b border-border bg-bg-secondary',
          'text-left text-sm font-semibold text-text-primary',
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
        className={cn('[&_tr:last-child]:border-0', className)}
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
          'table-row border-b border-border transition-colors duration-brand ease-brand',
          hover && 'hover:bg-tertiary/[0.05] dark:hover:bg-tertiary/[0.08]',
          interactive && 'cursor-pointer hover:bg-tertiary/[0.05] dark:hover:bg-tertiary/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-border-focus',
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
          <span className="inline-flex shrink-0 items-center justify-center w-4 h-4 text-text-secondary" aria-hidden>
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
          'h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-semibold text-text-primary text-sm whitespace-nowrap',
          isButton && 'cursor-pointer select-none hover:bg-tertiary/[0.05] dark:hover:bg-tertiary/[0.08] hover:text-text-primary transition-colors duration-brand ease-brand rounded-t',
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
        className={cn('px-2 py-2 sm:px-4 sm:py-3 align-middle text-sm text-text-secondary', className)}
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
