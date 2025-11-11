import { z } from 'zod'

export const nicknameSchema = z.object({
   nickname: z
      .string()
      .min(2, 'Nickname must be longer than 2 characters')
      .max(15, 'Nickname must be less than 15 characters'),
})

export type NicknameFormValues = z.infer<typeof nicknameSchema>
