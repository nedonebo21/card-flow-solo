import { z } from 'zod'

export const forgotPasswordSchema = z.object({
   email: z.email('Enter a valid email address').trim(),
})

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
