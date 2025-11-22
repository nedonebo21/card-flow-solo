import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { ViewPersonalInfo } from './view-personal-info'

const meta = {
   title: 'Profile/EditPersonalInfo',
   parameters: { layout: ['centered'] },
   component: ViewPersonalInfo,
   tags: ['autodocs'],
   args: {
      avatarUrl: '',
      username: '',
      email: '',
      onSubmit: fn(),
      onLogout: fn(),
   },
} satisfies Meta<typeof ViewPersonalInfo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      avatarUrl: 'avatar',
      username: 'MegaUser',
      email: 'example@domain.com',
   },
}
