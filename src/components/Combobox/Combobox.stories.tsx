import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Combobox } from './Combobox'

const meta: Meta<typeof Combobox> = {
  title: 'Components/Selection/Combobox',
  component: Combobox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Combobox>

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'in', label: 'India' },
  { value: 'br', label: 'Brazil' },
  { value: 'mx', label: 'Mexico' },
]

function DefaultStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-72">
      <Combobox {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  args: {
    options: countries,
    placeholder: 'Select country',
    searchPlaceholder: 'Search countries…',
    fullWidth: true,
  },
  render: (args) => <DefaultStory {...args} />,
}

function WithLabelStory(args: React.ComponentProps<typeof Combobox>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-72">
      <Combobox {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Choose a country',
    searchPlaceholder: 'Type to search…',
    fullWidth: true,
  },
  render: (args) => <WithLabelStory {...args} />,
}

function LongListStory() {
  const [value, setValue] = useState<string | null>(null)
  const options = Array.from({ length: 50 }, (_, i) => ({
    value: `opt-${i}`,
    label: `Option ${i + 1}`,
  }))
  return (
    <div className="w-72">
      <Combobox
        label="Pick one"
        options={options}
        value={value}
        onValueChange={setValue}
        placeholder="Select…"
        searchPlaceholder="Search options…"
        emptyMessage="No options match your search."
        fullWidth
      />
    </div>
  )
}

export const LongList: Story = {
  render: () => <LongListStory />,
}

export const Disabled: Story = {
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select country',
    disabled: true,
    fullWidth: true,
  },
  render: (args) => (
    <div className="w-72">
      <Combobox {...args} />
    </div>
  ),
}
