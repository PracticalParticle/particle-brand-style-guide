import type { Meta, StoryObj } from '@storybook/react'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Radio>

export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'radio-group',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Standard shipping',
    helperText: '5-7 business days',
    name: 'shipping',
  },
}

export const WithError: Story = {
  args: {
    label: 'Select an option',
    error: 'Please select an option',
    name: 'required-group',
  },
}

export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Radio label="Option 1" name="group" value="1" defaultChecked />
      <Radio label="Option 2" name="group" value="2" />
      <Radio label="Option 3" name="group" value="3" />
      <Radio label="Option 4 (disabled)" name="group" value="4" disabled />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'Disabled radio',
    disabled: true,
    name: 'disabled-group',
  },
}
