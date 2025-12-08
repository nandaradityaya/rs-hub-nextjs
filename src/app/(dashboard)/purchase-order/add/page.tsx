import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

import FormValidationBasic from '@/views/forms/form-validation/FormValidationBasic'

const AddPurchaseOrder = () => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <Typography variant='h4'>Create Purchase Order</Typography>
        <Typography>Provide the necessary information to generate your purchase order.</Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormValidationBasic />
      </Grid>
    </Grid>
  )
}

export default AddPurchaseOrder
