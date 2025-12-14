import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { CARDS_COLUMNS } from '@/shared/constants'
import { Table, TableBody, TableCell, TableRow, TableSortHeader } from '@/shared/ui'

export const CardsTableSkeletons = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Table>
            <TableSortHeader columns={CARDS_COLUMNS} />
            <TableBody>
               {Array(10)
                  .fill(0)
                  .map((_, i) => {
                     return (
                        <TableRow key={i}>
                           <TableCell>
                              <Skeleton width={100} height={14} />
                           </TableCell>

                           <TableCell>
                              <Skeleton width={120} height={14} />
                           </TableCell>

                           <TableCell>
                              <Skeleton width={80} height={14} />
                           </TableCell>

                           <TableCell>
                              <div style={{ display: 'flex', gap: '4px' }}>
                                 {[1, 2, 3, 4, 5].map(star => (
                                    <Skeleton key={star} circle width={16} height={16} />
                                 ))}
                              </div>
                           </TableCell>
                        </TableRow>
                     )
                  })}
            </TableBody>
         </Table>
      </SkeletonTheme>
   )
}
