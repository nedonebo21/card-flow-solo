import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { RadioGroup } from '@/shared/ui'

const meta = {
   title: 'UI/RadioGroup',
   component: RadioGroup,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      orientation: {
         control: { type: 'radio' },
         options: ['vertical', 'horizontal'],
      },
      disabled: {
         control: 'boolean',
      },
   },
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

const options = [
   { value: '1', label: 'Default' },
   { value: '2', label: 'Comfortable' },
   { value: '3', label: 'Compact' },
]

export const Vertical: Story = {
   args: { options },
   render: () => {
      const [selected, setSelected] = useState('1')

      return <RadioGroup options={options} value={selected} onValueChange={setSelected} />
   },
}

export const Horizontal: Story = {
   args: { options },
   render: () => {
      const [selected, setSelected] = useState('2')

      return (
         <RadioGroup
            options={options}
            orientation={'horizontal'}
            value={selected}
            onValueChange={setSelected}
         />
      )
   },
}

export const WithError: Story = {
   args: { options },
   render: () => {
      const [selected, setSelected] = useState('2')

      return (
         <RadioGroup
            errorMessage={'Error!'}
            options={options}
            orientation={'vertical'}
            value={selected}
            onValueChange={setSelected}
         />
      )
   },
}

export const WithOneOptionDisabled: Story = {
   args: { options },
   render: () => {
      const [selected, setSelected] = useState('3')
      const optionsWithDisabled = [
         { value: '1', label: 'Default' },
         { value: '2', label: 'Comfortable', disabled: true },
         { value: '3', label: 'Compact' },
      ]

      return (
         <RadioGroup
            options={optionsWithDisabled}
            orientation={'vertical'}
            value={selected}
            onValueChange={setSelected}
         />
      )
   },
}

export const Disabled: Story = {
   args: { options },
   render: () => {
      const [selected, setSelected] = useState('3')

      return (
         <RadioGroup
            disabled
            options={options}
            orientation={'vertical'}
            value={selected}
            onValueChange={setSelected}
         />
      )
   },
}
