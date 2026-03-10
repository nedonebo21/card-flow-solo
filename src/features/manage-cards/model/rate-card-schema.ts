import type { TFunction } from 'i18next'

import { z } from 'zod'

export const rateCardSchema = (t: TFunction) =>
   z.object({
      grade: z
         .number()
         .min(1, t('features.manage-cards.errors.rate-answer'))
         .max(5, t('features.manage-cards.errors.grade-must-be')),
   })

export type RateCardFormValues = z.infer<ReturnType<typeof rateCardSchema>>
