import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { DropdownSelect } from '@/components/DropdownSelect'
import { DropdownMenu } from '@/components/DropdownMenu'
import { Combobox } from '@/components/Combobox'
import { MultiSelect } from '@/components/MultiSelect'
import { SegmentedControl } from '@/components/SegmentedControl'
import { Button } from '@/components/Button'

const meta: Meta = {
  title: 'Components/Selection/Overview',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Full set of selection components for SaaS, marketing sites, and internal tools. Use **DropdownSelect** for custom styling and option groups; **Combobox** for searchable long lists; **MultiSelect** for multiple values with chips; **SegmentedControl** for 2–5 inline options; **DropdownMenu** for action menus.',
      },
    },
  },
}

export default meta

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
]

const tagOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'typescript', label: 'TypeScript' },
]

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

function AllSelectionComponentsStory() {
  const [dropdownValue, setDropdownValue] = useState<string | null>(null)
  const [comboboxValue, setComboboxValue] = useState<string | null>(null)
  const [multiValue, setMultiValue] = useState<string[]>([])
  const [segmentValue, setSegmentValue] = useState('list')
  return (
    <div className="flex flex-col gap-10 w-full max-w-md p-6 rounded-lg border border-border bg-bg-secondary">
        <h2 className="text-lg font-semibold text-text-primary">Selection components</h2>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">DropdownSelect</h3>
          <DropdownSelect
            label="Country (custom)"
            options={countryOptions}
            value={dropdownValue}
            onValueChange={setDropdownValue}
            placeholder="Select country"
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">Combobox (searchable)</h3>
          <Combobox
            label="Country"
            options={countryOptions}
            value={comboboxValue}
            onValueChange={setComboboxValue}
            placeholder="Search countries…"
            searchPlaceholder="Type to search"
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">MultiSelect</h3>
          <MultiSelect
            label="Tags"
            options={tagOptions}
            value={multiValue}
            onValueChange={setMultiValue}
            placeholder="Add tags…"
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">SegmentedControl</h3>
          <SegmentedControl
            options={[
              { value: 'list', label: 'List' },
              { value: 'grid', label: 'Grid' },
              { value: 'map', label: 'Map' },
            ]}
            value={segmentValue}
            onValueChange={setSegmentValue}
            fullWidth
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-text-secondary">DropdownMenu</h3>
          <DropdownMenu
            sections={[
              {
                items: [
                  { label: 'Edit', onClick: () => {} },
                  { label: 'Duplicate', onClick: () => {} },
                  { label: 'Delete', variant: 'danger', onClick: () => {} },
                ],
              },
            ]}
          >
            <Button variant="outline" rightIcon={<ChevronDownIcon />}>
              Actions
            </Button>
          </DropdownMenu>
        </div>
      </div>
  )
}

export const AllSelectionComponents: StoryObj = {
  render: () => <AllSelectionComponentsStory />,
}

export const WhenToUse: StoryObj = {
  render: () => (
    <div className="max-w-2xl space-y-4 text-sm text-text-secondary">
      <h2 className="text-lg font-semibold text-text-primary">When to use which</h2>
      <ul className="list-disc list-inside space-y-2">
        <li><strong className="text-text-primary">DropdownSelect</strong> — Custom look, option groups, icons, or when you need the trigger to match your design system. Use for most single-select forms.</li>
        <li><strong className="text-text-primary">Combobox</strong> — Long lists (10+ options). Type to filter. Use for country, category, or any searchable single choice.</li>
        <li><strong className="text-text-primary">MultiSelect</strong> — Multiple values, tags, or “add many” flows. Shows selected as chips; supports search inside panel.</li>
        <li><strong className="text-text-primary">SegmentedControl</strong> — 2–5 options, always visible (e.g. List/Grid, Newest/Oldest). Inline, compact.</li>
        <li><strong className="text-text-primary">DropdownMenu</strong> — Actions, not selection (e.g. Edit, Delete). Use for “more” menus and context actions.</li>
      </ul>
    </div>
  ),
}
