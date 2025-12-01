import type { Deck } from '@/entities/decks/model'
import type { Sort } from '@/shared/ui'

import { Link, useSearchParams } from 'react-router-dom'

import { DeleteDeck, UpdateDeck } from '@/features/decks/ui'
import { DECK_COLUMNS } from '@/pages/decks/model'
import { formatDate } from '@/shared/lib'
import {
   Loader,
   Button,
   CirclePlayIcon,
   Table,
   TableBody,
   TableCell,
   TableRow,
   TableSortHeader,
   Typography,
} from '@/shared/ui'
import { DefaultCover } from '@/shared/ui/images'

import styles from './decks-table.module.scss'

type DecksTableProps = {
   decks?: Deck[]
   userId?: string
   isLoading?: boolean
}

export const DecksTable = ({ decks, userId, isLoading }: DecksTableProps) => {
   const [searchParams, setSearchParams] = useSearchParams()

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

   if (isLoading) {
      return <Loader />
   }

   return (
      <Table>
         <TableSortHeader columns={DECK_COLUMNS} sort={sort} onSort={handleSort} />
         <TableBody>
            {decks?.map(deck => {
               const coverUrl = deck.cover ?? DefaultCover
               const isOwner = userId === deck.userId

               return (
                  <TableRow key={deck.id}>
                     <TableCell>
                        <Link to={`/decks/${deck.id}`} className={styles.link}>
                           <img className={styles.cover} src={coverUrl} alt={'deckCover'} />
                           <Typography className={styles.name} variant={'body2'} as={'span'}>
                              {deck.name}
                           </Typography>
                        </Link>
                     </TableCell>
                     <TableCell>{deck.cardsCount}</TableCell>
                     <TableCell>{formatDate(new Date(deck.updated))}</TableCell>
                     <TableCell>{deck.author.name}</TableCell>
                     <TableCell className={styles.icons}>
                        <Button variant={'ghost'} size={'icon'}>
                           <CirclePlayIcon width={16} height={16} />
                        </Button>
                        {isOwner && (
                           <>
                              <UpdateDeck id={deck.id} />
                              <DeleteDeck id={deck.id} />
                           </>
                        )}
                     </TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   )
}
