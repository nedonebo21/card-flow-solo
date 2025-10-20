import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { type ComponentProps, useId } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './radio-group.module.scss'

type RadioOption = {
   value: string
   label: string
   disabled?: boolean
}

type RadioGroupProps = {
   options: RadioOption[]
   orientation?: 'horizontal' | 'vertical'
   wrapperProps?: ComponentProps<'div'>
} & Omit<ComponentProps<typeof RadixRadioGroup.Root>, 'asChild' | 'children'>

export const RadioGroup = ({
   className,
   id,
   orientation = 'vertical',
   wrapperProps,
   options,
   ...rest
}: RadioGroupProps) => {
   const generatedId = useId()
   const groupId = id ?? `radio-group-${generatedId}`

   return (
      <div className={clsx(styles.radioGroupWrapper, wrapperProps?.className)} {...wrapperProps}>
         <RadixRadioGroup.Root
            id={groupId}
            className={clsx(styles.radioGroup, styles[orientation], className)}
            {...rest}
            asChild={undefined}
         >
            {options.map(option => (
               <RadixRadioGroup.Item
                  key={option.value}
                  className={styles.radioItem}
                  value={option.value}
                  disabled={option.disabled}
               >
                  <span className={styles.radioIndicatorWrapper}>
                     <RadixRadioGroup.Indicator className={styles.radioIndicator} />
                  </span>
                  <Typography variant={'body2'} as={'span'} className={styles.radioLabel}>
                     {option.label}
                  </Typography>
               </RadixRadioGroup.Item>
            ))}
         </RadixRadioGroup.Root>
      </div>
   )
}
