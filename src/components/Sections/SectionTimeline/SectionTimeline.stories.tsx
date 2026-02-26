import type { Meta, StoryObj } from '@storybook/react'
import { SectionTimeline } from './SectionTimeline'
import type { TimelineItem } from './SectionTimeline'

const howItWorksItems: TimelineItem[] = [
  {
    title: 'Step one',
    description:
      'Get started by signing up or connecting your account. Configure your preferences in one place.',
  },
  {
    title: 'Step two',
    description:
      'Set your options and review settings. Add any required approvals or workflows.',
  },
  {
    title: 'Step three',
    description:
      'Go live. All activity is tracked so you and your team have a single source of truth.',
  },
]

const meta: Meta<typeof SectionTimeline> = {
  title: 'Sections/SectionTimeline',
  component: SectionTimeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showConnector: { control: 'boolean' },
    maxWidth: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionTimeline>

export const Default: Story = {
  args: {
    title: 'How it works',
    description: 'Use SectionTimeline for process or steps. Optional connector line and step labels.',
    items: howItWorksItems,
    showConnector: true,
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <SectionTimeline {...args} />
    </div>
  ),
}

export const NoConnector: Story = {
  ...Default,
  args: {
    ...Default.args,
    showConnector: false,
  },
  render: Default.render,
}

export const WithBackgroundPattern: Story = {
  ...Default,
  args: {
    ...Default.args,
    withBackgroundPattern: true,
  },
  render: Default.render,
}

export const CustomStepLabels: Story = {
  args: {
    title: 'Process overview',
    description: 'Steps can show custom labels instead of numbers.',
    items: [
      { step: '1', title: 'Submit', description: 'Submit a request for review.' },
      { step: '2', title: 'Review', description: 'Authorized users review during the waiting period.' },
      { step: '3', title: 'Complete', description: 'After approval, the action is completed.' },
    ],
    showConnector: true,
  },
  render: Default.render,
}
