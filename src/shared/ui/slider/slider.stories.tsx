import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { action } from 'storybook/actions'

import { Slider } from '@/shared/ui/slider/slider'

const meta = {
   title: 'Navigation/Slider',
   component: Slider,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   args: { onValueCommit: () => {}, values: [1, 15] },
   argTypes: {
      max: { control: 'number' },
      min: { control: 'number' },
   },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   render: _args => {
      const [range, setRange] = useState([10, 20])

      const onValueCommit = (newValues: number[]) => {
         setRange(newValues)
         action('onValueCommit')(newValues)
      }

      return <Slider onValueCommit={onValueCommit} values={range} min={1} max={30} />
   },
}
