import { type ComponentProps, useMemo } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { ChevronRightIcon } from '@/shared/ui/icons'
import { PaginationNavItem } from '@/shared/ui/pagination/pagination-nav-item'
import { Select } from '@/shared/ui/select'
import { Typography } from '@/shared/ui/typography'

import styles from './pagination.module.scss'

import { DOTS, usePagination } from './use-pagination'

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

   const handleNextPage = () => {
      if (currentPage < lastPage) {
         onPageChange(currentPage + 1)
      }
   }

   const handlePrevPage = () => {
      if (currentPage > 1) {
         onPageChange(currentPage - 1)
      }
   }

   const handlePageSizeChange = (value: string) => {
      onPageSizeChange?.(Number(value))
   }

   const lastPage = paginationRange[paginationRange.length - 1] as number

   const isPrevDisabled = currentPage === 1
   const isNextDisabled = currentPage === lastPage

   return (
      <div className={clsx(styles.paginationContainer, className)}>
         <div className={styles.paginationWrapper}>
            <ul className={styles.pagination}>
               <li className={clsx(styles.arrow, styles.leftArrow)}>
                  <Button
                     disabled={isPrevDisabled}
                     variant={'ghost'}
                     size={'icon'}
                     onClick={handlePrevPage}
                  >
                     <ChevronRightIcon width={16} height={16} />
                  </Button>
               </li>
               {paginationRange.map((pageNum, index) => {
                  const isCurrent = pageNum === currentPage

                  if (pageNum === DOTS) {
                     return (
                        <li key={`dots-${index}`} className={styles.paginationDots}>
                           &#8230;
                        </li>
                     )
                  }

                  return (
                     <PaginationNavItem
                        key={`page-${pageNum}`}
                        className={clsx(styles.paginationItem, isCurrent && styles.selected)}
                        onClick={() => onPageChange(pageNum)}
                     >
                        {pageNum}
                     </PaginationNavItem>
                  )
               })}
               <li className={clsx(styles.arrow, styles.rightArrow)}>
                  <Button
                     disabled={isNextDisabled}
                     variant={'ghost'}
                     size={'icon'}
                     onClick={handleNextPage}
                  >
                     <ChevronRightIcon width={16} height={16} />
                  </Button>
               </li>
            </ul>
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
