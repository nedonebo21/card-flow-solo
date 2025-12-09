import { Link, useParams } from 'react-router-dom'

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

export const CardsHeader = () => {
   const { id } = useParams()
   const { data: userData } = useMeQuery()
   const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' })

   const isOwner = userData?.id === deck?.userId
   const deckId = deck?.id ?? ''

   return (
      <div className={styles.wrapper}>
         <div className={styles.linkContainer}>
            <Button className={styles.link} variant={'link'} as={Link} to={ROUTE_PATHS.DECKS}>
               <ArrowLeftIcon width={16} height={16} /> Back to Decks Page
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
                           to={routeHelpers.createLearnPath(deckId)}
                           variant={'ghost'}
                        >
                           <CirclePlayIcon width={16} height={16} />
                           <Typography variant={'caption'}>Learn</Typography>
                        </Button>
                     </Dropdown.Item>
                     <Dropdown.Item asChild>
                        <UpdateDeck
                           className={styles.update}
                           id={deckId}
                           label={'Edit'}
                           size={'default'}
                        />
                     </Dropdown.Item>
                     <Dropdown.Item asChild={false}>
                        <DeleteDeck
                           id={deckId}
                           deckName={deck?.name}
                           redirectOnDelete
                           label={'Delete'}
                           size={'default'}
                        />
                     </Dropdown.Item>
                  </Dropdown>
               )}
            </div>
            {isOwner ? (
               <CreateCard deckId={deckId} />
            ) : (
               <Button as={Link} to={routeHelpers.createLearnPath(deckId)}>
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
