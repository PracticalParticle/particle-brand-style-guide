import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { DropdownSelect } from './DropdownSelect'

const meta: Meta<typeof DropdownSelect> = {
  title: 'Components/Selection/DropdownSelect',
  component: DropdownSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownSelect>

const simpleOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
]

function DefaultStory(args: React.ComponentProps<typeof DropdownSelect>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-64">
      <DropdownSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select country',
    fullWidth: true,
  },
  render: (args) => <DefaultStory {...args} />,
}

function WithLabelStory(args: React.ComponentProps<typeof DropdownSelect>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-64">
      <DropdownSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: simpleOptions,
    placeholder: 'Choose a country',
    fullWidth: true,
  },
  render: (args) => <WithLabelStory {...args} />,
}

function WithOptionGroupsStory(args: React.ComponentProps<typeof DropdownSelect>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-64">
      <DropdownSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithOptionGroups: Story = {
  args: {
    label: 'Time zone',
    placeholder: 'Select time zone',
    fullWidth: true,
    options: [
      {
        label: 'Americas',
        options: [
          { value: 'pst', label: 'Pacific (PST)' },
          { value: 'mst', label: 'Mountain (MST)' },
          { value: 'est', label: 'Eastern (EST)' },
        ],
      },
      {
        label: 'Europe',
        options: [
          { value: 'gmt', label: 'GMT' },
          { value: 'cet', label: 'CET' },
        ],
      },
    ],
  },
  render: (args) => <WithOptionGroupsStory {...args} />,
}

const iconOption = (d: string) => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)

function WithIconsStory(args: React.ComponentProps<typeof DropdownSelect>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-64">
      <DropdownSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithIcons: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select status',
    fullWidth: true,
    options: [
      { value: 'active', label: 'Active', icon: iconOption('M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z') },
      { value: 'pending', label: 'Pending', icon: iconOption('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z') },
      { value: 'paused', label: 'Paused', icon: iconOption('M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z') },
      { value: 'archived', label: 'Archived', icon: iconOption('M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4') },
    ],
  },
  render: (args) => <WithIconsStory {...args} />,
}

function SizesStory() {
  const [v, setV] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-6 w-56">
      <DropdownSelect
        label="Small"
        size="sm"
        options={simpleOptions}
        value={v}
        onValueChange={setV}
        placeholder="Select…"
        fullWidth
      />
      <DropdownSelect
        label="Medium"
        size="md"
        options={simpleOptions}
        value={v}
        onValueChange={setV}
        placeholder="Select…"
        fullWidth
      />
      <DropdownSelect
        label="Large"
        size="lg"
        options={simpleOptions}
        value={v}
        onValueChange={setV}
        placeholder="Select…"
        fullWidth
      />
    </div>
  )
}

export const Sizes: Story = {
  render: () => <SizesStory />,
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    options: simpleOptions,
    placeholder: 'Select…',
    disabled: true,
    fullWidth: true,
  },
  render: (args) => (
    <div className="w-64">
      <DropdownSelect {...args} />
    </div>
  ),
}

function WithDisabledOptionStory(args: React.ComponentProps<typeof DropdownSelect>) {
  const [value, setValue] = useState<string | null>(null)
  return (
    <div className="w-64">
      <DropdownSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithDisabledOption: Story = {
  args: {
    label: 'Plan',
    placeholder: 'Select plan',
    fullWidth: true,
    options: [
      { value: 'free', label: 'Free' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise (coming soon)', disabled: true },
    ],
  },
  render: (args) => <WithDisabledOptionStory {...args} />,
}
