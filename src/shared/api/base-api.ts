import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://api.flashcards.andrii.es',
      credentials: 'include',
      prepareHeaders: headers => {
         const token = localStorage.getItem('accessToken')

         if (token) {
            headers.set('Authorization', `Bearer ${token}`)
         }

         return headers
      },
   }),
   endpoints: () => ({}),
   tagTypes: ['Me', 'Decks'],
})
