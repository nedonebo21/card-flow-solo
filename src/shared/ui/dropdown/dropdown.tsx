import type { ComponentProps, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { MoreVerticalIcon } from '@/shared/ui/icons'

import styles from './dropdown.module.scss'

type DropdownProps = {
   trigger?: ReactNode
} & Omit<ComponentProps<typeof RadixDropdown.Root>, 'asChild'>

const Dropdown = ({
   children,
   trigger = (
      <Button variant={'ghost'} size={'icon'}>
         <MoreVerticalIcon width={24} height={24} />
      </Button>
   ),
   ...rest
}: DropdownProps) => {
   return (
      <RadixDropdown.Root {...rest}>
         <RadixDropdown.Trigger className={styles.trigger}>{trigger}</RadixDropdown.Trigger>
         <RadixDropdown.Portal>
            <RadixDropdown.Content
               sideOffset={1}
               align={'end'}
               className={styles.container}
               {...rest}
            >
               <Card className={styles.content}>{children}</Card>
               <RadixDropdown.Arrow className={styles.arrow} />
            </RadixDropdown.Content>
         </RadixDropdown.Portal>
      </RadixDropdown.Root>
   )
}

type DropdownLabelProps = Omit<ComponentProps<typeof RadixDropdown.Label>, 'asChild'>

const DropdownLabel = ({ className, ...rest }: DropdownLabelProps) => {
   return <RadixDropdown.Label className={clsx(styles.label)} {...rest} />
}

type DropdownItemProps = Omit<ComponentProps<typeof RadixDropdown.Item>, 'asChild'>

const DropdownItem = ({ className, ...rest }: DropdownItemProps) => {
   return <RadixDropdown.Item className={clsx(styles.item, className)} {...rest} />
}

Dropdown.Label = DropdownLabel
Dropdown.Item = DropdownItem

export { Dropdown }
