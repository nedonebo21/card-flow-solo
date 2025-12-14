import type { Sort } from '@/shared/ui'

import { useSearchParams } from 'react-router-dom'

export const useTableSort = () => {
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

   return { sort, handleSort }
}
