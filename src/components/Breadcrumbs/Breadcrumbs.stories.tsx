import type { Meta, StoryObj } from '@storybook/react'
import { Breadcrumbs } from './Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Electronics' },
    ],
  },
}

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Dashboard', href: '#' },
      { label: 'Settings', href: '#' },
      { label: 'Account', href: '#' },
      { label: 'Profile' },
    ],
  },
}

export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: () => console.log('Home clicked') },
      { label: 'Products', onClick: () => console.log('Products clicked') },
      { label: 'Current Page' },
    ],
  },
}

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Electronics' },
    ],
    separator: <span className="mx-2 text-text-tertiary">/</span>,
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Home' },
    ],
  },
}
