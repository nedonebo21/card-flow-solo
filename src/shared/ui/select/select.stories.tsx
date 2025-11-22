import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Select } from '@/shared/ui'

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

const options = [
   { value: '1', label: 'Select #1' },
   { value: '2', label: 'Select #2' },
   { value: '3', label: 'Select #3' },
]

export const Default: Story = {
   args: { options },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select options={options} open={open} onOpenChange={setOpen} />
   },
}

export const WithLabel: Story = {
   args: { options },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select label={'Select-box'} options={options} open={open} onOpenChange={setOpen} />
   },
}

export const WithError: Story = {
   args: { options },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select errorMessage={'Error'} options={options} open={open} onOpenChange={setOpen} />
   },
}

export const WithDisabledOption: Story = {
   args: { options },
   render: () => {
      const [open, setOpen] = useState(false)
      const options = [
         { value: '1', label: 'Select #1' },
         { value: '2', label: 'Select #2', disabled: true },
         { value: '3', label: 'Select #3' },
      ]

      return <Select options={options} open={open} onOpenChange={setOpen} />
   },
}

export const Disabled: Story = {
   args: { options },
   render: () => {
      const [open, setOpen] = useState(false)

      return <Select disabled options={options} open={open} onOpenChange={setOpen} />
   },
}
