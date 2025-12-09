import { CreateDeck } from '@/features/manage-decks'
import { Typography } from '@/shared/ui'

import styles from './decks-header.module.scss'

export const DecksHeader = () => {
   return (
      <div className={styles.header}>
         <Typography textAlign={'left'} variant={'h1'}>
            Decks List
         </Typography>
         <CreateDeck />
      </div>
   )
}
