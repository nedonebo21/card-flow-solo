import type { Meta, StoryObj } from '@storybook/react-vite'

import { Rating } from './rating'

const meta = {
   title: 'UI/Rating',
   component: Rating,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
} satisfies Meta<typeof Rating>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { value: 3 },
}
