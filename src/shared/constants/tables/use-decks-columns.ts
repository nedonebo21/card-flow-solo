import type { Column } from '@/shared/ui/table/table-sort-header'

import { useTranslation } from 'react-i18next'

export const useDecksColumns = (): Column[] => {
   const { t } = useTranslation()

   return [
      { key: 'name', title: t('name') },
      { key: 'cardsCount', title: t('cards') },
      { key: 'updated', title: t('last-updated') },
      { key: 'author.name', title: t('created-by') },
   ]
}
