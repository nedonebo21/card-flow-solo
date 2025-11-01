import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { Dialog } from '@/shared/ui/dialog'
import { CloseIcon } from '@/shared/ui/icons'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'
import { Typography } from '@/shared/ui/typography'

const meta = {
   title: 'UI/Dialog',
   component: Dialog,
   parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
   tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { children: 'test children' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      const options = [
         { value: '1', label: '1' },
         { value: '2', label: '2' },
         { value: '3', label: '3' },
      ]

      return (
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Trigger>
               <Button>Show Modal</Button>
            </Dialog.Trigger>
            <Dialog.Content>
               <Dialog.Header>
                  <Typography variant={'h3'}>Title</Typography>
                  <Dialog.Close>
                     <Button variant={'ghost'} size={'icon'}>
                        <CloseIcon width={24} height={24} />
                     </Button>
                  </Dialog.Close>
               </Dialog.Header>
               <Dialog.Body>
                  <Select options={options} />
                  <Input label={'Input'} placeholder={'Input'} />
                  <Input label={'Input'} placeholder={'Input'} />
                  <Checkbox label={'Check-box'} />
               </Dialog.Body>
               <Dialog.Footer>
                  <Dialog.Close>
                     <Button variant={'secondary'}>Button Secondary</Button>
                  </Dialog.Close>
                  <Button>Button Primary</Button>
               </Dialog.Footer>
            </Dialog.Content>
         </Dialog>
      )
   },
}
