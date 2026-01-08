import { ImgSkeleton } from '@/shared/ui'

import styles from './answer-img.module.scss'

type AnswerImgProps = {
   isLoading: boolean
   answerImg?: string
   haveAnswerImg: boolean
}

export const AnswerImg = ({ isLoading, answerImg, haveAnswerImg }: AnswerImgProps) => {
   return (
      <>
         {haveAnswerImg && (
            <div className={styles.image}>
               {isLoading ? <ImgSkeleton /> : <img src={answerImg} alt={'answer image'} />}
            </div>
         )}
      </>
   )
}
