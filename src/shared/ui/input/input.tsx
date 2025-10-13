import type { ComponentProps, ReactNode } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './input.module.scss'

export type InputProps = {
   label?: string
   error?: boolean
   errorMessage?: string
   startIcon?: ReactNode
   endIcon?: ReactNode
} & ComponentProps<'input'>

export const Input = ({
   error = false,
   errorMessage,
   label,
   startIcon,
   endIcon,
   className = '',
   value,
   id,
   ...rest
}: InputProps) => {
   const inputId = id || rest.name || `input-${Math.random().toString(36).slice(2, 9)}`

   const isError = error && errorMessage

   return (
      <>
         {label && (
            <Typography
               htmlFor={inputId}
               className={styles.inputLabel}
               variant={'body2'}
               as={'label'}
            >
               {label}
            </Typography>
         )}
         <div className={styles.inputWrapper}>
            {startIcon && <span className={styles.startIcon}>{startIcon}</span>}

            <input
               {...rest}
               value={value}
               id={inputId}
               className={clsx(styles.input, error && styles.error, className)}
            />

            {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
         </div>
         {isError && <Typography variant={'error'}>{errorMessage}</Typography>}
      </>
   )
}
