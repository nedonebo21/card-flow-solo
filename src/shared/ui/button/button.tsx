import type { ComponentProps, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './button.module.scss'

const buttonVariants = ({
   variant = 'primary',
   fullWidth = false,
   className,
}: {
   variant?: 'primary' | 'secondary' | 'link'
   fullWidth?: boolean
   className?: string
}) => clsx(styles.button, styles[variant], fullWidth && styles.fullWidth, className)

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

   return <Component {...rest} className={buttonVariants({ variant, fullWidth, className })} />
}
