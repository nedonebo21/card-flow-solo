import type { ComponentProps } from 'react'

import { clsx } from 'clsx'

import { Button } from '@/shared/ui/button'
import { ChevronRightIcon } from '@/shared/ui/icons'

import styles from './pagination.module.scss'

import { DOTS } from './use-pagination'

type PaginationItemProps = {
   paginationRange: (number | 'DOTS')[]
   onPageChange: (page: number) => void
   currentPage: number
} & Omit<ComponentProps<'li'>, 'children'>

export const PaginationNavItem = ({
   paginationRange,
   onPageChange,
   currentPage,
   ...rest
}: PaginationItemProps) => {
   const handlePageChange = (page: number) => {
      onPageChange(page)
   }

   const handleNextPage = () => {
      if (currentPage < lastPage) {
         handlePageChange(currentPage + 1)
      }
   }

   const handlePrevPage = () => {
      if (currentPage > 1) {
         handlePageChange(currentPage - 1)
      }
   }

   const lastPage = paginationRange[paginationRange.length - 1] as number

   const isPrevDisabled = currentPage === 1
   const isNextDisabled = currentPage === lastPage

   return (
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
            if (pageNum === DOTS) {
               return (
                  <li key={`dots-${index}`} className={styles.paginationDots}>
                     &#8230;
                  </li>
               )
            }

            const isCurrent = currentPage === pageNum

            return (
               <li
                  key={`page-${pageNum}`}
                  className={clsx(styles.paginationItem, isCurrent && styles.selected)}
                  onClick={() => handlePageChange(pageNum)}
                  {...rest}
               >
                  {pageNum}
               </li>
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
   )
}
