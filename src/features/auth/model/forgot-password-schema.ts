import { z } from 'zod'

import { emailSchema } from '../model/auth-shemas'

export const forgotPasswordSchema = z.object({
   email: emailSchema,
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
