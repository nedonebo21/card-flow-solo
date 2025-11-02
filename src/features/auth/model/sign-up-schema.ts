import { z } from 'zod'

export const signUpSchema = z
   .object({
      email: z.email(),
      password: z.string().min(3),
      confirmedPassword: z.string().min(3),
   })
   .refine(data => data.confirmedPassword === data.password, {
      message: 'Passwords don`t match',
      path: ['confirmedPassword'],
   })

export type SignUpValues = z.infer<typeof signUpSchema>
