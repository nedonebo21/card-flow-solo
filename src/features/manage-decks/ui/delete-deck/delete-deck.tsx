import type { ComponentProps } from 'react'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { toast } from 'sonner'

import { useDeleteDeckMutation } from '@/entities/deck'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Dialog, TrashIcon, Typography } from '@/shared/ui'

type DeleteDeckProps = {
   id: string
   deckName?: string
   redirectOnDelete?: boolean
   refetch: () => void
} & Omit<ComponentProps<typeof Button>, 'onClick'>

export const DeleteDeck = ({
   onDelete,
   id,
   size = 'icon',
   label,
   deckName,
   redirectOnDelete,
   refetch,
   ...rest
}: DeleteDeckProps) => {
   const [deleteDeck, { isLoading }] = useDeleteDeckMutation()
   const navigate = useNavigate()
   const [isOpen, setIsOpen] = useState(false)
   const { t } = useTranslation()

   const handleOpenChange = () => {
      setIsOpen(prev => !prev)
   }

   const handleDelete = () => {
      if (!!id && id.length < 0) {
         return
      }
      setIsOpen(false)
      deleteDeck(id).unwrap()
      refetch()

      if (redirectOnDelete) {
         navigate(ROUTE_PATHS.HOME)
      }
      toast.success(`${t('deck')} '${deckName}' ${t('deleted-successfully')}`)
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
            <Button disabled={isLoading} variant={'ghost'} size={size} {...rest}>
               <TrashIcon width={16} height={16} />
               {label ? <Typography variant={'caption'}>{label}</Typography> : ''}
            </Button>
         }
         onOpenChange={handleOpenChange}
         open={isOpen}
      >
         <Typography variant={'body2'} textAlign={'left'}>
            {t('sure-want-delete-deck')}
         </Typography>
      </Dialog>
   )
}
