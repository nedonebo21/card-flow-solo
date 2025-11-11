import { z } from 'zod'

export const signUpSchema = z
   .object({
      email: z.email('Enter a valid email address').transform(email => email.trim()),
      password: z
         .string()
         .min(3, 'Password must be longer than 3 characters')
         .refine(pass => !pass.includes(' '), 'Password cannot contains space`s'),
      confirmedPassword: z.string().min(3),
   })
   .refine(data => data.confirmedPassword === data.password, {
      message: 'Passwords must be match',
      path: ['confirmedPassword'],
   })

export type SignUpValues = z.infer<typeof signUpSchema>
