import type { ComponentProps, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Typography } from '@/shared/ui/typography'

import styles from './dropdown.module.scss'

type DropdownProps = {
   trigger?: ReactNode
   alignItems?: ComponentProps<typeof RadixDropdown.Content>['align']
   sideOffset?: ComponentProps<typeof RadixDropdown.Content>['sideOffset']
} & Omit<ComponentProps<typeof RadixDropdown.Root>, 'asChild'>

const Dropdown = ({
   children,
   trigger,
   alignItems = 'end',
   sideOffset = 1,
   ...rest
}: DropdownProps) => {
   const buttonVariant = trigger ? 'ghost' : 'primary'
   const buttonSize = trigger ? 'icon' : 'default'
   const buttonClassname = trigger ? styles.triggerIcon : styles.triggerDefault

   return (
      <RadixDropdown.Root {...rest}>
         <RadixDropdown.Trigger className={styles.trigger} asChild>
            <Button variant={buttonVariant} size={buttonSize} className={buttonClassname}>
               {trigger ?? 'Open Dropdown'}
            </Button>
         </RadixDropdown.Trigger>
         <RadixDropdown.Portal>
            <RadixDropdown.Content
               sideOffset={sideOffset}
               align={alignItems}
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

type DropdownLabelProps = {
   email: string
   nickname: string
   avatarUrl?: string
} & Omit<ComponentProps<typeof RadixDropdown.Label>, 'asChild'>

const DropdownLabel = ({ className, avatarUrl, nickname, email, ...rest }: DropdownLabelProps) => {
   const hasAvatar = !!avatarUrl && avatarUrl.length > 0

   return (
      <RadixDropdown.Label className={clsx(styles.label)} {...rest}>
         <div className={styles.avatar}>
            {hasAvatar && <img src={avatarUrl} alt={'userAvatar'} />}
         </div>
         <div className={styles.info}>
            <Typography variant={'subtitle2'} as={'span'} textAlign={'left'}>
               {nickname}
            </Typography>
            <Typography variant={'caption'} className={styles.email} textAlign={'left'}>
               {email}
            </Typography>
         </div>
      </RadixDropdown.Label>
   )
}

type DropdownItemProps = Omit<ComponentProps<typeof RadixDropdown.Item>, 'asChild'>

const DropdownItem = ({ className, ...rest }: DropdownItemProps) => {
   return (
      <>
         <RadixDropdown.Separator className={styles.separator} />
         <RadixDropdown.Item className={clsx(styles.item, className)} {...rest} />
      </>
   )
}

Dropdown.Label = DropdownLabel
Dropdown.Item = DropdownItem

export { Dropdown }
