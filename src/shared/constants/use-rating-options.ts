import { useTranslation } from 'react-i18next'

export const useRatingOptions = () => {
   const { t } = useTranslation()

   return [
      { value: '1', label: t('shared.did-not-know') },
      { value: '2', label: t('shared.forgot') },
      { value: '3', label: t('shared.a-lot-of-thought') },
      { value: '4', label: t('shared.confused') },
      { value: '5', label: t('shared.knew-the-answer') },
   ]
}
