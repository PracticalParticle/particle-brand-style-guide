import React from 'react'
import { cn } from '@/utils/cn'

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

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator,
  className,
  ...props
}) => {
  const defaultSeparator = (
      <svg
        className="w-4 h-4 text-neutral-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-2', className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          
          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-neutral-500">
                  {separator || defaultSeparator}
                </span>
              )}
              {isLast ? (
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {item.label}
                </span>
              ) : item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.displayName = 'Breadcrumbs'
