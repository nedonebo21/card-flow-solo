import type { ComponentProps, ReactNode, ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './table.module.scss'

type TableProps = {
   children: ReactNode
} & Omit<ComponentProps<'table'>, 'children'>

export const Table = ({ className, ...rest }: TableProps) => {
   return <table className={clsx(styles.table, className)} {...rest} />
}

type TableHeaderProps = {
   children: ReactNode
} & Omit<ComponentPropsWithoutRef<'thead'>, 'children'>

export const TableHeader = ({ className, children, ...rest }: TableHeaderProps) => {
   return (
      <thead className={clsx(styles.thead, className)} {...rest}>
         <TableRow>{children}</TableRow>
      </thead>
   )
}

type TableHeadCellProps = {
   children: ReactNode
} & Omit<ComponentProps<'th'>, 'children'>

export const TableHeadCell = ({ className, ...rest }: TableHeadCellProps) => {
   return (
      <Typography
         as={'th'}
         variant={'subtitle2'}
         textAlign={'left'}
         className={clsx(styles.th, className)}
         {...rest}
      />
   )
}

type TableBodyProps = {
   children: ReactNode
} & Omit<ComponentProps<'tbody'>, 'children'>

export const TableBody = ({ className, ...rest }: TableBodyProps) => {
   return <tbody className={clsx(styles.tbody, className)} {...rest} />
}

type TableCellProps = {
   children: ReactNode
} & Omit<ComponentProps<'td'>, 'children'>

export const TableCell = ({ className, ...rest }: TableCellProps) => {
   return <td className={clsx(styles.td, className)} {...rest} />
}

type TableRowProps = {
   children: ReactNode
} & Omit<ComponentProps<'tr'>, 'children'>

export const TableRow = ({ className, ...rest }: TableRowProps) => {
   return <tr className={clsx(styles.tr, className)} {...rest} />
}
