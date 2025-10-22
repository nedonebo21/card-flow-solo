import type { ChangeEvent } from 'react'

import { clsx } from 'clsx'

import { DOTS, usePagination } from '@/features/pagination/hooks'
import { ChevronRightIcon } from '@/shared/ui/icons'
import { Typography } from '@/shared/ui/typography'

import styles from './pagination.module.scss'

type PaginationProps = {
   className?: string
   onPageChange: (page: number) => void
   onPageSizeChange: (size: number) => void
   totalCount: number
   siblingCount?: number
   currentPage: number
   pageSize: number
}

export const Pagination = ({
   className,
   onPageChange,
   onPageSizeChange,
   totalCount,
   siblingCount = 1,
   currentPage,
   pageSize,
}: PaginationProps) => {
   const paginationRange = usePagination({ currentPage, totalCount, siblingCount, pageSize })

   if (currentPage === 0 || paginationRange.length < 2) {
      return null
   }

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

   const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onPageSizeChange?.(Number(e.target.value))
   }

   const lastPage = paginationRange[paginationRange.length - 1] as number
   const pageSizeOptions = [10, 20, 30, 50, 100]

   return (
      <div className={clsx(styles.paginationContainer, className)}>
         <div className={styles.paginationWrapper}>
            <ul className={styles.pagination}>
               <li
                  className={clsx(
                     styles.arrow,
                     styles.leftArrow,
                     currentPage === 1 && styles.disabled
                  )}
                  onClick={handlePrevPage}
               >
                  <ChevronRightIcon color={'currentColor'} width={16} height={16} />
               </li>
               {paginationRange.map((pageNum, index) => {
                  if (pageNum === DOTS) {
                     return (
                        <li key={`dots-${index}`} className={styles.paginationDots}>
                           &#8230;
                        </li>
                     )
                  }

                  return (
                     <li
                        key={pageNum}
                        className={clsx(
                           styles.paginationItem,
                           pageNum === currentPage && styles.selected
                        )}
                        onClick={() => onPageChange(pageNum)}
                     >
                        {pageNum}
                     </li>
                  )
               })}
               <li
                  className={clsx(
                     styles.arrow,
                     styles.rightArrow,
                     currentPage === lastPage && styles.disabled
                  )}
                  onClick={handleNextPage}
               >
                  <ChevronRightIcon color={'currentColor'} width={16} height={16} />
               </li>
            </ul>
         </div>
         <div className={styles.itemsCountWrapper}>
            <Typography variant={'body2'}>Показать</Typography>
            <select onChange={handlePageSizeChange} className={styles.paginationSelect}>
               {pageSizeOptions.map(size => {
                  return (
                     <option key={size} value={size}>
                        {size}
                     </option>
                  )
               })}
            </select>
            <Typography variant={'body2'}>на странице</Typography>
         </div>
      </div>
   )
}
