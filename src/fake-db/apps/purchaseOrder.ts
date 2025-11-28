// Type Imports
import type { PurchaseOrderType } from '@/types/apps/purchaseOrderType'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

export const db: PurchaseOrderType[] = [
  {
    id: '4987',
    poNo: 'PO-2025-001',
    poDate: `13 ${currentMonth} ${now.getFullYear()}`,
    status: 'Approved'
  },
  {
    id: '4988',
    poNo: 'PO-2025-002',
    poDate: `17 ${currentMonth} ${now.getFullYear()}`,
    status: 'Pending'
  }
]
