import type { Meta, StoryObj } from '@storybook/react'
import { SectionStats } from './SectionStats'
import type { StatItem } from './SectionStats'

const statsItems: StatItem[] = [
  { value: '10K+', label: 'Active users' },
  { value: '50+', label: 'Countries' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const meta: Meta<typeof SectionStats> = {
  title: 'Sections/SectionStats',
  component: SectionStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [2, 3, 4] },
    bordered: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof SectionStats>

export const Default: Story = {
  args: {
    title: 'By the numbers',
    description: 'Use SectionStats to highlight key metrics. Responsive grid with 2–4 columns.',
    items: statsItems,
    columns: 4,
    bordered: false,
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <SectionStats {...args} />
    </div>
  ),
}

export const Bordered: Story = {
  ...Default,
  args: {
    ...Default.args,
    bordered: true,
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

export const TwoColumns: Story = {
  ...Default,
  args: {
    ...Default.args,
    items: statsItems.slice(0, 2),
    columns: 2,
  },
  render: Default.render,
}

export const ThreeColumns: Story = {
  ...Default,
  args: {
    ...Default.args,
    items: statsItems.slice(0, 3),
    columns: 3,
  },
  render: Default.render,
}
