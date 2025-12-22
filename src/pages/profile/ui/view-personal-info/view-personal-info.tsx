import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateAvatarFormValues, UpdateNameFormValues } from '@/features/manage-profile'

import { useState } from 'react'
import { Link } from 'react-router-dom'

import { clsx } from 'clsx'
import { toast } from 'sonner'

import { useUpdateUserMutation } from '@/entities/user'
import { LogoutButton } from '@/features/auth'
import { UpdateAvatarForm, UpdateNameForm } from '@/features/manage-profile'
import { ROUTE_PATHS } from '@/shared/routes'
import { Button, Card, Typography, PencilIcon, CheckIcon } from '@/shared/ui'

import styles from './view-personal-info.module.scss'

type ViewPersonalInfoProps = {
   avatarUrl?: string
   username?: string
   email?: string
   isEmailVerified?: boolean
   onSubmit?: SubmitHandler<{ name?: string; avatar?: File }>
   onLogout?: () => void
} & Omit<ComponentProps<'section'>, 'onSubmit'>

export const ViewPersonalInfo = ({
   className,
   avatarUrl,
   username,
   email,
   onSubmit,
   isEmailVerified,
   onLogout,
   ...rest
}: ViewPersonalInfoProps) => {
   const [isEditMode, setIsEditMode] = useState(false)

   const handleEditModeOn = () => {
      setIsEditMode(true)
   }

   const handleCancel = () => {
      setIsEditMode(false)
   }

   const [updateUser, { isLoading }] = useUpdateUserMutation()

   const handleNicknameSubmit: SubmitHandler<UpdateNameFormValues> = async (data, e) => {
      if (onSubmit) {
         await onSubmit(data, e)
      } else {
         try {
            setIsEditMode(false)
            await updateUser({ name: data.name }).unwrap()
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
                  <div className={styles.verify}>
                     <Typography variant={'caption'} className={styles.email}>
                        {email}
                     </Typography>
                     {isEmailVerified ? (
                        <CheckIcon className={styles.confirmed} width={8} height={8} />
                     ) : (
                        <Typography
                           className={styles.confirm}
                           as={Link}
                           to={ROUTE_PATHS.VERIFY_EMAIL}
                           variant={'error'}
                        >
                           Confirm
                        </Typography>
                     )}
                  </div>
                  <div className={styles.footer}>
                     <LogoutButton onLogout={onLogout}>
                        <Typography variant={'subtitle2'}>Sign Out</Typography>
                     </LogoutButton>
                  </div>
               </>
            ) : (
               <UpdateNameForm
                  username={username ?? ''}
                  onSubmit={handleNicknameSubmit}
                  onCancel={handleCancel}
                  isLoading={isLoading}
               />
            )}
         </div>
      </Card>
   )
}
