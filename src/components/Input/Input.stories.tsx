import type { Meta, StoryObj } from '@storybook/react'
import { Input, Textarea } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    fullWidth: false,
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@example.com',
    fullWidth: true,
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    fullWidth: true,
  },
}

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@example.com',
    error: 'Please enter a valid email address',
    fullWidth: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
    fullWidth: true,
  },
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
        fullWidth
      />
      <Input
        label="Email"
        type="email"
        placeholder="name@example.com"
        leftIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.8a2.5 2.5 0 01-5 0" />
          </svg>
        }
        fullWidth
      />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        rightIcon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        }
        fullWidth
      />
    </div>
  ),
}

export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input label="Text" type="text" placeholder="Text input" fullWidth />
      <Input label="Email" type="email" placeholder="email@example.com" fullWidth />
      <Input label="Password" type="password" placeholder="Password" fullWidth />
      <Input label="Number" type="number" placeholder="123" fullWidth />
      <Input label="Tel" type="tel" placeholder="+1 (555) 000-0000" fullWidth />
      <Input label="URL" type="url" placeholder="https://example.com" fullWidth />
    </div>
  ),
}

export const TextareaComponent: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Textarea
        label="Message"
        placeholder="Enter your message..."
        rows={4}
        fullWidth
      />
      <Textarea
        label="Description"
        placeholder="Enter description..."
        helperText="Provide a detailed description"
        rows={6}
        fullWidth
      />
      <Textarea
        label="Feedback"
        placeholder="Enter feedback..."
        error="This field is required"
        rows={4}
        fullWidth
      />
      <Textarea
        label="Disabled"
        placeholder="This textarea is disabled"
        disabled
        rows={4}
        fullWidth
      />
    </div>
  ),
}

export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input label="Valid Input" placeholder="Valid" fullWidth />
      <Input label="Error Input" placeholder="Invalid" error="This field has an error" fullWidth />
      <Input label="Helper Text" placeholder="With helper" helperText="This is helpful information" fullWidth />
    </div>
  ),
}
