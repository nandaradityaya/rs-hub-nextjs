'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import type { TimelineProps } from '@mui/lab/Timeline'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    },
    '& .MuiTimelineContent-root:last-child': {
      paddingBottom: 0
    },
    '&:nth-last-child(2) .MuiTimelineConnector-root': {
      backgroundColor: 'transparent',
      borderInlineStart: '1px dashed var(--mui-palette-divider)'
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: 'var(--mui-palette-primary-main)'
    }
  }
})

const ShippingActivity = ({ order }: { order: string }) => {
  return (
    <Card>
      <CardHeader title='Shipping Activity' />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  NEW (PO: {order})
                </Typography>
                <Typography variant='caption'>Tuesday 08:29 AM</Typography>
              </div>
              <Typography className='mbe-2'>Your order has been created and is waiting to be processed.</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  PBF RECEIVED
                </Typography>
                <Typography variant='caption'>Tuesday 08:40 AM</Typography>
              </div>
              <Typography className='mbe-2'>Your order has been received and confirmed by the distributor.</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  PROCESSING
                </Typography>
                <Typography variant='caption'>Tuesday 08:57 AM</Typography>
              </div>
              <Typography className='mbe-2'>Your order is being prepared and processed.</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  SHIPPING
                </Typography>
                <Typography variant='caption'>Tuesday 10:00 AM</Typography>
              </div>
              <Typography className='mbe-2'>Your order is on the way to the destination facility.</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='primary' />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  GRN REVIEW
                </Typography>
                <Typography variant='caption'>Today 14:12 PM</Typography>
              </div>
              <Typography className='mbe-2'>Your order has arrived and is currently under quality review.</Typography>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
            </TimelineSeparator>
            <TimelineContent>
              <Typography color='text.primary' className='font-medium'>
                COMPLETED
              </Typography>
              <Typography className='mbe-2'>Your order has been successfully completed and received.</Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ShippingActivity
