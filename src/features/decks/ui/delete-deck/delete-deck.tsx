import { type ComponentProps, useState } from 'react'

import { useDeleteDeckMutation } from '@/entities/decks/api'
import { Button, Dialog, TrashIcon, Typography } from '@/shared/ui'

type DeleteDeck = {
   id: string
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const DeleteDeck = ({ onDelete, id, ...rest }: DeleteDeck) => {
   const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = () => {
      setIsOpen(prev => !prev)
   }

   const handleDelete = () => {
      if (!!id && id.length < 0) {
         return
      }
      deleteDeck(id)
      setIsOpen(false)
   }

   return (
      <Dialog
         heading={'Confirm your action'}
         onConfirm={handleDelete}
         isConfirmDisabled={isLoading}
         showCancelButton
         trigger={
            <Button variant={'ghost'} size={'icon'} {...rest}>
               <TrashIcon width={16} height={16} />
            </Button>
         }
         onOpenChange={handleOpenChange}
         open={isOpen}
      >
         <Typography variant={'body2'} textAlign={'left'}>
            Are you sure you want to delete this deck?
         </Typography>
      </Dialog>
   )
}
