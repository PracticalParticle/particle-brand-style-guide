import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'filled'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    interactive: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    children: 'This is a default card with some content.',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: 'This is an elevated card with more shadow.',
  },
}

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    padding: 'md',
    children: 'This is an outlined card with a border.',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    padding: 'md',
    children: 'This is a filled card with background color.',
  },
}

export const Interactive: Story = {
  args: {
    variant: 'default',
    padding: 'md',
    interactive: true,
    children: 'Hover over this card to see the interactive effect.',
  },
}

export const WithSubComponents: Story = {
  render: () => (
    <Card variant="default" padding="md" className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a card description that provides additional context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-neutral-700 dark:text-neutral-300">
          This is the main content area of the card. You can put any content here.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">Action</Button>
        <Button variant="outline" size="sm">Cancel</Button>
      </CardFooter>
    </Card>
  ),
}

export const PaddingVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card variant="outlined" padding="none" className="w-96">
        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-t-xl">No padding (custom)</div>
      </Card>
      <Card variant="outlined" padding="sm" className="w-96">
        Small padding
      </Card>
      <Card variant="outlined" padding="md" className="w-96">
        Medium padding (default)
      </Card>
      <Card variant="outlined" padding="lg" className="w-96">
        Large padding
      </Card>
    </div>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[800px]">
      <Card variant="default" padding="md">
        <CardTitle>Default</CardTitle>
        <CardContent>Default card variant</CardContent>
      </Card>
      <Card variant="elevated" padding="md">
        <CardTitle>Elevated</CardTitle>
        <CardContent>Elevated card variant</CardContent>
      </Card>
      <Card variant="outlined" padding="md">
        <CardTitle>Outlined</CardTitle>
        <CardContent>Outlined card variant</CardContent>
      </Card>
      <Card variant="filled" padding="md">
        <CardTitle>Filled</CardTitle>
        <CardContent>Filled card variant</CardContent>
      </Card>
    </div>
  ),
}
