import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Components/Data display/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Star rating input. Uses design system tertiary color for filled stars.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 5 } },
    max: { control: { type: 'number', min: 1, max: 10 } },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    label: 'Rating',
    value: 3,
    max: 5,
  },
}

export const Interactive: Story = {
  render: function InteractiveRating() {
    const [value, setValue] = useState(2)
    return (
      <Rating
        label="Your rating"
        value={value}
        onChange={setValue}
        helperText="Click or use keyboard to rate"
      />
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Rating label="Small" value={3} size="sm" readonly />
      <Rating label="Medium" value={3} size="md" readonly />
      <Rating label="Large" value={3} size="lg" readonly />
    </div>
  ),
}

export const Readonly: Story = {
  args: {
    label: 'Average rating',
    value: 4,
    max: 5,
    readonly: true,
    helperText: '4.0 from 120 reviews',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    value: 2,
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Rating',
    value: 0,
    error: 'Please select a rating',
  },
}

export const CustomMax: Story = {
  args: {
    label: 'Out of 10',
    value: 7,
    max: 10,
    readonly: true,
  },
}
