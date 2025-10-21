import type { ComponentProps } from 'react'

import * as RadixSelect from '@radix-ui/react-select'
import { forwardRef } from 'react'

import { clsx } from 'clsx'

import { ChevronUpIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './select.module.scss'

export type SelectItem = {
   value: string
   label: string
}

export type SelectProps = {
   label?: string
   placeholder?: string
   items: SelectItem[]
   wrapperProps?: ComponentProps<'div'>
   className?: string
} & Omit<ComponentProps<typeof RadixSelect.Root>, 'children' | 'asChild'>

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
   ({ label, placeholder, items, wrapperProps, className, open, value, ...rest }, ref) => {
      const selectedItem = items.find(item => item.value === value)
      const placeholderText = placeholder ?? selectedItem?.label ?? items[0].label

      return (
         <div className={clsx(styles.selectWrapper, wrapperProps?.className)} {...wrapperProps}>
            {!!label && (
               <Typography variant={'body2'} as={'label'} className={styles.selectLabel}>
                  {label}
               </Typography>
            )}
            <RadixSelect.Root open={open} value={value} {...rest}>
               <RadixSelect.Trigger ref={ref} className={styles.selectTrigger}>
                  <RadixSelect.Value placeholder={placeholderText} />
                  <RadixSelect.Icon className={styles.iconWrapper}>
                     <ChevronUpIcon
                        className={clsx(styles.selectIcon, open && styles.openedSelectIcon)}
                        color={'currentColor'}
                        width={16}
                        height={16}
                     />
                  </RadixSelect.Icon>
               </RadixSelect.Trigger>
               <RadixSelect.Portal>
                  <RadixSelect.Content className={styles.selectContent} position={'popper'}>
                     <RadixSelect.Viewport className={styles.selectViewport}>
                        {items.map(item => (
                           <RadixSelect.Item
                              key={item.value}
                              value={item.value}
                              className={styles.selectItem}
                           >
                              <RadixSelect.ItemText>{item.label}</RadixSelect.ItemText>
                           </RadixSelect.Item>
                        ))}
                     </RadixSelect.Viewport>
                  </RadixSelect.Content>
               </RadixSelect.Portal>
            </RadixSelect.Root>
         </div>
      )
   }
)
