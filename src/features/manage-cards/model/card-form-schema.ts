import type { TFunction } from 'i18next'

import { z } from 'zod'

const MIN_LENGTH = 3
const MAX_LENGTH = 500

export const cardFormSchema = (t: TFunction) =>
   z.object({
      answer: z
         .string()
         .min(
            MIN_LENGTH,
            `${t('features.manage-cards.errors.answer-should-more')} ${MIN_LENGTH} ${t('shared.characters')}`
         )
         .max(
            MAX_LENGTH,
            `${t('features.manage-cards.errors.answer-should-less')} ${MAX_LENGTH} ${t('shared.characters')}`
         ),
      question: z
         .string()
         .min(
            MIN_LENGTH,
            `${t('features.manage-cards.errors.question-should-more')} ${MIN_LENGTH} ${t('shared.characters')}`
         )
         .max(
            MAX_LENGTH,
            `${t('features.manage-cards.errors.question-should-less')} ${MAX_LENGTH} ${t('shared.characters')}`
         ),
      questionImg: z.instanceof(File).optional(),
      answerImg: z.instanceof(File).optional(),
   })

export type CardFormValues = z.infer<ReturnType<typeof cardFormSchema>>
