import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { IconButton } from '@/shared/ui/icon-button'
import { TrashIcon } from '@/shared/ui/icons'

const meta = {
   title: 'UI/IconButton',
   component: IconButton,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   args: { onClick: fn(), disabled: false },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {
      icon: <TrashIcon />,
   },
   render: () => {
      return <IconButton icon={<TrashIcon />} />
   },
}

export const Disabled: Story = {
   args: {
      icon: <TrashIcon />,
   },
   render: () => {
      return <IconButton disabled icon={<TrashIcon />} />
   },
}

export const AsLink: Story = {
   args: {
      icon: <TrashIcon />,
   },
   render: () => {
      return <IconButton as={'a'} href={'google.com'} icon={<TrashIcon />} />
   },
}
