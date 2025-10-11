import type { Meta, StoryObj } from '@storybook/react-vite'

import { fn } from 'storybook/test'

import { Button } from '@/shared/ui/button'
import { LogOutIcon } from '@/shared/ui/icons'

const meta = {
   title: 'UI/Button',
   component: Button,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      variant: {
         options: ['primary', 'secondary'],
         control: { type: 'radio' },
      },
   },
   args: { onClick: fn(), disabled: false, fullWidth: false },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
   args: {
      variant: 'primary',
      children: 'Primary',
   },
}

export const Secondary: Story = {
   args: {
      variant: 'secondary',
      children: 'Secondary',
   },
}

export const PrimaryWithIcon: Story = {
   args: {
      variant: 'primary',
      children: (
         <>
            <LogOutIcon width={16} height={16} fill={'currentColor'} />
            With Icon
         </>
      ),
   },
}

export const SecondaryWithIcon: Story = {
   args: {
      variant: 'secondary',
      children: (
         <>
            <LogOutIcon width={16} height={16} fill={'currentColor'} />
            With Icon
         </>
      ),
   },
}

export const FullWidth: Story = {
   args: {
      variant: 'primary',
      children: 'Full Width',
      fullWidth: true,
   },
}

export const AsLink: Story = {
   args: {
      variant: 'primary',
      children: 'Link That Looks Like A Button',
      as: 'a',
   },
}
