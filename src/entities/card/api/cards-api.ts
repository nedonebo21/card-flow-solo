import type {
   GetCardsResponse,
   GetCardsArgs,
   CreateCardArgs,
   Card,
   UpdateCardArgs,
   SaveCardGradeArgs,
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
            const formData = new FormData()

            if (body.questionImg) {
               formData.append('questionImg', body.questionImg)
            }

            if (body.answerImg) {
               formData.append('answerImg', body.answerImg)
            }

            formData.append('question', body.question)
            formData.append('answer', body.answer)

            return {
               url: `/v1/decks/${id}/cards`,
               method: 'POST',
               body: formData,
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
         async onQueryStarted(cardId, { dispatch, queryFulfilled, getState }) {
            const state = getState()
            const queryCacheKey = cardsApi.util
               .selectInvalidatedBy(state, ['Cards'])
               .find(entry => entry.endpointName === 'getCards')

            const patchResult = dispatch(
               cardsApi.util.updateQueryData('getCards', queryCacheKey?.originalArgs, draft => {
                  const index = draft.items?.findIndex(card => card.id === cardId)

                  if (index !== undefined && index !== -1 && draft.items) {
                     draft.items.splice(index, 1)
                  }
               })
            )

            try {
               await queryFulfilled
            } catch {
               patchResult.undo()
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
      getRandomCard: builder.query<Card, { id: string }>({
         query: ({ id }) => {
            return {
               url: `/v1/decks/${id}/learn`,
            }
         },
         providesTags: ['Cards'],
      }),
      saveCardGrade: builder.mutation<Card, { id: string; body: SaveCardGradeArgs }>({
         query: ({ body, id }) => {
            return {
               url: `/v1/decks/${id}/learn`,
               method: 'POST',
               body,
            }
         },
         invalidatesTags: ['Cards'],
      }),
   }),
})

export const {
   useGetCardsQuery,
   useCreateCardMutation,
   useDeleteCardMutation,
   useUpdateCardMutation,
   useGetCardByIdQuery,
   useGetRandomCardQuery,
   useSaveCardGradeMutation,
} = cardsApi
