import type { ComponentProps, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './button.module.scss'

export type ButtonOwnProps<T extends ElementType = ElementType> = {
   as?: T
   children: ReactNode
   variant?: 'primary' | 'secondary'
   fullWidth?: boolean
}

export type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
   Omit<ComponentProps<T>, keyof ButtonOwnProps>

export const Button = <T extends ElementType = 'button'>({
   className,
   fullWidth,
   variant = 'primary',
   as,
   ...rest
}: ButtonProps<T>) => {
   const classes = clsx(
      styles.button,
      {
         [styles.primary]: variant === 'primary',
         [styles.secondary]: variant === 'secondary',
         fullWidth,
      },
      className
   )

   const Component = as ?? 'button'

   return <Component className={classes} {...rest} />
}
