import type { Meta, StoryObj } from '@storybook/react-vite'

import { useState } from 'react'

import { Tabs } from './tabs'

const meta = {
   title: 'UI/Tabs',
   component: Tabs,
   parameters: { layout: 'centered' },
   tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: { children: 'Default' },
   render: () => {
      return (
         <Tabs>
            <Tabs.List>
               <Tabs.Trigger value={'all'}>All</Tabs.Trigger>
               <Tabs.Trigger value={'my'}>My</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={'all'}>All Cards</Tabs.Content>
            <Tabs.Content value={'my'}>My Cards</Tabs.Content>
         </Tabs>
      )
   },
}

export const WithDefaultValue: Story = {
   args: { children: 'Default' },
   render: () => {
      return (
         <Tabs defaultValue={'all'}>
            <Tabs.List>
               <Tabs.Trigger value={'all'}>All</Tabs.Trigger>
               <Tabs.Trigger value={'my'}>My</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={'all'}>All Cards</Tabs.Content>
            <Tabs.Content value={'my'}>My Cards</Tabs.Content>
         </Tabs>
      )
   },
}

type User = {
   id: number
   name: string
   isFriend: boolean
}

const users: User[] = [
   { id: 1, name: 'Thomas Shelby', isFriend: true },
   { id: 2, name: 'Alex', isFriend: false },
   { id: 3, name: 'Innokentiy', isFriend: true },
   { id: 4, name: 'Boris', isFriend: false },
]

export const AsTabSwitcherOnly: Story = {
   args: { children: 'Default' },
   render: () => {
      const [filter, setFilter] = useState<'friends' | 'all'>('all')

      const filteredUsers = filter === 'friends' ? users.filter(u => u.isFriend) : users

      return (
         <div>
            <Tabs value={filter} onValueChange={value => setFilter(value as 'all' | 'friends')}>
               <Tabs.List>
                  <Tabs.Trigger value={'all'}>All</Tabs.Trigger>
                  <Tabs.Trigger value={'friends'}>Friends</Tabs.Trigger>
               </Tabs.List>
            </Tabs>
            <div>
               {filteredUsers.map(user => (
                  <div key={user.id} style={{ display: 'flex', gap: '10px' }}>
                     <span>{user.id}</span>
                     <span>{user.name}</span>
                     <span>{user.isFriend ? 'V' : 'X'}</span>
                  </div>
               ))}
            </div>
         </div>
      )
   },
}

export const Disabled: Story = {
   args: { children: 'Default' },
   render: () => {
      return (
         <Tabs defaultValue={'all'}>
            <Tabs.List>
               <Tabs.Trigger value={'all'}>All</Tabs.Trigger>
               <Tabs.Trigger disabled value={'my'}>
                  My
               </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={'all'}>All Cards</Tabs.Content>
            <Tabs.Content value={'my'}>My Cards</Tabs.Content>
         </Tabs>
      )
   },
}
