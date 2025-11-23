import type { ComponentProps } from 'react'

import { useDeleteDeckMutation } from '@/entities/decks/api'
import { Button, TrashIcon } from '@/shared/ui'

type DeleteDeckButton = {
   id: string
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const DeleteDeckButton = ({ onDelete, id, ...rest }: DeleteDeckButton) => {
   const [deleteDeck] = useDeleteDeckMutation()

   const handleDelete = () => {
      if (!!id && id.length < 0) {
         return
      }
      deleteDeck(id)
   }

   return (
      <Button variant={'ghost'} size={'icon'} {...rest} onClick={handleDelete}>
         <TrashIcon width={16} height={16} />
      </Button>
   )
}
