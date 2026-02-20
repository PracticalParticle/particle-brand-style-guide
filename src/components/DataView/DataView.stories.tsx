import type { Meta, StoryObj } from '@storybook/react'
import { useState, useMemo } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, type SortDirection } from '../Table/Table'
import { TableToolbar } from '../Table/TableToolbar'
import { TablePagination } from '../Table/TablePagination'
import { TableCardView } from '../Table/TableCardView'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Modal, ModalContent, ModalFooter } from '../Modal'
import { Card, CardContent } from '../Card'
import { cn } from '@/utils/cn'

/**
 * Full-width wrapper for Data View stories; no max-width so the canvas isn’t narrow.
 */
const dataViewWrapper = 'w-full min-w-0 p-4'

const meta: Meta = {
  title: 'Components/Data display/Data View',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

// ——— Shared data & types ———

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

// ——— Image gallery placeholder data ———

const GALLERY_ITEMS = [
  { id: '1', title: 'Product shot A', category: 'Products', color: 'from-primary/20 to-primary/5' },
  { id: '2', title: 'Product shot B', category: 'Products', color: 'from-primary/15 to-primary/5' },
  { id: '3', title: 'Office', category: 'Workspace', color: 'from-neutral-400/30 to-neutral-200/20 dark:from-neutral-600/40 dark:to-neutral-800/30' },
  { id: '4', title: 'Team', category: 'People', color: 'from-primary/10 to-secondary/10' },
  { id: '5', title: 'Event', category: 'Events', color: 'from-secondary/20 to-primary/10' },
  { id: '6', title: 'Brand', category: 'Marketing', color: 'from-primary/25 to-transparent' },
]

// ——— Social / feed placeholder ———

const FEED_ITEMS = [
  { id: '1', author: 'Product Team', time: '2h ago', text: 'Shipped the new dashboard. Filter by date range and export to CSV.', tag: 'Product' },
  { id: '2', author: 'Design', time: '5h ago', text: 'Updated component library with Data View patterns for tables and cards.', tag: 'Design' },
  { id: '3', author: 'Engineering', time: '1d ago', text: 'API v2 is now stable. Check the migration guide for breaking changes.', tag: 'Engineering' },
]

// ——— Stories ———

export const TableView: Story = {
  render: function TableViewStory() {
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

    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0">
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
            sortConfig={{
              sortKey,
              sortDir: sortDir ?? 'desc',
              options: [
                { key: 'customer', label: 'Customer' },
                { key: 'date', label: 'Date' },
                { key: 'amount', label: 'Amount' },
              ],
              onSortChange: (key, dir) => {
                setSortKey(key as 'customer' | 'date' | 'amount')
                setSortDir(dir)
              },
            }}
            onClearAll={handleClearAll}
            actions={<Button variant="primary" size="sm">Add order</Button>}
          />
          <div className="min-w-0 overflow-auto">
            <Table container fixed stickyHeader scrollMaxHeight="min(60vh, 28rem)">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[7rem] min-w-[7rem]">Order ID</TableHead>
                  <TableHead className="min-w-[8rem] w-[12rem]" sortable sortDirection={sortKey === 'customer' ? sortDir : null} onSort={() => toggleSort('customer')}>Customer</TableHead>
                  <TableHead className="w-[6.5rem] min-w-[6.5rem]" sortable sortDirection={sortKey === 'date' ? sortDir : null} onSort={() => toggleSort('date')}>Date</TableHead>
                  <TableHead className="w-[6rem] min-w-[6rem]" sortable sortDirection={sortKey === 'amount' ? sortDir : null} onSort={() => toggleSort('amount')}>Amount</TableHead>
                  <TableHead className="w-[7rem] min-w-[7rem]">Status</TableHead>
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
                      <TableCell className="font-medium text-text-primary whitespace-nowrap">{order.id}</TableCell>
                      <TableCell className="min-w-0">{order.customer}</TableCell>
                      <TableCell className="whitespace-nowrap">{order.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{order.amount}</TableCell>
                      <TableCell className="whitespace-nowrap"><Badge variant={statusVariant(order.status)} size="sm">{order.status}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
    docs: { description: { story: 'Full data table: search, filters, sort, pagination. Sticky header and row click for detail modal. Use for SaaS dashboards and admin views.' } },
  },
}

export const CardListView: Story = {
  render: function CardListViewStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', amountRange: '' })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)

    const filtered = useMemo(() => {
      return ORDERS.filter(
        (o) =>
          (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterValues.status === '' || o.status === filterValues.status) &&
          amountInRange(o.amount, filterValues.amountRange ?? '')
      )
    }, [search, filterValues])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const pageStart = (page - 1) * pageSize
    const pageData = filtered.slice(pageStart, pageStart + pageSize)

    const handleClearAll = () => { setSearch(''); setFilterValues({ status: '', amountRange: '' }) }

    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search…"
            filtersConfig={{ fields: ORDER_FILTER_FIELDS, values: filterValues, onValuesChange: setFilterValues }}
            quickFilters={{
              label: 'Status',
              options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }],
              value: filterValues.status,
              onChange: (v) => setFilterValues((prev) => ({ ...prev, status: v })),
              allLabel: 'All',
            }}
            onClearAll={handleClearAll}
            actions={<Button variant="primary" size="sm">Add order</Button>}
          />
          <div className="p-3 xs:p-4 sm:p-5 min-w-0">
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
    docs: { description: { story: 'Stacked card list: ideal for narrow viewports and mobile. Same toolbar and pagination; tap a card to open detail.' } },
  },
}

export const CardGridView: Story = {
  render: function CardGridViewStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', amountRange: '' })
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)

    const filtered = useMemo(() => {
      return ORDERS.filter(
        (o) =>
          (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterValues.status === '' || o.status === filterValues.status) &&
          amountInRange(o.amount, filterValues.amountRange ?? '')
      )
    }, [search, filterValues])

    const totalItems = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    const pageStart = (page - 1) * pageSize
    const pageData = filtered.slice(pageStart, pageStart + pageSize)
    const handleClearAll = () => { setSearch(''); setFilterValues({ status: '', amountRange: '' }) }

    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search…"
            filtersConfig={{ fields: ORDER_FILTER_FIELDS, values: filterValues, onValuesChange: setFilterValues }}
            quickFilters={{
              label: 'Status',
              options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }],
              value: filterValues.status,
              onChange: (v) => setFilterValues((prev) => ({ ...prev, status: v })),
              allLabel: 'All',
            }}
            onClearAll={handleClearAll}
            actions={<Button variant="primary" size="sm">Add order</Button>}
          />
          <div className="p-3 xs:p-4 sm:p-5 min-w-0">
            {pageData.length === 0 ? (
              <p className="text-center text-text-tertiary py-8 text-sm">No orders match your filters.</p>
            ) : (
              <TableCardView<OrderRow>
                columns={orderColumns}
                items={pageData}
                onRowClick={setSelectedOrder}
                getKey={(item) => item.id}
                layout="grid"
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
    docs: { description: { story: 'Grid of cards (tiles). Good for browsing and dashboards; responsive columns (1 → 2 → 3).' } },
  },
}

export const ResponsiveTableAndCards: Story = {
  render: function ResponsiveTableAndCardsStory() {
    const [search, setSearch] = useState('')
    const [filterValues, setFilterValues] = useState<Record<string, string>>({ status: '', amountRange: '' })
    const [sortKey, setSortKey] = useState<'customer' | 'date' | 'amount'>('date')
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null)

    const filtered = useMemo(() => {
      let list = ORDERS.filter(
        (o) =>
          (o.customer.toLowerCase().includes(search.toLowerCase()) || o.email.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase())) &&
          (filterValues.status === '' || o.status === filterValues.status) &&
          amountInRange(o.amount, filterValues.amountRange ?? '')
      )
      const mul = sortDir === 'asc' ? 1 : -1
      list = [...list].sort((a, b) => {
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
    const handleClearAll = () => { setSearch(''); setFilterValues({ status: '', amountRange: '' }) }

    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0">
          <TableToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search…"
            filtersConfig={{ fields: ORDER_FILTER_FIELDS, values: filterValues, onValuesChange: setFilterValues }}
            quickFilters={{
              label: 'Status',
              options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }],
              value: filterValues.status,
              onChange: (v) => setFilterValues((prev) => ({ ...prev, status: v })),
              allLabel: 'All',
            }}
            sortConfig={{
              sortKey,
              sortDir: sortDir ?? 'desc',
              options: [
                { key: 'customer', label: 'Customer' },
                { key: 'date', label: 'Date' },
                { key: 'amount', label: 'Amount' },
              ],
              onSortChange: (key, dir) => {
                setSortKey(key as 'customer' | 'date' | 'amount')
                setSortDir(dir)
              },
            }}
            onClearAll={handleClearAll}
            actions={<Button variant="primary" size="sm">Add order</Button>}
          />

          <div className="hidden lg:block min-w-0 overflow-auto">
            <Table container fixed stickyHeader scrollMaxHeight="min(60vh, 28rem)">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[7rem] min-w-[7rem]">Order ID</TableHead>
                  <TableHead className="min-w-[8rem]">Customer</TableHead>
                  <TableHead className="w-[6.5rem] min-w-[6.5rem]">Date</TableHead>
                  <TableHead className="w-[6rem] min-w-[6rem]">Amount</TableHead>
                  <TableHead className="w-[7rem] min-w-[7rem]">Status</TableHead>
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
                      <TableCell className="font-medium text-text-primary whitespace-nowrap">{order.id}</TableCell>
                      <TableCell className="min-w-0">{order.customer}</TableCell>
                      <TableCell className="whitespace-nowrap">{order.date}</TableCell>
                      <TableCell className="whitespace-nowrap">{order.amount}</TableCell>
                      <TableCell className="whitespace-nowrap"><Badge variant={statusVariant(order.status)} size="sm">{order.status}</Badge></TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="block lg:hidden p-3 xs:p-4 sm:p-5 min-w-0">
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
    docs: { description: { story: 'Responsive: table on lg+ screens, card list on smaller. Same toolbar and pagination; tap/click row or card for detail.' } },
  },
}

export const ImageGallery: Story = {
  render: function ImageGalleryStory() {
    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0 p-3 xs:p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Media gallery</h2>
          <div
            className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
            role="list"
          >
            {GALLERY_ITEMS.map((item) => (
              <Card
                key={item.id}
                variant="outlined"
                padding="none"
                interactive
                className="overflow-hidden cursor-pointer min-w-0"
                role="listitem"
              >
                <div className={cn('aspect-square w-full bg-gradient-to-br', item.color)} />
                <CardContent className="p-3 sm:p-4">
                  <p className="font-medium text-text-primary text-sm truncate">{item.title}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">{item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Image or media grid: responsive 2–3 columns. Use for portfolios, product galleries, or company assets.' } },
  },
}

export const SocialFeed: Story = {
  render: function SocialFeedStory() {
    return (
      <div className={cn(dataViewWrapper)}>
        <div className="rounded-lg border border-default bg-bg-primary overflow-hidden shadow-base min-w-0 p-3 xs:p-4 sm:p-5">
          <h2 className="text-lg font-semibold text-text-primary mb-3">Updates</h2>
          <div className="flex flex-col gap-3 min-w-0">
            {FEED_ITEMS.map((item) => (
              <Card key={item.id} variant="outlined" padding="md" className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="font-medium text-text-primary text-sm">{item.author}</span>
                  <span className="text-xs text-text-tertiary">{item.time}</span>
                  <Badge variant="outline" size="sm">{item.tag}</Badge>
                </div>
                <p className="text-sm text-text-secondary">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: { description: { story: 'Feed-style list: updates, announcements, or social posts. Good for company blogs and activity streams.' } },
  },
}
