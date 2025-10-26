import type { ComponentProps, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import { clsx } from 'clsx'

import { Card } from '@/shared/ui/card'

import styles from './dialog.module.scss'

type DialogProps = {
   className?: string
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDialog.Root>, 'asChild' | 'children'>

const Dialog = ({ className, children, ...rest }: DialogProps) => {
   return (
      <div className={clsx(styles.wrapper, className)}>
         <RadixDialog.Root {...rest}>{children}</RadixDialog.Root>
      </div>
   )
}

type DialogTrigger = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDialog.Trigger>, 'asChild' | 'children'>

const DialogTrigger = ({ children, className, ...rest }: DialogTrigger) => {
   return (
      <RadixDialog.Trigger
         className={clsx(styles.trigger, className)}
         {...rest}
         asChild={undefined}
      >
         {children}
      </RadixDialog.Trigger>
   )
}

const DialogPortal = RadixDialog.Portal

type DialogOverlayProps = Omit<ComponentProps<typeof RadixDialog.Overlay>, 'asChild' | 'children'>

const DialogOverlay = ({ className, ...rest }: DialogOverlayProps) => {
   return (
      <RadixDialog.Overlay
         className={clsx(styles.overlay, className)}
         {...rest}
         asChild={undefined}
      />
   )
}

type DialogContentProps = {
   children: ReactNode
} & Omit<ComponentProps<typeof RadixDialog.Content>, 'asChild' | 'children'>

const DialogContent = ({ children, className, ...rest }: DialogContentProps) => {
   return (
      <DialogPortal>
         <DialogOverlay />
         <RadixDialog.Content {...rest} asChild={undefined}>
            <Card className={clsx(styles.container, className)}>{children}</Card>
         </RadixDialog.Content>
      </DialogPortal>
   )
}

type DialogHeaderProps = {
   children: ReactNode
}

const DialogHeader = ({ children }: DialogHeaderProps) => {
   return <div className={styles.header}>{children}</div>
}

type DialogBodyProps = {
   className?: string
   children: ReactNode
}

const DialogBody = ({ children, className }: DialogBodyProps) => {
   return <div className={clsx(styles.content, className)}>{children}</div>
}

type DialogFooter = {
   children: ReactNode
}

const DialogFooter = ({ children }: DialogFooter) => {
   return <div className={styles.footer}>{children}</div>
}

type DialogCloseProps = {
   children: ReactNode
   className?: string
} & Omit<ComponentProps<typeof RadixDialog.Close>, 'asChild' | 'children'>

const DialogClose = ({ children, className, ...rest }: DialogCloseProps) => {
   return (
      <RadixDialog.Close className={clsx(styles.close, className)} {...rest} asChild={undefined}>
         {children}
      </RadixDialog.Close>
   )
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Close = DialogClose

export { Dialog }
