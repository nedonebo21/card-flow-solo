import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { CreateNewPasswordForm } from '@/features/auth/ui/create-new-password-form'

const meta = {
   title: 'Auth/NewPasswordForm',
   parameters: { layout: ['centered'] },
   component: CreateNewPasswordForm,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof CreateNewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
