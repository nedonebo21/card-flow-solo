import { CreateDeck } from '@/features/manage-decks'
import { Typography } from '@/shared/ui'

import styles from './decks-header.module.scss'

type DecksHeaderProps = {
   refetch: () => void
}

export const DecksHeader = ({ refetch }: DecksHeaderProps) => {
   return (
      <div className={styles.header}>
         <Typography textAlign={'left'} variant={'h1'}>
            Decks List
         </Typography>
         <CreateDeck refetch={refetch} />
      </div>
   )
}
