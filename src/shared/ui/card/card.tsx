import type { ComponentProps, ElementType } from 'react'

import { clsx } from 'clsx'

import styles from './card.module.scss'

export type CardOwnProps<T extends ElementType = ElementType> = {
   as?: T
   className?: string
}

export type CardProps<T extends ElementType = ElementType> = CardOwnProps<T> &
   Omit<ComponentProps<T>, keyof CardOwnProps>

export const Card = <T extends ElementType = 'div'>({ as, className, ...rest }: CardProps<T>) => {
   const Component = as ?? 'div'

   return <Component className={clsx(styles.card, className)} {...rest} />
}
