import type { ComponentProps, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './card.module.scss'

export type CardOwnProps<T extends ElementType = ElementType> = {
   as?: T
   className?: string
   children?: ReactNode
} & ComponentProps<'div'>

export type CardProps<T extends ElementType = ElementType> = CardOwnProps<T> &
   Omit<ComponentProps<T>, keyof CardOwnProps>

export const Card = <T extends ElementType = 'div'>({
   as,
   className,
   children,
   ...rest
}: CardProps<T>) => {
   const Component = as || 'div'

   return (
      <Component className={clsx(styles.card, className)} {...rest}>
         {children}
      </Component>
   )
}
