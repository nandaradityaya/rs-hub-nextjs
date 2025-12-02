import Grid from '@mui/material/Grid2'

import InvoiceListTable from '@/views/apps/PurchaseOrderListTable'
import { getPurchaseOrderData } from '../../server/actions'

export default async function Page() {
  const purchaseOrderData = await getPurchaseOrderData()

  return (
    <>
      <Grid size={{ xs: 12, lg: 12 }}>
        <InvoiceListTable purchaseOrderData={purchaseOrderData} />
      </Grid>
    </>
  )
}
