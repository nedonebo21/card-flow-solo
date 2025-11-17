import type { ComponentProps, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { CloseIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './dialog.module.scss'

type DialogProps = {
   className?: string
   trigger?: ReactNode
   heading: string
   showCancelButton?: boolean
   cancelButtonLabel?: string
   confirmButtonLabel?: string
} & Omit<ComponentProps<typeof RadixDialog.Root>, 'asChild'>

export const Dialog = ({
   className,
   children,
   trigger = <Button>Open Modal</Button>,
   heading,
   showCancelButton = false,
   cancelButtonLabel = 'Cancel',
   confirmButtonLabel = 'Confirm',
   ...rest
}: DialogProps) => {
   return (
      <RadixDialog.Root {...rest}>
         <RadixDialog.Trigger className={styles.trigger} asChild>
            {trigger}
         </RadixDialog.Trigger>
         <RadixDialog.Portal>
            <RadixDialog.Overlay />
            <RadixDialog.Content {...rest} asChild={undefined}>
               <Card className={clsx(styles.container, className)}>
                  <div className={styles.header}>
                     <Typography variant={'h3'}>{heading}</Typography>
                     <RadixDialog.Close asChild>
                        <Button variant={'ghost'} size={'icon'}>
                           <CloseIcon width={20} height={20} />
                        </Button>
                     </RadixDialog.Close>
                  </div>
                  <div className={styles.content}>{children}</div>
                  <div className={clsx(styles.footer, showCancelButton && styles.footerCancel)}>
                     {showCancelButton && (
                        <RadixDialog.Close>
                           <Button variant={'secondary'}>{cancelButtonLabel}</Button>
                        </RadixDialog.Close>
                     )}
                     <Button>{confirmButtonLabel}</Button>
                  </div>
               </Card>
            </RadixDialog.Content>
         </RadixDialog.Portal>
      </RadixDialog.Root>
   )
}
