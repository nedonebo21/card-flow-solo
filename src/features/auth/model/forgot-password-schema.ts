import type { TFunction } from 'i18next'

import { z } from 'zod'

import { emailSchema } from '../model/auth-shemas'

export const forgotPasswordSchema = (t: TFunction) =>
   z.object({
      email: emailSchema(t),
   })

export type ForgotPasswordFormValues = z.infer<ReturnType<typeof forgotPasswordSchema>>
