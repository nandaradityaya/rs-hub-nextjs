// MUI Imports
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import type { ButtonProps } from '@mui/material/Button'

// Type Imports

// Component Imports
import ConfirmationDialog from '@components/dialogs/confirmation-dialog'
import OpenDialogOnElementClick from '@components/dialogs/OpenDialogOnElementClick'

import type { ThemeColor } from '@core/types'
import type { PurchaseOrderType } from '@/types/apps/purchaseOrderType'

type PayementStatusType = {
  text: string
  color: ThemeColor
}

type chipColorType = {
  color: ThemeColor
}

export const paymentStatus: { [key: number]: PayementStatusType } = {
  1: { text: 'Paid', color: 'success' },
  2: { text: 'Pending', color: 'warning' },
  3: { text: 'Cancelled', color: 'secondary' },
  4: { text: 'Failed', color: 'error' }
}

export const statusChipColor: { [key: string]: chipColorType } = {
  NEW: { color: 'primary' },
  PBF_RECEIVED: { color: 'success' },
  PROCESSING: { color: 'info' },
  SHIPPING: { color: 'info' },
  GRN_REVIEW: { color: 'warning' },
  COMPLETED: { color: 'success' },
  FULFILLMENT_OVERDUE: { color: 'warning' },
  PENDING: { color: 'error' }
}

const OrderDetailHeader = ({ orderData, order }: { orderData?: PurchaseOrderType; order: string }) => {
  // Vars
  // const buttonProps = (children: string, color: ThemeColor, variant: ButtonProps['variant']): ButtonProps => ({
  //   children,
  //   color,
  //   variant
  // })

  return (
    <div className='flex flex-wrap justify-between sm:items-center max-sm:flex-col gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <div className='flex items-center gap-2'>
          <Typography variant='h5'>{`Order #${order}`}</Typography>
          <Chip
            variant='tonal'
            label={orderData?.status}
            color={statusChipColor[orderData?.status || ''].color}
            size='small'
          />
          {/* <Chip
            variant='tonal'
            label={paymentStatus[orderData?.payment ?? 0].text}
            color={paymentStatus[orderData?.payment ?? 0].color}
            size='small'
          /> */}
        </div>
        <Typography>{`${new Date(orderData?.poDate ?? '').toDateString()}`}</Typography>
      </div>
      {/* <OpenDialogOnElementClick
        element={Button}
        elementProps={buttonProps('Delete Order', 'error', 'tonal')}
        dialog={ConfirmationDialog}
        dialogProps={{ type: 'delete-order' }}
      /> */}
    </div>
  )
}

export default OrderDetailHeader
