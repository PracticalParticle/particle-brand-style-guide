import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption, type SortDirection } from './Table'
import { TableToolbar } from './TableToolbar'
import { TablePagination } from './TablePagination'
import { TableCardView } from './TableCardView'
import { Badge } from '../Badge'
import { Skeleton } from '../Skeleton'
import { Button } from '../Button'
import { Modal, ModalContent, ModalFooter } from '../Modal'
import { cn } from '@/utils/cn'

/** Responsive wrapper: full width on mobile with minimal padding, wider max on desktop. */
const tableStoryWrapper = 'w-full min-w-0 max-w-[100vw] sm:max-w-3xl md:max-w-4xl lg:max-w-6xl mx-auto px-2 xs:px-3 sm:px-4'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'fullscreen',
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

// ——— Table toolbar (legacy single filter) ———

export const ToolbarLegacy: Story = {
  render: function ToolbarLegacyStory() {
    const [search, setSearch] = useState('')
    const [status, setStatus] = useState('')
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search orders…"
          filterLabel="Status"
          filterValue={status}
          onFilterChange={setStatus}
          filterOptions={[
            { value: 'completed', label: 'Completed' },
            { value: 'pending', label: 'Pending' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
          onClearAll={() => { setSearch(''); setStatus('') }}
          actions={
            <Button variant="primary" size="sm">
              Export
            </Button>
          }
        />
        <Table container>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow hover><TableCell>#1001</TableCell><TableCell>2024-01-15</TableCell><TableCell>Completed</TableCell></TableRow>
            <TableRow hover><TableCell>#1002</TableCell><TableCell>2024-01-16</TableCell><TableCell>Pending</TableCell></TableRow>
          </TableBody>
        </Table>
        <TablePagination
          page={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={10}
          onPageSizeChange={() => {}}
          totalItems={2}
        />
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Toolbar with search, single filter, Clear all (reserved width), and actions.' } },
  },
}

// ——— Table toolbar with multi-field filters ———

const FILTER_FIELDS = [
  { id: 'status', label: 'Status', options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }] },
  { id: 'priority', label: 'Priority', options: [{ value: 'high', label: 'High' }, { value: 'medium', label: 'Medium' }, { value: 'low', label: 'Low' }] },
]

export const Toolbar: Story = {
  render: function ToolbarStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', priority: '' })
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <TableToolbar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search…"
          filtersConfig={{
            fields: FILTER_FIELDS,
            values: filterValues,
            onValuesChange: setFilterValues,
          }}
          onClearAll={() => { setSearch(''); setFilterValues({ status: '', priority: '' }) }}
          actions={
            <Button variant="primary" size="sm">
              Export
            </Button>
          }
        />
        <Table container>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow hover><TableCell>#1001</TableCell><TableCell>2024-01-15</TableCell><TableCell>Completed</TableCell><TableCell>High</TableCell></TableRow>
            <TableRow hover><TableCell>#1002</TableCell><TableCell>2024-01-16</TableCell><TableCell>Pending</TableCell><TableCell>Medium</TableCell></TableRow>
          </TableBody>
        </Table>
        <TablePagination
          page={1}
          totalPages={1}
          onPageChange={() => {}}
          pageSize={10}
          onPageSizeChange={() => {}}
          totalItems={2}
        />
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Toolbar with search, multi-field filters (popover + chips), Clear all, and actions. All inline; reserved space prevents layout shift.' } },
  },
}

// ——— Table pagination (with page numbers + jump) ———

export const Pagination: Story = {
  render: function PaginationStory() {
    const [page, setPage] = useState(2)
    const [pageSize, setPageSize] = useState(10)
    const totalItems = 42
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <Table container>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: Math.min(pageSize, totalItems - (page - 1) * pageSize) }, (_, i) => (page - 1) * pageSize + i + 1).map((i) => (
              <TableRow key={i} hover>
                <TableCell>#{i}</TableCell>
                <TableCell>Item {i}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={(size: number) => { setPageSize(size); setPage(1) }}
          totalItems={totalItems}
        />
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Pagination: range, page size selector, prev/next, and page number buttons to jump to any page.' } },
  },
}

// ——— Many pages (ellipsis) ———

export const PaginationManyPages: Story = {
  render: function PaginationManyPagesStory() {
    const [page, setPage] = useState(5)
    const totalItems = 200
    const pageSize = 10
    const totalPages = Math.ceil(totalItems / pageSize)
    return (
      <div className={cn(tableStoryWrapper, 'rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
        <Table container>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i} hover>
                <TableCell>—</TableCell>
                <TableCell>—</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
          pageSize={pageSize}
          onPageSizeChange={() => {}}
          totalItems={totalItems}
          maxPageButtons={7}
        />
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Pagination with many pages: ellipsis and jump to first/last/current window.' } },
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

// ——— Full data table with search, filter, sort, pagination, row click + modal ———

type OrderStatus = 'completed' | 'pending' | 'cancelled'

interface OrderRow {
  id: string
  customer: string
  email: string
  date: string
  amount: string
  status: OrderStatus
}

const ORDERS: OrderRow[] = [
  { id: 'ORD-001', customer: 'Alice Chen', email: 'alice@example.com', date: '2024-02-01', amount: '$1,234.00', status: 'completed' },
  { id: 'ORD-002', customer: 'Bob Smith', email: 'bob@example.com', date: '2024-02-05', amount: '$567.50', status: 'pending' },
  { id: 'ORD-003', customer: 'Carol Doe', email: 'carol@example.com', date: '2024-02-08', amount: '$2,890.00', status: 'completed' },
  { id: 'ORD-004', customer: 'David Lee', email: 'david@example.com', date: '2024-02-10', amount: '$445.00', status: 'cancelled' },
  { id: 'ORD-005', customer: 'Eve Wilson', email: 'eve@example.com', date: '2024-02-12', amount: '$1,100.00', status: 'pending' },
  { id: 'ORD-006', customer: 'Frank Brown', email: 'frank@example.com', date: '2024-02-14', amount: '$3,200.00', status: 'completed' },
  { id: 'ORD-007', customer: 'Grace Kim', email: 'grace@example.com', date: '2024-02-16', amount: '$789.00', status: 'completed' },
  { id: 'ORD-008', customer: 'Henry Zhang', email: 'henry@example.com', date: '2024-02-18', amount: '$934.50', status: 'pending' },
  { id: 'ORD-009', customer: 'Ivy Martinez', email: 'ivy@example.com', date: '2024-02-20', amount: '$1,567.00', status: 'completed' },
  { id: 'ORD-010', customer: 'Jack Taylor', email: 'jack@example.com', date: '2024-02-22', amount: '$2,100.00', status: 'pending' },
]

const ORDER_FILTER_FIELDS = [
  { id: 'status', label: 'Status', options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }] },
  { id: 'amountRange', label: 'Amount', options: [{ value: 'under1k', label: 'Under $1k' }, { value: '1k-5k', label: '$1k – $5k' }, { value: 'over5k', label: 'Over $5k' }] },
]

function amountInRange(amountStr: string, range: string): boolean {
  if (!range) return true
  const num = parseFloat(amountStr.replace(/[$,]/g, ''))
  if (range === 'under1k') return num < 1000
  if (range === '1k-5k') return num >= 1000 && num <= 5000
  if (range === 'over5k') return num > 5000
  return true
}

function statusVariant(s: OrderStatus): 'success' | 'warning' | 'error' {
  if (s === 'completed') return 'success'
  if (s === 'pending') return 'warning'
  return 'error'
}

export const DataTableWithModal: Story = {
  render: function DataTableWithModalStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', amountRange: '' })
    const [sortKey, setSortKey] = useState<'customer' | 'date' | 'amount'>('date')
    const [sortDir, setSortDir] = useState<SortDirection>('desc')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)

    const filtered = useMemo(() => {
      let list = ORDERS.filter(
        (o) =>
          (o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.email.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterValues.status === '' || o.status === filterValues.status) &&
          amountInRange(o.amount, filterValues.amountRange ?? '')
      )
      list = [...list].sort((a, b) => {
        const mul = sortDir === 'asc' ? 1 : -1
        if (sortKey === 'customer') return mul * a.customer.localeCompare(b.customer)
        if (sortKey === 'date') return mul * a.date.localeCompare(b.date)
        return mul * (parseFloat(a.amount.replace(/[$,]/g, '')) - parseFloat(b.amount.replace(/[$,]/g, '')))
      })
      return list
    }, [search, filterValues, sortKey, sortDir])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const pageStart = (page - 1) * pageSize
    const pageData = filtered.slice(pageStart, pageStart + pageSize)

    const toggleSort = (key: 'customer' | 'date' | 'amount') => {
      if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
      else { setSortKey(key); setSortDir('asc') }
    }

    const handleClearAll = () => {
      setSearch('')
      setFilterValues({ status: '', amountRange: '' })
    }

    const quickStatus = filterValues.status

    return (
      <div className={cn(tableStoryWrapper, 'py-4')}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search…"
            filtersConfig={{
              fields: ORDER_FILTER_FIELDS,
              values: filterValues,
              onValuesChange: setFilterValues,
            }}
            quickFilters={{
              label: 'Status',
              options: [
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'cancelled', label: 'Cancelled' },
              ],
              value: quickStatus,
              onChange: (v) => setFilterValues((prev) => ({ ...prev, status: v })),
              allLabel: 'All',
            }}
            onClearAll={handleClearAll}
            actions={
              <Button variant="primary" size="sm">
                Add order
              </Button>
            }
          />
          <Table container fixed stickyHeader scrollMaxHeight="min(60vh, 28rem)">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[7rem]">Order ID</TableHead>
                <TableHead
                  className="min-w-0"
                  sortable
                  sortDirection={sortKey === 'customer' ? sortDir : null}
                  onSort={() => toggleSort('customer')}
                >
                  Customer
                </TableHead>
                <TableHead className="w-[6.5rem]" sortable sortDirection={sortKey === 'date' ? sortDir : null} onSort={() => toggleSort('date')}>
                  Date
                </TableHead>
                <TableHead className="w-[6rem]" sortable sortDirection={sortKey === 'amount' ? sortDir : null} onSort={() => toggleSort('amount')}>
                  Amount
                </TableHead>
                <TableHead className="w-[6.5rem]">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-text-tertiary py-8">
                    No orders match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                pageData.map((order) => (
                  <TableRow
                    key={order.id}
                    hover
                    interactive
                    onClick={() => setSelectedOrder(order)}
                  >
                    <TableCell className="font-medium text-text-primary">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(order.status)} size="sm">
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <TablePagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={(size: number) => { setPageSize(size); setPage(1) }}
            totalItems={totalItems}
          />
        </div>

        <Modal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          title={selectedOrder ? `Order ${selectedOrder.id}` : ''}
          size="md"
        >
          {selectedOrder && (
            <>
              <ModalContent>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div><dt className="font-medium text-text-tertiary">Customer</dt><dd className="text-text-primary mt-0.5">{selectedOrder.customer}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Email</dt><dd className="text-text-primary mt-0.5">{selectedOrder.email}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Date</dt><dd className="text-text-primary mt-0.5">{selectedOrder.date}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Amount</dt><dd className="text-text-primary mt-0.5">{selectedOrder.amount}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Status</dt><dd className="mt-0.5"><Badge variant={statusVariant(selectedOrder.status)} size="sm">{selectedOrder.status}</Badge></dd></div>
                </dl>
              </ModalContent>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>Close</Button>
                <Button variant="primary">View full order</Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      </div>
    )
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Full data table: search, filter, sort, pagination. Fixed layout + sticky header. Click a row to open a detail modal.',
      },
    },
  },
}

// ——— Responsive: Table on desktop, Card list on mobile (stacked list pattern) ———

export const ResponsiveTableAndCardView: Story = {
  render: function ResponsiveTableAndCardViewStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', amountRange: '' })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)

    const filtered = useMemo(() => {
      let list = ORDERS.filter(
        (o) =>
          (o.customer.toLowerCase().includes(search.toLowerCase()) ||
            o.email.toLowerCase().includes(search.toLowerCase()) ||
            o.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterValues.status === '' || o.status === filterValues.status) &&
          amountInRange(o.amount, filterValues.amountRange ?? '')
      )
      return list
    }, [search, filterValues])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const pageStart = (page - 1) * pageSize
    const pageData = filtered.slice(pageStart, pageStart + pageSize)

    const handleClearAll = () => {
      setSearch('')
      setFilterValues({ status: '', amountRange: '' })
    }

    const orderColumns = [
      { key: 'id', label: 'Order ID', primary: true },
      { key: 'customer', label: 'Customer', primary: true },
      { key: 'date', label: 'Date' },
      { key: 'amount', label: 'Amount' },
      {
        key: 'status',
        label: 'Status',
        render: (val: unknown) => <Badge variant={statusVariant(val as OrderStatus)} size="sm">{String(val)}</Badge>,
      },
    ]

    return (
      <div className={cn(tableStoryWrapper, 'py-4')}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search…"
            filtersConfig={{
              fields: ORDER_FILTER_FIELDS,
              values: filterValues,
              onValuesChange: setFilterValues,
            }}
            quickFilters={{
              label: 'Status',
              options: [
                { value: 'completed', label: 'Completed' },
                { value: 'pending', label: 'Pending' },
                { value: 'cancelled', label: 'Cancelled' },
              ],
              value: filterValues.status,
              onChange: (v) => setFilterValues((prev) => ({ ...prev, status: v })),
              allLabel: 'All',
            }}
            onClearAll={handleClearAll}
            actions={<Button variant="primary" size="sm">Add order</Button>}
          />

          {/* Desktop: table with fixed layout + sticky header */}
          <div className={cn('hidden lg:block')}>
            <Table container fixed stickyHeader scrollMaxHeight="min(60vh, 28rem)">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[7rem]">Order ID</TableHead>
                  <TableHead className="min-w-0">Customer</TableHead>
                  <TableHead className="w-[6.5rem]">Date</TableHead>
                  <TableHead className="w-[6rem]">Amount</TableHead>
                  <TableHead className="w-[6.5rem]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-text-tertiary py-8">No orders match your filters.</TableCell>
                  </TableRow>
                ) : (
                  pageData.map((order) => (
                    <TableRow key={order.id} hover interactive onClick={() => setSelectedOrder(order)}>
                      <TableCell className="font-medium text-text-primary">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell><Badge variant={statusVariant(order.status)} size="sm">{order.status}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Mobile / tablet: card list (stacked list pattern — better for small screens) */}
          <div className={cn('block lg:hidden p-2 xs:p-3 sm:p-4')}>
            {pageData.length === 0 ? (
              <p className="text-center text-text-tertiary py-8 text-sm">No orders match your filters.</p>
            ) : (
              <TableCardView<OrderRow>
                columns={orderColumns}
                items={pageData}
                onRowClick={setSelectedOrder}
                getKey={(item) => item.id}
                layout="list"
              />
            )}
          </div>

          <TablePagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            pageSize={pageSize}
            onPageSizeChange={(size: number) => { setPageSize(size); setPage(1) }}
            totalItems={totalItems}
          />
        </div>

        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={selectedOrder ? `Order ${selectedOrder.id}` : ''} size="md">
          {selectedOrder && (
            <>
              <ModalContent>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div><dt className="font-medium text-text-tertiary">Customer</dt><dd className="text-text-primary mt-0.5">{selectedOrder.customer}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Email</dt><dd className="text-text-primary mt-0.5">{selectedOrder.email}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Date</dt><dd className="text-text-primary mt-0.5">{selectedOrder.date}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Amount</dt><dd className="text-text-primary mt-0.5">{selectedOrder.amount}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Status</dt><dd className="mt-0.5"><Badge variant={statusVariant(selectedOrder.status)} size="sm">{selectedOrder.status}</Badge></dd></div>
                </dl>
              </ModalContent>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>Close</Button>
                <Button variant="primary">View full order</Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      </div>
    )
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Responsive pattern: table (fixed + sticky header) on lg+, card list on smaller screens. Same toolbar and pagination; tap card or row to open detail.',
      },
    },
  },
}

// ——— Items as tiles (card grid — alternative view) ———

export const ItemsAsTiles: Story = {
  render: function ItemsAsTilesStory() {
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)
    const orderColumns = [
      { key: 'id', label: 'Order ID', primary: true },
      { key: 'customer', label: 'Customer', primary: true },
      { key: 'date', label: 'Date' },
      { key: 'amount', label: 'Amount' },
      {
        key: 'status',
        label: 'Status',
        render: (val: unknown) => <Badge variant={statusVariant(val as OrderStatus)} size="sm">{String(val)}</Badge>,
      },
    ]

    return (
      <div className={cn(tableStoryWrapper, 'py-4')}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base p-2 xs:p-3 sm:p-4">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Orders</h2>
          <TableCardView<OrderRow>
            columns={orderColumns}
            items={ORDERS}
            onRowClick={setSelectedOrder}
            getKey={(item) => item.id}
            layout="grid"
          />
        </div>

        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title={selectedOrder ? `Order ${selectedOrder.id}` : ''} size="md">
          {selectedOrder && (
            <>
              <ModalContent>
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div><dt className="font-medium text-text-tertiary">Customer</dt><dd className="text-text-primary mt-0.5">{selectedOrder.customer}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Email</dt><dd className="text-text-primary mt-0.5">{selectedOrder.email}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Date</dt><dd className="text-text-primary mt-0.5">{selectedOrder.date}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Amount</dt><dd className="text-text-primary mt-0.5">{selectedOrder.amount}</dd></div>
                  <div><dt className="font-medium text-text-tertiary">Status</dt><dd className="mt-0.5"><Badge variant={statusVariant(selectedOrder.status)} size="sm">{selectedOrder.status}</Badge></dd></div>
                </dl>
              </ModalContent>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setSelectedOrder(null)}>Close</Button>
                <Button variant="primary">View full order</Button>
              </ModalFooter>
            </>
          )}
        </Modal>
      </div>
    )
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Alternative view: items as a grid of tiles (cards). Suited to browsing and mobile; tap a card to open detail.',
      },
    },
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
      <div className={cn(tableStoryWrapper, 'py-4 rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base')}>
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
