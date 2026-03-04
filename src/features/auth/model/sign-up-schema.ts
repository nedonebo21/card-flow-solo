import type { TFunction } from 'i18next'

import { z } from 'zod'

import { emailSchema, passwordSchema } from './../model/auth-shemas'

export const signUpSchema = (t: TFunction) =>
   z
      .object({
         email: emailSchema,
         password: passwordSchema,
         confirm: z.string().min(3),
      })
      .refine(data => data.confirm === data.password, {
         message: t('features.auth.errors.password-must-match'),
         path: ['confirm'],
      })

export type SignUpFormValues = z.infer<ReturnType<typeof signUpSchema>>
