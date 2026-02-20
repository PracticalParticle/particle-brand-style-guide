import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { FilterButton } from './FilterButton'
import { FilterChip } from './FilterChip'
import { FilterInlineRow } from './FilterInlineRow'
import { FilterPopoverContent } from './FilterPopoverContent'
import { MultiFilter } from './MultiFilter'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { cn } from '@/utils/cn'

const meta: Meta = {
  title: 'Components/Data display/Filter',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const FilterButtonDefault: Story = {
  render: () => <FilterButton ariaLabel="Open filters" />,
  parameters: { docs: { description: { story: 'Filter trigger button with icon. Use when no filters are active.' } } },
}

export const FilterButtonWithCount: Story = {
  render: () => (
    <div className="flex gap-3">
      <FilterButton activeCount={1} ariaLabel="Filters" />
      <FilterButton activeCount={3} ariaLabel="Filters" />
      <FilterButton activeCount={99} ariaLabel="Filters" />
      <FilterButton activeCount={150} ariaLabel="Filters" />
    </div>
  ),
  parameters: { docs: { description: { story: 'With active filter count badge. Shows 99+ for counts over 99. Theme-aware Badge (primary variant).' } } },
}

export const FilterButtonVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <FilterButton variant="outline" activeCount={0} />
      <FilterButton variant="ghost" activeCount={2} />
      <FilterButton variant="primary" activeCount={1} />
    </div>
  ),
  parameters: { docs: { description: { story: 'Outline (default for toolbars), ghost, primary.' } } },
}

export const FilterChips: Story = {
  render: function FilterChipsStory() {
    const [chips, setChips] = useState([
      { id: 'status', label: 'Status', valueLabel: 'Completed' },
      { id: 'role', label: 'Role', valueLabel: 'Admin' },
    ])
    const remove = (id: string) => setChips((p) => p.filter((c) => c.id !== id))
    return (
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <FilterChip
            key={c.id}
            label={c.label}
            valueLabel={c.valueLabel}
            onRemove={() => remove(c.id)}
          />
        ))}
      </div>
    )
  },
  parameters: { docs: { description: { story: 'Removable chips for active filters. Theme tokens: border-default, bg-bg-secondary, text-text-primary.' } } },
}

const DEMO_FIELDS = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { value: 'completed', label: 'Completed' },
      { value: 'pending', label: 'Pending' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
    allLabel: 'All',
  },
  {
    id: 'priority',
    label: 'Priority',
    options: [
      { value: 'high', label: 'High' },
      { value: 'medium', label: 'Medium' },
      { value: 'low', label: 'Low' },
    ],
    allLabel: 'Any',
  },
]

export const FilterInlineRowStandalone: Story = {
  render: function FilterInlineRowStandaloneStory() {
    const [values, setValues] = useState<Record<string, string>>({ status: '', priority: '' })
    return (
      <div className="w-full max-w-xl border border-default rounded-lg overflow-hidden bg-bg-secondary">
        <FilterInlineRow
          fields={DEMO_FIELDS}
          values={values}
          onValuesChange={setValues}
          rowLabel="Filters"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Expandable inline row: filters in one row below the toolbar. No popover — avoids dropdown inside dropdown. Use in Data View toolbar.',
      },
    },
  },
}

export const FilterPopoverContentStandalone: Story = {
  render: function FilterPopoverContentStandaloneStory() {
    const [values, setValues] = useState<Record<string, string>>({ status: '', priority: '' })
    return (
      <div className="w-[18rem] border border-default rounded-lg overflow-hidden bg-bg-secondary">
        <FilterPopoverContent
          fields={DEMO_FIELDS}
          values={values}
          onValuesChange={setValues}
          onClose={() => {}}
        />
      </div>
    )
  },
  parameters: { docs: { description: { story: 'Popover panel only: field selects + Clear all / Done. Use inside Popover or as reference.' } } },
}

export const MultiFilterDemo: Story = {
  render: function MultiFilterDemoStory() {
    const [values, setValues] = useState<Record<string, string>>({ status: '', priority: '' })
    return (
      <div className={cn('rounded-lg border border-default bg-bg-secondary p-4 min-w-[20rem]')}>
        <p className="text-sm text-text-tertiary mb-3">Toolbar-style: button + chips</p>
        <MultiFilter
          fields={DEMO_FIELDS}
          values={values}
          onValuesChange={setValues}
          placement="bottom"
        />
      </div>
    )
  },
  parameters: { docs: { description: { story: 'Full multi-field filter: button with count, popover with selects, and removable chips. Theme-aware.' } } },
}

export const QuickFiltersBadges: Story = {
  render: function QuickFiltersBadgesStory() {
    const [status, setStatus] = useState('')
    return (
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-text-tertiary">Status</span>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Status">
          <button
            type="button"
            onClick={() => setStatus('')}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            aria-pressed={!status}
          >
            <Badge variant={!status ? 'primary' : 'outline'} size="sm">
              All
            </Badge>
          </button>
          {['Completed', 'Pending', 'Cancelled'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setStatus(opt.toLowerCase())}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
              aria-pressed={status === opt.toLowerCase()}
            >
              <Badge variant={status === opt.toLowerCase() ? 'primary' : 'outline'} size="sm">
                {opt}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    )
  },
  parameters: { docs: { description: { story: 'Quick filter pills using Badge. One-click filter; often used below search in a toolbar.' } } },
}

export const ToolbarStrip: Story = {
  render: function ToolbarStripStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', priority: '' })
    const hasActive = search.trim() !== '' || Object.values(filterValues).some((v) => v !== '')
    const clearAll = () => {
      setSearch('')
      setFilterValues({ status: '', priority: '' })
    }
    return (
      <div className={cn('w-full rounded-none border border-border border-x-0 border-t-0 bg-bg-secondary py-3 px-4')}>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-[10rem] rounded-md border border-default bg-bg-primary px-3 text-sm text-text-primary placeholder:text-text-tertiary"
          />
          <MultiFilter
            fields={DEMO_FIELDS}
            values={filterValues}
            onValuesChange={setFilterValues}
          />
          {hasActive && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="text-text-tertiary">
              Clear all
            </Button>
          )}
          <div className="flex-1" />
          <Button variant="primary" size="sm">Export</Button>
        </div>
      </div>
    )
  },
  parameters: {
    layout: 'fullscreen',
    docs: { description: { story: 'Example toolbar strip: search, multi filter, clear all, action. Matches Data View toolbar pattern.' } },
  },
}
