import type { ChangeEvent } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { AvatarFormValues } from '@/features/profile/model'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { avatarSchema } from '@/features/profile/model'
import { Button } from '@/shared/ui/button'
import { PencilIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from '@/features/profile/ui/personal-info/edit-personal-info.module.scss'

type Props = {
   avatarUrl: string
   onSubmit: SubmitHandler<AvatarFormValues>
}

export const EditAvatar = ({ avatarUrl, onSubmit }: Props) => {
   const {
      control,
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<AvatarFormValues>({
      resolver: zodResolver(avatarSchema),
   })

   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleEditAvatarClick = () => {
      fileInputRef.current?.click()
   }

   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files

      if (files && files.length > 0) {
         setValue('avatar', files)
         setTimeout(() => {
            handleSubmit(onSubmit)()
         }, 0)
      }
   }

   const hasAvatar = avatarUrl.length > 0
   const isError = !!errors.avatar?.message

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
         <div className={styles.avatar}>
            <div className={styles.avatarIcon}>
               {hasAvatar && <img src={avatarUrl} alt={'avatar'} />}
            </div>
            <Button
               className={styles.avatarEdit}
               onClick={handleEditAvatarClick}
               variant={'ghost'}
               size={'icon'}
               type={'button'}
            >
               <PencilIcon width={16} height={16} />
            </Button>
         </div>
         {isError && <Typography variant={'error'}>{errors.avatar?.message}</Typography>}
         <input
            {...register('avatar')}
            type={'file'}
            accept={'image/*'}
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
         />
         {import.meta.env.DEV && <DevTool control={control} />}
      </form>
   )
}
