import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { SignUpForm } from '@/features/auth/ui/sign-up-form/sign-up-form'

const meta = {
   title: 'Auth/SignUpFrom',
   component: SignUpForm,
   parameters: { layout: ['centered'] },
   tags: ['autodocs'],
   args: {
      onSubmit: fn(),
   },
} satisfies Meta<typeof SignUpForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
