import type { ComponentProps } from 'react'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { useDeleteCardMutation } from '@/entities/card'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Dialog, TrashIcon, Typography } from '@/shared/ui'

type DeleteCardProps = {
   id: string
   cardName?: string
   redirectOnDelete?: boolean
   refetch: () => void
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const DeleteCard = ({
   onDelete,
   id,
   size = 'icon',
   label,
   cardName,
   redirectOnDelete,
   refetch,
   ...rest
}: DeleteCardProps) => {
   const [deleteCard, { isLoading }] = useDeleteCardMutation()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const { t } = useTranslation()

   const handleOpenChange = () => {
      setIsOpen(prev => !prev)
   }

   const handleDelete = async () => {
      if (!!id && id.length < 0) {
         return
      } else {
         try {
            await deleteCard(id).unwrap()
            refetch()
            setIsOpen(false)
            toast.success(`${t('card')} '${cardName}' ${t('deleted-successfully')}`)
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
         heading={t('confirm-action')}
         onConfirm={handleDelete}
         isConfirmDisabled={isLoading}
         showCancelButton
         cancelButtonLabel={t('cancel')}
         confirmButtonLabel={t('confirm')}
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
            {t('sure-want-delete-card')}
         </Typography>
      </Dialog>
   )
}
