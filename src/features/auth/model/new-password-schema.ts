import { z } from 'zod'

export const newPasswordSchema = z.object({
   password: z
      .string()
      .min(3, 'Password must be longer than 3 characters')
      .refine(pass => !pass.includes(' '), 'Password cannot contains space`s'),
})

export type NewPasswordValues = z.infer<typeof newPasswordSchema>
