import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { DeckFormValues } from '../../model/deck-form-schema'

import { useEffect, useState } from 'react'

import { useGetDeckByIdQuery, useUpdateDeckMutation } from '@/entities/deck'
import { VALID_FILE_FORMATS } from '@/shared/constants'
import { ControlledCheckbox, ControlledInput } from '@/shared/forms'
import { Button, Dialog, ImageIcon, PencilIcon, CropImageDialog, Typography } from '@/shared/ui'

import styles from './update-deck.module.scss'

import { useDeckForm } from '../../model/use-deck-form'

type UpdateDeckProps = {
   onSubmit?: SubmitHandler<DeckFormValues>
   id: string
   size?: 'default' | 'icon'
   label?: string
} & Omit<ComponentProps<'form'>, 'onSubmit' | 'id'>
export const UpdateDeck = ({
   onSubmit: onSubmitFormProps,
   id,
   size = 'icon',
   label,
   className,
}: UpdateDeckProps) => {
   const [updateDeck, { isLoading }] = useUpdateDeckMutation()

   const [isOpen, setIsOpen] = useState(false)
   const [hasCoverChanged, setHasCoverChanged] = useState(false)

   const { data: deck } = useGetDeckByIdQuery({ id }, { skip: !isOpen })

   const {
      form: {
         handleSubmit,
         control,
         formState: { errors, isDirty },
         register,
         reset,
         watch,
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
   } = useDeckForm({ defaultName: deck?.name ?? '', defaultIsPrivate: deck?.isPrivate ?? false })

   const coverFile = watch('cover')

   useEffect(() => {
      if (coverFile instanceof File) {
         setHasCoverChanged(true)
      }
   }, [coverFile])

   useEffect(() => {
      if (deck && isOpen) {
         reset({
            name: deck?.name,
            isPrivate: deck?.isPrivate,
            cover: undefined,
         })
         setHasCoverChanged(false)
      }
   }, [deck, isOpen, reset])

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
            await updateDeck({ id, body: formData }).unwrap()
            setIsOpen(false)
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleOpenChange = (open: boolean) => {
      setIsOpen(open)
      if (!open) {
         reset({
            name: deck?.name,
            isPrivate: deck?.isPrivate,
            cover: undefined,
         })
         setHasCoverChanged(false)
      }
   }

   const isConfirmDisabled = (!isDirty && !hasCoverChanged) || isLoading

   return (
      <>
         <Dialog
            open={isOpen}
            onOpenChange={handleOpenChange}
            trigger={
               <Button variant={'ghost'} size={size} className={className}>
                  <PencilIcon width={16} height={16} />
                  {label ? <Typography variant={'caption'}>{label}</Typography> : ''}
               </Button>
            }
            heading={'Edit Deck'}
            confirmButtonLabel={'Confirm changes'}
            showCancelButton
            cancelButtonLabel={'Cancel'}
            confirmButtonFormId={'update-deck-form'}
            isConfirmDisabled={isConfirmDisabled}
         >
            <form id={'update-deck-form'} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            </form>
         </Dialog>
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
