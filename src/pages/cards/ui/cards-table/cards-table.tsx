import type { Card } from '@/entities/card'
import type { Sort } from '@/shared/ui'

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { clsx } from 'clsx'

import { formatDate } from '@/shared/lib'
import {
   Typography,
   Button,
   Rating,
   Table,
   TableBody,
   TableCell,
   TableRow,
   TableSortHeader,
} from '@/shared/ui'

import styles from './cards-table.module.scss'

import { CARDS_COLUMNS } from '../../model/cards-columns'

type CardsTableProps = {
   cards: Card[]
}

export const CardsTable = ({ cards }: CardsTableProps) => {
   const [searchParams, setSearchParams] = useSearchParams()

   const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

   const orderByString = searchParams.get('orderBy') || null

   const sort: Sort = (() => {
      if (!orderByString) {
         return null
      }

      const parts = orderByString.split('-')

      if (parts.length === 2) {
         return {
            key: parts[0],
            direction: parts[1] as 'asc' | 'desc',
         }
      }

      return null
   })()

   const handleSort = (newSort: Sort) => {
      if (!newSort) {
         searchParams.delete('orderBy')
      } else {
         searchParams.set('orderBy', `${newSort.key}-${newSort.direction}`)
      }
      setSearchParams(searchParams)
   }

   const toggleRowExpansion = (cardId: string) => {
      setExpandedRows(prev => ({
         ...prev,
         [cardId]: !prev[cardId],
      }))
   }

   const isLongQuestion = (question: string) => question.length > 30

   return (
      <Table>
         <TableSortHeader columns={CARDS_COLUMNS} sort={sort} onSort={handleSort} />
         <TableBody>
            {cards.map(card => {
               const isExpanded = expandedRows[card.id]
               const shouldButtonShow = isLongQuestion(card.question)

               return (
                  <TableRow key={card.id}>
                     <TableCell className={styles.row}>
                        <Typography
                           className={clsx(isExpanded ? styles.expanded : styles.question)}
                           textAlign={'left'}
                           variant={'body2'}
                        >
                           {card.question}
                        </Typography>
                        {shouldButtonShow && (
                           <Button variant={'link'} onClick={() => toggleRowExpansion(card.id)}>
                              {isExpanded ? 'Hide' : 'More'}
                           </Button>
                        )}
                     </TableCell>
                     <TableCell className={clsx(isExpanded ? styles.expanded : styles.answer)}>
                        {card.answer}
                     </TableCell>
                     <TableCell>{formatDate(new Date(card.updated))}</TableCell>
                     <TableCell>
                        <Rating value={card.grade ?? 0} />
                     </TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}
