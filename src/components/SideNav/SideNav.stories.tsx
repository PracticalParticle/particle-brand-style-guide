import type { Meta, StoryObj } from '@storybook/react'
import { SideNav } from './SideNav'

const Icon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
)

const meta: Meta<typeof SideNav> = {
  title: 'Components/Navigation/SideNav',
  component: SideNav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Side navigation menu with sections, icons, and responsive behavior. On small screens can show as a dropdown or drawer. Use linkComponent for React Router (e.g. Link) and items with `to`; use `href` for plain links or `onClick` for buttons.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SideNav>

const exampleSections = [
  {
    title: 'Configurations',
    items: [
      { id: 'overview', label: 'Overview', icon: <Icon className="h-[18px] w-[18px]" />, href: '#' },
      { id: 'roles', label: 'Roles & access', icon: <Icon className="h-[18px] w-[18px]" />, href: '#' },
      { id: 'security', label: 'Security', icon: <Icon className="h-[18px] w-[18px]" />, href: '#' },
    ],
  },
]

export const WithSections: Story = {
  args: {
    sections: exampleSections,
    activeId: 'roles',
    variant: 'bordered',
    width: 'md',
    responsive: false,
    ariaLabel: 'Settings',
  },
  render: (args) => (
    <div className="flex h-[320px]">
      <SideNav {...args} />
      <main className="flex-1 p-4 bg-bg-canvas text-text-muted text-sm">Main content area.</main>
    </div>
  ),
}

export const VariantDefault: Story = {
  ...WithSections,
  args: { ...WithSections.args, variant: 'default' },
}

export const VariantElevated: Story = {
  ...WithSections,
  args: { ...WithSections.args, variant: 'elevated' },
}

export const Widths: Story = {
  render: () => (
    <div className="flex gap-4">
      <SideNav
        sections={exampleSections}
        activeId="overview"
        width="sm"
        responsive={false}
        ariaLabel="Narrow"
      />
      <SideNav
        sections={exampleSections}
        activeId="security"
        width="lg"
        responsive={false}
        ariaLabel="Wide"
      />
    </div>
  ),
}

export const FlatItems: Story = {
  args: {
    items: [
      { id: 'a', label: 'Dashboard', icon: <Icon className="h-[18px] w-[18px]" />, href: '#' },
      { id: 'b', label: 'Settings', icon: <Icon className="h-[18px] w-[18px]" />, href: '#' },
    ],
    activeId: 'b',
    variant: 'bordered',
    width: 'sm',
    responsive: false,
    ariaLabel: 'App',
  },
  render: (args) => (
    <div className="flex h-[240px]">
      <SideNav {...args} />
      <main className="flex-1 p-4 bg-bg-canvas text-text-muted text-sm">Content</main>
    </div>
  ),
}

/** Permanent sidebar with main content (e.g. config view). Desktop: sidebar + content; mobile: drawer with close button. */
export const PermanentWithMainContent: Story = {
  args: {
    sections: exampleSections,
    activeId: 'roles',
    variant: 'bordered',
    width: 'md',
    responsive: { mobile: 'drawer', breakpoint: 'md' },
    layout: 'permanent',
    ariaLabel: 'Settings',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use in config/settings views. Sidebar is always visible on desktop; on small screens a trigger opens a drawer (with close button). Main content sits beside the sidebar.',
      },
    },
  },
  render: (args) => (
    <div className="flex h-[320px] w-full">
      <SideNav {...args} />
      <main className="flex-1 min-w-0 p-4 bg-bg-canvas text-text-muted text-sm">
        Main content area. Resize to see mobile drawer.
      </main>
    </div>
  ),
}

/** Sliding menu only (e.g. app header). No sidebar; trigger opens drawer at all breakpoints. */
export const SlidingMenuInHeader: Story = {
  args: {
    sections: exampleSections,
    activeId: 'overview',
    variant: 'bordered',
    responsive: true,
    layout: 'sliding',
    ariaLabel: 'Main menu',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use in app header. No permanent sidebar; a single trigger opens the navigation drawer at any screen size. Main content is full width.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col h-[280px] w-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-secondary">
        <SideNav {...args} />
        <span className="text-sm font-medium text-text-primary">App title</span>
      </div>
      <main className="flex-1 p-4 bg-bg-canvas text-text-muted text-sm">
        Full-width main content. Menu opens as sliding drawer.
      </main>
    </div>
  ),
}

/** Drawer with sticky footer; footerAlign controls vertical alignment of footer content. */
export const DrawerWithFooter: Story = {
  args: {
    sections: exampleSections,
    activeId: 'roles',
    layout: 'sliding',
    responsive: { mobile: 'drawer', breakpoint: 'md' },
    ariaLabel: 'Main menu',
    footerAlign: 'end',
    drawerFooter: (
      <div className="flex flex-col gap-2 w-full min-w-0">
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider">Account</div>
        <button
          type="button"
          className="w-full flex items-center gap-2 p-2 rounded-control bg-bg-tertiary hover:bg-bg-secondary text-left text-sm text-text-primary min-w-0"
        >
          <span className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
            U
          </span>
          <span className="truncate min-w-0">user@example.com / My Org</span>
        </button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use drawerFooter for a sticky footer (e.g. account switcher). footerAlign: start (top), end (bottom), or stretch.',
      },
    },
  },
  render: (args) => (
    <div className="flex flex-col h-[320px] w-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-bg-secondary">
        <SideNav {...args} />
        <span className="text-sm font-medium text-text-primary">App with footer</span>
      </div>
      <main className="flex-1 p-4 bg-bg-canvas text-text-muted text-sm">Content</main>
    </div>
  ),
}

export const DrawerWithFooterAlignStart: Story = {
  ...DrawerWithFooter,
  args: { ...DrawerWithFooter.args, footerAlign: 'start' },
}
