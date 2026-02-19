import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Popover } from './Popover'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    content: (
      <div>
        <h3 className="font-semibold mb-2">Popover Title</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This is a popover with some content. Click outside to close.
        </p>
      </div>
    ),
    children: <Button>Open Popover</Button>,
  },
}

export const Placements: Story = {
  render: () => (
    <div className="flex flex-col gap-8 items-center p-16">
      <Popover
        content={<div className="p-2">Top popover</div>}
        placement="top"
      >
        <Button>Top</Button>
      </Popover>
      <div className="flex gap-8">
        <Popover
          content={<div className="p-2">Left popover</div>}
          placement="left"
        >
          <Button>Left</Button>
        </Popover>
        <Popover
          content={<div className="p-2">Right popover</div>}
          placement="right"
        >
          <Button>Right</Button>
        </Popover>
      </div>
      <Popover
        content={<div className="p-2">Bottom popover</div>}
        placement="bottom"
      >
        <Button>Bottom</Button>
      </Popover>
    </div>
  ),
}

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    content: (
      <div>
        <h3 className="font-semibold mb-2">Hover Popover</h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This popover opens on hover.
        </p>
      </div>
    ),
    children: <Button>Hover me</Button>,
  },
}

export const WithForm: Story = {
  args: {
    content: (
      <div className="space-y-3">
        <h3 className="font-semibold">Settings</h3>
        <div className="space-y-2">
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" />
            Option 1
          </label>
          <label className="block text-sm">
            <input type="checkbox" className="mr-2" />
            Option 2
          </label>
        </div>
        <Button variant="primary" size="sm" className="w-full">
          Apply
        </Button>
      </div>
    ),
    children: <Button variant="outline">Settings</Button>,
  },
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <div className="flex flex-col gap-4 items-center">
        <Popover
          open={open}
          onOpenChange={setOpen}
          content={
            <div>
              <p className="mb-2">This is a controlled popover.</p>
              <Button size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          }
        >
          <Button onClick={() => setOpen(!open)}>
            {open ? 'Close Popover' : 'Open Popover'}
          </Button>
        </Popover>
      </div>
    )
  },
}
