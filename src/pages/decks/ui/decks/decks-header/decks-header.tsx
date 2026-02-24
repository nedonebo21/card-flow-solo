import { useTranslation } from 'react-i18next'

import { CreateDeck } from '@/features/manage-decks'
import { Typography } from '@/shared/ui'

import styles from './decks-header.module.scss'

type DecksHeaderProps = {
   refetch: () => void
}

export const DecksHeader = ({ refetch }: DecksHeaderProps) => {
   const { t } = useTranslation()

   return (
      <div className={styles.header}>
         <Typography textAlign={'left'} variant={'h1'}>
            {t('decks-list')}
         </Typography>
         <CreateDeck refetch={refetch} />
      </div>
   )
}
