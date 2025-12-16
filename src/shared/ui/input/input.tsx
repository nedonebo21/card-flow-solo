import type { ComponentProps, ReactNode } from 'react'

import { useId } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui'

import styles from './input.module.scss'

export type InputProps = {
   label?: string
   errorMessage?: string
   startIcon?: ReactNode
   endIcon?: ReactNode
   wrapperProps?: ComponentProps<'label'>
} & ComponentProps<'input'>

export const Input = ({
   errorMessage,
   label,
   startIcon,
   endIcon,
   className,
   wrapperProps,
   id,
   ...rest
}: InputProps) => {
   const generatedId = useId()
   const inputId = id ?? `input-${generatedId}`

   const { className: wrapperClassName, ...restWrapperProps } = wrapperProps || {}

   const isError = errorMessage && errorMessage?.length > 0

   return (
      <div className={className}>
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
         <label className={clsx(styles.inputWrapper, wrapperClassName)} {...restWrapperProps}>
            {!!startIcon && <span className={styles.iconWrapper}>{startIcon}</span>}

            <input className={clsx(styles.input, isError && styles.error)} {...rest} id={inputId} />

            {!!endIcon && <span className={styles.iconWrapper}>{endIcon}</span>}
         </label>
         {isError && (
            <Typography
               key={`error-${new Date()}`}
               className={clsx(styles.error, 'animate__animated', 'animate__shakeX')}
               variant={'error'}
            >
               {errorMessage}
            </Typography>
         )}
      </div>
   )
}
