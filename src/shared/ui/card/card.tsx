import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './card.module.scss'

type CardProps<T extends ElementType = ElementType> = {
   as?: T
   className?: string
   children?: ReactNode
} & ComponentPropsWithoutRef<T>

export const Card = ({ as, className, children, ...rest }: CardProps) => {
   const Component = as || 'div'

   return (
      <Component className={clsx(styles.card, className)} {...rest}>
         {children}
      </Component>
   )
}
