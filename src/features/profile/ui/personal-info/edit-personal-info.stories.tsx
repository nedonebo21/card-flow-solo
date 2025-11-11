import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { EditPersonalInfo } from './edit-personal-info'

const meta = {
   title: 'Profile/EditPersonalInfo',
   parameters: { layout: ['centered'] },
   component: EditPersonalInfo,
   tags: ['autodocs'],
   args: {
      avatarUrl: '',
      nickname: '',
      email: '',
      isEditMode: false,
      onEditModeChange: () => {},
      onNicknameChange: () => {},
      onAvatarChange: () => {},
   },
} satisfies Meta<typeof EditPersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   render: () => {
      const [isEditMode, setIsEditMode] = useState(false)
      const [nickname, setNickname] = useState('Mega User')
      const [avatarUrl, setAvatarUrl] = useState('')

      const handleEditChange = () => {
         setIsEditMode(prev => !prev)
      }

      const handleNicknameChange = (nickname: string) => {
         setNickname(nickname)
      }

      const handleAvatarChange = (avatarFile: File) => {
         const avatarUrl = URL.createObjectURL(avatarFile)

         setAvatarUrl(avatarUrl)
      }

      return (
         <EditPersonalInfo
            nickname={nickname}
            email={'example@domain.com'}
            isEditMode={isEditMode}
            avatarUrl={avatarUrl}
            onEditModeChange={handleEditChange}
            onNicknameChange={nickname => handleNicknameChange(nickname)}
            onAvatarChange={handleAvatarChange}
         />
      )
   },
}
