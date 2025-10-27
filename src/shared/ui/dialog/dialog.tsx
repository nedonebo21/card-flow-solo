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

const DialogTrigger = ({ className, ...rest }: DialogTrigger) => {
   return (
      <RadixDialog.Trigger
         className={clsx(styles.trigger, className)}
         {...rest}
         asChild={undefined}
      />
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
   className?: string
}

const DialogHeader = ({ className, ...rest }: DialogHeaderProps) => {
   return <div className={clsx(styles.header, className)} {...rest} />
}

type DialogBodyProps = {
   className?: string
   children: ReactNode
}

const DialogBody = ({ className, ...rest }: DialogBodyProps) => {
   return <div className={clsx(styles.content, className)} {...rest} />
}

type DialogFooter = {
   children: ReactNode
   className?: string
}

const DialogFooter = ({ className, ...rest }: DialogFooter) => {
   return <div className={clsx(styles.footer, className)} {...rest} />
}

type DialogCloseProps = {
   children: ReactNode
   className?: string
} & Omit<ComponentProps<typeof RadixDialog.Close>, 'asChild' | 'children'>

const DialogClose = ({ className, ...rest }: DialogCloseProps) => {
   return (
      <RadixDialog.Close className={clsx(styles.close, className)} {...rest} asChild={undefined} />
   )
}

Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent
Dialog.Header = DialogHeader
Dialog.Body = DialogBody
Dialog.Footer = DialogFooter
Dialog.Close = DialogClose

export { Dialog }
