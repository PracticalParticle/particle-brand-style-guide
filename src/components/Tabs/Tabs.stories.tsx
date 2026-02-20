import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Tabs, TabsList, Tab, TabsPanels, TabPanel } from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Tabs with keyboard support (Arrow keys, Home, End). Use TabsList + Tab for headers, TabsPanels + TabPanel for content. Controlled via value/onChange.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

function TabsDemo({
  variant,
  size,
  orientation,
}: {
  variant?: 'line' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
}) {
  const [value, setValue] = useState('one')
  return (
    <Tabs value={value} onChange={setValue} variant={variant} size={size} orientation={orientation}>
      <TabsList>
        <Tab value="one">Overview</Tab>
        <Tab value="two">Details</Tab>
        <Tab value="three">Settings</Tab>
      </TabsList>
      <TabsPanels>
        <TabPanel value="one">
          <p className="text-sm text-text-secondary">Overview content. Switch tabs with keyboard (Arrow Left/Right or Home/End).</p>
        </TabPanel>
        <TabPanel value="two">
          <p className="text-sm text-text-secondary">Details content.</p>
        </TabPanel>
        <TabPanel value="three">
          <p className="text-sm text-text-secondary">Settings content.</p>
        </TabPanel>
      </TabsPanels>
    </Tabs>
  )
}

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TabsDemo />
    </div>
  ),
}

export const Pills: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TabsDemo variant="pills" />
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-2xl">
      <div>
        <p className="text-xs text-text-tertiary mb-2">Small</p>
        <TabsDemo variant="line" size="sm" />
      </div>
      <div>
        <p className="text-xs text-text-tertiary mb-2">Medium</p>
        <TabsDemo variant="line" size="md" />
      </div>
      <div>
        <p className="text-xs text-text-tertiary mb-2">Large</p>
        <TabsDemo variant="line" size="lg" />
      </div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <TabsDemo orientation="vertical" />
    </div>
  ),
}
