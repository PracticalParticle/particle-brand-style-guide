import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/Selection/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const tags = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
]

function DefaultStory(args: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className="w-80">
      <MultiSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const Default: Story = {
  args: {
    options: tags,
    placeholder: 'Select tags…',
    fullWidth: true,
  },
  render: (args) => <DefaultStory {...args} />,
}

function WithLabelStory(args: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>([])
  return (
    <div className="w-80">
      <MultiSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithLabel: Story = {
  args: {
    label: 'Skills',
    options: tags,
    placeholder: 'Add skills',
    searchPlaceholder: 'Search skills…',
    fullWidth: true,
  },
  render: (args) => <WithLabelStory {...args} />,
}

function WithPreselectedValuesStory(args: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>(['react', 'typescript'])
  return (
    <div className="w-80">
      <MultiSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const WithPreselectedValues: Story = {
  args: {
    label: 'Tags',
    options: tags,
    placeholder: 'Select tags…',
    fullWidth: true,
  },
  render: (args) => <WithPreselectedValuesStory {...args} />,
}

function MaxChipsStory(args: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>(['react', 'vue', 'angular', 'typescript'])
  return (
    <div className="w-80">
      <MultiSelect {...args} value={value} onValueChange={setValue} />
    </div>
  )
}

export const MaxChips: Story = {
  args: {
    label: 'Many selected',
    options: tags,
    placeholder: 'Select…',
    maxChips: 2,
    fullWidth: true,
  },
  render: (args) => <MaxChipsStory {...args} />,
}

export const Disabled: Story = {
  args: {
    label: 'Tags',
    options: tags,
    placeholder: 'Select tags…',
    disabled: true,
    fullWidth: true,
  },
  render: (args) => (
    <div className="w-80">
      <MultiSelect {...args} />
    </div>
  ),
}
