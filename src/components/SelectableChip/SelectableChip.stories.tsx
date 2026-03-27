import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SelectableChip } from './SelectableChip'

const meta: Meta<typeof SelectableChip> = {
  title: 'Components/Selection/SelectableChip',
  component: SelectableChip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectableChip>

export const Default: Story = {
  args: {
    children: 'Request',
    selected: false,
    onSelect: () => {},
  },
}

export const Selected: Story = {
  args: {
    children: 'Approve',
    selected: true,
    onSelect: () => {},
  },
}

export const ToggleGroup: Story = {
  render: function ToggleGroup() {
    const [selected, setSelected] = useState<string[]>(['request'])
    const options = [
      { value: 'request', label: 'Request' },
      { value: 'approve', label: 'Approve' },
      { value: 'cancel', label: 'Cancel' },
    ]
    return (
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <SelectableChip
            key={opt.value}
            selected={selected.includes(opt.value)}
            onSelect={() =>
              setSelected((prev) =>
                prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
              )
            }
            showIcon
          >
            {opt.label}
          </SelectableChip>
        ))}
      </div>
    )
  },
}
