import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

import { useGetDecksQuery } from '@/entities/deck'
import { useMeQuery } from '@/entities/user'

import styles from './decks.module.scss'

import { DecksFilters } from './decks-filters/decks-filters'
import { DecksHeader } from './decks-header/decks-header'
import { DecksPagination } from './decks-pagination/decks-pagination'
import { DecksTable } from './decks-table/decks-table'

export const Decks = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const queryParams = useMemo(
      () => ({
         name: searchParams.get('name') || undefined,
         show: searchParams.get('show') || 'all',
         min: Number(searchParams.get('min')) || 0,
         max: Number(searchParams.get('max')) || 100,
         orderBy: searchParams.get('orderBy') || null,
         page: Number(searchParams.get('page')) || 1,
         perPage: Number(searchParams.get('perPage')) || 10,
      }),
      [searchParams]
   )

   const [debouncedName] = useDebounce(queryParams.name, 500)

   const { data: userData } = useMeQuery()
   const currentUserId = userData?.id
   const authorId = queryParams.show === 'my' ? currentUserId : ''
   const favoritedBy = queryParams.show === 'favorite' ? currentUserId : ''

   const { data, isLoading } = useGetDecksQuery({
      name: debouncedName,
      maxCardsCount: queryParams.max,
      minCardsCount: queryParams.min,
      currentPage: queryParams.page,
      itemsPerPage: queryParams.perPage,
      favoritedBy,
      authorId,
      orderBy: queryParams.orderBy,
   })

   const handleClearFilter = useCallback(() => {
      searchParams.delete('name')
      searchParams.delete('min')
      searchParams.delete('max')
      setSearchParams(searchParams)
   }, [searchParams, setSearchParams])

   const decks = data?.items

   return (
      <div className={styles.wrapper}>
         <DecksHeader />
         <DecksFilters onClear={handleClearFilter} />
         <div className={styles.decks}>
            <DecksTable decks={decks} isLoading={isLoading} userId={currentUserId} />
            <DecksPagination totalCount={data?.pagination.totalItems ?? 10} />
         </div>
      </div>
   )
}
