import { ShotsSkeleton, Typography } from '@/shared/ui'

type ShotsProps = {
   shots?: number
   isLoading: boolean
}

export const Shots = ({ shots, isLoading }: ShotsProps) => {
   return (
      <>{isLoading ? <ShotsSkeleton /> : <Typography variant={'subtitle2'}>{shots}</Typography>}</>
   )
}
