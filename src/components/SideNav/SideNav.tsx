import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { cn } from '@/utils/cn'
import { DropdownSelect } from '@/components/DropdownSelect'
import { Drawer } from '@/components/Drawer'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SideNavItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  /** Use with linkComponent (e.g. React Router Link) for SPA navigation. */
  to?: string
  onClick?: () => void
  disabled?: boolean
  badge?: React.ReactNode
}

export interface SideNavSection {
  title?: string
  items: SideNavItem[]
}

export type SideNavMobileMode = 'dropdown' | 'drawer' | 'none'

export interface SideNavResponsiveConfig {
  /** How to show nav on mobile. Default 'dropdown'. */
  mobile?: SideNavMobileMode
  /** Breakpoint at which sidebar is shown. Default 'md' (768px). */
  breakpoint?: 'sm' | 'md' | 'lg'
}

type LinkComponentProps = {
  to: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  'aria-current'?: 'page' | undefined
}

export interface SideNavRootProps {
  /** Flat list of items (no sections). */
  items?: SideNavItem[]
  /** Grouped items with optional section titles. */
  sections?: SideNavSection[]
  /** Id of the currently active item. */
  activeId?: string | null
  /** For SPA routing: render links for items with `to`. e.g. (p) => <Link {...p} /> */
  linkComponent?: (props: LinkComponentProps) => React.ReactNode
  /** Called when user selects an item (e.g. from mobile dropdown). Use to navigate. */
  onItemSelect?: (id: string) => void
  /** Visual style. Default 'default'. */
  variant?: 'default' | 'bordered' | 'elevated'
  /** Sidebar width. Default 'md'. */
  width?: 'sm' | 'md' | 'lg'
  /** Responsive: hide sidebar on small screens and show dropdown/drawer. Default true. */
  responsive?: boolean | SideNavResponsiveConfig
  /**
   * Layout mode.
   * - 'permanent': Desktop shows sidebar (optionally with main content); mobile uses dropdown/drawer.
   * - 'sliding': No sidebar; only a trigger that opens the drawer at all breakpoints (e.g. app header menu).
   */
  layout?: 'permanent' | 'sliding'
  /**
   * Optional sticky footer in the drawer (sliding or mobile drawer). Rendered below the scrollable nav.
   * Use for account switcher, theme toggle, etc.
   */
  drawerFooter?: React.ReactNode
  /**
   * Vertical alignment of drawer footer content when drawerFooter is set.
   * - 'start': top
   * - 'end': bottom (default)
   * - 'stretch': full height
   */
  footerAlign?: 'start' | 'end' | 'stretch'
  /** Accessible label for the nav. */
  ariaLabel?: string
  className?: string
  children?: React.ReactNode
}

interface SideNavContextValue {
  activeId: string | null
  linkComponent: ((props: LinkComponentProps) => React.ReactNode) | undefined
  itemStyles: (item: SideNavItem) => string
  /** When set (e.g. in drawer), called when user activates an item so drawer can close. */
  onDrawerNavigate?: (id: string) => void
}

const SideNavContext = createContext<SideNavContextValue | null>(null)

function useSideNav() {
  const ctx = useContext(SideNavContext)
  if (!ctx) throw new Error('SideNav.Item or SideNav.Section must be used inside SideNav')
  return ctx
}

// ---------------------------------------------------------------------------
// Flatten helpers
// ---------------------------------------------------------------------------

function flattenSections(sections: SideNavSection[]): SideNavItem[] {
  return sections.flatMap((s) => s.items)
}

function flattenItems(items: SideNavItem[] | undefined, sections: SideNavSection[] | undefined): SideNavItem[] {
  if (items?.length) return items
  if (sections?.length) return flattenSections(sections)
  return []
}

// ---------------------------------------------------------------------------
// Item content (shared for link/button)
// ---------------------------------------------------------------------------

const iconSize = 'h-[18px] w-[18px] shrink-0'

function ItemContent({ item }: { item: SideNavItem }) {
  return (
    <>
      {item.icon && <span className={cn(iconSize, 'flex items-center justify-center [&>svg]:h-full [&>svg]:w-full')}>{item.icon}</span>}
      <span className="truncate">{item.label}</span>
      {item.badge != null && <span className="ml-auto shrink-0">{item.badge}</span>}
    </>
  )
}

// ---------------------------------------------------------------------------
// Desktop nav item (link or button)
// ---------------------------------------------------------------------------

function NavItemInner({ item, context }: { item: SideNavItem; context: SideNavContextValue }) {
  const isActive = context.activeId === item.id
  const baseClass = cn(
    'w-full flex items-center justify-start gap-2 px-2 py-1.5 rounded-control text-sm font-medium transition text-left',
    isActive ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-bg-tertiary',
    item.disabled && 'opacity-50 pointer-events-none'
  )

  if (item.disabled) {
    return (
      <span className={baseClass} aria-disabled="true">
        <ItemContent item={item} />
      </span>
    )
  }

  const handleNavigate = () => context.onDrawerNavigate?.(item.id)

  if (item.to && context.linkComponent) {
    const Link = context.linkComponent
    return (
      <Link
        to={item.to}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        onClick={handleNavigate}
      >
        <ItemContent item={item} />
      </Link>
    )
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        onClick={handleNavigate}
      >
        <ItemContent item={item} />
      </a>
    )
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      fullWidth
      onClick={() => {
        item.onClick?.()
        handleNavigate()
      }}
      className={cn(baseClass, 'justify-start')}
      aria-current={isActive ? 'page' : undefined}
    >
      <ItemContent item={item} />
    </Button>
  )
}

// ---------------------------------------------------------------------------
// SideNav.Root
// ---------------------------------------------------------------------------

const widthClasses = {
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
}

const variantClasses = {
  default: 'bg-bg-tertiary/50',
  bordered: 'bg-bg-primary border-r border-border',
  elevated: 'bg-bg-primary border-r border-border shadow-subtle',
}

const breakpointHide = {
  sm: 'hidden sm:flex',
  md: 'hidden md:flex',
  lg: 'hidden lg:flex',
}

export function SideNavRoot({
  items,
  sections = [],
  activeId = null,
  linkComponent,
  onItemSelect,
  variant = 'default',
  width = 'md',
  responsive = true,
  layout = 'permanent',
  drawerFooter,
  footerAlign = 'end',
  ariaLabel = 'Side navigation',
  className,
  children,
}: SideNavRootProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const config: SideNavResponsiveConfig =
    typeof responsive === 'boolean' ? { mobile: responsive ? 'dropdown' : 'none', breakpoint: 'md' } : responsive
  const mobileMode = config.mobile ?? 'dropdown'
  const breakpoint = config.breakpoint ?? 'md'
  const flatItems = useMemo(() => flattenItems(items, sections), [items, sections])
  const isSliding = layout === 'sliding'

  const itemStyles = useCallback(
    (item: SideNavItem) =>
      cn(
        'w-full flex items-center justify-start gap-2 px-2 py-1.5 rounded-control text-sm font-medium transition text-left',
        activeId === item.id ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-bg-tertiary',
        item.disabled && 'opacity-50 pointer-events-none'
      ),
    [activeId]
  )

  const contextValue: SideNavContextValue = useMemo(
    () => ({ activeId, linkComponent, itemStyles }),
    [activeId, linkComponent, itemStyles]
  )

  const navAriaLabel = `${ariaLabel} menu`
  const desktopNav = (
    <aside
      className={cn(
        'flex flex-col shrink-0 min-h-0 overflow-hidden',
        widthClasses[width],
        variantClasses[variant],
        !isSliding && breakpointHide[breakpoint],
        className
      )}
      aria-label={ariaLabel}
    >
      <nav
        className="flex flex-1 min-h-0 w-full overflow-y-auto overscroll-contain"
        aria-label={navAriaLabel}
      >
        <div className="flex flex-col p-4 gap-1 items-start w-full min-w-0">
          {children != null ? (
            children
          ) : sections.length > 0 ? (
            sections.map((section, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <Divider variant="default" className="my-2 w-full" />}
                <div className="w-full space-y-1">
                  {section.title && (
                    <p className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 text-left">
                      {section.title}
                    </p>
                  )}
                  {section.items.map((item) => (
                    <NavItemInner key={item.id} item={item} context={contextValue} />
                  ))}
                </div>
              </React.Fragment>
            ))
          ) : (
            flatItems.map((item) => <NavItemInner key={item.id} item={item} context={contextValue} />)
          )}
        </div>
      </nav>
    </aside>
  )

  const mobileOnlyHideClass = isSliding ? '' : breakpoint === 'sm' ? 'sm:hidden' : breakpoint === 'md' ? 'md:hidden' : 'lg:hidden'

  // Mobile: dropdown or drawer (or sliding layout: always trigger + drawer)
  if ((mobileMode !== 'none' || isSliding) && flatItems.length > 0) {
    const mobileTriggerLabel = flatItems.find((i) => i.id === activeId)?.label ?? 'Menu'
    const dropdownOptions = sections.length
      ? sections.map((sec) => ({
          label: sec.title ?? '',
          options: sec.items.map((i) => ({ value: i.id, label: i.label, icon: i.icon, disabled: i.disabled })),
        }))
      : flatItems.map((i) => ({ value: i.id, label: i.label, icon: i.icon, disabled: i.disabled }))

    const drawerCloseButton = (
      <Button
        type="button"
        variant="ghost"
        size="md"
        iconOnly
        onClick={() => setDrawerOpen(false)}
        aria-label="Close menu"
        className="shrink-0 -m-2"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    )

    if (mobileMode === 'dropdown' && !isSliding) {
      return (
        <SideNavContext.Provider value={contextValue}>
          <div className={cn('flex flex-col', mobileOnlyHideClass)}>
            <DropdownSelect
              id={`sidenav-mobile-${ariaLabel.replace(/\s/g, '-')}`}
              label={ariaLabel}
              value={activeId ?? undefined}
              onValueChange={(value) => onItemSelect?.(value)}
              placeholder={mobileTriggerLabel}
              options={sections.length ? dropdownOptions : dropdownOptions.flatMap((o) => ('options' in o ? o.options : [o]))}
              fullWidth
              size="md"
              className="bg-bg-primary border-border"
            />
          </div>
          {!isSliding && desktopNav}
        </SideNavContext.Provider>
      )
    }

    // drawer (mobile or sliding layout)
    const drawerContextValue: SideNavContextValue = useMemo(
      () => ({
        ...contextValue,
        onDrawerNavigate: (id) => {
          onItemSelect?.(id)
          setDrawerOpen(false)
        },
      }),
      [contextValue, onItemSelect]
    )

    return (
      <SideNavContext.Provider value={drawerContextValue}>
        <div className={cn('flex flex-col', mobileOnlyHideClass)}>
          <Button
            variant="outline"
            size="md"
            onClick={() => setDrawerOpen(true)}
            aria-label={isSliding ? ariaLabel : undefined}
            leftIcon={
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            }
          >
            {mobileTriggerLabel}
          </Button>
          <Drawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            closeOnBackdrop
            closeOnEscape
            ariaLabel={ariaLabel}
            width="280px"
          >
            {/* -m-4 counteracts Drawer's p-4 so scrollbar can sit on panel edge */}
            <div className="flex flex-col h-full min-h-0 -m-4 overflow-hidden">
              <div className="flex items-center justify-between gap-2 shrink-0 px-4 pt-4 pb-3 border-b border-border">
                <span className="text-sm font-semibold text-text-primary">{ariaLabel}</span>
                {drawerCloseButton}
              </div>
              <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain min-w-0" aria-label={navAriaLabel}>
                <div className="flex flex-col gap-1 px-4 pt-4 pb-4 min-w-0">
                  {sections.length > 0
                    ? sections.map((section, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && <Divider variant="default" className="my-2 w-full" />}
                          <div className="space-y-1">
                            {section.title && (
                              <p className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                                {section.title}
                              </p>
                            )}
                            {section.items.map((item) => (
                              <NavItemInner key={item.id} item={item} context={drawerContextValue} />
                            ))}
                          </div>
                        </React.Fragment>
                      ))
                    : flatItems.map((item) => (
                        <NavItemInner key={item.id} item={item} context={drawerContextValue} />
                      ))}
                </div>
              </nav>
              {drawerFooter != null && (
                <div
                  className={cn(
                    'shrink-0 w-full min-w-0 py-3 pl-4 pr-4 flex flex-col overflow-visible',
                    footerAlign === 'start' && 'justify-start',
                    footerAlign === 'end' && 'justify-end',
                    footerAlign === 'stretch' && 'justify-end'
                  )}
                >
                  <div className="w-full min-w-0 overflow-visible">{drawerFooter}</div>
                </div>
              )}
            </div>
          </Drawer>
        </div>
        {!isSliding && desktopNav}
      </SideNavContext.Provider>
    )
  }

  return (
    <SideNavContext.Provider value={contextValue}>
      {isSliding ? null : desktopNav}
    </SideNavContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// SideNav.Section (composition)
// ---------------------------------------------------------------------------

export interface SideNavSectionProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function SideNavSectionComponent({ title, children, className }: SideNavSectionProps) {
  return (
    <div className={cn('w-full space-y-1', className)}>
      {title && (
        <p className="px-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 text-left">
          {title}
        </p>
      )}
      {children}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SideNav.Item (composition)
// ---------------------------------------------------------------------------

export interface SideNavItemProps extends Omit<SideNavItem, 'id'> {
  id: string
  /** Override active state. Default: derived from SideNav activeId. */
  active?: boolean
}

export function SideNavItemComponent({
  id,
  label,
  icon,
  href,
  to,
  onClick,
  disabled,
  badge,
  active: activeProp,
}: SideNavItemProps) {
  const context = useSideNav()
  const isActive = activeProp ?? context.activeId === id
  const item: SideNavItem = { id, label, icon, href, to, onClick, disabled, badge }

  const baseClass = cn(
    'w-full flex items-center justify-start gap-2 px-2 py-1.5 rounded-control text-sm font-medium transition text-left',
    isActive ? 'bg-primary/20 text-primary' : 'text-text-muted hover:bg-bg-tertiary',
    disabled && 'opacity-50 pointer-events-none'
  )

  if (disabled) {
    return (
      <span className={baseClass} aria-disabled="true">
        <ItemContent item={item} />
      </span>
    )
  }
  if (to && context.linkComponent) {
    const Link = context.linkComponent
    return (
      <Link to={to} className={baseClass} aria-current={isActive ? 'page' : undefined}>
        <ItemContent item={item} />
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={baseClass} aria-current={isActive ? 'page' : undefined}>
        <ItemContent item={item} />
      </a>
    )
  }
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      fullWidth
      onClick={onClick}
      className={cn(baseClass, 'justify-start')}
      aria-current={isActive ? 'page' : undefined}
    >
      <ItemContent item={item} />
    </Button>
  )
}

// ---------------------------------------------------------------------------
// Export compound component
// ---------------------------------------------------------------------------

export const SideNav = Object.assign(SideNavRoot, {
  Section: SideNavSectionComponent,
  Item: SideNavItemComponent,
})

SideNavRoot.displayName = 'SideNav'
SideNavSectionComponent.displayName = 'SideNav.Section'
SideNavItemComponent.displayName = 'SideNav.Item'
