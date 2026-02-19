import type { Meta, StoryObj } from '@storybook/react'
import { Logo } from './Logo'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark', 'light'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col items-center gap-2">
        <Logo size="sm" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size="md" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Medium (Default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size="lg" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Large</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Logo size="xl" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Extra Large</span>
      </div>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4 p-8 bg-white dark:bg-neutral-900 rounded-lg">
        <Logo variant="default" size="lg" />
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Default (adapts to theme)</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-8 bg-neutral-900 rounded-lg">
        <Logo variant="light" size="lg" />
        <span className="text-sm text-white">Light (always white)</span>
      </div>
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg">
        <Logo variant="dark" size="lg" />
        <span className="text-sm text-neutral-600">Dark (adapts to theme)</span>
      </div>
    </div>
  ),
}

export const OnBackgrounds: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="p-8 bg-primary-500 rounded-lg flex items-center justify-center">
        <Logo variant="light" size="lg" />
      </div>
      <div className="p-8 bg-neutral-900 rounded-lg flex items-center justify-center">
        <Logo variant="light" size="lg" />
      </div>
      <div className="p-8 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center">
        <Logo variant="dark" size="lg" />
      </div>
      <div className="p-8 bg-neutral-50 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
        <Logo variant="default" size="lg" />
      </div>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo size="sm" />
      <Logo size="md" />
      <Logo size="lg" />
      <Logo size="xl" />
    </div>
  ),
}
