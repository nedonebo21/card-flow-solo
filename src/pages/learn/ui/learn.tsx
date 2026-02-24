import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom'

import { useGetRandomCardQuery } from '@/entities/card'
import { useGetDeckByIdQuery } from '@/entities/deck'
import { RateCard } from '@/features/manage-cards'
import { Question } from '@/pages/learn/ui/question/question'
import { routeHelpers } from '@/shared/lib'
import { ArrowLeftIcon, Button, Card, Typography } from '@/shared/ui'

import styles from './learn.module.scss'

export const Learn = () => {
   const [showAnswer, setShowAnswer] = useState(false)

   const { t } = useTranslation()

   const { id } = useParams()

   const { data: deck } = useGetDeckByIdQuery({ id: id ?? '' })

   const {
      data: card,
      isLoading: isCardLoading,
      isFetching,
      isError,
      refetch: refetchRandomCard,
   } = useGetRandomCardQuery({ id: id ?? '' }, { skip: !id })

   const handleAnswerShow = () => {
      setShowAnswer(prev => !prev)
   }

   const isLoading = isCardLoading || isFetching

   return (
      <>
         <div className={styles.linkContainer}>
            <Button
               className={styles.link}
               variant={'link'}
               as={Link}
               to={routeHelpers.createDeckPath(id ?? '')}
            >
               <ArrowLeftIcon width={16} height={16} /> {t('back-to-prev')}
            </Button>
         </div>
         {isError ? (
            <Typography variant={'warning'}>{t('deck-is-empty')}</Typography>
         ) : (
            <Card as={'section'} className={styles.learn}>
               <header className={styles.header}>
                  <Typography variant={'h1'} as={'h1'}>
                     {deck?.name}
                  </Typography>
               </header>
               <Question
                  isLoading={isLoading}
                  question={card?.question}
                  questionImg={card?.questionImg}
                  shots={card?.shots}
                  showAnswer={showAnswer}
                  setShowAnswer={handleAnswerShow}
               />
               {showAnswer && (
                  <RateCard
                     answerImg={card?.answerImg}
                     answer={card?.answer}
                     isLoading={isLoading}
                     deckId={id ?? ''}
                     cardId={card?.id ?? ''}
                     onNextCard={() => {
                        refetchRandomCard()
                        setShowAnswer(false)
                     }}
                  />
               )}
            </Card>
         )}
      </>
   )
}
