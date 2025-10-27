import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Dropdown } from '@/shared/ui/dropdown/dropdown'
import {
   CirclePlayIcon,
   LogOutIcon,
   MoreVerticalIcon,
   PencilIcon,
   TrashIcon,
   UserFilledIcon,
} from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './dropdown.module.scss'

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
         <Dropdown open={isOpen} onOpenChange={setIsOpen}>
            <Dropdown.Trigger>
               <Button variant={'ghost'} size={'icon'}>
                  <MoreVerticalIcon width={24} height={24} />
               </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
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
            </Dropdown.Content>
         </Dropdown>
      )
   },
}

export const ProfileDemo: Story = {
   args: { children: '123' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      return (
         <Dropdown open={isOpen} onOpenChange={setIsOpen}>
            <Dropdown.Trigger>
               <TrashIcon width={36} height={36} />
            </Dropdown.Trigger>
            <Dropdown.Content>
               <Dropdown.Label>
                  <TrashIcon width={36} height={36} />
                  <div className={styles.info}>
                     <Typography variant={'subtitle2'} as={'span'} textAlign={'left'}>
                        Ivan
                     </Typography>
                     <Typography variant={'caption'} className={styles.email} textAlign={'left'}>
                        example@example.com
                     </Typography>
                  </div>
               </Dropdown.Label>
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
            </Dropdown.Content>
         </Dropdown>
      )
   },
}
