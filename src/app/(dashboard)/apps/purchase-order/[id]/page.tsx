// Component Imports
import DetailPurchaseOrder from '@/views/apps/purchase-order/DetailPurchaseOrder'

const PurchaseOrderDetailPage = ({ params }: { params: { id: string } }) => {
  return <DetailPurchaseOrder id={params.id} />
}

export default PurchaseOrderDetailPage
