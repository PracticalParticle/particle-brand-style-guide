import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip'
import { Button } from '../Button'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <Tooltip content="Top tooltip" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <div className="flex gap-8">
        <Tooltip content="Left tooltip" placement="left">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip content="Right tooltip" placement="right">
          <Button>Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  ),
}

export const WithRichContent: Story = {
  args: {
    content: (
      <div>
        <div className="font-semibold mb-1">Tooltip Title</div>
        <div className="text-xs">This tooltip contains rich content with multiple lines.</div>
      </div>
    ),
    children: <Button>Rich Content</Button>,
  },
}

export const OnDifferentElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      <Tooltip content="Button tooltip">
        <Button>Button</Button>
      </Tooltip>
      <Tooltip content="Link tooltip">
        <a href="#" className="text-primary-500 hover:underline">Link</a>
      </Tooltip>
      <Tooltip content="Icon tooltip">
        <button className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
    children: <Button>Disabled Tooltip</Button>,
  },
}
