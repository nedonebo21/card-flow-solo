export {
   useGetDecksQuery,
   useGetDeckByIdQuery,
   useDeleteDeckMutation,
   useUpdateDeckMutation,
   useCreateDeckMutation,
   useGetCardsCountQuery,
} from './api/decks-api'

export type { Deck } from './model/decks.types'
