'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'

// import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import TablePagination from '@mui/material/TablePagination'
import type { TextFieldProps } from '@mui/material/TextField'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import TablePaginationComponent from '@components/TablePaginationComponent'

import type { ThemeColor } from '@core/types'
import type { PurchaseOrderType } from '@/types/apps/purchaseOrderType'

import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type PurchaseOrderTypeWithAction = PurchaseOrderType & {
  action?: string
}

// type InvoiceStatusObj = {
//   [key: string]: {
//     icon: string
//     color: ThemeColor
//   }
// }

type chipColorType = {
  color: ThemeColor
}

export const chipColor: { [key: string]: chipColorType } = {
  NEW: { color: 'primary' },
  PBF_RECEIVED: { color: 'success' },
  PROCESSING: { color: 'info' },
  SHIPPING: { color: 'info' },
  GRN_REVIEW: { color: 'warning' },
  COMPLETED: { color: 'success' },
  FULFILLMENT_OVERDUE: { color: 'warning' },
  PENDING: { color: 'error' }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

// Vars
// const poStatusObj: InvoiceStatusObj = {
//   Approved: { color: 'success', icon: 'tabler-check' },
//   Pending: { color: 'warning', icon: 'tabler-clock' },
//   Rejected: { color: 'error', icon: 'tabler-x' },
//   Draft: { color: 'secondary', icon: 'tabler-file' },
//   Cancelled: { color: 'error', icon: 'tabler-ban' }
// }

// Column Definitions
const columnHelper = createColumnHelper<PurchaseOrderTypeWithAction>()

const PurchaseOrderListTable = ({ purchaseOrderData }: { purchaseOrderData: PurchaseOrderType[] }) => {
  // States
  const [status, setStatus] = useState<PurchaseOrderType['status']>('')
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[purchaseOrderData])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<PurchaseOrderTypeWithAction, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('poNo', {
        header: 'PO Number',
        cell: ({ row }) => (
          <Typography component={Link} href={`/apps/invoice/preview/${row.original.id}`} color='primary.main'>
            {row.original.poNo}
          </Typography>
        )
      }),
      columnHelper.accessor('shipTo', {
        header: 'Ship To',
        cell: ({ row }) => <Typography>{row.original.shipTo}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => (
          <Chip variant='tonal' label={row.original.status} size='small' color={chipColor[row.original.status].color} />
        )
      }),
      columnHelper.accessor('poDate', {
        header: 'PO Date',
        cell: ({ row }) => <Typography>{row.original.poDate}</Typography>
      }),
      columnHelper.accessor('poEndDate', {
        header: 'PO End Date',
        cell: ({ row }) => <Typography>{row.original.poEndDate}</Typography>
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton>
              <Link href={`/apps/invoice/preview/${row.original.id}`} className='flex'>
                <i className='tabler-eye text-textSecondary' />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={`/apps/invoice/preview/${row.original.id}`} className='flex'>
                <i className='tabler-download text-textSecondary' />
              </Link>
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as PurchaseOrderType[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 6
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    const filteredData = purchaseOrderData?.filter(po => {
      if (status && po.status.toLowerCase() !== status.toLowerCase()) return false

      return true
    })

    setData(filteredData)
  }, [status, purchaseOrderData, setData])

  return (
    <Card>
      <CardContent className='flex justify-between flex-wrap items-start gap-4'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-2'>
            <Typography className='hidden sm:block'>Show</Typography>
            <CustomTextField
              select
              value={table.getState().pagination.pageSize}
              onChange={e => table.setPageSize(Number(e.target.value))}
              className='is-[70px]'
            >
              <MenuItem value='6'>6</MenuItem>
              <MenuItem value='24'>24</MenuItem>
              <MenuItem value='50'>50</MenuItem>
            </CustomTextField>
          </div>
          <Button
            variant='contained'
            component={Link}
            startIcon={<i className='tabler-plus' />}
            href='/apps/invoice/add'
            className='max-sm:is-full'
          >
            Purchase Order
          </Button>
        </div>
        <div className='flex flex-col sm:flex-row max-sm:is-full items-start sm:items-center gap-4'>
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search Purchase Order'
            className='max-sm:is-full sm:is-[250px]'
          />
          <CustomTextField
            select
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            className='max-sm:is-full sm:is-[160px]'
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>PO Status</MenuItem>
            <MenuItem value='completed'>Completed</MenuItem>
            <MenuItem value='pending'>Pending</MenuItem>
            <MenuItem value='rejected'>Rejected</MenuItem>
            <MenuItem value='draft'>Draft</MenuItem>
            <MenuItem value='cancelled'>Cancelled</MenuItem>
          </CustomTextField>
        </div>
      </CardContent>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          className={classnames({
                            'flex items-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <i className='tabler-chevron-up text-xl' />,
                            desc: <i className='tabler-chevron-down text-xl' />
                          }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                        </div>
                      </>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default PurchaseOrderListTable
