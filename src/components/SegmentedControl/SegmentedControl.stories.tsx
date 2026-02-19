import type { Meta, StoryObj } from '@storybook/react'
import  { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Components/Selection/SegmentedControl',
  component: SegmentedControl,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

const viewOptions = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
  { value: 'map', label: 'Map' },
]

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Popular' },
]

function DefaultStory() {
  const [value, setValue] = useState('list')
  return (
    <SegmentedControl
      options={viewOptions}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const Default: Story = {
  render: () => <DefaultStory />,
}

function WithIconsStory() {
  const [value, setValue] = useState('list')
  const ListIcon = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    )
    const GridIcon = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )
    const MapIcon = () => (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    )
  const optionsWithIcons = [
    { value: 'list', label: 'List', icon: <ListIcon /> },
    { value: 'grid', label: 'Grid', icon: <GridIcon /> },
    { value: 'map', label: 'Map', icon: <MapIcon /> },
  ]
  return (
    <SegmentedControl
      options={optionsWithIcons}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const WithIcons: Story = {
  render: () => <WithIconsStory />,
}

function SizesStory() {
  const [v1, setV1] = useState('newest')
  const [v2, setV2] = useState('newest')
  const [v3, setV3] = useState('newest')
  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl options={sortOptions} value={v1} onValueChange={setV1} size="sm" />
      <SegmentedControl options={sortOptions} value={v2} onValueChange={setV2} size="md" />
      <SegmentedControl options={sortOptions} value={v3} onValueChange={setV3} size="lg" />
    </div>
  )
}

export const Sizes: Story = {
  render: () => <SizesStory />,
}

function FullWidthStory() {
  const [value, setValue] = useState('list')
  return (
    <div className="w-80">
      <SegmentedControl
        options={viewOptions}
        value={value}
        onValueChange={setValue}
        fullWidth
      />
    </div>
  )
}

export const FullWidth: Story = {
  render: () => <FullWidthStory />,
}

function TwoOptionsStory() {
  const [value, setValue] = useState('on')
  return (
    <SegmentedControl
      options={[
        { value: 'on', label: 'On' },
        { value: 'off', label: 'Off' },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const TwoOptions: Story = {
  render: () => <TwoOptionsStory />,
}

function WithDisabledOptionStory() {
  const [value, setValue] = useState('newest')
  return (
    <SegmentedControl
      options={[
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'popular', label: 'Popular (soon)', disabled: true },
      ]}
      value={value}
      onValueChange={setValue}
    />
  )
}

export const WithDisabledOption: Story = {
  render: () => <WithDisabledOptionStory />,
}

export const Disabled: Story = {
  render: () => (
    <SegmentedControl
      options={viewOptions}
      value="list"
      onValueChange={() => {}}
      disabled
    />
  ),
}
