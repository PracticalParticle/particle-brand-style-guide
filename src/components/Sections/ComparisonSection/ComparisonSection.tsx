import React, { useId } from 'react'
import { cn } from '@/utils/cn'

export type ComparisonCellValue = boolean | React.ReactNode

export interface ComparisonSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Section heading */
  title?: React.ReactNode
  /** Optional section-level description */
  description?: React.ReactNode
  /** Column headers (e.g. plan names or product names) */
  columnHeaders: React.ReactNode[]
  /** Row definitions: feature label + one value per column */
  rows: { label: React.ReactNode; values: ComparisonCellValue[] }[]
  /** Layout: table (semantic table) or cards (card per column, good for mobile) */
  layout?: 'table' | 'cards'
  /** Use a solid muted background for the section */
  withBackgroundPattern?: boolean
  /** Show divider line between section header and comparison */
  showHeaderDivider?: boolean
}

function CellContent({ value }: { value: ComparisonCellValue }) {
  if (typeof value === 'boolean') {
    const label = value ? 'Yes' : 'No'

    return (
      <span className="inline-flex items-center justify-center gap-2">
        <span
          className={cn(
            'inline-flex',
            value ? 'text-success' : 'text-text-tertiary'
          )}
          aria-hidden="true"
        >
          {value ? <CheckIcon /> : <CrossIcon />}
        </span>
        <span className="sr-only">{label}</span>
      </span>
    )
  }

  return <span className="text-text-primary">{value}</span>
}

function CheckIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  title,
  description,
  columnHeaders,
  rows,
  layout = 'table',
  withBackgroundPattern = false,
  showHeaderDivider = true,
  className,
  ...props
}) => {
  const headingId = useId()
  const colCount = columnHeaders.length

  return (
    <section
      className={cn(
        'relative py-10 sm:py-12',
        withBackgroundPattern && 'bg-bg-surface-muted',
        className
      )}
      aria-labelledby={title ? headingId : undefined}
      {...props}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        {(title || description) && (
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            {title && (
              <h2 id={headingId} className="text-heading-2 text-text-primary">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-body-secondary text-text-secondary">
                {description}
              </p>
            )}
            {showHeaderDivider && (
              <hr
                className={cn(
                  'mt-8 border-0 border-t border-border',
                  withBackgroundPattern && 'dark:border-[rgb(255_255_255/0.12)]'
                )}
                aria-hidden
              />
            )}
          </div>
        )}

        {layout === 'table' ? (
          <div className="overflow-x-auto rounded-card border border-border bg-bg-secondary">
            <table className="w-full min-w-[320px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th
                    scope="col"
                    className="w-1/3 min-w-[8rem] px-4 py-3 sm:px-5 sm:py-4 font-semibold text-text-primary bg-bg-surface-muted/50"
                  >
                    <span className="sr-only">Feature</span>
                  </th>
                  {columnHeaders.map((header, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 sm:px-5 sm:py-4 font-semibold text-text-primary bg-bg-surface-muted/50 text-center"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      'border-b border-border last:border-b-0',
                      rowIndex % 2 === 0 && 'bg-bg-secondary'
                    )}
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 sm:px-5 sm:py-4 font-medium text-text-primary text-left"
                    >
                      {row.label}
                    </th>
                    {Array.from({ length: colCount }).map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-3 sm:px-5 sm:py-4 text-center text-text-secondary"
                      >
                        <CellContent value={row.values[colIndex] ?? false} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className={cn(
              'grid grid-cols-1 gap-4 sm:gap-6',
              colCount >= 4
                ? 'sm:grid-cols-2 lg:grid-cols-4'
                : colCount === 3
                  ? 'sm:grid-cols-2 lg:grid-cols-3'
                  : 'sm:grid-cols-2'
            )}
          >
            {columnHeaders.map((header, colIndex) => (
              <div
                key={colIndex}
                className="rounded-card border border-border bg-bg-secondary p-5 sm:p-6"
              >
                <h3 className="text-lg font-semibold text-text-primary mb-4 text-center">
                  {header}
                </h3>
                <dl className="space-y-3">
                  {rows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-text-secondary shrink-0 min-w-0">
                        {row.label}
                      </dt>
                      <dd className="text-text-primary shrink-0">
                        <CellContent
                          value={row.values[colIndex] ?? false}
                        />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

ComparisonSection.displayName = 'ComparisonSection'
