import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { CloseIcon, PencilIcon, TrashIcon } from '@/shared/ui/icons'
import { Input, InputEmail, InputPassword, InputSearch } from '@/shared/ui/input'

const meta = {
   title: 'UI/Input',
   component: Input,
   parameters: { layout: 'padded' },
   tags: ['autodocs'],
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {},
}

export const Password: Story = {
   render: () => <InputPassword />,
}

export const Search: Story = {
   render: () => <InputSearch />,
}

export const Email: Story = {
   render: () => <InputEmail />,
}

export const SearchWithClear: Story = {
   render: () => {
      const [value, setValue] = useState('Текст который можно стереть нажав на крестик -->')

      return (
         <InputSearch
            value={value}
            onClear={() => setValue('')}
            onChange={e => setValue(e.target.value)}
            endIcon={<CloseIcon fill={'currentColor'} width={20} height={20} />}
         />
      )
   },
}

export const WithLabel: Story = {
   render: () => <Input label={'Label text'} />,
}

export const WithStartIcon: Story = {
   render: () => <Input startIcon={<TrashIcon fill={'currentColor'} width={20} height={20} />} />,
}

export const WithEndIcon: Story = {
   render: () => <Input endIcon={<PencilIcon fill={'currentColor'} width={20} height={20} />} />,
}

export const Disabled: Story = {
   render: () => (
      <Input
         disabled
         value={'Text'}
         startIcon={<PencilIcon fill={'currentColor'} width={20} height={20} />}
      />
   ),
}

export const Error: Story = {
   render: () => (
      <Input
         error
         value={'Value'}
         startIcon={<PencilIcon fill={'currentColor'} width={20} height={20} />}
      />
   ),
}
