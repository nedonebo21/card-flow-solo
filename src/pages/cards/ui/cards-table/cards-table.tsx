import type { Card } from '@/entities/card'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { clsx } from 'clsx'

import { useMeQuery } from '@/entities/user'
import { DeleteCard, UpdateCard } from '@/features/manage-cards'
import { useCardColumns } from '@/shared/constants'
import { formatDate, useTableSort } from '@/shared/lib'
import {
   Typography,
   Button,
   Rating,
   Table,
   TableBody,
   TableCell,
   TableRow,
   TableSortHeader,
   CardsTableSkeletons,
} from '@/shared/ui'

import styles from './cards-table.module.scss'

type CardsTableProps = {
   cards: Card[]
   isLoading: boolean
   isFetching: boolean
   refetch: () => void
}

export const CardsTable = ({ cards, isLoading, isFetching, refetch }: CardsTableProps) => {
   const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
   const { data } = useMeQuery()
   const userId = data?.id ?? ''
   const columns = useCardColumns()
   const { t } = useTranslation()

   const { sort, handleSort } = useTableSort()

   const toggleRowExpansion = (cardId: string) => {
      setExpandedRows(prev => ({
         ...prev,
         [cardId]: !prev[cardId],
      }))
   }

   const isLongQuestion = (question: string) => question.length > 30

   if (isLoading || isFetching) {
      return <CardsTableSkeletons />
   }

   return (
      <Table>
         <TableSortHeader columns={columns} sort={sort} onSort={handleSort} />
         <TableBody>
            {cards.map(card => {
               const isExpanded = expandedRows[card.id]
               const shouldButtonShow = isLongQuestion(card.question)
               const isOwner = userId === card.userId

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
                              {isExpanded ? t('hide') : t('more')}
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
                     {isOwner && (
                        <TableCell className={styles.actions}>
                           <UpdateCard id={card.id} refetch={refetch} />
                           <DeleteCard id={card.id} refetch={refetch} cardName={card.question} />
                        </TableCell>
                     )}
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}
