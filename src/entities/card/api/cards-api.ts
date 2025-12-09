import type {
   GetCardsResponse,
   GetCardsArgs,
   CreateCardArgs,
   Card,
   UpdateCardArgs,
} from '../model/cards.types'

import { baseApi } from '@/shared/api'

export const cardsApi = baseApi.injectEndpoints({
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
      createCard: builder.mutation<Card, { body: CreateCardArgs; id: string }>({
         query: ({ body, id }) => {
            return {
               url: `/v1/decks/${id}/cards`,
               method: 'POST',
               body,
            }
         },
         invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation<unknown, string>({
         query: id => {
            return {
               url: `/v1/cards/${id}`,
               method: 'DELETE',
            }
         },
         invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation<unknown, { id: string; body: UpdateCardArgs }>({
         query: ({ body, id }) => {
            return {
               url: `/v1/cards/${id}`,
               method: 'PATCH',
               body,
            }
         },
         invalidatesTags: ['Cards'],
      }),
      getCardById: builder.query<Card, { id: string }>({
         query: ({ id }) => {
            return {
               url: `/v1/cards/${id}`,
            }
         },
         providesTags: ['Cards'],
      }),
   }),
})

export const {
   useGetCardsQuery,
   useCreateCardMutation,
   useDeleteCardMutation,
   useUpdateCardMutation,
   useGetCardByIdQuery,
} = cardsApi
