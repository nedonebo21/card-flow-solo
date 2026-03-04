import type { TFunction } from 'i18next'

import { z } from 'zod'

import { passwordSchema } from '../model/auth-shemas'

export const newPasswordSchema = (t: TFunction) =>
   z.object({
      password: passwordSchema(t),
   })

export type NewPasswordFormValues = z.infer<ReturnType<typeof newPasswordSchema>>
