import { z } from 'zod'

export const verifyEmailSchema = z.object({
   code: z.string(),
})

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>
