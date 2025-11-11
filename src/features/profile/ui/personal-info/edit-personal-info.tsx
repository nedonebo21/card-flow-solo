import type { ComponentProps } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { PersonalInfo } from '@/features/profile/ui/personal-info/personal-info'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import styles from './edit-personal-info.module.scss'

import { EditAvatar } from './edit-avatar'
import { EditNickname } from './edit-nickname'

type ProfileInfoProps = Omit<ComponentProps<'div'>, 'onSubmit'> & {
   avatarUrl: string
   onAvatarChange: (avatarFile: File) => void
   nickname: string
   onNicknameChange: (nickname: string) => void
   email: string
   isEditMode: boolean
   onEditModeChange: (isEdit: boolean) => void
   onNicknameSubmit?: (nickname: string) => void
   onAvatarSubmit?: (avatar: File) => void
}

export const EditPersonalInfo = ({
   avatarUrl,
   nickname,
   email,
   isEditMode,
   onEditModeChange,
   onNicknameChange,
   onAvatarChange,
   onNicknameSubmit,
   onAvatarSubmit,
}: ProfileInfoProps) => {
   const handleEditModeOn = () => {
      onEditModeChange(true)
   }

   const handleCancel = () => {
      onEditModeChange(false)
   }

   const handleNicknameSubmit: SubmitHandler<{ nickname: string }> = data => {
      if (onNicknameSubmit) {
         onNicknameSubmit(data.nickname)
      } else {
         onNicknameChange(data.nickname)
      }
      onEditModeChange(false)
   }

   const handleAvatarSubmit: SubmitHandler<{ avatar: FileList }> = data => {
      if (data.avatar && data.avatar.length > 0) {
         const avatarFile = data.avatar[0]

         if (onAvatarSubmit) {
            onAvatarSubmit(avatarFile)
         } else {
            onAvatarChange(avatarFile)
         }
      }
   }

   return (
      <Card className={styles.wrapper}>
         <div className={styles.header}>
            <Typography variant={'h1'}>Personal Information</Typography>
         </div>
         <div className={styles.content}>
            <EditAvatar avatarUrl={avatarUrl} onSubmit={handleAvatarSubmit} />
            {isEditMode && (
               <EditNickname
                  nickname={nickname}
                  onSubmit={handleNicknameSubmit}
                  onCancel={handleCancel}
               />
            )}
            {!isEditMode && (
               <PersonalInfo nickname={nickname} onEditMode={handleEditModeOn} email={email} />
            )}
         </div>
      </Card>
   )
}
