import type { Meta, StoryObj } from '@storybook/react-vite'

import { useArgs } from 'storybook/preview-api'

import { Checkbox } from './checkbox'

const meta = {
   title: 'UI/Checkbox',
   component: Checkbox,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      label: { control: 'text' },
      className: { control: 'text' },
   },
   args: { label: 'Check-box', checked: false },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { label: 'Check box' },
   render: args => {
      const [{ checked }, updateArgs] = useArgs()

      return (
         <Checkbox
            {...args}
            checked={checked}
            onCheckedChange={(value: never) => updateArgs({ checked: value as boolean })}
         />
      )
   },
}

export const Disabled: Story = {
   args: { label: 'Check box', disabled: true, checked: true },
   render: args => {
      const [{ checked }, updateArgs] = useArgs()

      return (
         <Checkbox
            {...args}
            checked={checked}
            onCheckedChange={(value: never) => updateArgs({ checked: value as boolean })}
         />
      )
   },
}
