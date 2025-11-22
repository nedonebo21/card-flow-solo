import { z } from 'zod'

import { passwordSchema } from '../model/auth-shemas'

export const newPasswordSchema = z.object({
   password: passwordSchema,
})

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>
