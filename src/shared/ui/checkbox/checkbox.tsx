import type { CheckboxProps as RadixCheckboxProps } from '@radix-ui/react-checkbox'
import type { ReactNode } from 'react'

import { Checkbox as RadixCheckbox } from '@radix-ui/react-checkbox'

import { clsx } from 'clsx'

import { CheckIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './checkbox.module.scss'

export type CheckboxProps = {
   children?: ReactNode
   label?: string
} & RadixCheckboxProps

export const Checkbox = ({ className, label, children, checked, id, ...rest }: CheckboxProps) => {
   const checkboxId = id || rest.name || `checkbox-${Math.random().toString(36).slice(2, 9)}`

   return (
      <label className={styles.checkboxWrapper}>
         <RadixCheckbox {...rest} id={checkboxId} className={clsx(styles.checkbox, className)}>
            <span className={styles.checkboxIndicator}>
               {checked && (
                  <CheckIcon width={14} height={11} className={styles.checkboxIndicator} />
               )}
            </span>
         </RadixCheckbox>
         {(label || children) && (
            <Typography
               variant={'body2'}
               as={'label'}
               htmlFor={checkboxId}
               className={styles.checkboxLabel}
               aria-disabled={!!rest.disabled}
            >
               {label || children}
            </Typography>
         )}
      </label>
   )
}
