import type { Meta, StoryObj } from '@storybook/react-vite'

import { Typography } from '@/shared/ui'

import { Card } from './card'

const meta = {
   title: 'UI/Card',
   component: Card,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      as: { control: 'select', options: ['div', 'section', 'article', 'form', 'main', 'aside'] },
   },
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   render: () => (
      <Card>
         <Typography variant={'h2'} as={'p'}>
            Заголовок Card
         </Typography>
      </Card>
   ),
}

export const AsSection: Story = {
   render: () => (
      <Card as={'section'}>
         <Typography variant={'h2'} as={'p'}>
            Заголовок Card (которая section)
         </Typography>
      </Card>
   ),
}
