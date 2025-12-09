import { z } from 'zod'

const MIN_LENGTH = 3
const MAX_LENGTH = 500

export const cardFormSchema = z.object({
   answer: z
      .string()
      .min(MIN_LENGTH, `Answer should be more than ${MIN_LENGTH} characters`)
      .max(MAX_LENGTH, `Answer should be less than ${MAX_LENGTH}`),
   question: z
      .string()
      .min(MIN_LENGTH, `Question should be more than ${MIN_LENGTH} characters`)
      .max(MAX_LENGTH, `Question should be less than ${MAX_LENGTH}`),
   questionImg: z.string(),
   answerImg: z.string(),
})

export type CardFormValues = z.infer<typeof cardFormSchema>
