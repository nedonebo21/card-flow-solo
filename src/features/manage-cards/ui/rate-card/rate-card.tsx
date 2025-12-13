import type { ComponentProps } from 'react'

import type { RateCardFormValues } from '@/features/manage-cards/model/rate-card-schema'

import { type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'

import { useSaveCardGradeMutation } from '@/entities/card'
import { rateCardSchema } from '@/features/manage-cards/model/rate-card-schema'
import { RATING_OPTIONS } from '@/shared/constants'
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
} & Omit<ComponentProps<'form'>, 'onSubmit'>

export const RateCard = ({
   onSubmit: onSubmitFormProps,
   answerImg,
   answer,
   deckId,
   cardId,
   onNextCard,
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

   const [saveCardGrade, { isLoading }] = useSaveCardGradeMutation()

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
                  <Typography
                     className={styles.answerText}
                     textAlign={'left'}
                     as={'span'}
                     variant={'body1'}
                  >
                     {answer}
                  </Typography>
               </Typography>
            </div>
            {haveAnswerImg && (
               <div className={styles.image}>
                  <img src={answerImg} alt={'answer image'} />
               </div>
            )}
            <div className={styles.rate}>
               <Typography className={styles.label} textAlign={'left'} variant={'subtitle1'}>
                  Rate yourself:
               </Typography>
               <ControlledRadioGroup
                  name={'grade'}
                  control={control}
                  errorMessage={errors.grade?.message}
                  options={RATING_OPTIONS}
               />
            </div>
            <Button className={styles.next} disabled={isLoading} fullWidth>
               Next Question
            </Button>
         </form>
      </div>
   )
}
