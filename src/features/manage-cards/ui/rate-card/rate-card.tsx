import type { ComponentProps } from 'react'

import type { RateCardFormValues } from '@/features/manage-cards/model/rate-card-schema'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import { useSaveCardGradeMutation } from '@/entities/card'
import { rateCardSchema } from '@/features/manage-cards/model/rate-card-schema'
import { AnswerImg } from '@/features/manage-cards/ui/rate-card/answer-img/answer-img'
import { AnswerText } from '@/features/manage-cards/ui/rate-card/answer-text/answer-text'
import { useRatingOptions } from '@/shared/constants'
import { ControlledRadioGroup } from '@/shared/forms'
import { Button, Typography } from '@/shared/ui'

import styles from './rate-card.module.scss'

type RateCardProps = {
   onSubmit?: SubmitHandler<RateCardFormValues>
   answerImg?: string
   answer?: string
   deckId: string
   cardId: string
   onNextCard: () => void
   isLoading: boolean
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const RateCard = ({
   onSubmit: onSubmitFormProps,
   answerImg,
   answer,
   deckId,
   cardId,
   onNextCard,
   isLoading,
   ...rest
}: RateCardProps) => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<RateCardFormValues>({
      resolver: zodResolver(rateCardSchema),
      defaultValues: {
         grade: 1,
      },
   })

   const { t } = useTranslation()

   const ratingOptions = useRatingOptions()

   const [saveCardGrade, { isLoading: isSaveLoading }] = useSaveCardGradeMutation()

   const haveAnswerImg = !!answerImg && answerImg.length > 0

   const onSubmit: typeof onSubmitFormProps = async (data, e) => {
      if (onSubmitFormProps) {
         await onSubmitFormProps(data, e)
      } else {
         try {
            await saveCardGrade({
               id: deckId,
               body: { cardId, grade: data.grade },
            }).unwrap()
            onNextCard()
         } catch (error) {
            console.error(error)
         }
      }
   }

   return (
      <div className={styles.answer}>
         <form onSubmit={handleSubmit(onSubmit)} {...rest}>
            <div className={clsx(styles.answerWrapper, haveAnswerImg && styles.withImage)}>
               <Typography as={'span'} textAlign={'left'} variant={'subtitle1'}>
                  Answer:
                  <AnswerText answer={answer} isLoading={isLoading} />
               </Typography>
            </div>
            <AnswerImg isLoading={isLoading} answerImg={answerImg} haveAnswerImg={haveAnswerImg} />
            <div className={styles.rate}>
               <Typography className={styles.label} textAlign={'left'} variant={'subtitle1'}>
                  {t('rate-yourself')}:
               </Typography>
               <ControlledRadioGroup
                  name={'grade'}
                  control={control}
                  errorMessage={errors.grade?.message}
                  options={ratingOptions}
               />
            </div>
            <Button className={styles.next} disabled={isSaveLoading} fullWidth>
               {t('next-question')}
            </Button>
         </form>
      </div>
   )
}
