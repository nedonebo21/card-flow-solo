import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { DeckFormValues } from '../../model/deck-form-schema'

import { useState } from 'react'

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

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await createDeck(data).unwrap()
            refetch()
            setIsOpen(false)
            toast.success(`Deck '${data.name}' created successfully`)
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
               heading={'Add New Deck'}
               confirmButtonLabel={'Add New Pack'}
               showCancelButton
               cancelButtonLabel={'Cancel'}
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
                  {isCoverSelect ? 'Change Image' : 'Upload Image'}
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
