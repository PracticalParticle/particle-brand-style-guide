import type { Meta, StoryObj } from '@storybook/react'
import { SectionHeader } from './SectionHeader'
import { Button } from '../../Button'

const meta: Meta<typeof SectionHeader> = {
  title: 'Sections/SectionHeader',
  component: SectionHeader,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'select', options: ['left', 'center', 'right'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = {
  args: {
    title: 'Section title',
    subtitle: 'Optional supporting line or description for the section.',
    alignment: 'center',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <SectionHeader {...args} />
    </div>
  ),
}

export const LeftAligned: Story = {
  args: {
    title: 'Left-aligned header',
    subtitle: 'Use for asymmetric or editorial layouts.',
    alignment: 'left',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <SectionHeader {...args} />
    </div>
  ),
}

export const WithAction: Story = {
  args: {
    title: 'Connect with us',
    subtitle: 'Ready to get started? Our team is here to help.',
    alignment: 'center',
    children: <Button variant="primary">Contact</Button>,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <SectionHeader {...args} />
    </div>
  ),
}
