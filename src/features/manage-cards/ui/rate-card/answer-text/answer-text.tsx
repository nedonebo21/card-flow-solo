import { LearnTextSkeleton, Typography } from '@/shared/ui'

import styles from './answer-text.module.scss'

type AnswerTextProps = {
   answer?: string
   isLoading: boolean
}

export const AnswerText = ({ answer, isLoading }: AnswerTextProps) => {
   return (
      <>
         {isLoading ? (
            <LearnTextSkeleton />
         ) : (
            <Typography
               className={styles.answerText}
               textAlign={'left'}
               as={'span'}
               variant={'body1'}
            >
               {answer}
            </Typography>
         )}
      </>
   )
}
