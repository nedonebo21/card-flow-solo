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
   link1: 'span',
   link2: 'span',
   error: 'span',
   warning: 'span',
} as const satisfies Record<string, ElementType>

export type TypographyVariant = keyof typeof variantMapping

export type TypographyOwnProps<T extends ElementType = ElementType> = {
   as?: T
   children: ReactNode
   variant?: TypographyVariant
   textAlign?: 'center' | 'justify' | 'left' | 'right'
   noWrap?: boolean
}

export type TypographyProps<T extends ElementType> = TypographyOwnProps<T> &
   Omit<ComponentProps<T>, keyof TypographyOwnProps>

export const Typography = <T extends ElementType = 'p'>({
   as,
   variant = 'body1',
   textAlign = 'center',
   noWrap,
   className,
   ...rest
}: TypographyProps<T>) => {
   const classes = clsx(
      styles[variant],
      {
         'no-wrap': noWrap,
         'align-center': textAlign === 'center',
         'align-right': textAlign === 'right',
         'align-left': textAlign === 'left',
         'align-justify': textAlign === 'justify',
      },
      className
   )

   const componentTag = variantMapping[variant] ?? 'p'

   const Component = as ?? componentTag

   return <Component className={classes} {...rest} />
}
