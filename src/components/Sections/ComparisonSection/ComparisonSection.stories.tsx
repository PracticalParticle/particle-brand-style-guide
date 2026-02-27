import type { Meta, StoryObj } from '@storybook/react'
import { ComparisonSection } from './ComparisonSection'

const planHeaders = ['Starter', 'Professional', 'Enterprise']
const planRows = [
  { label: 'Feature A', values: [true, true, true] },
  { label: 'Feature B', values: [false, true, true] },
  { label: 'Feature C', values: [false, true, true] },
  { label: 'Feature D', values: [false, false, true] },
  { label: 'Priority support', values: [false, false, true] },
]

const meta: Meta<typeof ComparisonSection> = {
  title: 'Sections/ComparisonSection',
  component: ComparisonSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['table', 'cards'] },
  },
}

export default meta
type Story = StoryObj<typeof ComparisonSection>

export const TableLayout: Story = {
  args: {
    title: 'Compare plans',
    description: 'Choose the plan that fits your needs. Table or card layout.',
    columnHeaders: planHeaders,
    rows: planRows,
    layout: 'table',
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <ComparisonSection {...args} />
    </div>
  ),
}

export const CardsLayout: Story = {
  ...TableLayout,
  args: {
    ...TableLayout.args,
    layout: 'cards',
  },
  render: TableLayout.render,
}

export const WithCustomValues: Story = {
  args: {
    title: 'Feature comparison',
    description: 'Mix checkmarks with custom text per column.',
    columnHeaders: ['Option A', 'Option B'],
    rows: [
      { label: 'Self-hosted', values: [true, false] },
      { label: 'Managed', values: [false, true] },
      { label: 'Pricing', values: ['Free tier', 'Contact us'] },
    ],
    layout: 'table',
  },
  render: TableLayout.render,
}

export const WithBackgroundPattern: Story = {
  ...TableLayout,
  args: {
    ...TableLayout.args,
    withBackgroundPattern: true,
  },
  render: TableLayout.render,
}
