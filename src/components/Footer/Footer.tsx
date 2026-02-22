import React from 'react'
import { cn } from '@/utils/cn'

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterColumn {
  heading?: string
  links: FooterLink[]
}

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Copyright and/or legal line (e.g. "© 2025 Company Name"). */
  copyright: React.ReactNode
  /** Inline links (e.g. Whitepaper, Twitter, Terms). Rendered in a single row. */
  links?: FooterLink[]
  /** Optional columns for multi-column layout (e.g. Product, Legal, Social). */
  columns?: FooterColumn[]
  /** Visual style. Default: default. */
  variant?: 'default' | 'minimal' | 'wide'
  children?: React.ReactNode
}

export const Footer: React.FC<FooterProps> = ({
  copyright,
  links,
  columns,
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const linkClass =
    'text-body-secondary hover:text-text-primary transition-colors duration-normal focus-ring rounded-control outline-offset-2'

  return (
    <footer
      role="contentinfo"
      className={cn(
        'border-t border-border bg-bg-secondary/95 backdrop-blur-sm shadow-subtle',
        variant === 'wide' && 'py-10',
        variant === 'minimal' && 'py-6',
        variant === 'default' && 'py-8',
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        {(columns && columns.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {columns.map((col, i) => (
              <div key={i}>
                {col.heading && (
                  <h3 className="text-label text-text-secondary mb-3">{col.heading}</h3>
                )}
                <nav aria-label={col.heading || 'Footer links'} className="flex flex-col gap-2">
                  {col.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={linkClass}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <p className="text-body-secondary">{copyright}</p>
          {links && links.length > 0 && (
            <div className="mt-4 flex flex-wrap justify-center gap-6">
              {links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className={linkClass}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          {children}
        </div>
      </div>
    </footer>
  )
}

Footer.displayName = 'Footer'
