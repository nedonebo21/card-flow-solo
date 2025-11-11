import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { CreateNewPassword } from '@/features/auth/ui/create-new-password/create-new-password'

const meta = {
   title: 'Auth/NewPasswordForm',
   parameters: { layout: ['centered'] },
   component: CreateNewPassword,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof CreateNewPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
