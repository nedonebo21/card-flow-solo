import type { ChangeEvent, ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateAvatarFormValues } from '@/features/manage-profile'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { VALID_FILE_FORMATS } from '@/shared/constants'
import { Button, CropImageDialog, Typography } from '@/shared/ui'
import { PencilIcon } from '@/shared/ui/icons'

import styles from './update-avatar-form.module.scss'

import { updateAvatarSchema } from '../../model/update-avatar-schema'

type UpdateAvatarFormProps = {
   avatarUrl: string
   onSubmit?: SubmitHandler<UpdateAvatarFormValues>
   isEditMode: boolean
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const UpdateAvatarForm = ({
   avatarUrl,
   onSubmit: onSubmitFormProps,
   isEditMode,
   ...rest
}: UpdateAvatarFormProps) => {
   const {
      control,
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<UpdateAvatarFormValues>({
      resolver: zodResolver(updateAvatarSchema),
   })

   const [originalImageUrl, setOriginalImageUrl] = useState<string | null>('')
   const [isCropperOpen, setIsCropperOpen] = useState(false)

   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleEditAvatarClick = () => {
      fileInputRef.current?.click()
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
         return
      }

      const imageUrl = URL.createObjectURL(file)

      setOriginalImageUrl(imageUrl)
      setIsCropperOpen(true)
   }

   const handleCropComplete = async (croppedImageUrl: string) => {
      try {
         const response = await fetch(croppedImageUrl)
         const blob = await response.blob()

         const file = new File([blob], 'avatar.jpg', {
            type: blob.type,
            lastModified: Date.now(),
         })

         setValue('avatar', file)
         await handleSubmit(onSubmit)()
      } catch (error) {
         console.error('Error processing cropped image:', error)
      } finally {
         setIsCropperOpen(false)
         if (originalImageUrl) {
            URL.revokeObjectURL(originalImageUrl)
            setOriginalImageUrl(null)
         }
      }
   }

   const handleCropDialogClose = (open: boolean) => {
      setIsCropperOpen(open)
      if (!open && originalImageUrl) {
         URL.revokeObjectURL(originalImageUrl)
         setOriginalImageUrl(null)
      }
   }

   const onSubmit: SubmitHandler<UpdateAvatarFormValues> = (data, e) => {
      onSubmitFormProps?.(data, e)
   }

   const hasAvatar = avatarUrl.length > 0
   const isError = !!errors.avatar?.message

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} {...rest}>
         <div className={styles.avatar}>
            <div className={styles.avatarIcon}>
               {hasAvatar && <img src={avatarUrl} alt={'avatar'} />}
            </div>
            {!isEditMode && (
               <Button
                  className={styles.avatarEdit}
                  onClick={handleEditAvatarClick}
                  variant={'ghost'}
                  size={'icon'}
                  type={'button'}
               >
                  <PencilIcon width={16} height={16} />
               </Button>
            )}
         </div>
         {isError && <Typography variant={'error'}>{errors.avatar?.message}</Typography>}
         <input
            {...register('avatar')}
            type={'file'}
            accept={VALID_FILE_FORMATS.values.join(',')}
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
         />
         {import.meta.env.DEV && <DevTool control={control} />}

         {originalImageUrl && (
            <CropImageDialog
               open={isCropperOpen}
               onOpenChange={handleCropDialogClose}
               image={originalImageUrl}
               onCropComplete={handleCropComplete}
               aspect={1}
            />
         )}
      </form>
   )
}
