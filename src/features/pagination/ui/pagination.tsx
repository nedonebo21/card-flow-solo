import { clsx } from 'clsx'

import { DOTS, usePagination } from '@/features/pagination/hooks'
import { Button } from '@/shared/ui/button'
import { ChevronRightIcon } from '@/shared/ui/icons'
import { Select } from '@/shared/ui/select'
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
   const pageSizeOptions = [
      { value: '10', label: '10' },
      { value: '20', label: '20' },
      { value: '30', label: '30' },
      { value: '50', label: '50' },
      { value: '100', label: '100' },
   ]

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

   const handlePageSizeChange = (value: string) => {
      onPageSizeChange?.(Number(value))
   }

   const lastPage = paginationRange[paginationRange.length - 1] as number

   return (
      <div className={clsx(styles.paginationContainer, className)}>
         <div className={styles.paginationWrapper}>
            <ul className={styles.pagination}>
               <li className={clsx(styles.arrow, styles.leftArrow)}>
                  <Button
                     disabled={currentPage === 1}
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

                  return (
                     <li
                        key={`page-${pageNum}`}
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
               <li className={clsx(styles.arrow, styles.rightArrow)}>
                  <Button
                     disabled={currentPage === lastPage}
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
               options={pageSizeOptions}
               placeholder={pageSizeOptions[0].label}
               onValueChange={handlePageSizeChange}
            />
            <Typography variant={'body2'}>на странице</Typography>
         </div>
      </div>
   )
}
