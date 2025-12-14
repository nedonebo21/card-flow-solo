import type { Deck } from '@/entities/deck'

import { Link } from 'react-router-dom'

import { DeleteDeck, ToggleDeckFavorite, UpdateDeck } from '@/features/manage-decks'
import { formatDate, routeHelpers, useTableSort } from '@/shared/lib'
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

import { DECK_COLUMNS } from '../../../model/decks-columns'

type DecksTableProps = {
   decks?: Deck[]
   userId?: string
   isLoading?: boolean
}

export const DecksTable = ({ decks, userId, isLoading }: DecksTableProps) => {
   const { sort, handleSort } = useTableSort()

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
                        <Link to={routeHelpers.createDeckPath(deck.id)} className={styles.link}>
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
                        <Button
                           as={Link}
                           to={routeHelpers.createLearnPath(deck.id)}
                           variant={'ghost'}
                           size={'icon'}
                        >
                           <CirclePlayIcon width={16} height={16} />
                        </Button>
                        <ToggleDeckFavorite
                           id={deck.id}
                           deckName={deck.name}
                           isFavorite={deck.isFavorite}
                        />
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
