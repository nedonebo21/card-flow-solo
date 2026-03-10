import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import { useCardsQueryArgs, useGetCardsQuery } from '@/entities/card'
import { useGetDeckByIdQuery } from '@/entities/deck'
import { useMeQuery } from '@/entities/user'
import { CreateCard } from '@/features/manage-cards'
import { Typography } from '@/shared/ui'

import styles from './cards.module.scss'

import { CardsHeader } from './cards-header/cards-header'
import { CardsPagination } from './cards-pagination/cards-pagination'
import { CardsSearch } from './cards-search/cards-search'
import { CardsTable } from './cards-table/cards-table'

export const Cards = () => {
   const { id } = useParams()
   const { t } = useTranslation()

   const { data: userData } = useMeQuery()

   const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' }, { skip: !id })

   const queryArgs = useCardsQueryArgs()

   const { data, isLoading, isFetching, refetch } = useGetCardsQuery({
      id: id ?? '',
      ...queryArgs,
   })

   const cards = data?.items ?? []
   const totalCount = data?.pagination?.totalItems ?? 0

   const hasCards = totalCount > 0
   const isOwner = deck?.userId === userData?.id

   return (
      <div className={styles.wrapper}>
         <CardsHeader hasCards={hasCards} deckId={id} refetch={refetch} />
         {hasCards ? (
            <>
               <CardsSearch />
               <CardsTable
                  isLoading={isLoading}
                  refetch={refetch}
                  isFetching={isFetching}
                  cards={cards}
               />
               <CardsPagination totalCount={totalCount} />
            </>
         ) : (
            <div className={styles.empty}>
               <Typography className={styles.emptyText}>
                  {t('pages.cards.own-deck-empty')}
               </Typography>
               {isOwner && <CreateCard deckId={id ?? ''} refetch={refetch} />}
            </div>
         )}
      </div>
   )
}
