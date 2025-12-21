import { Link } from 'react-router-dom'

import { useGetDeckByIdQuery } from '@/entities/deck'
import { useMeQuery } from '@/entities/user'
import { CreateCard } from '@/features/manage-cards'
import { DeleteDeck, UpdateDeck } from '@/features/manage-decks'
import { ROUTE_PATHS } from '@/shared/constants'
import { routeHelpers } from '@/shared/lib'
import {
   ArrowLeftIcon,
   Button,
   CirclePlayIcon,
   Dropdown,
   MoreVerticalIcon,
   Typography,
} from '@/shared/ui'
import { DefaultCover } from '@/shared/ui/images'

import styles from './cards-header.module.scss'

type CardsHeaderProps = {
   deckId?: string
   refetch: () => void
   hasCards: boolean
}

export const CardsHeader = ({ deckId, refetch, hasCards }: CardsHeaderProps) => {
   const { data: userData } = useMeQuery()
   const { data: deck } = useGetDeckByIdQuery({ id: deckId ?? '' }, { skip: !deckId })

   const isOwner = userData?.id === deck?.userId

   const showLearn = hasCards
   const showCreateCardButton = isOwner && hasCards && !showLearn

   return (
      <div className={styles.wrapper}>
         <div className={styles.linkContainer}>
            <Button className={styles.link} variant={'link'} as={Link} to={ROUTE_PATHS.DECKS}>
               <ArrowLeftIcon width={16} height={16} /> Back to Decks List
            </Button>
         </div>
         <div className={styles.learnContainer}>
            <div className={styles.deckActions}>
               <Typography variant={'h1'}>{deck?.name}</Typography>
               {isOwner && (
                  <Dropdown triggerButton={<MoreVerticalIcon width={18} height={18} />}>
                     <Dropdown.Item>
                        <Button
                           as={Link}
                           to={routeHelpers.createLearnPath(deckId ?? '')}
                           variant={'ghost'}
                        >
                           <CirclePlayIcon width={16} height={16} />
                           <Typography variant={'caption'}>Learn</Typography>
                        </Button>
                     </Dropdown.Item>
                     <Dropdown.Item asChild>
                        <UpdateDeck
                           className={styles.update}
                           id={deckId ?? ''}
                           label={'Edit'}
                           size={'default'}
                        />
                     </Dropdown.Item>
                     <Dropdown.Item asChild={false}>
                        <DeleteDeck
                           id={deckId ?? ''}
                           refetch={refetch}
                           deckName={deck?.name}
                           redirectOnDelete
                           label={'Delete'}
                           size={'default'}
                        />
                     </Dropdown.Item>
                  </Dropdown>
               )}
            </div>

            {showCreateCardButton && <CreateCard refetch={refetch} deckId={deckId ?? ''} />}

            {showLearn && (
               <Button as={Link} to={routeHelpers.createLearnPath(deckId ?? '')}>
                  Learn to pack
               </Button>
            )}
         </div>
         <img
            className={styles.cardCover}
            src={deck?.cover || DefaultCover}
            alt={`${deck?.name} cover`}
         />
      </div>
   )
}
