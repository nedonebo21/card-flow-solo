import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ShotsSkeleton = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Skeleton width={10} height={14} />
      </SkeletonTheme>
   )
}
