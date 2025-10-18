import type { ComponentProps, ReactNode } from 'react'

import { useId } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './input.module.scss'

export type InputProps = {
   label?: string
   errorMessage?: string
   startIcon?: ReactNode
   endIcon?: ReactNode
} & ComponentProps<'input'>

export const Input = ({
   errorMessage,
   label,
   startIcon,
   endIcon,
   className,
   id,
   ...rest
}: InputProps) => {
   const generatedId = useId()
   const inputId = id ?? `input-${generatedId}`

   const isError = errorMessage && errorMessage?.length > 0

   return (
      <div>
         {!!label && (
            <Typography
               htmlFor={inputId}
               className={styles.inputLabel}
               variant={'body2'}
               as={'label'}
            >
               {label}
            </Typography>
         )}
         <label className={styles.inputWrapper}>
            {!!startIcon && <span className={styles.iconWrapper}>{startIcon}</span>}

            <input
               className={clsx(styles.input, isError && styles.error, className)}
               {...rest}
               id={inputId}
            />

            {!!endIcon && <span className={styles.iconWrapper}>{endIcon}</span>}
         </label>
         {isError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </div>
   )
}
