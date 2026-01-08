import { ImgSkeleton } from '@/shared/ui'

import styles from './question-image.module.scss'

type QuestionImageProps = {
   isLoading: boolean
   questionImg?: string
   haveQuestionImg: boolean
}

export const QuestionImage = ({ isLoading, questionImg, haveQuestionImg }: QuestionImageProps) => {
   return (
      <>
         {haveQuestionImg && (
            <div className={styles.image}>
               {isLoading ? <ImgSkeleton /> : <img src={questionImg} alt={'question image'} />}
            </div>
         )}
      </>
   )
}
