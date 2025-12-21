import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

import { useGetCardsQuery } from '@/entities/card'
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

   const { data: userData } = useMeQuery()

   const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' }, { skip: !id })

   const searchParams = useSearchParams()[0]

   const queryParams = useMemo(
      () => ({
         question: searchParams.get('question') || undefined,
         orderBy: searchParams.get('orderBy') || null,
         page: Number(searchParams.get('page')) || 1,
         perPage: Number(searchParams.get('perPage')) || 10,
      }),
      [searchParams]
   )

   const [debouncedQuestion] = useDebounce(queryParams.question, 500)

   const { data, isLoading, isFetching, refetch } = useGetCardsQuery({
      id: id ?? '',
      question: debouncedQuestion,
      orderBy: queryParams.orderBy,
      currentPage: queryParams.page,
      itemsPerPage: queryParams.perPage,
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
                  Deck is empty. {isOwner && "Press on 'Add New Card'"}
               </Typography>
               {isOwner && <CreateCard deckId={id ?? ''} refetch={refetch} />}
            </div>
         )}
      </div>
   )
}
