import { z } from 'zod'

//TODO add object custom errors + проверка на пробелы в начале и конце пароля, мин кол-во пароля + текст ошибки
export const loginSchema = z.object({
   email: z.email('Enter a valid email address').transform(email => email.trim()),
   password: z
      .string()
      .min(3, 'Password must be longer than 3 characters')
      .refine(pass => !pass.includes(' '), 'Password cannot contains space`s'),
   rememberMe: z.boolean().optional(),
})

export type FormValues = z.infer<typeof loginSchema>
