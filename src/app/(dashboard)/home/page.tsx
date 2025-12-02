import Grid from '@mui/material/Grid2'

import PurchaseOrderListTable from '@/views/apps/PurchaseOrderListTable'
import { getPurchaseOrderData, getStatisticsData } from '../../server/actions'
import StatusStatisticsCard from '@/views/apps/StatusStatisticsCard'

export default async function Page() {
  const dataStatistics = await getStatisticsData()
  const purchaseOrderData = await getPurchaseOrderData()

  return (
    <>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <StatusStatisticsCard data={dataStatistics?.statusPurchaseOrder} />
        </Grid>
        <Grid size={{ xs: 12, lg: 12 }}>
          <PurchaseOrderListTable purchaseOrderData={purchaseOrderData} />
        </Grid>
      </Grid>
    </>
  )
}
