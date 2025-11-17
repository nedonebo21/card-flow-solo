import { z } from 'zod'

import { emailSchema, passwordSchema } from './auth-shemas'

export const signInSchema = z.object({
   email: emailSchema,
   password: passwordSchema,
   rememberMe: z.boolean().optional(),
})

export type SignInFormValues = z.infer<typeof signInSchema>
