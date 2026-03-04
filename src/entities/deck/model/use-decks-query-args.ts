import type { GetDecksArgs } from '@/entities/deck/model/decks.types'

import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

import { useMeQuery } from '@/entities/user'

export const useDecksQueryArgs = (): GetDecksArgs => {
   const [searchParams] = useSearchParams()
   const { data: userData } = useMeQuery()
   const currentUserId = userData?.id

   const name = searchParams.get('name') || ''
   const [debouncedName] = useDebounce(name, 500)

   return useMemo(() => {
      const show = searchParams.get('show')
      const min = searchParams.get('min')
      const max = searchParams.get('max')
      const orderBy = searchParams.get('orderBy')

      return {
         name: debouncedName,
         authorId: show === 'my' ? currentUserId : undefined,
         favoritedBy: show === 'favorite' ? currentUserId : undefined,
         minCardsCount: min ? Number(min) : undefined,
         maxCardsCount: max ? Number(max) : undefined,
         orderBy: orderBy && orderBy !== 'null' ? orderBy : null,
         currentPage: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
         itemsPerPage: searchParams.get('perPage') ? Number(searchParams.get('perPage')) : 10,
      }
   }, [debouncedName, currentUserId, searchParams])
}
