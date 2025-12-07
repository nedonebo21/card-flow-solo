import type { GetCardsResponse, GetCardsArgs, AddCardArgs, Card } from '../model'

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
      addCard: builder.mutation<Card, { body: AddCardArgs; id: string }>({
         query: ({ body, id }) => {
            return {
               url: `/v1/decks/${id}/cards`,
               method: 'POST',
               body,
            }
         },
         invalidatesTags: ['Cards'],
      }),
   }),
})

export const { useGetCardsQuery, useAddCardMutation } = decksApi
