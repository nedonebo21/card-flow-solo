import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from '@/shared/ui/radio-group'

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

const defaultOptions = [
   { value: 'default', label: 'Default' },
   { value: 'comfortable', label: 'Comfortable' },
   { value: 'compact', label: 'Compact' },
]

export const Vertical: Story = {
   args: { options: defaultOptions, orientation: 'vertical' },
}

export const Horizontal: Story = {
   args: { options: defaultOptions, orientation: 'horizontal' },
}

export const Disabled: Story = {
   args: { options: defaultOptions, orientation: 'vertical', disabled: true },
}
