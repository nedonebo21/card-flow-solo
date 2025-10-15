import { type ComponentProps, type ReactNode, useId } from 'react'

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
   id,
   ...rest
}: InputProps) => {
   const generatedId = useId()
   const inputId = id ?? `input-${generatedId}`

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
               className={clsx(styles.input, error && styles.error, className)}
               {...rest}
               id={inputId}
            />

            {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
         </div>
         {error && <Typography variant={'error'}>{errorMessage ?? 'invalid value'}</Typography>}
      </>
   )
}
