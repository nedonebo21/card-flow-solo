import { clsx } from 'clsx'

import { QuestionImage } from '@/pages/learn/ui/question/question-image/question-image'
import { QuestionText } from '@/pages/learn/ui/question/question-text/question-text'
import { Shots } from '@/pages/learn/ui/question/shots/shots'
import { Button, Typography } from '@/shared/ui'

import styles from './question.module.scss'

type QuestionProps = {
   isLoading: boolean
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
   isLoading,
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
               <QuestionText question={question} isLoading={isLoading} />
            </div>
            <QuestionImage
               questionImg={questionImg}
               isLoading={isLoading}
               haveQuestionImg={haveQuestionImg}
            />
            <div className={styles.count}>
               <Typography variant={'body2'}>Number of attempts:</Typography>
               <Shots shots={shots} isLoading={isLoading} />
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
