/**
 * Reusable Orders table block (toolbar + table + pagination).
 * Used by Data View / TableView story and ComponentShowcase.
 */

import { useState, useMemo } from 'react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, type SortDirection } from '../Table/Table'
import { TableToolbar } from '../Table/TableToolbar'
import { TablePagination } from '../Table/TablePagination'
import { Badge } from '../Badge'
import { Button } from '../Button'
import { Modal, ModalContent, ModalFooter } from '../Modal'
import {
  ORDERS,
  ORDER_FILTER_FIELDS,
  amountInRange,
  statusVariant,
  type OrderRow,
} from './ordersData'

export interface OrdersTablePreviewProps {
  /** Show row click modal (default true for story, false for showcase). */
  showModal?: boolean
  /** Optional class for the outer table-block wrapper. */
  className?: string
}

export function OrdersTablePreview({ showModal = true, className = '' }: OrdersTablePreviewProps) {
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
    <>
      <div className={`table-block rounded-lg border border-default dark:border-subtle bg-bg-primary overflow-hidden shadow-base min-w-0 ${className}`.trim()}>
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

      {showModal && (
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
      )}
    </>
  )
}
