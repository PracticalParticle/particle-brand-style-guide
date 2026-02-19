import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Input, Textarea, SearchInput } from './Input'
import { Select } from '../Select/Select'
import { Checkbox } from '../Checkbox/Checkbox'
import { Radio } from '../Radio/Radio'
import { Switch } from '../Switch/Switch'
import { Rating } from '../Rating/Rating'
import { FileInput } from '../FileInput/FileInput'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Text inputs use design system tokens: bg-secondary, border neutrals, focus-visible:border-focus. Disabled keeps the same background (no hardcoded override).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'month', 'week'],
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

export const ActiveIndicator: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Focus the field (click or Tab) to see the active indicator: focus ring + border change.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input label="Focus me" placeholder="Tab or click to see active ring" fullWidth />
      <Textarea label="Or focus this" placeholder="Active indicator on focus" rows={2} fullWidth />
      <Select label="Or this select" fullWidth>
        <option value="">Select...</option>
        <option value="1">Option 1</option>
      </Select>
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
      <Input label="Search" type="search" placeholder="Search..." fullWidth />
      <Input label="Date" type="date" fullWidth />
      <Input label="Time" type="time" fullWidth />
      <Input label="Date & time" type="datetime-local" fullWidth />
    </div>
  ),
}

export const DatesAndTime: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input label="Date" type="date" fullWidth />
      <Input label="Time" type="time" fullWidth />
      <Input label="Date and time (local)" type="datetime-local" fullWidth />
      <Input label="Month" type="month" fullWidth />
      <Input label="Week" type="week" fullWidth />
    </div>
  ),
}

export const RatingAndFile: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <Rating label="Rating" value={3} max={5} readonly helperText="Read-only example" />
      <FileInput label="Upload file" placeholder="Choose file or drag and drop" fullWidth />
      <FileInput label="Images only" accept="image/*" multiple fullWidth helperText="Accepts images" />
    </div>
  ),
}

export const Search: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <SearchInput label="Search" placeholder="Search..." fullWidth />
      <SearchInput label="Search (no icon)" placeholder="Search..." showIcon={false} fullWidth />
    </div>
  ),
}

export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <Input label="Disabled input" placeholder="Disabled" disabled fullWidth />
      <Textarea label="Disabled textarea" placeholder="Disabled" disabled rows={3} fullWidth />
      <Select label="Disabled select" disabled fullWidth>
        <option value="">Select...</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
}

export const AllFormControls: Story = {
  render: function AllFormControlsStory() {
    const [rating, setRating] = useState(0)
    return (
      <form className="flex flex-col gap-6 w-full max-w-md rounded-lg border border-neutral-200 dark:border-neutral-700 bg-secondary p-6">
        <h3 className="text-lg font-semibold text-text-primary">All input types</h3>
        <Input label="Name" type="text" placeholder="Full name" required fullWidth />
        <Input label="Email" type="email" placeholder="you@example.com" required fullWidth />
        <Input label="Password" type="password" placeholder="••••••••" helperText="Min 8 characters" fullWidth />
        <SearchInput label="Search" placeholder="Search..." fullWidth />
        <Input label="Amount" type="number" placeholder="0" fullWidth />
        <Input label="Phone" type="tel" placeholder="+1 555 000 0000" fullWidth />
        <Input label="Website" type="url" placeholder="https://..." fullWidth />
        <Input label="Date" type="date" fullWidth />
        <Input label="Time" type="time" fullWidth />
        <Input label="Date & time" type="datetime-local" fullWidth />
        <Select label="Country" fullWidth>
          <option value="">Select country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
        </Select>
        <Textarea label="Message" placeholder="Your message..." rows={3} fullWidth />
        <FileInput label="Attachment" placeholder="Choose file or drag and drop" fullWidth />
        <Rating label="Rating" value={rating} max={5} onChange={setRating} />
        <Checkbox label="I agree to the terms" required />
        <Radio label="Option A" name="demo" value="a" defaultChecked />
        <Radio label="Option B" name="demo" value="b" />
        <Switch label="Subscribe to newsletter" defaultChecked />
        <div className="flex gap-2 pt-2">
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-text-inverse">
            Submit
          </button>
          <button type="button" className="rounded-md border-2 border-neutral-300 dark:border-neutral-500 px-4 py-2 text-sm font-medium text-text-primary">
            Cancel
          </button>
        </div>
      </form>
    )
  },
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
