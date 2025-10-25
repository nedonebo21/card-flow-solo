import type { ComponentProps } from 'react'

import * as RadixSelect from '@radix-ui/react-select'

import { clsx } from 'clsx'

import { ChevronUpIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './select.module.scss'

export type SelectOption = {
   value: string
   label: string
   disabled?: boolean
}

export type SelectProps = {
   label?: string
   placeholder?: string
   options: SelectOption[]
   wrapperProps?: ComponentProps<'div'>
   className?: string
   errorMessage?: string
} & Omit<ComponentProps<typeof RadixSelect.Root>, 'children' | 'asChild'>

export const Select = ({
   label,
   placeholder,
   options,
   wrapperProps,
   errorMessage,
   open,
   ...rest
}: SelectProps) => {
   const isError = !!errorMessage && errorMessage?.length > 0

   return (
      <div {...wrapperProps} className={clsx(wrapperProps?.className)}>
         {!!label && (
            <Typography variant={'body2'} as={'label'} className={styles.selectLabel}>
               {label}
            </Typography>
         )}
         <RadixSelect.Root open={open} {...rest}>
            <RadixSelect.Trigger className={clsx(styles.selectTrigger, isError && styles.error)}>
               <RadixSelect.Value
                  className={styles.selectValue}
                  placeholder={placeholder ?? 'Select'}
               />
               <RadixSelect.Icon className={styles.iconWrapper}>
                  <ChevronUpIcon
                     className={clsx(styles.selectIcon, open && styles.openedSelectIcon)}
                     width={16}
                     height={16}
                  />
               </RadixSelect.Icon>
            </RadixSelect.Trigger>
            <RadixSelect.Portal>
               <RadixSelect.Content
                  className={clsx(styles.selectContent, isError && styles.error)}
                  position={'popper'}
               >
                  <RadixSelect.ScrollUpButton />
                  <RadixSelect.Viewport className={styles.selectViewport}>
                     {options.map(option => (
                        <RadixSelect.Item
                           key={option.value}
                           value={option.value}
                           disabled={option.disabled}
                           className={styles.selectItem}
                        >
                           <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                        </RadixSelect.Item>
                     ))}
                  </RadixSelect.Viewport>
                  <RadixSelect.ScrollDownButton />
               </RadixSelect.Content>
            </RadixSelect.Portal>
         </RadixSelect.Root>
         {isError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </div>
   )
}
