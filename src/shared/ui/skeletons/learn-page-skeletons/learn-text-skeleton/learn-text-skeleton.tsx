import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const LearnTextSkeleton = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Skeleton width={140} height={14} />
      </SkeletonTheme>
   )
}
