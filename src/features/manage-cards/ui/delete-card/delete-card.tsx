import type { ComponentProps } from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { useDeleteCardMutation } from '@/entities/card'
import { ROUTE_PATHS } from '@/shared/constants'
import { Button, Dialog, TrashIcon, Typography } from '@/shared/ui'

type DeleteCardProps = {
   id: string
   cardName?: string
   redirectOnDelete?: boolean
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const DeleteCard = ({
   onDelete,
   id,
   size = 'icon',
   label,
   cardName,
   redirectOnDelete,
   ...rest
}: DeleteCardProps) => {
   const [deleteCard, { isLoading }] = useDeleteCardMutation()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)

   const handleOpenChange = () => {
      setIsOpen(prev => !prev)
   }

   const handleDelete = async () => {
      if (!!id && id.length < 0) {
         return
      } else {
         try {
            await deleteCard(id).unwrap()
            setIsOpen(false)
            toast.success(`Deck '${cardName}' deleted successfully`)
            if (redirectOnDelete) {
               navigate(ROUTE_PATHS.HOME)
            }
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <Dialog
         heading={'Confirm your action'}
         onConfirm={handleDelete}
         isConfirmDisabled={isLoading}
         showCancelButton
         trigger={
            <Button variant={'ghost'} size={size} {...rest}>
               <TrashIcon width={16} height={16} />
               {label ? <Typography variant={'caption'}>{label}</Typography> : ''}
            </Button>
         }
         onOpenChange={handleOpenChange}
         open={isOpen}
      >
         <Typography variant={'body2'} textAlign={'left'}>
            Are you sure you want to delete this card?
         </Typography>
      </Dialog>
   )
}
