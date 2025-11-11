import { z } from 'zod'

export const loginSchema = z.object({
   email: z.email('Enter a valid email address').transform(email => email.trim()),
   password: z
      .string()
      .min(3, 'Password must be longer than 3 characters')
      .refine(pass => !pass.includes(' '), 'Password cannot contains space`s'),
   rememberMe: z.boolean().optional(),
})

export type FormValues = z.infer<typeof loginSchema>
