import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import styles from './avatar-skeleton.module.scss'

export const AvatarSkeleton = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Skeleton width={36} height={36} className={styles.avatar} />
      </SkeletonTheme>
   )
}
