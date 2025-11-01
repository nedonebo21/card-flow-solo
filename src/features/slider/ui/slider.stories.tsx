import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Slider } from '@/features/slider/ui/slider'

const meta = {
   title: 'Navigation/Slider',
   component: Slider,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
   argTypes: {
      max: { control: 'number' },
      min: { control: 'number' },
   },
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { values: [1, 15], onValueChange: () => {} },
   render: _args => {
      const [range, setRange] = useState([10, 20])

      const onValueChange = (newValues: number[]) => {
         setRange(newValues)
      }

      return <Slider onValueChange={onValueChange} values={range} min={1} max={30} />
   },
}

export const Disabled: Story = {
   args: { values: [1, 15], onValueChange: () => {} },
   render: _args => {
      const [range, setRange] = useState([10, 20])

      const onValueChange = (newValues: number[]) => {
         setRange(newValues)
      }

      return <Slider disabled onValueChange={onValueChange} values={range} min={1} max={30} />
   },
}
