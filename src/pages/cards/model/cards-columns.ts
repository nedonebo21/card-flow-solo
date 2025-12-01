import type { Column } from '@/shared/ui/table/table-sort-header'

export const CARDS_COLUMNS: Column[] = [
   { key: 'question', title: 'Question' },
   { key: 'answer', title: 'Answer' },
   { key: 'updated', title: 'Last Updated' },
   { key: 'grade', title: 'Grade' },
]
