import type { ComponentPropsWithoutRef } from 'react'

import { clsx } from 'clsx'

import { ChevronUpIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './table.module.scss'

export type Column = {
   key: string
   title: string
   sortable: boolean
}

export type Sort = {
   key: string
   direction: 'asc' | 'desc'
} | null

type TableSortHeaderProps = Omit<
   ComponentPropsWithoutRef<'thead'> & {
      columns: Column[]
      sort?: Sort
      onSort?: (sort: Sort) => void
   },
   'children'
>

export const TableSortHeader = ({ columns, sort, onSort, ...rest }: TableSortHeaderProps) => {
   const handleSort = (key: string, sortable?: boolean) => () => {
      if (!onSort || !sortable) {
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
      <thead className={styles.thead} {...rest}>
         <tr className={styles.tr}>
            {columns.map(({ title, key, sortable }) => (
               <Typography
                  key={key}
                  className={clsx(styles.th, sortable && styles.sortable)}
                  variant={'subtitle2'}
                  as={'th'}
                  textAlign={'left'}
                  onClick={handleSort(key, sortable)}
               >
                  <span className={styles.title}>{title}</span>
                  {sort && sort.key === key && (
                     <span className={styles.arrowWrapper}>
                        {sort.direction === 'asc' ? (
                           <ChevronUpIcon width={12} height={12} />
                        ) : (
                           <ChevronUpIcon className={styles.arrowDown} width={12} height={12} />
                        )}
                     </span>
                  )}
               </Typography>
            ))}
         </tr>
      </thead>
   )
}
