import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { DeckFormValues } from '../../model/deck-form-schema'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import { useCreateDeckMutation } from '@/entities/deck'
import { VALID_FILE_FORMATS } from '@/shared/constants'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button, Dialog, ImageIcon, CropImageDialog } from '@/shared/ui'

import { useDeckForm } from '../../model/use-deck-form'

type CreateDeckFormProps = {
   onSubmit?: SubmitHandler<DeckFormValues>
   refetch: () => void
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const CreateDeck = ({
   onSubmit: onSubmitFormProps,
   refetch,
   ...rest
}: CreateDeckFormProps) => {
   const [createDeck, { isLoading }] = useCreateDeckMutation()
   const [isOpen, setIsOpen] = useState(false)

   const {
      form: {
         handleSubmit,
         control,
         formState: { errors },
         register,
         reset,
      },
      coverPreviewUrl,
      isCropperOpen,
      originalCoverUrl,
      fileInputRef,
      isCoverSelect,
      handleChangeCoverClick,
      handleFileChange,
      handleCropComplete,
      handleCropDialogOpenChange,
   } = useDeckForm()

   const { t } = useTranslation()

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await createDeck(data).unwrap()
            refetch()
            setIsOpen(false)
            toast.success(`${t('deck')} '${data.name}' ${t('created-successfully')}`)
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      if (!open) {
         reset({
            name: '',
            isPrivate: false,
            cover: undefined,
         })
      }
   }

   return (
      <>
         <form id={'create-deck-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
            <Dialog
               open={isOpen}
               onOpenChange={handleOpenChange}
               trigger={<Button>New Deck</Button>}
               heading={t('add-new-deck')}
               confirmButtonLabel={t('add-new-deck')}
               showCancelButton
               cancelButtonLabel={t('cancel')}
               confirmButtonFormId={'create-deck-form'}
               isConfirmDisabled={isLoading}
            >
               {isCoverSelect && (
                  <img
                     className={'cover'}
                     src={coverPreviewUrl ?? undefined}
                     alt={'Cover Preview'}
                  />
               )}
               <ControlledInput
                  control={control}
                  name={'name'}
                  label={t('name-pack')}
                  errorMessage={errors.name?.message}
               />
               <Button
                  fullWidth
                  onClick={handleChangeCoverClick}
                  type={'button'}
                  variant={'secondary'}
               >
                  <ImageIcon width={16} height={16} />
                  {isCoverSelect ? t('change-image') : t('update-image')}
               </Button>
               <input
                  {...register('cover')}
                  type={'file'}
                  accept={VALID_FILE_FORMATS.values.join(',')}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
               />
               <ControlledCheckbox control={control} name={'isPrivate'} label={t('private-pack')} />
            </Dialog>
         </form>
         {originalCoverUrl && (
            <CropImageDialog
               open={isCropperOpen}
               onOpenChange={handleCropDialogOpenChange}
               image={originalCoverUrl}
               onCropComplete={handleCropComplete}
               aspect={2}
            />
         )}
      </>
   )
}
