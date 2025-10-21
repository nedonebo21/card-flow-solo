import type { ComponentProps, ElementType, ReactElement } from 'react'

import { clsx } from 'clsx'

import styles from './icon-button.module.scss'

type IconButtonOwnProps<T extends ElementType = ElementType> = {
   as?: T
   icon: ReactElement
}

export type IconButtonProps<T extends ElementType> = IconButtonOwnProps<T> &
   Omit<ComponentProps<T>, keyof IconButtonOwnProps>

export const IconButton = <T extends ElementType = 'button'>({
   as,
   icon,
   className,
   ...rest
}: IconButtonProps<T>) => {
   const Component = as ?? 'button'

   return (
      <Component className={clsx(styles.iconButton, className)} {...rest}>
         {icon}
      </Component>
   )
}
