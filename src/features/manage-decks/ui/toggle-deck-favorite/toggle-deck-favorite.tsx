import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import { useAddDeckFavoriteMutation, useDeleteDeckFromFavoriteMutation } from '@/entities/deck'
import { Button, HeartOutlineIcon } from '@/shared/ui'

type ToggleDeckFavoriteProps = {
   id: string
   deckName: string
   isFavorite: boolean
}

export const ToggleDeckFavorite = ({ id, isFavorite, deckName }: ToggleDeckFavoriteProps) => {
   const [addDeckFavorite] = useAddDeckFavoriteMutation()
   const [deleteDeckFavorite] = useDeleteDeckFromFavoriteMutation()
   const { t } = useTranslation()

   const toggleDeckFavorite = async () => {
      if (isFavorite) {
         try {
            await deleteDeckFavorite(id).unwrap()
            toast.success(`${t('deck')} "${deckName}" ${t('removed-from-favorite')}`)
         } catch (error) {
            console.error(error)
         }
      } else {
         try {
            await addDeckFavorite(id).unwrap()
            toast.success(`${t('deck')} "${deckName}" ${t('added-to-favorite')}`)
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <Button variant={'ghost'} size={'icon'} onClick={toggleDeckFavorite}>
         <HeartOutlineIcon color={isFavorite ? 'red' : 'white'} width={16} height={16} />
      </Button>
   )
}
