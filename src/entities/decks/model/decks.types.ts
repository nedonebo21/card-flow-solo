export type GetDecksResponse = {
   items: Deck[]
   pagination: Pagination
}

export type GetDecksArgs = {
   orderBy: string | null
   minCardsCount?: number
   maxCardsCount?: number
   name?: string
   authorId?: string
   favoritedBy?: string
   currentPage?: number
   itemsPerPage?: number
}

export type GetCardsCount = {
   min: number
   max: number
}

type Pagination = {
   totalItems: number
   currentPage: number
   itemsPerPage: number
   totalPages: number
}

export type Deck = {
   id: string
   userId: string
   name: string
   isPrivate: boolean
   cover: null | string
   created: string
   updated: string
   cardsCount: number
   isFavorite: boolean
   author: Author
}

type Author = {
   id: string
   name: string
}
