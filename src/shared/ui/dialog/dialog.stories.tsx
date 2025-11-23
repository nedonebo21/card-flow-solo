import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Checkbox, Input, Select } from '@/shared/ui'

import { Dialog } from './dialog'

const meta = {
   title: 'UI/Dialog',
   component: Dialog,
   parameters: { layout: 'centered', docs: { source: { type: 'code' } } },
   tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { children: 'test children', heading: 'title' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      const options = [
         { value: '1', label: '1' },
         { value: '2', label: '2' },
         { value: '3', label: '3' },
      ]

      return (
         <Dialog open={isOpen} onOpenChange={setIsOpen} heading={'Title'}>
            <Select options={options} />
            <Input label={'Input'} placeholder={'input'} />
            <Input label={'Input'} placeholder={'input'} />
            <Checkbox label={'Check-box'} />
         </Dialog>
      )
   },
}

export const WithCancel: Story = {
   args: { children: 'test children', heading: 'title' },
   render: () => {
      const [isOpen, setIsOpen] = useState(false)

      const options = [
         { value: '1', label: '1' },
         { value: '2', label: '2' },
         { value: '3', label: '3' },
      ]

      return (
         <Dialog
            open={isOpen}
            onOpenChange={setIsOpen}
            heading={'Title'}
            showCancelButton
            cancelButtonLabel={'Delete Account'}
            confirmButtonLabel={'Confirm action'}
         >
            <Select options={options} />
            <Input label={'Input'} placeholder={'input'} />
            <Input label={'Input'} placeholder={'input'} />
            <Checkbox label={'Check-box'} />
         </Dialog>
      )
   },
}
