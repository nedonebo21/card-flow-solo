import type { TFunction } from 'i18next'

import { z } from 'zod'

import { emailSchema, passwordSchema } from './auth-shemas'

export const signInSchema = (t: TFunction) =>
   z.object({
      email: emailSchema(t),
      password: passwordSchema(t),
      rememberMe: z.boolean().optional(),
   })

export type SignInFormValues = z.infer<ReturnType<typeof signInSchema>>
