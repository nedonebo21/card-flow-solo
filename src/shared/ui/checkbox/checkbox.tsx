import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { type ReactNode, useId } from 'react'

import { clsx } from 'clsx'

import { CheckIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './checkbox.module.scss'

export type CheckboxProps = {
   children?: ReactNode
   label?: string
} & RadixCheckboxProps

export const Checkbox = ({
   className,
   label,
   children,
   checked,
   id,
   disabled,
   ...rest
}: CheckboxProps) => {
   const generatedId = useId()
   const checkboxId = id ?? `checkbox-${generatedId}`

   return (
      <label className={styles.checkboxWrapper}>
         <RadixCheckbox.Root
            id={checkboxId}
            className={clsx(styles.checkbox, className)}
            disabled={disabled}
            {...rest}
         >
            <span className={styles.checkboxIndicator}>
               <RadixCheckbox.CheckboxIndicator>
                  <CheckIcon width={14} height={11} className={styles.checkboxIndicator} />
               </RadixCheckbox.CheckboxIndicator>
            </span>
         </RadixCheckbox.Root>
         {(label || children) && (
            <Typography
               variant={'body2'}
               as={'label'}
               htmlFor={checkboxId}
               className={styles.checkboxLabel}
               aria-disabled={!!disabled}
            >
               {label || children}
            </Typography>
         )}
      </label>
   )
}
