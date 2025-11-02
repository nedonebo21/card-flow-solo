import { z } from 'zod'

export const newPasswordSchema = z.object({
   password: z.string().min(3),
})

export type NewPasswordValues = z.infer<typeof newPasswordSchema>
