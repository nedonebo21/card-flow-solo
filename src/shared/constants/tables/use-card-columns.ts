import type { Column } from '@/shared/ui/table/table-sort-header'

import { useTranslation } from 'react-i18next'

export const useCardColumns = (): Column[] => {
   const { t } = useTranslation()

   return [
      { key: 'question', title: t('shared.question') },
      { key: 'answer', title: t('shared.answer') },
      { key: 'updated', title: t('shared.last-updated') },
      { key: 'grade', title: t('features.manage-cards.grade') },
   ]
}
