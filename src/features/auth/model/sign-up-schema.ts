import { z } from 'zod'

import { emailSchema, passwordSchema } from './../model/auth-shemas'

export const signUpSchema = z
   .object({
      email: emailSchema,
      password: passwordSchema,
      confirm: z.string().min(3),
   })
   .refine(data => data.confirm === data.password, {
      message: 'Passwords must be match',
      path: ['confirm'],
   })

export type SignUpFormValues = z.infer<typeof signUpSchema>
