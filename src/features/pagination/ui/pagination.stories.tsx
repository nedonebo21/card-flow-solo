import type { Meta, StoryObj } from '@storybook/react-vite'

import { useMemo, useState } from 'react'

import { Pagination } from '@/features/pagination/ui/pagination'
import { Typography } from '@/shared/ui/typography'

const meta = {
   title: 'Navigation/Pagination',
   component: Pagination,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      totalCount: { control: { type: 'number' }, defaultValue: 100 },
      pageSize: { control: { type: 'number' }, defaultValue: 10 },
      siblingCount: { control: { type: 'number' }, defaultValue: 1 },
   },
} satisfies Meta<typeof Pagination>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      totalCount: 550,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1,
      onPageChange: () => {},
      onPageSizeChange: () => {},
   },
   render: args => {
      const [currentPage, setCurrentPage] = useState(1)
      const [pageSize, setPageSize] = useState(10)

      return (
         <Pagination
            {...args}
            totalCount={args.totalCount ?? 550}
            pageSize={pageSize}
            siblingCount={1}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
         />
      )
   },
}

export const Demo: Story = {
   args: {
      totalCount: 100,
      pageSize: 10,
      siblingCount: 1,
      currentPage: 1,
      onPageChange: () => {},
      onPageSizeChange: () => {},
   },
   render: _args => {
      const [currentPage, setCurrentPage] = useState(1)
      const [pageSize, setPageSize] = useState(10)

      const data = useMemo(() => Array.from({ length: 550 }, (_, i) => `item-${i + 1}`), [])

      const startIndex = (currentPage - 1) * pageSize
      const endIndex = startIndex + pageSize
      const currentItems = data.slice(startIndex, endIndex)

      return (
         <>
            <Typography variant={'h2'} style={{ marginBottom: '12px' }}>
               Pagination Demo
            </Typography>
            <ul
               style={{ marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
               {currentItems.map((item, index) => {
                  return (
                     <li
                        key={`item-${index}`}
                        style={{ border: '1px solid #ccc', padding: '4px', borderRadius: '2px' }}
                     >
                        {item}
                     </li>
                  )
               })}
            </ul>
            <Pagination
               totalCount={data.length}
               pageSize={pageSize}
               siblingCount={1}
               currentPage={currentPage}
               onPageChange={setCurrentPage}
               onPageSizeChange={setPageSize}
            />
         </>
      )
   },
}
