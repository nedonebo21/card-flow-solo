import type { Column } from '@/shared/ui/table/table-sort-header'

import { useTranslation } from 'react-i18next'

export const useDecksColumns = (): Column[] => {
   const { t } = useTranslation()

   return [
      { key: 'name', title: t('features.manage-decks.name') },
      { key: 'cardsCount', title: t('features.manage-decks.cards') },
      { key: 'updated', title: t('shared.last-updated') },
      { key: 'author.name', title: t('features.manage-decks.created-by') },
   ]
}
