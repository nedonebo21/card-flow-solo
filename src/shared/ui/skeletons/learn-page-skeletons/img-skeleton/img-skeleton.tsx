import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ImgSkeleton = () => {
   return (
      <SkeletonTheme baseColor={'#4c4c4c'} highlightColor={'#808080'}>
         <Skeleton width={350} height={120} />
      </SkeletonTheme>
   )
}
