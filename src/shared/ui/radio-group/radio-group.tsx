import type { ComponentProps } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './radio-group.module.scss'

type RadioOption = {
   value: string
   label: string
   disabled?: boolean
}

export type RadioGroupProps = {
   options: RadioOption[]
   wrapperProps?: ComponentProps<'div'>
   errorMessage?: string
} & Omit<ComponentProps<typeof RadixRadioGroup.Root>, 'asChild' | 'children'>

export const RadioGroup = ({
   className,
   id,
   disabled,
   orientation = 'vertical',
   wrapperProps,
   options,
   errorMessage,
   ...rest
}: RadioGroupProps) => {
   const isError = !!errorMessage && errorMessage?.length > 0

   return (
      <div {...wrapperProps} className={clsx(wrapperProps?.className)}>
         <RadixRadioGroup.Root
            className={clsx(styles.radioGroup, styles[orientation], className)}
            disabled={disabled}
            {...rest}
            asChild={undefined}
         >
            {options.map(option => (
               <label key={option.value} className={styles.label} aria-disabled={disabled}>
                  <RadixRadioGroup.Item
                     value={option.value}
                     disabled={option.disabled}
                     className={styles.radioItem}
                  >
                     <span className={styles.radioIndicatorWrapper}>
                        <RadixRadioGroup.Indicator className={styles.radioIndicator} />
                     </span>
                  </RadixRadioGroup.Item>
                  <Typography variant={'body2'} as={'span'} className={styles.radioLabel}>
                     {option.label}
                  </Typography>
               </label>
            ))}
         </RadixRadioGroup.Root>
         {isError && (
            <Typography variant={'error'} className={styles.errorMessage}>
               {errorMessage}
            </Typography>
         )}
      </div>
   )
}
