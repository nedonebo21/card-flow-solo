import type { Meta, StoryObj } from '@storybook/react-vite'

import { CheckEmail } from '@/features/auth/ui/forgot-password-form/check-email/check-email'

const meta = {
   title: 'Auth/CheckEmail',
   parameters: { layout: ['centered'] },
   component: CheckEmail,
   tags: ['autodocs'],
} satisfies Meta<typeof CheckEmail>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      email: 'example@domain.com',
   },
}
