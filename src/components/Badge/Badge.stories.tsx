import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Data display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: 'Badge',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const WithContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <span>Notifications</span>
        <Badge variant="primary">3</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span>Status:</span>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span>Status:</span>
        <Badge variant="error">Inactive</Badge>
      </div>
      <div className="flex gap-2 items-center">
        <span>Version:</span>
        <Badge variant="info">v2.0.1</Badge>
      </div>
    </div>
  ),
}

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Badge variant="success">Online</Badge>
        <Badge variant="error">Offline</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="info">Processing</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="success" size="sm">Approved</Badge>
        <Badge variant="error" size="sm">Rejected</Badge>
        <Badge variant="warning" size="sm">Review</Badge>
        <Badge variant="info" size="sm">Draft</Badge>
      </div>
    </div>
  ),
}
