import { z } from 'zod'

export const rateCardSchema = z.object({
   grade: z.number().min(1, 'Please rate your answer').max(5, 'Grade must be at most 5'),
})

export type RateCardFormValues = z.infer<typeof rateCardSchema>
