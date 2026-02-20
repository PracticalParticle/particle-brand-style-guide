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
      stickyHeader && '[&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-bg-secondary [&_thead]:shadow-[0_1px_0_0_rgba(0,0,0,0.05)]'
    )
    const scrollStyle = scrollMaxHeight ? { maxHeight: scrollMaxHeight } : undefined
    const tableEl = (
      <div className={scrollWrapperClass} style={scrollStyle}>
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
        <div className="border-x border-b border-default bg-bg-primary min-w-0 w-full">
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
          'border-b border-default bg-bg-secondary',
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
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, hover = false, interactive = false, children, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b border-default/30 transition-colors',
          hover && 'hover:bg-bg-tertiary/60',
          interactive && 'cursor-pointer hover:bg-bg-tertiary/60',
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
          <span className="inline-flex shrink-0 items-center justify-center w-4 h-4 text-text-tertiary" aria-hidden>
            {sortDirection === 'asc' && <SortAscIcon className="h-4 w-4" />}
            {sortDirection === 'desc' && <SortDescIcon className="h-4 w-4" />}
            {sortDirection === null && <SortBothIcon className="h-4 w-4 opacity-50" />}
          </span>
        )}
      </span>
    )
    return (
      <th
        ref={ref}
        className={cn(
          'h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-semibold text-text-primary text-sm whitespace-nowrap',
          isButton && 'cursor-pointer select-none hover:bg-bg-tertiary/40 hover:text-text-primary transition-colors rounded-t',
          className
        )}
        {...(isButton
          ? { onClick: onSort, onKeyDown: (e: React.KeyboardEvent) => (e.key === 'Enter' || e.key === ' ') && onSort?.(), role: 'button', tabIndex: 0 }
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
        className={cn('mt-4 text-sm text-text-tertiary', className)}
        {...props}
      >
        {children}
      </caption>
    )
  }
)

TableCaption.displayName = 'TableCaption'
