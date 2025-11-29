import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import {
   Button,
   Typography,
   CirclePlayIcon,
   LogOutIcon,
   PencilIcon,
   TrashIcon,
   UserFilledIcon,
   MoreVerticalIcon,
} from '@/shared/ui'

import { Dropdown } from './dropdown'

const meta = {
   title: 'UI/Dropdown',
   component: Dropdown,
   parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
   tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { children: '123' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
         <Dropdown
            open={isOpen}
            onOpenChange={setIsOpen}
            triggerButton={<MoreVerticalIcon width={18} height={18} />}
         >
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <CirclePlayIcon width={16} height={16} />
                  <Typography variant={'caption'}>Learn</Typography>
               </Button>
            </Dropdown.Item>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <PencilIcon width={16} height={16} />
                  <Typography variant={'caption'}>Edit</Typography>
               </Button>
            </Dropdown.Item>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <TrashIcon width={16} height={16} />
                  <Typography variant={'caption'}>Delete</Typography>
               </Button>
            </Dropdown.Item>
         </Dropdown>
      )
   },
}

export const WithoutTriggerInProps: Story = {
   args: { children: '123' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
         <Dropdown open={isOpen} onOpenChange={setIsOpen}>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <CirclePlayIcon width={16} height={16} />
                  <Typography variant={'caption'}>Learn</Typography>
               </Button>
            </Dropdown.Item>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <PencilIcon width={16} height={16} />
                  <Typography variant={'caption'}>Edit</Typography>
               </Button>
            </Dropdown.Item>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <TrashIcon width={16} height={16} />
                  <Typography variant={'caption'}>Delete</Typography>
               </Button>
            </Dropdown.Item>
         </Dropdown>
      )
   },
}

export const ProfileDemo: Story = {
   args: { children: '123' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
         <Dropdown open={isOpen} onOpenChange={setIsOpen} name={'Ivan'}>
            <Dropdown.Label
               avatarUrl={'https://i.pinimg.com/736x/ac/c7/7f/acc77fc9e4be6f7f83de39486ff221f0.jpg'}
               nickname={'Ivan'}
               email={'example@domain.com'}
            />
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <UserFilledIcon width={16} height={16} />
                  <Typography variant={'caption'}>My Profile</Typography>
               </Button>
            </Dropdown.Item>
            <Dropdown.Item>
               <Button variant={'ghost'}>
                  <LogOutIcon width={16} height={16} />
                  <Typography variant={'caption'}>Sign Out</Typography>
               </Button>
            </Dropdown.Item>
         </Dropdown>
      )
   },
}
