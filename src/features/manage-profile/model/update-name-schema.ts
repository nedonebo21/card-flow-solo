import { z } from 'zod'

const MAX_LENGTH = 15

export const updateNameSchema = z.object({
   name: z.string().max(MAX_LENGTH, `Nickname must be less than ${MAX_LENGTH} characters`),
})

export type UpdateNameFormValues = z.infer<typeof updateNameSchema>
