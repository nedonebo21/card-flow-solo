export {
   useGetDecksQuery,
   useGetDeckByIdQuery,
   useDeleteDeckMutation,
   useUpdateDeckMutation,
   useCreateDeckMutation,
   useGetCardsCountQuery,
   useAddDeckFavoriteMutation,
   useDeleteDeckFromFavoriteMutation,
} from './api/decks-api'

export type { Deck } from './model/decks.types'
