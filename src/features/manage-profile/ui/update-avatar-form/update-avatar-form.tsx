import type { ChangeEvent, ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateAvatarFormValues } from '../../model/update-avatar-schema'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { VALID_FILE_FORMATS } from '@/shared/constants'
import { Button, Typography } from '@/shared/ui'
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

   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleEditAvatarClick = () => {
      fileInputRef.current?.click()
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]

      if (!file) {
         return
      }

      setValue('avatar', file)
      handleSubmit(onSubmit)()
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
      </form>
   )
}
