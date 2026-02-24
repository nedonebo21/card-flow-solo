import { useTranslation } from 'react-i18next'

export const useRatingOptions = () => {
   const { t } = useTranslation()

   return [
      { value: '1', label: t('did-not-know') },
      { value: '2', label: t('forgot') },
      { value: '3', label: t('a-lot-of-thought') },
      { value: '4', label: t('confused') },
      { value: '5', label: t('knew-the-answer') },
   ]
}
