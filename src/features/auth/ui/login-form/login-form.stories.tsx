import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { LoginForm } from '@/features/auth/ui/login-form'

const meta = {
   title: 'Auth/LoginForm',
   component: LoginForm,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}
