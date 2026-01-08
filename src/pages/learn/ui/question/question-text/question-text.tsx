import { LearnTextSkeleton, Typography } from '@/shared/ui'

type QuestionTextProps = {
   question?: string
   isLoading: boolean
}

export const QuestionText = ({ question, isLoading }: QuestionTextProps) => {
   return (
      <>
         {isLoading ? (
            <LearnTextSkeleton />
         ) : (
            <Typography variant={'body1'} textAlign={'left'}>
               {question}
            </Typography>
         )}
      </>
   )
}
