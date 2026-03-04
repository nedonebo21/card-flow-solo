import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDecksQueryArgs, useGetDecksQuery } from '@/entities/deck'
import { clearFilters } from '@/shared/lib'

import styles from './decks.module.scss'

import { DecksFilters } from './decks-filters/decks-filters'
import { DecksHeader } from './decks-header/decks-header'
import { DecksPagination } from './decks-pagination/decks-pagination'
import { DecksTable } from './decks-table/decks-table'

export const Decks = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const queryArgs = useDecksQueryArgs()

   const { data, isLoading, isFetching, refetch } = useGetDecksQuery(queryArgs)

   const handleClearFilter = useCallback(() => {
      const nextParams = new URLSearchParams(searchParams)

      clearFilters(nextParams)
      setSearchParams(nextParams)
   }, [searchParams, setSearchParams])

   const decks = data?.items

   return (
      <div className={styles.wrapper}>
         <DecksHeader refetch={refetch} />
         <DecksFilters onClear={handleClearFilter} />
         <div className={styles.decks}>
            <DecksTable
               decks={decks}
               refetch={refetch}
               isLoading={isLoading}
               isFetching={isFetching}
               userId={queryArgs.authorId || queryArgs.favoritedBy}
            />
            <DecksPagination totalCount={data?.pagination.totalItems ?? 10} />
         </div>
      </div>
   )
}
