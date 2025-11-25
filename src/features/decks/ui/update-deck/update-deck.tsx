import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { DeckFormValues } from '@/features/decks/model'

import { useState } from 'react'

import { useUpdateDeckMutation } from '@/entities/decks/api'
import { useDeckForm, VALID_FILE_FORMATS } from '@/features/decks/model'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button, Dialog, ImageIcon, PencilIcon, CropImageDialog } from '@/shared/ui'

import styles from '@/features/decks/ui/create-deck/create-deck.module.scss'

type UpdateDeckProps = {
   onSubmit?: SubmitHandler<DeckFormValues>
   id: string
   name: string
} & Omit<ComponentProps<'form'>, 'onSubmit' | 'id'>
export const UpdateDeck = ({ onSubmit: onSubmitFormProps, id, name, ...rest }: UpdateDeckProps) => {
   const [updateDeck] = useUpdateDeckMutation()
   const [isOpen, setIsOpen] = useState(false)

   const {
      form: {
         handleSubmit,
         control,
         formState: { errors, isDirty },
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
   } = useDeckForm({ defaultName: name })

   const onSubmit: SubmitHandler<DeckFormValues> = async (data, e) => {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('isPrivate', String(data.isPrivate))

      if (data.cover instanceof File) {
         formData.append('cover', data.cover)
      }

      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await updateDeck({ id, body: formData })
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      if (!open) {
         reset({
            name,
            isPrivate: false,
            cover: undefined,
         })
      }
   }

   const isConfirmDisabled = !isDirty

   return (
      <>
         <form id={'update-deck-form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
            <Dialog
               open={isOpen}
               onOpenChange={handleOpenChange}
               trigger={
                  <Button variant={'ghost'} size={'icon'}>
                     <PencilIcon width={16} height={16} />
                  </Button>
               }
               heading={'Edit Deck'}
               confirmButtonLabel={'Confirm changes'}
               showCancelButton
               cancelButtonLabel={'Cancel'}
               confirmButtonFormId={'update-deck-form'}
               isConfirmDisabled={isConfirmDisabled}
            >
               {isCoverSelect && (
                  <img
                     className={styles.cover}
                     src={coverPreviewUrl ?? undefined}
                     alt={'Cover Preview'}
                  />
               )}
               <ControlledInput
                  control={control}
                  name={'name'}
                  label={'Name Pack'}
                  errorMessage={errors.name?.message}
               />
               <Button
                  fullWidth
                  onClick={handleChangeCoverClick}
                  type={'button'}
                  variant={'secondary'}
               >
                  <ImageIcon width={16} height={16} />
                  {isCoverSelect ? 'Change Image' : 'Update Image'}
               </Button>
               <input
                  {...register('cover')}
                  type={'file'}
                  accept={VALID_FILE_FORMATS.values.join(',')}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
               />
               <ControlledCheckbox control={control} name={'isPrivate'} label={'Private Pack'} />
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
