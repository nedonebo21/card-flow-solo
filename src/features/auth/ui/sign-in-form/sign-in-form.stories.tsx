import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { SignInForm } from '@/features/auth/ui/sign-in-form'

const meta = {
   title: 'Auth/SignInForm',
   component: SignInForm,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof SignInForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
