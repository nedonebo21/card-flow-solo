import type { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import { ChevronUpIcon } from '@/shared/ui/icons'

import styles from './table.module.scss'

import { TableHeadCell, TableRow } from './table'

export type Column = {
   key: string
   title: string
   sortable?: boolean
}

export type Sort = {
   key: string
   direction: 'asc' | 'desc'
} | null

type TableSortHeaderProps = Omit<
   ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      sort: Sort
      onSort?: (sort: Sort) => void
   },
   'children'
>

export const TableSortHeader = ({
   columns,
   sort,
   onSort,
   className,
   ...rest
}: TableSortHeaderProps) => {
   const handleSort = (key: string) => () => {
      if (!onSort) {
         return
      }

      if (sort?.key !== key) {
         return onSort({ key, direction: 'asc' })
      }

      if (sort.direction === 'desc') {
         return onSort(null)
      }

      return onSort({
         key,
         direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      })
   }

   return (
      <thead className={clsx(styles.thead, className)} {...rest}>
         <TableRow>
            {columns.map(({ title, key, sortable }) => (
               <TableHeadCell
                  key={key}
                  className={clsx(null, sortable && styles.sortable)}
                  onClick={handleSort(key)}
               >
                  {title}
                  {sort && sort.key === key && (
                     <span className={styles.arrowWrapper}>
                        {sort.direction === 'asc' ? (
                           <ChevronUpIcon width={12} height={12} />
                        ) : (
                           <ChevronUpIcon className={styles.arrowDown} width={12} height={12} />
                        )}
                     </span>
                  )}
               </TableHeadCell>
            ))}
         </TableRow>
      </thead>
   )
}
