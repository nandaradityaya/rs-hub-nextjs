// MUI Imports
import Grid from '@mui/material/Grid2'

import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailsCard from './OrderDetailsCard'
import ShippingActivity from './ShippingActivityCard'
import type { PurchaseOrderType } from '@/types/apps/purchaseOrderType'

const OrderDetails = ({ orderData, order }: { orderData?: PurchaseOrderType; order: string }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <OrderDetailHeader orderData={orderData} order={order} />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <OrderDetailsCard />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ShippingActivity order={order} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomerDetails orderData={orderData} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ShippingAddress />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <BillingAddress />
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  )
}

export default OrderDetails
