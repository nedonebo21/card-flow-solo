import { useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

import { useGetCardsQuery } from '@/entities/cards/api'

import styles from './cards.module.scss'

import { CardsHeader } from './cards-header'
import { CardsPagination } from './cards-pagination'
import { CardsSearch } from './cards-search'
import { CardsTable } from './cards-table'

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

   const { data } = useGetCardsQuery({
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
         <CardsHeader />
         <CardsSearch />
         <CardsTable cards={cards} />
         <CardsPagination totalCount={totalCount} />
      </div>
   )
}
