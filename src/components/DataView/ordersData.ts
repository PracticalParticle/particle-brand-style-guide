/**
 * Shared data and helpers for Orders table (Data View TableView story & ComponentShowcase).
 */

export type OrderStatus = 'completed' | 'pending' | 'cancelled'

export interface OrderRow {
  id: string
  customer: string
  email: string
  date: string
  amount: string
  status: OrderStatus
}

export const ORDERS: OrderRow[] = [
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

export const ORDER_FILTER_FIELDS = [
  { id: 'status', label: 'Status', options: [{ value: 'completed', label: 'Completed' }, { value: 'pending', label: 'Pending' }, { value: 'cancelled', label: 'Cancelled' }] },
  { id: 'amountRange', label: 'Amount', options: [{ value: 'under1k', label: 'Under $1k' }, { value: '1k-5k', label: '$1k – $5k' }, { value: 'over5k', label: 'Over $5k' }] },
]

export function amountInRange(amountStr: string, range: string): boolean {
  if (!range) return true
  const num = parseFloat(amountStr.replace(/[$,]/g, ''))
  if (range === 'under1k') return num < 1000
  if (range === '1k-5k') return num >= 1000 && num <= 5000
  if (range === 'over5k') return num > 5000
  return true
}

export function statusVariant(s: OrderStatus): 'success' | 'warning' | 'error' {
  if (s === 'completed') return 'success'
  if (s === 'pending') return 'warning'
  return 'error'
}
