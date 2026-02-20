import React, { useId } from 'react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/Card'

export interface ResponsiveSpan {
  /** Base (mobile) span */
  base?: number
  /** Small screens (640px+) span */
  sm?: number
  /** Medium screens (768px+) span */
  md?: number
  /** Large screens (1024px+) span */
  lg?: number
  /** Extra large screens (1280px+) span */
  xl?: number
}

export interface BentoItem {
  /** Unique key for the item */
  key: string
  /** Content to render in the card */
  content: React.ReactNode
  /** Number of columns to span (default: 1). Can be a number or responsive object */
  colSpan?: number | ResponsiveSpan
  /** Number of rows to span (default: 1). Can be a number or responsive object */
  rowSpan?: number | ResponsiveSpan
  /** Optional className for the card */
  className?: string
  /** Optional padding override */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Optional variant override */
  variant?: 'default' | 'outlined' | 'filled' | 'elevated'
}

export interface BentoProps {
  /** Array of items to display in the bento grid */
  items: BentoItem[]
  /** Number of columns in the grid. Can be a number or responsive object (default: { base: 1, sm: 2, md: 3, lg: 4 }) */
  columns?: number | ResponsiveSpan
  /** Gap between items (default: 'md') */
  gap?: 'sm' | 'md' | 'lg'
  /** Optional className for the container */
  className?: string
  /** Minimum height for grid items (default: 'auto') */
  minHeight?: string | number
}

const gapMap = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
}

// Map of common span values to Tailwind classes
const spanClassMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
}

const rowSpanClassMap: Record<number, string> = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
}

function getSpanClasses(span: number | ResponsiveSpan | undefined, defaultSpan: number, isRow = false): string {
  if (!span) {
    return isRow ? rowSpanClassMap[defaultSpan] || '' : spanClassMap[defaultSpan] || ''
  }
  
  if (typeof span === 'number') {
    return isRow ? (rowSpanClassMap[span] || '') : (spanClassMap[span] || '')
  }

  const classes: string[] = []
  const map = isRow ? rowSpanClassMap : spanClassMap
  
  if (span.base !== undefined) {
    classes.push(map[span.base] || '')
  }
  if (span.sm !== undefined) {
    classes.push(`sm:${map[span.sm] || ''}`)
  }
  if (span.md !== undefined) {
    classes.push(`md:${map[span.md] || ''}`)
  }
  if (span.lg !== undefined) {
    classes.push(`lg:${map[span.lg] || ''}`)
  }
  if (span.xl !== undefined) {
    classes.push(`xl:${map[span.xl] || ''}`)
  }
  
  return classes.filter(Boolean).join(' ')
}

// Map of common column values to Tailwind classes
const gridColsClassMap: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
}

function getGridColumnsClasses(columns: number | ResponsiveSpan | undefined): string {
  if (!columns) {
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  }
  
  if (typeof columns === 'number') {
    return gridColsClassMap[columns] || ''
  }

  // For responsive columns, use CSS custom properties via inline styles
  // Return empty string and handle via styles
  return ''
}

function getGridColumnsStyle(columns: number | ResponsiveSpan | undefined): React.CSSProperties {
  const defaultColumns = { base: 1, sm: 2, md: 3, lg: 4 }
  
  if (!columns) {
    const style: Record<string, string> = {
      '--grid-cols-base': String(defaultColumns.base),
      '--grid-cols-sm': String(defaultColumns.sm),
      '--grid-cols-md': String(defaultColumns.md),
      '--grid-cols-lg': String(defaultColumns.lg),
    }
    return style as React.CSSProperties
  }
  
  if (typeof columns === 'number') {
    return { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }
  }

  const style: Record<string, string> = {
    '--grid-cols-base': String(columns.base ?? defaultColumns.base),
    '--grid-cols-sm': String(columns.sm ?? defaultColumns.sm),
    '--grid-cols-md': String(columns.md ?? defaultColumns.md),
    '--grid-cols-lg': String(columns.lg ?? defaultColumns.lg),
  }
  
  if (columns.xl !== undefined) {
    style['--grid-cols-xl'] = String(columns.xl)
  }

  return style as React.CSSProperties
}

function getSpanStyle(span: number | ResponsiveSpan | undefined, _defaultSpan: number, isRow = false): React.CSSProperties {
  if (!span || typeof span === 'number') {
    return {}
  }

  // For responsive spans, use CSS custom properties
  const propPrefix = isRow ? 'row-span' : 'col-span'
  const style: Record<string, string> = {}
  
  if (span.base !== undefined) {
    style[`--${propPrefix}-base`] = String(span.base)
  }
  if (span.sm !== undefined) {
    style[`--${propPrefix}-sm`] = String(span.sm)
  }
  if (span.md !== undefined) {
    style[`--${propPrefix}-md`] = String(span.md)
  }
  if (span.lg !== undefined) {
    style[`--${propPrefix}-lg`] = String(span.lg)
  }
  if (span.xl !== undefined) {
    style[`--${propPrefix}-xl`] = String(span.xl)
  }

  return style as React.CSSProperties
}

export const Bento: React.FC<BentoProps> = ({
  items,
  columns,
  gap = 'md',
  className,
  minHeight = 'auto',
}) => {
  const id = useId()
  const gridId = `bento-${id.replace(/:/g, '-')}`
  const gridColumnsClasses = getGridColumnsClasses(columns)
  const gridColumnsStyle = getGridColumnsStyle(columns)
  const gapValue = gap === 'sm' ? '0.5rem' : gap === 'md' ? '1rem' : '1.5rem'
  const isResponsiveColumns = typeof columns === 'object' && columns !== null

  // Generate CSS for responsive spans and columns
  const responsiveItems = items.filter(
    item => (typeof item.colSpan === 'object' && item.colSpan !== null) || 
            (typeof item.rowSpan === 'object' && item.rowSpan !== null)
  )

  const hasResponsiveSpans = responsiveItems.length > 0 || isResponsiveColumns

  return (
    <>
      {hasResponsiveSpans && (
        <style>{`
          ${isResponsiveColumns ? `
          #${gridId} {
            grid-template-columns: repeat(var(--grid-cols-base, 1), minmax(0, 1fr));
          }
          @media (min-width: 640px) {
            #${gridId} {
              grid-template-columns: repeat(var(--grid-cols-sm, 2), minmax(0, 1fr)) !important;
            }
          }
          @media (min-width: 768px) {
            #${gridId} {
              grid-template-columns: repeat(var(--grid-cols-md, 3), minmax(0, 1fr)) !important;
            }
          }
          @media (min-width: 1024px) {
            #${gridId} {
              grid-template-columns: repeat(var(--grid-cols-lg, 4), minmax(0, 1fr)) !important;
            }
          }
          @media (min-width: 1280px) {
            #${gridId} {
              grid-template-columns: repeat(var(--grid-cols-xl, 4), minmax(0, 1fr)) !important;
            }
          }
          ` : ''}
          #${gridId} [data-col-span-base] {
            grid-column: span var(--col-span-base, 1);
          }
          #${gridId} [data-row-span-base] {
            grid-row: span var(--row-span-base, 1);
          }
          @media (min-width: 640px) {
            #${gridId} [data-col-span-sm] {
              grid-column: span var(--col-span-sm, 1);
            }
            #${gridId} [data-row-span-sm] {
              grid-row: span var(--row-span-sm, 1);
            }
          }
          @media (min-width: 768px) {
            #${gridId} [data-col-span-md] {
              grid-column: span var(--col-span-md, 1);
            }
            #${gridId} [data-row-span-md] {
              grid-row: span var(--row-span-md, 1);
            }
          }
          @media (min-width: 1024px) {
            #${gridId} [data-col-span-lg] {
              grid-column: span var(--col-span-lg, 1);
            }
            #${gridId} [data-row-span-lg] {
              grid-row: span var(--row-span-lg, 1);
            }
          }
          @media (min-width: 1280px) {
            #${gridId} [data-col-span-xl] {
              grid-column: span var(--col-span-xl, 1);
            }
            #${gridId} [data-row-span-xl] {
              grid-row: span var(--row-span-xl, 1);
            }
          }
        `}</style>
      )}
      <div
        id={gridId}
        className={cn('grid w-full min-w-0', gridColumnsClasses, gapMap[gap], className)}
        style={{ ...gridColumnsStyle, gap: gapValue }}
      >
        {items.map((item) => {
          const colSpanClasses = getSpanClasses(item.colSpan, 1, false)
          const rowSpanClasses = getSpanClasses(item.rowSpan, 1, true)
          const colSpanStyle = getSpanStyle(item.colSpan, 1, false)
          const rowSpanStyle = getSpanStyle(item.rowSpan, 1, true)
          const isResponsiveCol = typeof item.colSpan === 'object' && item.colSpan !== null
          const isResponsiveRow = typeof item.rowSpan === 'object' && item.rowSpan !== null
          
          const itemStyle: React.CSSProperties = {
            ...colSpanStyle,
            ...rowSpanStyle,
            minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
          }

          // For static spans, use Tailwind classes; for responsive, use data attributes
          const dataAttributes: Record<string, string | undefined> = {}
          if (isResponsiveCol) {
            if (typeof item.colSpan === 'object') {
              if (item.colSpan.base !== undefined) dataAttributes['data-col-span-base'] = ''
              if (item.colSpan.sm !== undefined) dataAttributes['data-col-span-sm'] = ''
              if (item.colSpan.md !== undefined) dataAttributes['data-col-span-md'] = ''
              if (item.colSpan.lg !== undefined) dataAttributes['data-col-span-lg'] = ''
              if (item.colSpan.xl !== undefined) dataAttributes['data-col-span-xl'] = ''
            }
          }
          if (isResponsiveRow) {
            if (typeof item.rowSpan === 'object') {
              if (item.rowSpan.base !== undefined) dataAttributes['data-row-span-base'] = ''
              if (item.rowSpan.sm !== undefined) dataAttributes['data-row-span-sm'] = ''
              if (item.rowSpan.md !== undefined) dataAttributes['data-row-span-md'] = ''
              if (item.rowSpan.lg !== undefined) dataAttributes['data-row-span-lg'] = ''
              if (item.rowSpan.xl !== undefined) dataAttributes['data-row-span-xl'] = ''
            }
          }

          return (
            <div
              key={item.key}
              style={itemStyle}
              className={cn(
                'min-w-0',
                !isResponsiveCol && colSpanClasses,
                !isResponsiveRow && rowSpanClasses
              )}
              {...dataAttributes}
            >
              <Card
                variant={item.variant ?? 'outlined'}
                padding={item.padding ?? 'md'}
                className={cn('h-full w-full min-w-0 bg-bg-secondary', item.className)}
              >
                {item.content}
              </Card>
            </div>
          )
        })}
      </div>
    </>
  )
}

Bento.displayName = 'Bento'
