import { type ComponentProps, useMemo } from 'react'

import { clsx } from 'clsx'

import { Typography, Select } from '@/shared/ui'

import styles from './pagination.module.scss'

import { PaginationNavItem } from './pagination-nav-item'
import { usePagination } from './use-pagination'

type PaginationProps = {
   onPageChange: (page: number) => void
   onPageSizeChange: (size: number) => void
   pageSizeOptions?: number[]
   totalCount: number
   siblingCount?: number
   currentPage: number
   pageSize: number
} & Omit<ComponentProps<'div'>, 'children'>

export const Pagination = ({
   className,
   onPageChange,
   onPageSizeChange,
   totalCount,
   siblingCount = 1,
   pageSizeOptions = [10, 20, 30, 50, 100],
   currentPage,
   pageSize,
}: PaginationProps) => {
   const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })

   const options = useMemo(
      () =>
         pageSizeOptions.map(size => {
            return { value: size.toString(), label: size.toString() }
         }),
      [pageSizeOptions]
   )

   const handlePageSizeChange = (value: string) => {
      onPageSizeChange(Number(value))
   }

   return (
      <div className={clsx(styles.paginationContainer, className)}>
         <div className={styles.paginationWrapper}>
            <PaginationNavItem
               paginationRange={paginationRange}
               currentPage={currentPage}
               onPageChange={onPageChange}
            />
         </div>
         <div className={styles.itemsCountWrapper}>
            <Typography variant={'body2'}>Показать</Typography>
            <Select
               options={options}
               placeholder={options[0].label}
               onValueChange={handlePageSizeChange}
            />
            <Typography variant={'body2'}>на странице</Typography>
         </div>
      </div>
   )
}
