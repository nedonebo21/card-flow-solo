import type { Meta, StoryObj } from '@storybook/react-vite'

import type { Column, Sort } from '@/shared/ui/table/table-sort-header'

import { useState } from 'react'

import { formatDate } from '@/shared/lib'
import { Button, Rating, CirclePlayIcon, PencilIcon, TrashIcon } from '@/shared/ui'
import {
   TableHeadCell,
   Table,
   TableBody,
   TableCell,
   TableRow,
   TableSortHeader,
   TableHeader,
} from '@/shared/ui/table'

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

export const DecksTableWithSort: Story = {
   render: () => {
      const [sort, setSort] = useState<Sort>(null)

      // const sortedString = useMemo(() => {
      //    if (!sort) {
      //       return null
      //    }
      //
      //    return `${sort.key}-${sort.direction}`
      // }, [sort])

      return (
         <Table>
            <TableSortHeader columns={columns} sort={sort} onSort={setSort} />
            <TableBody>
               {data.map(item => (
                  <TableRow key={item.title}>
                     <TableCell>{item.title}</TableCell>
                     <TableCell>{item.cardsCount}</TableCell>
                     <TableCell>{formatDate(new Date(item.updated))}</TableCell>
                     <TableCell>{item.createdBy}</TableCell>
                     <TableCell className={styles.icons}>
                        <Button variant={'ghost'} size={'icon'}>
                           <CirclePlayIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <PencilIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <TrashIcon width={16} height={16} />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      )
   },
}

const cardsData = [
   {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      grade: 4,
   },
   {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      grade: 5,
   },
   {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      grade: 2,
   },
   {
      question: 'How "This" works in JavaScript?',
      answer: 'This is how "This" works in JavaScript',
      updated: '2023-07-07',
      grade: 3,
   },
]

export const CardsTable: Story = {
   render: () => {
      return (
         <Table>
            <TableHeader>
               <TableHeadCell>Question</TableHeadCell>
               <TableHeadCell>Answer</TableHeadCell>
               <TableHeadCell>Updated</TableHeadCell>
               <TableHeadCell>Grade</TableHeadCell>
            </TableHeader>
            <TableBody>
               {cardsData.map(item => (
                  <TableRow key={item.question}>
                     <TableCell>{item.question}</TableCell>
                     <TableCell>{item.answer}</TableCell>
                     <TableCell>{formatDate(new Date(item.updated))}</TableCell>
                     <TableCell>
                        <Rating value={item.grade} />
                     </TableCell>
                     <TableCell className={styles.icons}>
                        <Button variant={'ghost'} size={'icon'}>
                           <CirclePlayIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <PencilIcon width={16} height={16} />
                        </Button>
                        <Button variant={'ghost'} size={'icon'}>
                           <TrashIcon width={16} height={16} />
                        </Button>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      )
   },
}
