import type { ComponentProps, ElementType, ReactNode } from 'react'

import styles from './button.module.scss'

export type ButtonOwnProps<T extends ElementType = ElementType> = {
   as?: T
   children: ReactNode
   variant?: 'primary' | 'secondary'
   fullWidth?: boolean
} & ComponentProps<'button'>

export type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
   Omit<ComponentProps<T>, keyof ButtonOwnProps>

export const Button = <T extends ElementType = 'button'>({
   className,
   fullWidth,
   variant = 'primary',
   as,
   ...rest
}: ButtonProps<T>) => {
   const Component = as || 'button'

   const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
      .filter(Boolean)
      .join(' ')

   return <Component className={classes} {...rest} />
}
