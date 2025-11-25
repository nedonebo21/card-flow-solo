import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useGetDecksQuery } from '@/entities/decks/api'
import { useMeQuery } from '@/entities/user/api'

import styles from './decks.module.scss'

import { DecksFilters } from './decks-filters'
import { DecksHeader } from './decks-header'
import { DecksPagination } from './decks-pagination'
import { DecksTable } from './decks-table'

export const Decks = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const queryParams = useMemo(
      () => ({
         name: searchParams.get('name') || undefined,
         show: searchParams.get('show') || 'all',
         min: Number(searchParams.get('min')) || 0,
         max: Number(searchParams.get('max')) || 100,
         orderBy: searchParams.get('orderBy') || null,
      }),
      [searchParams]
   )

   const { data: userData } = useMeQuery()
   const currentUserId = userData?.id
   const authorId = queryParams.show === 'my' ? currentUserId : ''

   const { data } = useGetDecksQuery({
      name: queryParams.name,
      maxCardsCount: queryParams.max,
      minCardsCount: queryParams.min,
      authorId,
      orderBy: queryParams.orderBy,
   })

   const handleClearFilter = useCallback(() => {
      searchParams.set('name', '')
      searchParams.set('min', '0')
      searchParams.set('max', '100')
      setSearchParams(searchParams)
   }, [searchParams, setSearchParams])

   const decks = data?.items

   return (
      <div className={styles.wrapper}>
         <DecksHeader />
         <DecksFilters onClear={handleClearFilter} />
         <div className={styles.decks}>
            <DecksTable decks={decks} userId={currentUserId} />
            <DecksPagination totalCount={data?.pagination.totalItems ?? 10} />
         </div>
      </div>
   )
}
