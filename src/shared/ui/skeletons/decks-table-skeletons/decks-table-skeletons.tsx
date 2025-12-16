import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { DECK_COLUMNS } from '@/shared/constants'
import { Table, TableBody, TableCell, TableRow, TableSortHeader } from '@/shared/ui'

import styles from './decks-table-skeletons.module.scss'

export const DecksTableSkeletons = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Table>
            <TableSortHeader columns={DECK_COLUMNS} />
            <TableBody>
               {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                     <TableCell>
                        <div className={styles.link}>
                           <Skeleton width={118} height={40} className={styles.cover} />
                           <Skeleton width={120} height={14} />
                        </div>
                     </TableCell>
                     <TableCell>
                        <Skeleton width={30} />
                     </TableCell>
                     <TableCell>
                        <Skeleton width={80} />
                     </TableCell>
                     <TableCell>
                        <Skeleton width={100} />
                     </TableCell>
                     <TableCell className={styles.icons}>
                        <div className={styles.buttons}>
                           <Skeleton circle width={16} height={16} />
                           <Skeleton circle width={16} height={16} />
                        </div>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </SkeletonTheme>
   )
}
