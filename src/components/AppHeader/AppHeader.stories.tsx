import type { Meta, StoryObj } from '@storybook/react'
import { AppHeader } from './AppHeader'
import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Logo } from '@/components/Logo'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/Layout/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Simple app bar: optional menu, logo slot, and placeholder for right-side actions (buttons, icons).',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof AppHeader>

const SimpleLogo = () => (
  <>
    <div className="h-7 w-7 rounded-control bg-btn-primary dark:bg-bg-canvas flex items-center justify-center shadow-sm p-1">
      <Logo variant="light" size={24} className="text-white dark:text-text-primary" />
    </div>
    <span className="hidden sm:inline text-base font-bold text-text-primary truncate">App Name</span>
  </>
)

/** Placeholder for the actions slot (replace with real buttons in your app). */
const ActionsPlaceholder = () => (
  <div className="flex items-center gap-2 rounded-control border border-dashed border-border px-3 py-1.5 text-body-secondary text-sm">
    Actions
  </div>
)

export const Default: Story = {
  args: {
    onMenuClick: () => {},
    logo: <SimpleLogo />,
    logoLayout: 'left',
    actions: <ActionsPlaceholder />,
  },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">Page content below.</div>
    </Card>
  ),
}

export const WithButtons: Story = {
  args: {
    onMenuClick: () => {},
    logo: <SimpleLogo />,
    logoLayout: 'left',
    actions: (
      <>
        <Button variant="ghost" size="sm">Sign in</Button>
        <Button variant="primary" size="sm">Get started</Button>
      </>
    ),
  },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">Page content below.</div>
    </Card>
  ),
}

export const LogoCenter: Story = {
  args: {
    onMenuClick: () => {},
    logo: <SimpleLogo />,
    logoLayout: 'center',
    actions: <ActionsPlaceholder />,
  },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">Logo centered (e.g. landing).</div>
    </Card>
  ),
}

export const NoMenu: Story = {
  args: {
    logo: <SimpleLogo />,
    logoLayout: 'center',
    actions: <ActionsPlaceholder />,
  },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">No menu button.</div>
    </Card>
  ),
}

export const VariantElevated: Story = {
  args: { ...Default.args, variant: 'elevated' as const },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">Variant: elevated.</div>
    </Card>
  ),
}

export const VariantBorderOnly: Story = {
  args: { ...Default.args, variant: 'borderOnly' as const },
  render: (args) => (
    <Card variant="outlined" padding="none" className="overflow-hidden">
      <AppHeader {...args} />
      <div className="p-4 bg-bg-canvas text-text-muted text-sm">Variant: border only.</div>
    </Card>
  ),
}
