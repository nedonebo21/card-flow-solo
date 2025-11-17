import { z } from 'zod'

const MAX_LENGTH = 3

export const emailSchema = z.email('Enter a valid email address').trim()
export const passwordSchema = z
   .string()
   .min(MAX_LENGTH, `Password must be longer than ${MAX_LENGTH} characters`)
   .refine(pass => pass === pass.trim(), 'Password must not contain leading or trailing spaces')
