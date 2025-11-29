import type { ComponentProps, ReactNode } from 'react'

import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import { clsx } from 'clsx'

import { Button, Card, Typography } from '@/shared/ui'

import styles from './dropdown.module.scss'

type DropdownProps = {
   triggerIcon?: string | null
   triggerButton?: ReactNode
   name?: string
   alignItems?: ComponentProps<typeof RadixDropdown.Content>['align']
   sideOffset?: ComponentProps<typeof RadixDropdown.Content>['sideOffset']
} & Omit<ComponentProps<typeof RadixDropdown.Root>, 'asChild'>

const Dropdown = ({
   children,
   triggerIcon,
   triggerButton,
   alignItems = 'end',
   sideOffset = 1,
   name,
   ...rest
}: DropdownProps) => {
   const buttonVariant = triggerIcon || triggerButton ? 'ghost' : 'primary'
   const buttonSize = triggerIcon || triggerButton ? 'icon' : 'default'
   const buttonClassname = triggerIcon || triggerButton ? styles.triggerIcon : styles.triggerDefault

   const defaultAvatar = name?.[0].toUpperCase()

   return (
      <RadixDropdown.Root {...rest}>
         <RadixDropdown.Trigger className={styles.trigger} asChild>
            <Button variant={buttonVariant} size={buttonSize} className={buttonClassname}>
               {triggerIcon && <img src={triggerIcon} alt={'avatar'} />}
               {triggerButton}
               {!triggerIcon && !triggerButton && <div>{defaultAvatar}</div>}
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
   const defaultAvatar = nickname?.[0].toUpperCase()

   return (
      <RadixDropdown.Label className={clsx(styles.label)} {...rest}>
         <div className={styles.avatar}>
            {hasAvatar ? (
               <img src={avatarUrl} alt={'userAvatar'} />
            ) : (
               <div className={styles.avatarIcon}>{defaultAvatar}</div>
            )}
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
