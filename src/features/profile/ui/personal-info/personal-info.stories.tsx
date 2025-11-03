import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { fn } from 'storybook/test'

import { PersonalInfo } from './personal-info'

const meta = {
   title: 'Profile/PersonalInfo',
   parameters: { layout: ['centered'] },
   component: PersonalInfo,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof PersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      nickname: '',
      email: '',
      avatarUrl: '',
      isEditMode: false,
      onEditModeChange: () => {},
      onNicknameChange: () => {},
      onAvatarChange: () => {},
   },
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
         <PersonalInfo
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
