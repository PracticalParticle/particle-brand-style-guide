import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { SelectableCard } from './SelectableCard'

const meta: Meta<typeof SelectableCard> = {
  title: 'Components/Selection/SelectableCard',
  component: SelectableCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SelectableCard>

export const Default: Story = {
  args: {
    label: 'Request (Phase 1)',
    description: 'Initiate time-locked execution',
    selected: false,
    onSelect: () => {},
  },
}

export const Selected: Story = {
  args: {
    label: 'Approve / Cancel (Phase 2)',
    description: 'Confirm or reject pending requests',
    selected: true,
    onSelect: () => {},
  },
}

export const MultiSelectExample: Story = {
  render: function MultiSelectExample() {
    const [selected, setSelected] = useState<number[]>([0, 1])
    const options = [
      { value: 0, label: 'Request', description: 'Request phase' },
      { value: 1, label: 'Approve / Cancel', description: 'Approve or cancel phase' },
      { value: 2, label: 'Execute', description: 'Execute phase' },
    ]
    return (
      <div className="grid grid-cols-1 gap-2 w-96">
        {options.map((opt) => (
          <SelectableCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            selected={selected.includes(opt.value)}
            onSelect={() =>
              setSelected((prev) =>
                prev.includes(opt.value) ? prev.filter((v) => v !== opt.value) : [...prev, opt.value]
              )
            }
          />
        ))}
      </div>
    )
  },
}
