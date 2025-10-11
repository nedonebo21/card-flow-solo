import type { ComponentProps, ElementType, ReactNode } from 'react'

import styles from './typography.module.scss'

export type TypographyOwnProps<T extends ElementType = ElementType> = {
   as?: T
   children: ReactNode
   variant?:
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'body1'
      | 'body2'
      | 'subtitle1'
      | 'subtitle2'
      | 'caption'
      | 'overline'
      | 'link1'
      | 'link2'
      | 'error'
      | 'warning'
   weight?: 'light' | 'regular' | 'medium' | 'bold'
   color?: 'primary' | 'secondary' | 'inherit'
} & ComponentProps<'span'>

export type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
   Omit<ComponentProps<T>, keyof TypographyOwnProps>

type AllowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h6' | 'span' | 'p' | 'a'

const defaultTagValues: Record<NonNullable<TypographyOwnProps['variant']>, AllowedTags> = {
   h1: 'h1',
   h2: 'h2',
   h3: 'h3',
   h4: 'h4',
   body1: 'p',
   body2: 'p',
   subtitle1: 'h6',
   subtitle2: 'h6',
   caption: 'span',
   overline: 'span',
   link1: 'a',
   link2: 'a',
   error: 'span',
   warning: 'span',
}

export const Typography = <T extends ElementType>({
   as,
   variant = 'body1',
   weigth = 'regular',
   color = 'inherit',
   children,
   className,
   ...rest
}: TypographyProps<T>) => {
   const Component = as || defaultTagValues[variant]
   const classes = [styles.typography, styles[variant], styles[weigth], styles[color], className]
      .filter(Boolean)
      .join(' ')

   return (
      <Component className={classes} {...rest}>
         {children}
      </Component>
   )
}
