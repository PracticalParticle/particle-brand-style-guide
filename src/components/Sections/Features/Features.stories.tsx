import type { Meta, StoryObj } from '@storybook/react'
import { Features } from './Features'
import type { FeatureItem } from './Features'
import { Button } from '../../Button'

const LockIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)
const ChartIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)
const ShieldIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)
const DocumentIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const defaultItems: FeatureItem[] = [
  {
    icon: <LockIcon />,
    title: 'Identity at the account layer',
    description: 'KYC/AML enforced at the account or access layer so only compliant actors move regulated value.',
  },
  {
    icon: <ChartIcon />,
    title: 'Full audit trail',
    description: 'Chain plus policy and logs. Supervisors get visibility; disputes have a clear record.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Enforceable interventions',
    description: 'Freeze, pause, or redeem on court order or sanctions — policy-based and auditable.',
  },
]

const fourItems: FeatureItem[] = [
  ...defaultItems,
  {
    icon: <DocumentIcon />,
    title: 'Legal enforceability',
    description: 'By design through the control layer, with configurable finality and approval workflows.',
  },
]

const meta: Meta<typeof Features> = {
  title: 'Sections/Features',
  component: Features,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [2, 3, 4] },
    variant: { control: 'select', options: ['cards', 'list', 'minimal'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof Features>

export const Default: Story = {
  args: {
    title: 'What the protocol delivers',
    description: 'Three pillars underpin supervisory acceptance and institutional use.',
    items: defaultItems,
    columns: 3,
    variant: 'cards',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const WithBackgroundPattern: Story = {
  args: {
    title: 'What the protocol delivers',
    description: 'Sections can use a subtle background pattern for depth.',
    items: defaultItems,
    columns: 3,
    variant: 'cards',
    size: 'md',
    withBackgroundPattern: true,
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const ListVariant: Story = {
  args: {
    title: 'Requirements at a glance',
    description: 'Borders and hover; no card shadow.',
    items: defaultItems,
    columns: 3,
    variant: 'list',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const MinimalVariant: Story = {
  args: {
    title: 'Minimal feature list',
    description: 'No cards or borders — for compact or inline use.',
    items: defaultItems,
    columns: 3,
    variant: 'minimal',
    size: 'sm',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const FourColumns: Story = {
  args: {
    title: 'Four pillars',
    description: 'Grid of four feature blocks.',
    items: fourItems,
    columns: 4,
    variant: 'cards',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const TwoColumns: Story = {
  args: {
    title: 'Two columns',
    description: 'Larger blocks for fewer, more detailed features.',
    items: defaultItems.slice(0, 2),
    columns: 2,
    variant: 'cards',
    size: 'lg',
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args} />
    </div>
  ),
}

export const WithCustomChildren: Story = {
  args: {
    title: 'Custom content',
    description: 'Use children to render your own feature blocks in the grid.',
    columns: 3,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <Features {...args}>
        <div className="rounded-card border border-border p-6 bg-bg-secondary edge-highlight">
          <h3 className="text-lg font-semibold text-text-primary">Custom block A</h3>
          <p className="mt-2 text-sm text-text-secondary">Any content or components here.</p>
        </div>
        <div className="rounded-card border border-border p-6 bg-bg-secondary edge-highlight">
          <h3 className="text-lg font-semibold text-text-primary">Custom block B</h3>
          <p className="mt-2 text-sm text-text-secondary">Cards, lists, or your own layout.</p>
        </div>
        <div className="rounded-card border border-border p-6 bg-bg-secondary edge-highlight">
          <h3 className="text-lg font-semibold text-text-primary">With CTA</h3>
          <p className="mt-2 text-sm text-text-secondary">Add buttons or links per block.</p>
          <Button variant="outline" size="sm" className="mt-4">Action</Button>
        </div>
      </Features>
    </div>
  ),
}
