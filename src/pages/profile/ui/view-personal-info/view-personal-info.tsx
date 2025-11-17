import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import type { UpdateAvatarFormValues } from '@/features/manage-profile/model/update-avatar-schema'
import type { UpdateNameFormValues } from '@/features/manage-profile/model/update-name-schema'

import { useState } from 'react'

import { clsx } from 'clsx'

import { LogoutButton } from '@/features/logout-button'
import { UpdateAvatarForm, UpdateNameForm } from '@/features/manage-profile/ui'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { PencilIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './view-personal-info.module.scss'

type ViewPersonalInfoProps = {
   avatarUrl: string
   username: string
   email: string
   onSubmit?: SubmitHandler<{ name?: string; avatar?: File }>
   onLogout?: () => void
} & Omit<ComponentProps<'section'>, 'onSubmit'>

export const ViewPersonalInfo = ({
   className,
   avatarUrl,
   username,
   email,
   onSubmit,
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

   const handleNicknameSubmit: SubmitHandler<UpdateNameFormValues> = (data, e) => {
      onSubmit?.(data, e)
      setIsEditMode(false)
   }

   const handleAvatarSubmit: SubmitHandler<UpdateAvatarFormValues> = (data, e) => {
      onSubmit?.(data, e)
   }

   return (
      <Card as={'section'} className={clsx(styles.wrapper, className)} {...rest}>
         <header className={styles.header}>
            <Typography variant={'h1'}>Personal Information</Typography>
         </header>
         <div className={styles.content}>
            <UpdateAvatarForm
               isEditMode={isEditMode}
               avatarUrl={avatarUrl}
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
                  </Typography>
                  <div className={styles.footer}>
                     <LogoutButton onLogout={onLogout} />
                  </div>
               </>
            ) : (
               <UpdateNameForm
                  username={username}
                  onSubmit={handleNicknameSubmit}
                  onCancel={handleCancel}
               />
            )}
         </div>
      </Card>
   )
}
