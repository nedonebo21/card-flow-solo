import type { ComponentProps, ElementType } from 'react'

import { clsx } from 'clsx'

import styles from './pagination.module.scss'

type PaginationItemOwnProps<T extends ElementType = ElementType> = {
   as?: T
   className?: string
}

export type PaginationItemProps<T extends ElementType = ElementType> = PaginationItemOwnProps<T> &
   Omit<ComponentProps<T>, keyof PaginationItemOwnProps>

export const PaginationNavItem = <T extends ElementType = 'li'>({
   className,
   as,
   ...rest
}: PaginationItemProps<T>) => {
   const Component = as ?? 'li'

   return <Component className={clsx(styles.paginationItem, className)} {...rest} />
}
