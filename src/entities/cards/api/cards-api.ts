import type { GetCardsResponse, GetCardsArgs } from '../model'

import { baseApi } from '@/shared/api'

export const decksApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      getCards: builder.query<GetCardsResponse, GetCardsArgs>({
         query: ({ id, ...params }) => {
            return {
               url: `/v1/decks/${id}/cards`,
               params: params ?? {},
            }
         },
         providesTags: ['Cards'],
      }),
   }),
})

export const { useGetCardsQuery } = decksApi
