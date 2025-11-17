import { z } from 'zod'

import { emailSchema, passwordSchema } from './auth-shemas'

export const loginSchema = z.object({
   email: emailSchema,
   password: passwordSchema,
   rememberMe: z.boolean().optional(),
})

export type FormValues = z.infer<typeof loginSchema>
