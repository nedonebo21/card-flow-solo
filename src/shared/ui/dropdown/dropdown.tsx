import type { ComponentProps, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import { clsx } from 'clsx'

import { Card } from '@/shared/ui/card'

import styles from './dropdown.module.scss'

type DropdownProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Root>, 'asChild' | 'children'>

const Dropdown = ({ ...rest }: DropdownProps) => {
   return <RadixDropdown.Root {...rest} />
}

type DropdownTriggerProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Trigger>, 'children' | 'asChild'>

export const DropdownTrigger = ({ className, ...rest }: DropdownTriggerProps) => {
   return (
      <RadixDropdown.Trigger
         className={clsx(styles.trigger, className)}
         {...rest}
         asChild={undefined}
      />
   )
}

type DropdownContentProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Content>, 'asChild' | 'children'>

export const DropdownContent = ({ className, children, ...rest }: DropdownContentProps) => {
   return (
      <RadixDropdown.Portal>
         <RadixDropdown.Content sideOffset={1} align={'end'} className={styles.container} {...rest}>
            <Card className={clsx(styles.content, className)}>{children}</Card>
            <RadixDropdown.Arrow className={styles.arrow} />
         </RadixDropdown.Content>
      </RadixDropdown.Portal>
   )
}

type DropdownLabelProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Label>, 'asChild' | 'children'>

const DropdownLabel = ({ className, ...rest }: DropdownLabelProps) => {
   return <RadixDropdown.Label className={clsx(styles.label)} {...rest} />
}

type DropdownItemProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Item>, 'asChild' | 'children'>

const DropdownItem = ({ className, children, ...rest }: DropdownItemProps) => {
   return (
      <RadixDropdown.Item className={clsx(styles.item, className)} {...rest}>
         {children}
      </RadixDropdown.Item>
   )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Label = DropdownLabel
Dropdown.Item = DropdownItem

export { Dropdown }
