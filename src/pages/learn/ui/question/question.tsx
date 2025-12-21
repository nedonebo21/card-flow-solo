import { clsx } from 'clsx'

import { Button, Typography } from '@/shared/ui'

import styles from './question.module.scss'

type QuestionProps = {
   questionImg?: string
   question?: string
   shots?: number
   showAnswer: boolean
   setShowAnswer: (showAnswer: boolean) => void
}

export const Question = ({
   question,
   questionImg,
   shots,
   setShowAnswer,
   showAnswer,
}: QuestionProps) => {
   const haveQuestionImg = !!questionImg && questionImg.length > 0

   const handleAnswerShow = () => {
      setShowAnswer(true)
   }

   return (
      <>
         <div className={styles.question}>
            <div className={styles.questionText}>
               <Typography variant={'subtitle1'}>Question:</Typography>
               <Typography variant={'body1'} textAlign={'left'}>
                  {question}
               </Typography>
            </div>
            {haveQuestionImg && (
               <div className={styles.image}>
                  <img src={questionImg} alt={'question image'} />
               </div>
            )}
            <div className={styles.count}>
               <Typography variant={'body2'}>Number of attempts:</Typography>
               <Typography variant={'subtitle2'}>{shots}</Typography>
            </div>
         </div>
         {!showAnswer && (
            <Button
               className={clsx(
                  styles.defaultButtonMargin,
                  haveQuestionImg && styles.buttonMarginWithImage
               )}
               onClick={handleAnswerShow}
               fullWidth
            >
               Show Answer
            </Button>
         )}
      </>
   )
}
