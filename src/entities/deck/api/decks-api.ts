import type {
   Deck,
   GetDecksArgs,
   GetDecksResponse,
   GetCardsCount,
   CreateDeckArgs,
} from '../model/decks.types'

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
      createDeck: builder.mutation<Omit<Deck, 'author' | 'isFavorite'>, CreateDeckArgs>({
         query: body => {
            const formData = new FormData()

            if (body.cover) {
               formData.append('cover', body.cover)
            }

            formData.append('name', body.name)
            formData.append('isPrivate', String(body.isPrivate))

            return {
               url: `v1/decks`,
               method: 'POST',
               body: formData,
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
               method: 'DELETE',
            }
         },
         async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
            const state = getState()
            const queryCacheKey = decksApi.util
               .selectInvalidatedBy(state, ['Decks'])
               .find(entry => entry.endpointName === 'getDecks')

            const patchResult = dispatch(
               decksApi.util.updateQueryData('getDecks', queryCacheKey?.originalArgs, draft => {
                  const index = draft.items?.findIndex(deck => deck.id === id)

                  if (index !== undefined && index !== -1 && draft.items) {
                     draft.items.splice(index, 1)
                     draft.pagination.totalItems -= 1
                  }
               })
            )

            try {
               await queryFulfilled
            } catch {
               patchResult.undo()
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
      addDeckFavorite: builder.mutation<unknown, string>({
         query: id => {
            return {
               url: `/v1/decks/${id}/favorite`,
               method: 'POST',
            }
         },
         invalidatesTags: ['Decks'],
      }),
      deleteDeckFromFavorite: builder.mutation<unknown, string>({
         query: id => {
            return {
               url: `/v1/decks/${id}/favorite`,
               method: 'DELETE',
            }
         },
         invalidatesTags: ['Decks'],
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
   useAddDeckFavoriteMutation,
   useDeleteDeckFromFavoriteMutation,
} = decksApi
