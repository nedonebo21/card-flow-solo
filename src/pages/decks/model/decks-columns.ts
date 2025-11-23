import type { Column } from '@/shared/ui/table/table-sort-header'

export const DECK_COLUMNS: Column[] = [
   { key: 'name', title: 'Name' },
   { key: 'cardsCount', title: 'Cards' },
   { key: 'updated', title: 'Last Updated' },
   { key: 'authorName', title: 'Created By' },
]
