import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { ForgotPasswordForm, CheckEmail } from '@/features/auth/ui/forgot-password-form'

const meta = {
   title: 'Auth/ForgotPasswordForm',
   parameters: { layout: ['centered'] },
   component: ForgotPasswordForm,
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof ForgotPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const CheckEmailCard: Story = {
   render: () => {
      return <CheckEmail email={'example@domain.com'} />
   },
}
