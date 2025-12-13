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

export type UpdateCardArgs = {
   questionImg?: string
   answerImg?: string
   question?: string
   answer?: string
}

export type CreateCardArgs = {
   answer: string
   question: string
   answerImg?: string
   answerVideo?: string
   questionImg?: string
   questionVideo?: string
}

export type SaveCardGradeArgs = {
   cardId: string
   grade: number
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
