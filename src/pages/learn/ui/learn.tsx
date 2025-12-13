import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetRandomCardQuery } from '@/entities/card'
import { useGetDeckByIdQuery } from '@/entities/deck'
import { RateCard } from '@/features/manage-cards'
import { Question } from '@/pages/learn/ui/question/question'
import { routeHelpers } from '@/shared/lib'
import { ArrowLeftIcon, Button, Card, Loader, Typography } from '@/shared/ui'

import styles from './learn.module.scss'

export const Learn = () => {
   const [showAnswer, setShowAnswer] = useState(false)

   const { id } = useParams()

   const { data: deck, isLoading: isDeckLoading } = useGetDeckByIdQuery({ id: id ?? '' })

   const {
      data: card,
      isLoading: isCardLoading,
      isFetching,
      refetch: refetchRandomCard,
   } = useGetRandomCardQuery({ id: id ?? '' }, { skip: !id })

   const handleAnswerShow = () => {
      setShowAnswer(prev => !prev)
   }

   const isLoading = isDeckLoading || (isCardLoading && deck?.id) || isFetching

   if (isLoading) {
      return <Loader />
   }

   return (
      <>
         <div className={styles.linkContainer}>
            <Button
               className={styles.link}
               variant={'link'}
               as={Link}
               to={routeHelpers.createDeckPath(id ?? '')}
            >
               <ArrowLeftIcon width={16} height={16} /> Back to previous page
            </Button>
         </div>
         <Card as={'section'} className={styles.learn}>
            <header className={styles.header}>
               <Typography variant={'h1'} as={'h1'}>
                  Learn &#34;{deck?.name}&#34;
               </Typography>
            </header>
            <Question
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
                  deckId={id ?? ''}
                  cardId={card?.id ?? ''}
                  onNextCard={() => {
                     refetchRandomCard()
                     setShowAnswer(false)
                  }}
               />
            )}
         </Card>
      </>
   )
}
