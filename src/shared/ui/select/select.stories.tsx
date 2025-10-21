import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Select } from '@/shared/ui/select'

const meta = {
   title: 'UI/Select',
   component: Select,
   parameters: { layout: 'padded' },
   tags: ['autodocs'],
   argTypes: {
      disabled: {
         control: 'boolean',
      },
   },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const items = [
   { value: '1', label: 'Select #1' },
   { value: '2', label: 'Select #2' },
   { value: '3', label: 'Select #3' },
]

export const Default: Story = {
   args: { items },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select items={items} open={open} onOpenChange={setOpen} />
   },
}

export const WithLabel: Story = {
   args: { items },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select label={'Select-box'} items={items} open={open} onOpenChange={setOpen} />
   },
}

export const Disabled: Story = {
   args: { items },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select disabled items={items} open={open} onOpenChange={setOpen} />
   },
}
