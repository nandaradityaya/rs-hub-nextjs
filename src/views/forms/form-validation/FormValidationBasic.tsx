'use client'

import { useState, useRef } from 'react'
import type { ChangeEvent, SyntheticEvent } from 'react'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid2'
import FormControlLabel from '@mui/material/FormControlLabel'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import classnames from 'classnames'

// Third-party Imports
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'

import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'

import { Divider } from '@mui/material'

import CustomTextField from '@core/components/mui/TextField'

type FormValues = {
  select: string
  attachment: string
  checkbox: boolean
}

const FormValidationBasic = () => {
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [count, setCount] = useState(1)
  const [attachmentTypes, setAttachmentTypes] = useState<{ [key: number]: string }>({ 0: 'E-SP' })
  const [attachmentFiles, setAttachmentFiles] = useState<{ [key: number]: string }>({})

  const deleteForm = (e: SyntheticEvent) => {
    e.preventDefault()

    // @ts-ignore
    e.target.closest('.repeater-item').remove()
  }

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      select: '',
      attachment: '',
      checkbox: false
    }
  })

  const onSubmit = () => toast.success('Form Submitted')

  // Handle File Upload
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setFileName(files[0].name)
    }
  }

  // Handle Attachment File Upload
  const handleAttachmentFileUpload = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files && files.length !== 0) {
      setAttachmentFiles({ ...attachmentFiles, [index]: files[0].name })
    }
  }

  // Clear Attachment File
  const clearAttachmentFile = (index: number) => {
    const newFiles = { ...attachmentFiles }

    delete newFiles[index]
    setAttachmentFiles(newFiles)
  }

  return (
    <Card>
      <CardHeader title='Purchase Order Form' />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, sm: 12 }}>
              <Controller
                name='select'
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomTextField select fullWidth label='Distributor' {...field} error={Boolean(errors.select)}>
                    <MenuItem value=''>Select Distributor</MenuItem>
                    <MenuItem value='Distributor A'>Distributor A</MenuItem>
                    <MenuItem value='Distributor B'>Distributor B</MenuItem>
                    <MenuItem value='Distributor C'>Distributor C</MenuItem>
                    <MenuItem value='Distributor D'>Distributor D</MenuItem>
                  </CustomTextField>
                )}
              />
              {errors.select && <FormHelperText error>This field is required.</FormHelperText>}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <div className='flex items-end gap-4'>
                <CustomTextField
                  label='File Purchase Order'
                  placeholder='No file chosen'
                  value={fileName}
                  className='flex-auto'
                  slotProps={{
                    input: {
                      readOnly: true,
                      endAdornment: fileName ? (
                        <InputAdornment position='end'>
                          <IconButton size='small' edge='end' onClick={() => setFileName('')}>
                            <i className='tabler-x' />
                          </IconButton>
                        </InputAdornment>
                      ) : null
                    }
                  }}
                />
                <Button component='label' variant='tonal' htmlFor='contained-button-file' className='min-is-fit'>
                  Choose
                  <input hidden id='contained-button-file' type='file' onChange={handleFileUpload} ref={fileInputRef} />
                </Button>
              </div>
              <Box
                display='flex'
                alignItems='center'
                sx={{
                  cursor: 'pointer',
                  mt: 1,
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                <IconButton size='small' color='primary' sx={{ padding: 0.5, pointerEvents: 'none' }}>
                  <i className='tabler-download' />
                </IconButton>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'underline'
                  }}
                >
                  Download Template PO
                </Typography>
              </Box>
            </Grid>

            <Divider className='my-2 w-full' />
            <Grid size={{ xs: 12 }}>
              {Array.from(Array(count).keys()).map((item, index) => (
                <Card
                  key={index}
                  className={classnames('repeater-item mbe-4', {
                    'mbs-4': index !== 0
                  })}
                  variant='outlined'
                >
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid size={{ xs: 12 }}>
                        <div className='flex items-center justify-between'>
                          <Typography variant='h6' color='text.primary'>
                            Attachment {index + 1} (Optional)
                          </Typography>
                          {count > 1 && (
                            <IconButton size='small' onClick={deleteForm} color='error'>
                              <i className='tabler-x' />
                            </IconButton>
                          )}
                        </div>
                      </Grid>

                      <Grid size={{ xs: 12, md: 12 }}>
                        <CustomTextField
                          select
                          fullWidth
                          label='Document Type'
                          value={attachmentTypes[index] || 'E-SP'}
                          onChange={e => setAttachmentTypes({ ...attachmentTypes, [index]: e.target.value })}
                        >
                          <MenuItem value='E-SP'>E-Surat Pesanan</MenuItem>
                          <MenuItem value='PDF'>PDF</MenuItem>
                          <MenuItem value='Excel'>Excel</MenuItem>
                          <MenuItem value='Others'>Others</MenuItem>
                        </CustomTextField>
                      </Grid>

                      {attachmentTypes[index] === 'Others' && (
                        <Grid size={{ xs: 12, md: 12 }}>
                          <CustomTextField fullWidth label='Specify Document Type' placeholder='Enter document type' />
                        </Grid>
                      )}

                      <Grid size={{ xs: 12 }}>
                        <div className='flex items-end gap-4'>
                          <CustomTextField
                            label='Attach File'
                            placeholder='No file chosen'
                            value={attachmentFiles[index] || ''}
                            className='flex-auto'
                            slotProps={{
                              input: {
                                readOnly: true,
                                endAdornment: attachmentFiles[index] ? (
                                  <InputAdornment position='end'>
                                    <IconButton size='small' edge='end' onClick={() => clearAttachmentFile(index)}>
                                      <i className='tabler-x' />
                                    </IconButton>
                                  </InputAdornment>
                                ) : null
                              }
                            }}
                          />
                          <Button component='label' variant='tonal' className='min-is-fit'>
                            Choose
                            <input hidden type='file' onChange={handleAttachmentFileUpload(index)} />
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Button
                size='medium'
                variant='tonal'
                onClick={() => setCount(count + 1)}
                startIcon={<i className='tabler-plus' />}
              >
                Add Another Attachment
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <FormControl error={Boolean(errors.checkbox)}>
                <Controller
                  name='checkbox'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormControlLabel control={<Checkbox {...field} />} label='Agree to our terms and conditions' />
                  )}
                />
                {errors.checkbox && <FormHelperText error>This field is required.</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }} className='flex gap-4'>
              <Button variant='contained' type='submit'>
                Submit
              </Button>
              <Button variant='tonal' color='secondary' type='reset' onClick={() => reset()}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormValidationBasic
