import { z } from 'zod'

export const personalInfoSchema = z.object({
   nickname: z.string().min(2).max(15),
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>
