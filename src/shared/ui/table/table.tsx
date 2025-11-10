import type { ComponentProps, ReactNode, ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import { Typography } from '@/shared/ui/typography'

import styles from './table.module.scss'

export type Column = {
   key: string
   title: string
   sortable: boolean
}

type TableProps = {
   children: ReactNode
} & Omit<ComponentProps<'table'>, 'children'>

export const Table = ({ className, ...rest }: TableProps) => {
   return <table className={clsx(styles.table, className)} {...rest} />
}

type TableSortHeaderProps = Omit<
   ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
   },
   'children'
>

export const TableHeader = ({ columns, className, ...rest }: TableSortHeaderProps) => {
   return (
      <thead className={clsx(styles.thead, className)} {...rest}>
         <TableRow>
            {columns.map(({ title, key }) => (
               <TableHeadCell key={key}>{title}</TableHeadCell>
            ))}
         </TableRow>
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
