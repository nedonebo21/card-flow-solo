import type { ComponentProps, ReactNode } from 'react'

import * as RadixDialog from '@radix-ui/react-dialog'

import { clsx } from 'clsx'

import { Button, Card, Typography, CloseIcon } from '@/shared/ui'

import styles from './dialog.module.scss'

type DialogProps = {
   className?: string
   trigger?: ReactNode
   heading: string
   showCancelButton?: boolean
   cancelButtonLabel?: string
   confirmButtonLabel?: string
   confirmButtonFormId?: string
   onConfirm?: () => void
   isConfirmDisabled?: boolean
} & Omit<ComponentProps<typeof RadixDialog.Root>, 'asChild'>

export const Dialog = ({
   className,
   children,
   trigger = <Button>Open Modal</Button>,
   heading,
   showCancelButton = false,
   cancelButtonLabel = 'Cancel',
   confirmButtonLabel = 'Confirm',
   confirmButtonFormId,
   onConfirm,
   isConfirmDisabled = false,
   ...rest
}: DialogProps) => {
   const isConfirmButtonSubmit = !!confirmButtonFormId

   const handleConfirm = () => {
      onConfirm?.()
   }

   return (
      <RadixDialog.Root {...rest}>
         <RadixDialog.Trigger className={styles.trigger} asChild>
            {trigger}
         </RadixDialog.Trigger>
         <RadixDialog.Portal>
            <RadixDialog.Overlay />
            <RadixDialog.Content>
               <Card className={clsx(styles.container, className)}>
                  <div className={styles.header}>
                     <Typography variant={'h3'} as={RadixDialog.Title}>
                        {heading}
                     </Typography>
                     <RadixDialog.Close asChild>
                        <Button variant={'ghost'} size={'icon'}>
                           <CloseIcon width={20} height={20} />
                        </Button>
                     </RadixDialog.Close>
                  </div>
                  <div className={clsx(styles.main, 'thin-scroll-container')}>
                     <div className={styles.content}>{children}</div>
                     <div className={clsx(styles.footer, showCancelButton && styles.footerCancel)}>
                        {showCancelButton && (
                           <RadixDialog.Close asChild>
                              <Button variant={'secondary'}>{cancelButtonLabel}</Button>
                           </RadixDialog.Close>
                        )}
                        <Button
                           disabled={isConfirmDisabled}
                           type={isConfirmButtonSubmit ? 'submit' : 'button'}
                           form={isConfirmButtonSubmit ? confirmButtonFormId : undefined}
                           onClick={handleConfirm}
                        >
                           {confirmButtonLabel}
                        </Button>
                     </div>
                  </div>
               </Card>
            </RadixDialog.Content>
         </RadixDialog.Portal>
      </RadixDialog.Root>
   )
}
