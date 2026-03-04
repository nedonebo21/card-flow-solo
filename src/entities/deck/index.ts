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

export { useDecksQueryArgs } from './model/use-decks-query-args'

export type { Deck } from './model/decks.types'
