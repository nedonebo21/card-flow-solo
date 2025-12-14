import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

import { useGetCardsQuery } from '@/entities/card'

import styles from './cards.module.scss'

import { CardsHeader } from './cards-header/cards-header'
import { CardsPagination } from './cards-pagination/cards-pagination'
import { CardsSearch } from './cards-search/cards-search'
import { CardsTable } from './cards-table/cards-table'

export const Cards = () => {
   const { id } = useParams()

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

   const { data, isLoading } = useGetCardsQuery({
      id: id ?? '',
      question: debouncedQuestion,
      orderBy: queryParams.orderBy,
      currentPage: queryParams.page,
      itemsPerPage: queryParams.perPage,
   })
   const cards = data?.items ?? []
   const totalCount = data?.pagination?.totalItems ?? 0

   return (
      <div className={styles.wrapper}>
         <CardsHeader deckId={id} />
         <CardsSearch />
         <CardsTable isLoading={isLoading} cards={cards} />
         <CardsPagination totalCount={totalCount} />
      </div>
   )
}
