import React from 'react'
import { cn } from '@/utils/cn'
import { Badge } from '@/components/Badge'

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  className?: string
}

const defaultSeparator = (
  <svg
    className="w-3.5 h-3.5 text-text-muted shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  className,
  ...props
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex flex-wrap items-center gap-1.5', className)}
      {...props}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const sep = index > 0 ? (separator ?? defaultSeparator) : null

          return (
            <li key={index} className="flex items-center gap-1.5">
              {sep && <span className="flex items-center">{sep}</span>}
              {isLast ? (
                <Badge variant="primary" size="sm" className="font-medium">
                  {item.label}
                </Badge>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="inline-flex no-underline hover:opacity-90 focus-ring rounded-full focus:opacity-90"
                >
                  <Badge variant="outline" size="sm">
                    {item.label}
                  </Badge>
                </a>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="inline-flex cursor-pointer border-0 bg-transparent p-0 font-inherit text-inherit hover:opacity-90 focus-ring rounded-full focus:opacity-90"
                >
                  <Badge variant="outline" size="sm">
                    {item.label}
                  </Badge>
                </button>
              ) : (
                <Badge variant="outline" size="sm">
                  {item.label}
                </Badge>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
