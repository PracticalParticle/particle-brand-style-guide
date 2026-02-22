import React from 'react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'

const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export type AppHeaderLogoLayout = 'left' | 'center'

export interface AppHeaderProps {
  /** Menu button click. Omit to hide menu. */
  onMenuClick?: () => void
  menuAriaLabel?: string
  /** Logo (and optional title). */
  logo: React.ReactNode
  logoLayout?: AppHeaderLogoLayout
  /** Right-side slot: buttons, icons, etc. */
  actions?: React.ReactNode
  variant?: 'default' | 'elevated' | 'borderOnly'
  height?: 'sm' | 'md' | 'lg'
  sticky?: boolean
  className?: string
}

const heightClasses = { sm: 'h-12', md: 'h-14', lg: 'h-16' }
const variantClasses = {
  default: 'border-b border-border surface-glass shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]',
  elevated: 'border-b border-border bg-bg-secondary shadow-md',
  borderOnly: 'border-b border-border bg-transparent',
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onMenuClick,
  menuAriaLabel = 'Open menu',
  logo,
  logoLayout = 'left',
  actions,
  variant = 'default',
  height = 'md',
  sticky = true,
  className,
}) => (
  <header
    className={cn(
      'flex items-center px-4 sm:px-6 gap-3 sm:gap-4 relative z-50',
      heightClasses[height],
      variantClasses[variant],
      sticky && 'sticky top-0',
      className
    )}
    role="banner"
  >
    {onMenuClick != null && (
      <Button variant="ghost" size="md" iconOnly onClick={onMenuClick} aria-label={menuAriaLabel}>
        <MenuIcon className="h-6 w-6 text-text-muted" />
      </Button>
    )}
    <div
      className={cn(
        'flex-1 min-w-0 flex items-center',
        logoLayout === 'center' ? 'justify-center' : 'justify-start'
      )}
    >
      <div className="flex items-center gap-2 flex-shrink-0 min-w-0">{logo}</div>
    </div>
    {actions != null && <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">{actions}</div>}
  </header>
)

AppHeader.displayName = 'AppHeader'
