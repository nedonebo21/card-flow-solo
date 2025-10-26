import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Column, Sort } from '@/shared/ui/table'

import { useMemo, useState } from 'react'

import { formatDate } from '@/shared/lib/date'
import { Button } from '@/shared/ui/button'
import { CirclePlayIcon, PencilIcon, TrashIcon } from '@/shared/ui/icons'
import { TableSortHeader } from '@/shared/ui/table'
import { Typography } from '@/shared/ui/typography'

import styles from './table.module.scss'

const meta = {
   title: 'UI/Table',
   parameters: { layout: 'padded' },
   tags: ['autodocs'],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

const columns: Column[] = [
   {
      key: 'name',
      title: 'Name',
      sortable: true,
   },
   {
      key: 'cardsCount',
      title: 'Cards',
      sortable: true,
   },
   {
      key: 'updated',
      title: 'Last Updated',
      sortable: true,
   },
   {
      key: 'createdBy',
      title: 'Created by',
      sortable: true,
   },
]
const data = [
   {
      title: 'Project A',
      cardsCount: 10,
      updated: '2023-07-07',
      createdBy: 'John Doe',
   },
   {
      title: 'Project B',
      cardsCount: 5,
      updated: '2023-07-06',
      createdBy: 'Jane Smith',
   },
   {
      title: 'Project C',
      cardsCount: 8,
      updated: '2023-07-05',
      createdBy: 'Alice Johnson',
   },
   {
      title: 'Project D',
      cardsCount: 3,
      updated: '2023-07-07',
      createdBy: 'Bob Anderson',
   },
   {
      title: 'Project E',
      cardsCount: 12,
      updated: '2023-07-04',
      createdBy: 'Emma Davis',
   },
]

export const WithSort: Story = {
   render: () => {
      const [sort, setSort] = useState<Sort>(null)

      const sortedString = useMemo(() => {
         if (!sort) {
            return null
         }

         return `${sort.key}-${sort.direction}`
      }, [sort])

      console.log(sortedString)

      return (
         <table className={styles.table}>
            <TableSortHeader columns={columns} sort={sort} onSort={setSort} />
            <tbody className={styles.tbody}>
               {data.map(item => (
                  <Typography
                     key={item.title}
                     variant={'body2'}
                     as={'tr'}
                     textAlign={'left'}
                     className={styles.tr}
                  >
                     <td className={styles.td}>{item.title}</td>
                     <td className={styles.td}>{item.cardsCount}</td>
                     <td className={styles.td}>{formatDate(new Date(item.updated))}</td>
                     <td className={styles.td}>{item.createdBy}</td>
                     <td className={styles.icons}>
                        <Button variant={'ghost'} size={'icon'}>
                           <CirclePlayIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <PencilIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <TrashIcon width={16} height={16} />
                        </Button>
                     </td>
                  </Typography>
               ))}
            </tbody>
         </table>
      )
   },
}
