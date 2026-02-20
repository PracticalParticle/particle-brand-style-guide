import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider'

const meta: Meta<typeof Divider> = {
  title: 'Components/Data display/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    variant: { control: 'radio', options: ['subtle', 'default', 'strong'] },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

export const Default: Story = {
  args: {},
  render: (args) => (
    <div className="space-y-4 w-full max-w-md">
      <p className="text-sm text-text-secondary">Content above</p>
      <Divider {...args} />
      <p className="text-sm text-text-secondary">Content below</p>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <div>
        <p className="text-xs text-text-tertiary mb-2">Subtle</p>
        <Divider variant="subtle" />
      </div>
      <div>
        <p className="text-xs text-text-tertiary mb-2">Default</p>
        <Divider variant="default" />
      </div>
      <div>
        <p className="text-xs text-text-tertiary mb-2">Strong</p>
        <Divider variant="strong" />
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4 h-12">
      <span className="text-sm text-text-secondary">Item 1</span>
      <Divider orientation="vertical" />
      <span className="text-sm text-text-secondary">Item 2</span>
      <Divider orientation="vertical" variant="strong" />
      <span className="text-sm text-text-secondary">Item 3</span>
    </div>
  ),
}
