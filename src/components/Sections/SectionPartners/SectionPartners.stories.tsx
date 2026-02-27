import type { Meta, StoryObj } from '@storybook/react'
import { SectionPartners } from './SectionPartners'
import type { PartnerBlock } from './SectionPartners'

const blocks: PartnerBlock[] = [
  {
    label: 'Supported by',
    content: (
      <div className="flex flex-wrap items-center gap-6">
        <div className="rounded-md bg-white px-4 py-2.5 border border-border flex items-center justify-center">
          <span className="text-sm font-medium text-text-secondary">Partner A</span>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-sm font-medium text-text-secondary">Partner B</span>
        </div>
      </div>
    ),
  },
  {
    label: 'Security & Assurance',
    content: <p className="text-sm text-text-secondary">Upcoming comprehensive audits.</p>,
  },
  {
    label: 'Momentum',
    content: <p className="text-sm text-text-secondary">Active pilots and strategic partnerships.</p>,
  },
]

const meta: Meta<typeof SectionPartners> = {
  title: 'Sections/SectionPartners',
  component: SectionPartners,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    alignment: { control: 'select', options: ['left', 'center'] },
    variant: { control: 'select', options: ['mesh', 'muted', 'minimal'] },
  },
}

export default meta
type Story = StoryObj<typeof SectionPartners>

export const LeftAlignedMesh: Story = {
  args: {
    title: 'Trust & Innovation: Our Partners',
    description: 'Supported by leading institutions, with security and momentum you can rely on.',
    blocks,
    alignment: 'left',
    variant: 'mesh',
    showHeaderDivider: true,
  },
  render: (args) => (
    <div className="w-full min-w-[320px] max-w-6xl">
      <SectionPartners {...args} />
    </div>
  ),
}

export const CenterAlignedMuted: Story = {
  ...LeftAlignedMesh,
  args: {
    ...LeftAlignedMesh.args,
    alignment: 'center',
    variant: 'muted',
  },
  render: LeftAlignedMesh.render,
}

export const Minimal: Story = {
  ...LeftAlignedMesh,
  args: {
    ...LeftAlignedMesh.args,
    variant: 'minimal',
  },
  render: LeftAlignedMesh.render,
}
