import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { cn } from '@/utils/cn'
import { DropdownSelect } from '@/components/DropdownSelect'
import { Drawer } from '@/components/Drawer'
import { Button } from '@/components/Button'
import { Divider } from '@/components/Divider'
import { Tooltip } from '@/components/Tooltip'

function useMinMd() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(min-width: 768px)')
    const fn = () => setOk(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return ok
}

/** Icon-only rail (md+): show item label in a tooltip on hover. Below md, labels are visible — no tooltip. */
function CollapsedRailTooltip({
  collapsed,
  label,
  children,
}: {
  collapsed: boolean
  label: string
  children: React.ReactElement
}) {
  const isMdUp = useMinMd()
  if (!collapsed || !isMdUp) return children
  return (
    <Tooltip content={label} placement="right" delay={200}>
      {children}
    </Tooltip>
  )
}

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

export type LinkComponentProps = {
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
  /**
   * Desktop: narrow icon-only rail (md+). Below md, full labels stay visible (e.g. mobile overlay).
   */
  collapsed?: boolean
  className?: string
  children?: React.ReactNode
}

interface SideNavContextValue {
  activeId: string | null
  linkComponent: ((props: LinkComponentProps) => React.ReactNode) | undefined
  itemStyles: (item: SideNavItem) => string
  /** When set (e.g. in drawer), called when user activates an item so drawer can close. */
  onDrawerNavigate?: (id: string) => void
  /**
   * Desktop icon-only rail (labels hidden from md up). Ignored below md so mobile overlays stay full-width with labels.
   */
  collapsed: boolean
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
  if (sections?.length) return flattenSections(sections)
  if (items?.length) return items
  return []
}

// ---------------------------------------------------------------------------
// Item content (shared for link/button)
// ---------------------------------------------------------------------------

const iconSize = 'h-[18px] w-[18px] shrink-0'
/** Collapsed rail: fixed box so consumer icon classes cannot shrink or grow glyphs differently. */
const iconSizeCollapsedRail =
  'md:!h-5 md:!w-5 md:!min-h-[1.25rem] md:!min-w-[1.25rem] md:[&>svg]:!h-5 md:[&>svg]:!w-5 md:[&>svg]:!max-h-[1.25rem] md:[&>svg]:!max-w-[1.25rem]'
const navItemBaseClass =
  'w-full min-w-0 flex items-center justify-start gap-2 px-2.5 py-2 rounded-control text-sm font-medium transition-all duration-brand ease-brand text-left border-l-[3px] border-l-transparent'
const navItemActiveClass =
  'bg-bg-secondary/90 text-text-primary border-l-[3px] border-l-[rgb(var(--color-brand-primary))] font-medium shadow-none'
/** Icon-only rail (md+): inverted brand fill + inverse foreground. Hover/focus override ghost Button’s bg-tertiary so icons stay on-brand. */
const navItemActiveCollapsedRailClass =
  'md:!border-l-transparent md:bg-[rgb(var(--color-brand-primary))] md:text-[rgb(var(--color-brand-inverse))] md:shadow-none md:ring-0 md:[&_svg]:text-[rgb(var(--color-brand-inverse))] md:hover:!bg-[rgb(var(--color-brand-primary-hover))] md:hover:!text-[rgb(var(--color-brand-inverse))] md:hover:[&_svg]:!text-[rgb(var(--color-brand-inverse))] md:focus-visible:!bg-[rgb(var(--color-brand-primary-hover))] md:focus-visible:!text-[rgb(var(--color-brand-inverse))] md:focus-visible:[&_svg]:!text-[rgb(var(--color-brand-inverse))] md:active:!bg-[rgb(var(--color-brand-primary-active))] md:active:!text-[rgb(var(--color-brand-inverse))] md:active:[&_svg]:!text-[rgb(var(--color-brand-inverse))]'
const navItemInactiveClass =
  'text-text-muted hover:bg-bg-secondary/60 hover:text-text-primary'

const sectionTitleClass =
  'px-2 text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2 text-left'

function ItemContent({ item, collapsed }: { item: SideNavItem; collapsed: boolean }) {
  return (
    <>
      {item.icon && (
        <span
          className={cn(
            iconSize,
            'flex shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full',
            collapsed && iconSizeCollapsedRail
          )}
        >
          {item.icon}
        </span>
      )}
      {/* Collapsed rail (md+): label hidden (tooltip + aria-label on control); avoids layout overflow */}
      <span className={cn('min-w-0 truncate', collapsed && 'md:hidden')}>{item.label}</span>
      {item.badge != null && (
        <span className={cn('ml-auto shrink-0', collapsed && 'md:hidden')}>{item.badge}</span>
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Desktop nav item (link or button)
// ---------------------------------------------------------------------------

function NavItemInner({ item, context }: { item: SideNavItem; context: SideNavContextValue }) {
  const isActive = context.activeId === item.id
  const { collapsed } = context
  const baseClass = cn(
    navItemBaseClass,
    isActive
      ? cn(navItemActiveClass, collapsed && navItemActiveCollapsedRailClass)
      : navItemInactiveClass,
    item.disabled && 'opacity-50 pointer-events-none',
    collapsed &&
      'md:mx-auto md:box-border md:flex md:h-10 md:min-h-10 md:!w-10 md:!min-w-10 md:!max-w-10 md:shrink-0 md:justify-center md:gap-0 md:!px-0 md:!py-0'
  )
  const a11yLabel = collapsed ? item.label : undefined

  const handleNavigate = () => context.onDrawerNavigate?.(item.id)

  let node: React.ReactElement

  if (item.disabled) {
    node = (
      <span className={baseClass} aria-disabled="true" aria-label={a11yLabel}>
        <ItemContent item={item} collapsed={collapsed} />
      </span>
    )
  } else if (item.to && context.linkComponent) {
    const Link = context.linkComponent
    node = (
      <Link
        to={item.to}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
        onClick={handleNavigate}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </Link>
    )
  } else if (item.href) {
    node = (
      <a
        href={item.href}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
        onClick={handleNavigate}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </a>
    )
  } else {
    node = (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        fullWidth={!collapsed}
        onClick={() => {
          item.onClick?.()
          handleNavigate()
        }}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </Button>
    )
  }

  return (
    <CollapsedRailTooltip collapsed={collapsed} label={item.label}>
      {node}
    </CollapsedRailTooltip>
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
  collapsed = false,
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

  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    const needsMobile = mobileMode !== 'none' || isSliding
    if (needsMobile && flatItems.length === 0 && children != null) {
      console.warn(
        'SideNav: Using SideNav.Item children without items/sections disables mobile navigation (dropdown/drawer). ' +
          'Pass items or sections for mobile, or set responsive={false} or mobile="none".'
      )
    }
  }

  const itemStyles = useCallback(
    (item: SideNavItem) =>
      cn(
        navItemBaseClass,
        activeId === item.id
          ? cn(navItemActiveClass, collapsed && navItemActiveCollapsedRailClass)
          : navItemInactiveClass,
        item.disabled && 'opacity-50 pointer-events-none'
      ),
    [activeId, collapsed]
  )

  const contextValue: SideNavContextValue = useMemo(
    () => ({ activeId, linkComponent, itemStyles, collapsed }),
    [activeId, linkComponent, itemStyles, collapsed]
  )

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

  const navAriaLabel = `${ariaLabel} menu`
  const desktopNav = (
    <aside
      className={cn(
        'flex flex-col shrink-0 min-h-0 overflow-hidden',
        widthClasses[width],
        collapsed &&
          'md:!w-full md:!min-w-0 md:!max-w-full md:items-stretch md:overflow-x-clip md:overflow-hidden',
        variantClasses[variant],
        !isSliding && mobileMode !== 'none' && breakpointHide[breakpoint],
        className
      )}
      aria-label={ariaLabel}
    >
      <nav
        className="flex min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain"
        aria-label={navAriaLabel}
      >
        <div
          className={cn(
            'flex w-full min-w-0 flex-col items-start gap-1 p-4',
            collapsed && 'md:items-center md:gap-1 md:p-4'
          )}
        >
          {children != null ? (
            children
          ) : sections.length > 0 ? (
            sections.map((section, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Divider
                    variant="default"
                    className={cn(
                      'my-2 w-full max-w-full shrink-0',
                      collapsed && 'md:mx-auto md:my-1.5 md:w-9 md:max-w-[2.25rem]'
                    )}
                  />
                )}
                <div
                  className={cn(
                    'w-full min-w-0 space-y-1',
                    collapsed && 'md:space-y-0'
                  )}
                >
                  {section.title && (
                    <p
                      className={cn(
                        sectionTitleClass,
                        'hidden max-md:block',
                        collapsed ? 'md:hidden' : 'md:block'
                      )}
                    >
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
    const hasSectionsWithTitle = sections.length > 0 && sections.every((sec) => sec.title != null && sec.title !== '')
    const dropdownOptions = sections.length && hasSectionsWithTitle
      ? (sections.map((sec) => ({
          label: sec.title!,
          options: sec.items.map((i) => ({ value: i.id, label: i.label, icon: i.icon, disabled: i.disabled })),
        })) as Parameters<typeof DropdownSelect>[0]['options'])
      : flatItems.map((i) => ({ value: i.id, label: i.label, icon: i.icon, disabled: i.disabled }))

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
              options={dropdownOptions}
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
            title={ariaLabel}
            closeOnBackdrop
            closeOnEscape
            ariaLabel={ariaLabel}
            width="280px"
          >
            {/* -m-4 counteracts Drawer's p-4 so scrollbar can sit on panel edge */}
            <div className="flex min-h-0 flex-1 flex-col -m-4 overflow-hidden">
              <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain min-w-0 pt-4" aria-label={navAriaLabel}>
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
                    'w-full min-w-0 py-3 pl-4 pr-4 flex flex-col overflow-visible',
                    footerAlign === 'start' && 'shrink-0 justify-start',
                    footerAlign === 'end' && 'shrink-0 justify-end',
                    footerAlign === 'stretch' && 'flex-1 justify-end'
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
  const { collapsed } = useSideNav()
  return (
    <div
      className={cn(
        'w-full min-w-0 max-w-full space-y-1',
        collapsed && 'md:space-y-0',
        className
      )}
    >
      {title && (
        <p
          className={cn(
            sectionTitleClass,
            'hidden max-md:block',
            collapsed ? 'md:hidden' : 'md:block'
          )}
        >
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
  const { collapsed } = context
  const isActive = activeProp ?? context.activeId === id
  const item: SideNavItem = { id, label, icon, href, to, onClick, disabled, badge }

  const baseClass = cn(
    navItemBaseClass,
    isActive
      ? cn(navItemActiveClass, collapsed && navItemActiveCollapsedRailClass)
      : navItemInactiveClass,
    disabled && 'opacity-50 pointer-events-none',
    collapsed &&
      'md:mx-auto md:box-border md:flex md:h-10 md:min-h-10 md:!w-10 md:!min-w-10 md:!max-w-10 md:shrink-0 md:justify-center md:gap-0 md:!px-0 md:!py-0'
  )
  const a11yLabel = collapsed ? label : undefined

  const handleNavigate = () => context.onDrawerNavigate?.(id)

  let node: React.ReactElement

  if (disabled) {
    node = (
      <span className={baseClass} aria-disabled="true" aria-label={a11yLabel}>
        <ItemContent item={item} collapsed={collapsed} />
      </span>
    )
  } else if (to && context.linkComponent) {
    const Link = context.linkComponent
    node = (
      <Link
        to={to}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
        onClick={handleNavigate}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </Link>
    )
  } else if (href) {
    node = (
      <a
        href={href}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
        onClick={handleNavigate}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </a>
    )
  } else {
    node = (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        fullWidth={!collapsed}
        onClick={() => {
          onClick?.()
          handleNavigate()
        }}
        className={baseClass}
        aria-current={isActive ? 'page' : undefined}
        aria-label={a11yLabel}
      >
        <ItemContent item={item} collapsed={collapsed} />
      </Button>
    )
  }

  return (
    <CollapsedRailTooltip collapsed={collapsed} label={label}>
      {node}
    </CollapsedRailTooltip>
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
