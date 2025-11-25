import { useSearchParams } from 'react-router-dom'

import { Pagination } from '@/shared/ui'

import styles from './decks-pagination.module.scss'

type DecksPaginationProps = {
   totalCount: number
}
export const DecksPagination = ({ totalCount }: DecksPaginationProps) => {
   const [searchParams, setSearchParams] = useSearchParams()

   const page = Number(searchParams.get('page')) || 1
   const perPage = Number(searchParams.get('perPage')) || 10

   const setPage = (page: number) => {
      searchParams.set('page', page.toString())
      setSearchParams(searchParams)
   }

   const setPerPage = (itemsPerPage: number) => {
      searchParams.set('perPage', itemsPerPage.toString())
      setSearchParams(searchParams)
   }

   return (
      <div className={styles.paginationWrapper}>
         <Pagination
            onPageChange={setPage}
            onPageSizeChange={setPerPage}
            totalCount={totalCount}
            currentPage={page}
            pageSize={perPage}
         />
      </div>
   )
}
