export type GetCardsResponse = {
   pagination?: CardsPagination
   items?: Card[]
}

export type GetCardsArgs = {
   id: string
   orderBy?: string | null
   question?: string
   answer?: string
   currentPage?: number
   itemsPerPage?: number
}

export type CardsPagination = {
   currentPage?: number
   itemsPerPage?: number
   totalPages?: number
   totalItems?: number
}

export type Card = {
   grade: number
   id: string
   deckId: string
   userId: string
   question: string
   answer: string
   shots: number
   answerImg: string
   questionImg: string
   questionVideo: string
   answerVideo: string
   created: string
   updated: string
}
