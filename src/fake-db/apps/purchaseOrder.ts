// Type Imports
import type { PurchaseOrderType } from '@/types/apps/purchaseOrderType'

const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

export const db: PurchaseOrderType[] = [
  {
    id: '4987',
    poNo: 'PO-2025-001',
    poDate: `13 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `27 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Bekasi Timur',
    status: 'COMPLETED'
  },
  {
    id: '4988',
    poNo: 'PO-2025-002',
    poDate: `17 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `31 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Grand Wisata',
    status: 'PENDING'
  },

  // tambahan sesuai daftar status
  {
    id: '4989',
    poNo: 'PO-2025-003',
    poDate: `05 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `18 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Cibubur',
    status: 'NEW'
  },
  {
    id: '4990',
    poNo: 'PO-2025-004',
    poDate: `06 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `19 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Kalideres',
    status: 'PBF_RECEIVED'
  },
  {
    id: '4991',
    poNo: 'PO-2025-005',
    poDate: `08 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `22 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Kemayoran',
    status: 'PROCESSING'
  },
  {
    id: '4992',
    poNo: 'PO-2025-006',
    poDate: `10 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `23 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Depok',
    status: 'SHIPPING'
  },
  {
    id: '4993',
    poNo: 'PO-2025-007',
    poDate: `12 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `26 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Bekasi Barat',
    status: 'GRN_REVIEW'
  },
  {
    id: '4994',
    poNo: 'PO-2025-008',
    poDate: `14 ${currentMonth} ${now.getFullYear()}`,
    poEndDate: `30 ${currentMonth} ${now.getFullYear()}`,
    shipTo: 'RS Mitra Keluarga - Waru',
    status: 'FULFILLMENT_OVERDUE'
  }
]
