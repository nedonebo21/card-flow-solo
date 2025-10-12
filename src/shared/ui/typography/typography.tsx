import type { ComponentProps, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './typography.module.scss'

const variantMapping = {
   h1: 'h1',
   h2: 'h2',
   h3: 'h3',
   h4: 'h4',
   body1: 'p',
   body2: 'p',
   subtitle1: 'p',
   subtitle2: 'p',
   caption: 'span',
   overline: 'span',
   link1: 'a',
   link2: 'a',
   error: 'span',
   warning: 'span',
} as const satisfies Record<string, ElementType>

export type TypographyVariant = keyof typeof variantMapping
export type TypographyWeight = 'light' | 'regular' | 'medium' | 'bold'
export type TypographyColor = 'primary' | 'secondary' | 'inherit'

export type TypographyOwnProps<T extends ElementType = ElementType> = {
   as?: T
   children: ReactNode
   variant?: TypographyVariant
   weight?: TypographyWeight
   color?: TypographyColor
} & ComponentProps<'span'>

export type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
   Omit<ComponentProps<T>, keyof TypographyOwnProps>

const classes = ({
   variant = 'body1',
   weight = 'regular',
   color = 'primary',
   className,
}: {
   variant?: TypographyVariant
   weight?: TypographyWeight
   color?: TypographyColor
   className?: string
}) => clsx(styles.button, styles[variant], styles[weight], styles[color], className)

export const Typography = <T extends ElementType = ElementType>({
   as,
   variant = 'body1',
   weight = 'regular',
   color = 'inherit',
   children,
   className,
   ...rest
}: TypographyProps<T>) => {
   const Component = as || variantMapping[variant]

   return (
      <Component {...rest} className={classes({ variant, weight, color, className })}>
         {children}
      </Component>
   )
}
