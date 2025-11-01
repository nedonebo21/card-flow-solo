import type { ComponentProps, ReactNode } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'

import { clsx } from 'clsx'

import styles from './tabs.module.scss'

type TabsProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixTabs.Root>, 'children' | 'asChild'>

const Tabs = ({ className, ...rest }: TabsProps) => (
   <RadixTabs.Root className={clsx(styles.root, className)} {...rest} asChild={undefined} />
)

type TabsListProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixTabs.List>, 'children' | 'asChild'>

const TabsList = ({ className, ...rest }: TabsListProps) => {
   return <RadixTabs.List className={clsx(styles.list, className)} {...rest} asChild={undefined} />
}

type TabsTriggerProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixTabs.Trigger>, 'children' | 'asChild'>

const TabsTrigger = ({ className, disabled, ...rest }: TabsTriggerProps) => {
   return (
      <RadixTabs.Trigger
         className={clsx(styles.trigger, disabled && styles.disabled, className)}
         disabled={disabled}
         {...rest}
         asChild={undefined}
      />
   )
}

type TabsContentProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixTabs.Content>, 'children' | 'asChild'>

const TabsContent = ({ className, ...rest }: TabsContentProps) => {
   return (
      <RadixTabs.Content
         className={clsx(styles.content, className)}
         {...rest}
         asChild={undefined}
      />
   )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export { Tabs }
