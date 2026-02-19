import React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { Select } from '@/components/Select'

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

/**
 * Returns an array of page numbers and ellipsis for pagination.
 * Always includes first and last when totalPages > maxVisible.
 * e.g. [1, 'ellipsis', 4, 5, 6, 'ellipsis', 10]
 */
function getPageNumbers(totalPages: number, currentPage: number, maxVisible: number = 7): (number | 'ellipsis')[] {
  if (totalPages <= 0) return []
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages: (number | 'ellipsis')[] = []
  const windowSize = Math.max(3, maxVisible - 2) // leave room for first, last, and two ellipsis
  let start = Math.max(2, currentPage - Math.floor(windowSize / 2))
  let end = Math.min(totalPages - 1, start + windowSize - 1)
  if (end - start + 1 < windowSize) {
    start = Math.max(2, end - windowSize + 1)
  }

  pages.push(1)
  if (start > 2) pages.push('ellipsis')
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (end < totalPages - 1) pages.push('ellipsis')
  if (totalPages > 1) pages.push(totalPages)
  return pages
}

export interface TablePaginationProps {
  /** Current page (1-based). */
  page: number
  /** Total number of pages. */
  totalPages: number
  /** Called when page changes. */
  onPageChange: (page: number) => void
  /** Page size options (e.g. [10, 25, 50, 100]). */
  pageSizeOptions?: number[]
  /** Current page size. */
  pageSize: number
  /** Called when page size changes. */
  onPageSizeChange: (size: number) => void
  /** Total number of items (for "X–Y of Z" display). */
  totalItems: number
  /** Optional label for the page size select. */
  pageSizeLabel?: string
  /** Max page number buttons to show (excluding ellipsis). Default 7 on desktop, 5 on mobile. */
  maxPageButtons?: number
  className?: string
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  totalPages,
  onPageChange,
  pageSizeOptions = [10, 25, 50, 100],
  pageSize,
  onPageSizeChange,
  totalItems,
  pageSizeLabel = 'Rows per page',
  maxPageButtons,
  className,
}) => {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)
  const hasPrev = page > 1
  const hasNext = page < totalPages
  const totalPagesSafe = Math.max(1, totalPages)

  const pageNumbers = getPageNumbers(totalPagesSafe, page, maxPageButtons)

  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between',
        'rounded-b-lg border-t border-default bg-bg-secondary px-2 py-2 xs:px-3 sm:px-4 sm:py-3 lg:px-5',
        'text-sm text-text-secondary',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        <span className="whitespace-nowrap">
          {totalItems === 0 ? '0 results' : `${start}–${end} of ${totalItems}`}
        </span>
        {pageSizeOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <label htmlFor="table-page-size" className="sr-only sm:not-sr-only sm:inline text-text-tertiary">
              {pageSizeLabel}
            </label>
            <Select
              id="table-page-size"
              value={String(pageSize)}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="w-auto min-w-[4.5rem] [&_select]:h-8 [&_select]:py-1 [&_select]:pr-8"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-2">
        {/* Mobile: compact "Page N of M" + prev/next */}
        <div className="flex sm:hidden items-center gap-1 flex-1 justify-center">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <span className="min-w-[5rem] text-center font-medium text-text-primary" aria-live="polite">
            {page} / {totalPagesSafe}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Desktop: full page numbers + prev/next */}
        <nav className="hidden sm:flex items-center gap-0.5" aria-label="Pagination">
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrev}
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-0.5 mx-1">
            {pageNumbers.map((item, i) =>
              item === 'ellipsis' ? (
                <span
                  key={`ellipsis-${i}`}
                  className="flex h-8 w-8 items-center justify-center text-text-tertiary"
                  aria-hidden
                >
                  …
                </span>
              ) : (
                <Button
                  key={item}
                  variant={page === item ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(item)}
                  className={cn(
                    'min-w-[2rem] h-8 px-2',
                    page === item && 'pointer-events-none',
                    page !== item && 'text-text-secondary hover:text-text-primary'
                  )}
                  aria-label={page === item ? `Current page, page ${item}` : `Go to page ${item}`}
                  aria-current={page === item ? 'page' : undefined}
                >
                  {item}
                </Button>
              )
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNext}
            aria-label="Next page"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    </div>
  )
}

TablePagination.displayName = 'TablePagination'
