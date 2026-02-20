import React from 'react'
import { cn } from '@/utils/cn'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card'

export interface TableCardViewColumn<T = Record<string, unknown>> {
  key: string
  label: string
  /** Show as card title / primary line (first column recommended). */
  primary?: boolean
  /** Custom render (value, item). */
  render?: (value: unknown, item: T) => React.ReactNode
}

export interface TableCardViewProps<T = object> {
  /** Column definitions (key, label, primary?, render?). */
  columns: TableCardViewColumn<T>[]
  /** Data items (each object should have keys matching column.key). */
  items: T[]
  /** Row click handler (e.g. open detail). */
  onRowClick?: (item: T) => void
  /** Unique key for each item (default: index). */
  getKey?: (item: T, index: number) => string
  /** Layout: list (stacked) or grid (tiles). */
  layout?: 'list' | 'grid'
  /** Optional class for the container. */
  className?: string
}

function getValue<T extends object>(item: T, key: string): unknown {
  const obj = item as Record<string, unknown>
  return obj[key]
}

export function TableCardView<T extends object>({
  columns,
  items,
  onRowClick,
  getKey = (_, i) => String(i),
  layout = 'list',
  className,
}: TableCardViewProps<T>) {
  const primaryCols = columns.filter((c) => c.primary)
  const secondaryCols = columns.filter((c) => !c.primary)

  return (
    <div
      className={cn(
        'min-w-0',
        layout === 'grid'
          ? 'grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3'
          : 'flex flex-col gap-3',
        className
      )}
      role="list"
    >
      {items.map((item, index) => {
        const key = getKey(item, index)
        const primaryContent = primaryCols.length
          ? primaryCols
              .map((col) => {
                const value = getValue(item, col.key)
                const node = col.render ? col.render(value, item) : (value as React.ReactNode)
                return node
              })
              .filter(Boolean)
          : [getValue(item, columns[0]?.key ?? '')]

        return (
          <Card
            key={key}
            variant="outlined"
            padding="md"
            interactive={!!onRowClick}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={cn(onRowClick && 'cursor-pointer')}
            role="listitem"
          >
            <CardHeader className="mb-2 sm:mb-3">
              <CardTitle className="text-base sm:text-lg line-clamp-2">
                {primaryContent.map((node, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span className="text-text-tertiary mx-1" aria-hidden>·</span>}
                    {node as React.ReactNode}
                  </React.Fragment>
                ))}
              </CardTitle>
            </CardHeader>
            {secondaryCols.length > 0 && (
              <CardContent>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  {secondaryCols.map((col) => {
                    const value = getValue(item, col.key)
                    const node = col.render ? col.render(value, item) : (value as React.ReactNode)
                    return (
                      <div key={col.key} className="flex flex-wrap items-baseline gap-x-2">
                        <dt className="font-medium text-text-tertiary shrink-0">{col.label}</dt>
                        <dd className="text-text-primary min-w-0 break-words">{node as React.ReactNode}</dd>
                      </div>
                    )
                  })}
                </dl>
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}

TableCardView.displayName = 'TableCardView'
