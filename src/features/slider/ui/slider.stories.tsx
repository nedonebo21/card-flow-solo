import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Slider } from '@/features/slider/ui/slider'

const meta = {
   title: 'Navigation/Slider',
   component: Slider,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { values: [1, 15], onValueChange: () => {} },
   render: _args => {
      const [values, setValues] = useState([10, 20])

      const onValueChange = (newValues: number[]) => {
         setValues(newValues)
      }

      return <Slider onValueChange={onValueChange} values={values} min={1} max={10} />
   },
}
