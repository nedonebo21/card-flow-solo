import type { ChangeEvent, ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { PersonalInfoValues } from '@/features/profile/model'

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'

import { personalInfoSchema } from '@/features/profile/model'
import { ControlledInput } from '@/shared/forms'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { LogOutIcon, PencilIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './personal-info.module.scss'

type ProfileInfoProps = Omit<ComponentProps<'form'>, 'onSubmit'> & {
   onSubmit?: SubmitHandler<PersonalInfoValues>
   avatarUrl: string
   onAvatarChange: (avatarFile: File) => void
   nickname: string
   onNicknameChange: (nickname: string) => void
   email: string
   isEditMode: boolean
   onEditModeChange: (isEdit: boolean) => void
}

export const PersonalInfo = ({
   onSubmit: onSubmitFormProps,
   avatarUrl,
   nickname,
   email,
   isEditMode,
   onEditModeChange,
   onNicknameChange,
   onAvatarChange,
   ...rest
}: ProfileInfoProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<PersonalInfoValues>({
      resolver: zodResolver(personalInfoSchema),
      defaultValues: {
         nickname,
      },
   })

   const fileInputRef = useRef<HTMLInputElement>(null)

   const handleEditModeOn = () => {
      onEditModeChange(true)
   }

   const handleEditModeOff = () => {
      onEditModeChange(false)
   }

   const onSubmit: typeof onSubmitFormProps = (data, e) => {
      onSubmitFormProps?.(data, e)

      handleEditModeOff()
      onNicknameChange(data.nickname)
   }

   const handleEditAvatarClick = () => {
      fileInputRef.current?.click()
   }

   const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
      const avatarFile = e.target.files?.[0]

      if (avatarFile && onAvatarChange) {
         onAvatarChange(avatarFile)
      }
   }

   const hasAvatar = avatarUrl.length > 0

   return (
      <Card className={styles.wrapper}>
         <div className={styles.header}>
            <Typography variant={'h1'}>Personal Information</Typography>
         </div>
         <div className={styles.content}>
            <div className={styles.avatar}>
               <div className={styles.avatarIcon}>
                  {hasAvatar && <img src={avatarUrl} alt={'avatar'} />}
               </div>
               <Button
                  className={styles.avatarEdit}
                  onClick={handleEditAvatarClick}
                  variant={'ghost'}
                  size={'icon'}
               >
                  <PencilIcon width={16} height={16} />
                  <input
                     type={'file'}
                     accept={'image'}
                     ref={fileInputRef}
                     style={{ display: 'none' }}
                     onChange={handleAvatarChange}
                  />
               </Button>
            </div>
            {isEditMode && (
               <form onSubmit={handleSubmit(onSubmit)} {...rest} noValidate>
                  <ControlledInput
                     control={control}
                     name={'nickname'}
                     label={'Nickname'}
                     errorMessage={errors.nickname?.message}
                  />
                  <Button className={styles.save} fullWidth type={'submit'}>
                     Save Changes
                  </Button>

                  {import.meta.env.DEV && <DevTool control={control} />}
               </form>
            )}
            {!isEditMode && (
               <div className={styles.info}>
                  <div className={styles.editable}>
                     <Typography className={styles.nickname} variant={'h2'}>
                        {nickname}
                     </Typography>
                     <Button
                        className={styles.nicknameEdit}
                        onClick={handleEditModeOn}
                        variant={'ghost'}
                        size={'icon'}
                     >
                        <PencilIcon width={16} height={16} />
                     </Button>
                  </div>
                  <Typography className={styles.email} variant={'body2'}>
                     {email}
                  </Typography>
                  <div className={styles.footer}>
                     <Button variant={'secondary'}>
                        <LogOutIcon width={16} height={16} />
                        Logout
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </Card>
   )
}
