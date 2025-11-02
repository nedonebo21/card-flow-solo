import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { NewPasswordForm } from '@/features/auth/ui/forgot-password-form/new-password/new-password'

const meta = {
   title: 'Auth/NewPasswordForm',
   parameters: { layout: ['centered'] },
   component: NewPasswordForm,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof NewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
