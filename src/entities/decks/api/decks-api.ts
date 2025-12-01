import type { Deck, GetDecksArgs, GetDecksResponse, GetCardsCount } from '../model'

import { baseApi } from '@/shared/api'

export const decksApi = baseApi.injectEndpoints({
   endpoints: builder => ({
      getDecks: builder.query<GetDecksResponse, GetDecksArgs | void>({
         query: params => {
            return {
               url: `v2/decks`,
               params: params ?? {},
            }
         },
         providesTags: ['Decks'],
      }),
      getDeckById: builder.query<Deck, { id: string }>({
         query: ({ id }) => {
            return {
               url: `v1/decks/${id}`,
            }
         },
         providesTags: ['Decks'],
      }),
      createDeck: builder.mutation<Omit<Deck, 'author' | 'isFavorite'>, FormData>({
         query: body => {
            return {
               url: `v1/decks`,
               method: 'POST',
               body,
            }
         },
         invalidatesTags: ['Decks'],
      }),
      updateDeck: builder.mutation<
         Omit<Deck, 'author' | 'isFavorite'>,
         { id: string; body: FormData }
      >({
         query: ({ body, id }) => {
            return {
               url: `v1/decks/${id}`,
               method: 'PATCH',
               body,
            }
         },
         invalidatesTags: ['Decks'],
      }),
      deleteDeck: builder.mutation<Omit<Deck, 'author' | 'isFavorite'>, string>({
         query: id => {
            return {
               url: `v1/decks/${id}`,
               method: 'Delete',
            }
         },
         invalidatesTags: ['Decks'],
      }),
      getCardsCount: builder.query<GetCardsCount, void>({
         query: () => {
            return {
               url: `/v2/decks/min-max-cards`,
            }
         },
         providesTags: ['Decks'],
      }),
   }),
})

export const {
   useGetDecksQuery,
   useGetDeckByIdQuery,
   useCreateDeckMutation,
   useDeleteDeckMutation,
   useUpdateDeckMutation,
   useGetCardsCountQuery,
} = decksApi
