import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateAvatarFormValues, UpdateNameFormValues } from '@/features/manage-profile/model'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { clsx } from 'clsx'
import { toast } from 'sonner'

import { useUpdateUserMutation } from '@/entities/user/api'
import { LogoutButton } from '@/features/auth/ui'
import { UpdateAvatarForm, UpdateNameForm } from '@/features/manage-profile/ui'
import { Button, Card, Typography, PencilIcon, CheckIcon } from '@/shared/ui'

import styles from './view-personal-info.module.scss'

type ViewPersonalInfoProps = {
   avatarUrl?: string
   username?: string
   email?: string
   isEmailVerified?: boolean
   onSubmit?: SubmitHandler<{ name?: string; avatar?: File }>
} & Omit<ComponentProps<'section'>, 'onSubmit'>

export const ViewPersonalInfo = ({
   className,
   avatarUrl,
   username,
   email,
   onSubmit,
   isEmailVerified,
   ...rest
}: ViewPersonalInfoProps) => {
   const [isEditMode, setIsEditMode] = useState(false)

   const handleEditModeOn = () => {
      setIsEditMode(true)
   }

   const handleCancel = () => {
      setIsEditMode(false)
   }

   const [updateUser] = useUpdateUserMutation()

   const handleNicknameSubmit: SubmitHandler<UpdateNameFormValues> = async (data, e) => {
      if (onSubmit) {
         await onSubmit(data, e)
      } else {
         try {
            await updateUser({ name: data.name }).unwrap()
            setIsEditMode(false)
         } catch (error) {
            console.error(error)
         }
      }
   }

   const handleAvatarSubmit: SubmitHandler<UpdateAvatarFormValues> = async (data, e) => {
      if (onSubmit) {
         await onSubmit(data, e)
      } else {
         try {
            await updateUser({ avatar: data.avatar }).unwrap()
            toast.success('Avatar has been changed')
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <Card as={'section'} className={clsx(styles.wrapper, className)} {...rest}>
         <header className={styles.header}>
            <Typography variant={'h1'}>Personal Information</Typography>
         </header>
         <div className={styles.content}>
            <UpdateAvatarForm
               isEditMode={isEditMode}
               avatarUrl={avatarUrl ?? ''}
               onSubmit={handleAvatarSubmit}
            />
            {!isEditMode ? (
               <>
                  <div className={styles.editable}>
                     <Typography className={styles.nickname} variant={'h2'}>
                        {username}
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
                     {isEmailVerified ? (
                        <CheckIcon width={16} height={16} />
                     ) : (
                        <Typography
                           className={styles.confirm}
                           as={Link}
                           to={'/verify-email'}
                           variant={'error'}
                        >
                           Подтвердить
                        </Typography>
                     )}
                  </Typography>
                  <div className={styles.footer}>
                     <LogoutButton>
                        <Typography variant={'subtitle2'}>Sign Out</Typography>
                     </LogoutButton>
                  </div>
               </>
            ) : (
               <UpdateNameForm
                  username={username ?? ''}
                  onSubmit={handleNicknameSubmit}
                  onCancel={handleCancel}
               />
            )}
         </div>
      </Card>
   )
}
