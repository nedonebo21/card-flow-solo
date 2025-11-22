import type { ComponentProps } from 'react'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { useId } from 'react'

import { clsx } from 'clsx'

import { CheckIcon, Typography } from '@/shared/ui'

import styles from './checkbox.module.scss'

export type CheckboxProps = {
   label?: string
   wrapperProps?: ComponentProps<'div'>
} & Omit<ComponentProps<typeof RadixCheckbox.Root>, 'asChild' | 'children'>

export const Checkbox = ({
   className,
   disabled,
   id,
   label,
   wrapperProps,
   ...rest
}: CheckboxProps) => {
   const generatedId = useId()
   const checkboxId = id ?? `checkbox-${generatedId}`

   return (
      <div className={clsx(styles.checkboxWrapper, wrapperProps?.className)} {...wrapperProps}>
         <RadixCheckbox.Root
            id={checkboxId}
            className={clsx(styles.checkbox, className)}
            disabled={disabled}
            aria-disabled={disabled}
            {...rest}
            asChild={undefined}
         >
            <span className={styles.checkboxIndicator}>
               <RadixCheckbox.CheckboxIndicator>
                  <CheckIcon width={14} height={11} className={styles.checkboxIndicator} />
               </RadixCheckbox.CheckboxIndicator>
            </span>
         </RadixCheckbox.Root>
         {!!label && (
            <Typography
               variant={'body2'}
               as={'label'}
               htmlFor={checkboxId}
               className={styles.checkboxLabel}
               aria-disabled={disabled}
            >
               {label}
            </Typography>
         )}
      </div>
   )
}
