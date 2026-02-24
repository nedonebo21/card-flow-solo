import type { Column } from '@/shared/ui/table/table-sort-header'

import { useTranslation } from 'react-i18next'

export const useCardColumns = (): Column[] => {
   const { t } = useTranslation()

   return [
      { key: 'question', title: t('question') },
      { key: 'answer', title: t('answer') },
      { key: 'updated', title: t('last-updated') },
      { key: 'grade', title: t('grade') },
   ]
}
