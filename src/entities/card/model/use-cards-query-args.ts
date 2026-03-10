import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useDebounce } from 'use-debounce'

export const useCardsQueryArgs = () => {
   const [searchParams] = useSearchParams()

   const question = searchParams.get('question') || undefined
   const [debouncedQuestion] = useDebounce(question, 500)

   return useMemo(
      () => ({
         question: debouncedQuestion,
         orderBy: searchParams.get('orderBy') || null,
         currentPage: Number(searchParams.get('page')) || 1,
         itemsPerPage: Number(searchParams.get('perPage')) || 10,
      }),
      [debouncedQuestion, searchParams]
   )
}
