import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Data display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] },
    shape: { control: 'radio', options: ['circle', 'rounded'] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const WithName: Story = {
  args: { name: 'Jane Smith' },
}

export const WithImage: Story = {
  args: {
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    alt: 'Jane',
    name: 'Jane Smith',
  },
}

export const ImageFallbackToInitials: Story = {
  render: () => (
    <Avatar
      src="https://invalid-url.example/avatar.png"
      alt="User"
      name="Alice Chen"
    />
  ),
  parameters: {
    docs: { description: { story: 'When image fails to load, initials are shown.' } },
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Avatar name="AB" size={size} />
          <span className="text-xs text-text-secondary">{size}</span>
        </div>
      ))}
    </div>
  ),
}

export const Rounded: Story = {
  args: { name: 'Jane Smith', shape: 'rounded' },
}

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar name="Alice" className="ring-2 ring-bg-primary" />
      <Avatar name="Bob" className="ring-2 ring-bg-primary" />
      <Avatar name="Carol" className="ring-2 ring-bg-primary" />
      <Avatar name="+2" className="ring-2 ring-bg-primary text-text-secondary" />
    </div>
  ),
}
