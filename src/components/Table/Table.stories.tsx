import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, type SortDirection } from './Table'
import { Badge } from '../Badge'
import { Skeleton } from '../Skeleton'
import { cn } from '@/utils/cn'

/** Responsive wrapper: full width on mobile; wider in story canvas so content isn’t too narrow. */
const tableStoryWrapper = 'w-full min-w-0 max-w-[100vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto px-3 xs:px-4 sm:px-5 py-4'

const meta: Meta<typeof Table> = {
  title: 'Components/Data display/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Base table primitives. For full data views (toolbar, filters, pagination, card/list/grid/gallery), see **Components/Data View**.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent transactions</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow hover>
          <TableCell>TXN-001</TableCell>
          <TableCell>2024-01-15</TableCell>
          <TableCell>$1,234.56</TableCell>
          <TableCell>Completed</TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell>TXN-002</TableCell>
          <TableCell>2024-01-16</TableCell>
          <TableCell>$2,345.67</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
        <TableRow hover>
          <TableCell>TXN-003</TableCell>
          <TableCell>2024-01-17</TableCell>
          <TableCell>$3,456.78</TableCell>
          <TableCell>Completed</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const WithBadges: Story = {
  render: () => (
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow hover>
            <TableCell className="font-medium">John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell className="font-medium">Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>User</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow hover>
            <TableCell className="font-medium">Bob Johnson</TableCell>
            <TableCell>bob@example.com</TableCell>
            <TableCell>User</TableCell>
            <TableCell>
              <Badge variant="warning">Pending</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
  ),
}

export const WithoutHover: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Widget A</TableCell>
          <TableCell>$19.99</TableCell>
          <TableCell>150</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget B</TableCell>
          <TableCell>$29.99</TableCell>
          <TableCell>75</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Widget C</TableCell>
          <TableCell>$39.99</TableCell>
          <TableCell>200</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="h-8">ID</TableHead>
          <TableHead className="h-8">Name</TableHead>
          <TableHead className="h-8">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i} hover>
            <TableCell className="p-2">#{i}</TableCell>
            <TableCell className="p-2">Item {i}</TableCell>
            <TableCell className="p-2">${i * 10}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

export const Loading: Story = {
  render: () => (
    <Table>
      <TableCaption>Data is loading</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
          <TableRow key={i}>
            <TableCell><Skeleton variant="text" width="85%" height={16} /></TableCell>
            <TableCell><Skeleton variant="text" width="70%" height={16} /></TableCell>
            <TableCell><Skeleton variant="text" width="50%" height={16} /></TableCell>
            <TableCell><Skeleton variant="rectangular" width={64} height={22} className="rounded-md" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Show skeleton rows while table data is loading. Keep real column headers so users understand the structure.',
      },
    },
  },
}

// ——— Sortable columns ———

export const SortableColumns: Story = {
  render: function SortableStory() {
    const [sortKey, setSortKey] = useState<'name' | 'date' | 'amount' | null>(null)
    const [sortDir, setSortDir] = useState<SortDirection>('asc')
    const toggle = (key: 'name' | 'date' | 'amount') => {
      if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      else { setSortKey(key); setSortDir('asc') }
    }
    const rows = [
      { name: 'Acme Corp', date: '2024-03-01', amount: '$1,200' },
      { name: 'Beta Inc', date: '2024-02-15', amount: '$3,400' },
      { name: 'Gamma LLC', date: '2024-03-10', amount: '$890' },
    ]
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <Table container>
          <TableHeader>
            <TableRow>
              <TableHead
                sortable
                sortDirection={sortKey === 'name' ? sortDir : null}
                onSort={() => toggle('name')}
              >
                Name
              </TableHead>
              <TableHead
                sortable
                sortDirection={sortKey === 'date' ? sortDir : null}
                onSort={() => toggle('date')}
              >
                Date
              </TableHead>
              <TableHead
                sortable
                sortDirection={sortKey === 'amount' ? sortDir : null}
                onSort={() => toggle('amount')}
              >
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r, i) => (
              <TableRow key={i} hover>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.date}</TableCell>
                <TableCell>{r.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Sortable column headers with direction indicator.' } },
  },
}

// ——— Fixed layout + sticky header (standalone) ———

export const FixedLayoutStickyHeader: Story = {
  render: () => {
    const rows = Array.from({ length: 20 }, (_, i) => ({
      id: `#${1000 + i}`,
      name: `Item ${i + 1}`,
      value: `$${(i + 1) * 100}`,
    }))
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <Table container fixed stickyHeader scrollMaxHeight="16rem">
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">ID</TableHead>
              <TableHead className="min-w-0">Name</TableHead>
              <TableHead className="w-24">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell className="font-medium">{r.id}</TableCell>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Fixed column widths and sticky header. Scroll the table body to see the header stay visible.' } },
  },
}
